// ./cloud-functions/update.go
//
// 客户端自动更新检查接口：GET /v1/update?version=0.0.5&os=windows&arch=x64[&channel=beta]
//
// 为什么由服务端判断"要不要更新、该下哪个文件"，而不是让客户端拉 GitHub 的
// release 列表自己算：
//
//   - 产物命名、下载镜像、强制最低版本这些以后都可能变，改这里就生效，
//     不用等用户升级到能读懂新规则的客户端。
//   - 客户端不直连 api.github.com —— 匿名调用每个 IP 每小时只有 60 次，
//     国内访问也不稳定；这里复用带 token 的 GithubClient 缓存。
//
// 返回的 JSON 形状（客户端 crates/winssh-updater 按这个解析）：
//
//	{
//	  "update_available": true,
//	  "current": "0.0.5",
//	  "latest": "0.0.6",
//	  "notes": "## v0.0.6\n\n### 新功能\n- …",   // GitHub Release 正文，即发版日志
//	  "published_at": "2026-10-19T08:30:14Z",
//	  "release_url": "https://github.com/.../releases/tag/v0.0.6",
//	  "assets": [
//	    {"kind":"installer","name":"winssh-pro-x64-0.0.6-setup.exe",
//	     "url":"https://github.com/.../download/v0.0.6/...",
//	     "size":123,"sha256":"…","signature_url":"…setup.exe.minisig"}
//	  ]
//	}
//
// 已经是最新版时更新检查照样返回 200（update_available=false），由客户端决定
// 不弹窗 —— 让客户端用状态码区分"没更新"和"检查失败"。
package main

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

// 更新检查的缓存单独设短：发版后最迟这么久客户端就能看到；发现有问题的版本
// 也可以在这段时间内从 latest 列表里撤掉。GitHub 有 token 时额度是每小时
// 5000 次，10 分钟的缓存完全够用。
const updateCacheTTL = 10 * 60 * 1e9 // 10 分钟

type releaseAsset struct {
	Name               string `json:"name"`
	Size               int64  `json:"size"`
	BrowserDownloadURL string `json:"browser_download_url"`
	Digest             string `json:"digest"` // 形如 "sha256:abcd…"，没有时为空
}

type releaseInfo struct {
	TagName     string         `json:"tag_name"`
	Body        string         `json:"body"`
	HTMLURL     string         `json:"html_url"`
	PublishedAt string         `json:"published_at"`
	Draft       bool           `json:"draft"`
	Prerelease  bool           `json:"prerelease"`
	Assets      []releaseAsset `json:"assets"`
}

// updateAsset 是发给客户端的单个可下载文件。
type updateAsset struct {
	Kind         string `json:"kind"` // installer / portable / dmg / archive / deb / rpm
	Name         string `json:"name"`
	URL          string `json:"url"`
	Size         int64  `json:"size"`
	SHA256       string `json:"sha256"`
	SignatureURL string `json:"signature_url"` // 没有 .minisig 时为空
}

type updateResponse struct {
	UpdateAvailable bool          `json:"update_available"`
	Current         string        `json:"current"`
	Latest          string        `json:"latest"`
	Notes           string        `json:"notes"`
	PublishedAt     string        `json:"published_at"`
	ReleaseURL      string        `json:"release_url"`
	Assets          []updateAsset `json:"assets"`
}

// semver 只覆盖本仓库用到的部分：major.minor.patch 加可选的预发布段
// （`0.1.0-beta.1`），忽略 build metadata。只用来比较大小，不承担完整的
// semver 库职责 —— 版本号是我们自己打的。
type semver struct {
	major, minor, patch int
	pre                 []string
}

func parseSemver(raw string) (semver, bool) {
	var v semver
	raw = strings.TrimPrefix(strings.TrimSpace(raw), "v")
	// 去掉 build metadata（`+` 之后）。
	if i := strings.IndexByte(raw, '+'); i >= 0 {
		raw = raw[:i]
	}
	if i := strings.IndexByte(raw, '-'); i >= 0 {
		v.pre = strings.Split(raw[i+1:], ".")
		raw = raw[:i]
	}
	parts := strings.Split(raw, ".")
	if len(parts) != 3 {
		return v, false
	}
	values := []*int{&v.major, &v.minor, &v.patch}
	for i, part := range parts {
		n, err := strconv.Atoi(part)
		if err != nil || n < 0 {
			return v, false
		}
		*values[i] = n
	}
	return v, true
}

// compareSemver 返回 -1 / 0 / 1，规则照 semver 2.0.0 第 11 条：
// 正式版高于任何预发布版；预发布段逐项比，数字按数值、其它按字典序，
// 前缀相同则段数少的更小（`0.1.0-beta` < `0.1.0-beta.1`）。
func compareSemver(a, b semver) int {
	if c := compareInts(a.major, b.major); c != 0 {
		return c
	}
	if c := compareInts(a.minor, b.minor); c != 0 {
		return c
	}
	if c := compareInts(a.patch, b.patch); c != 0 {
		return c
	}
	switch {
	case len(a.pre) == 0 && len(b.pre) == 0:
		return 0
	case len(a.pre) == 0:
		return 1
	case len(b.pre) == 0:
		return -1
	}
	for i := 0; i < len(a.pre) && i < len(b.pre); i++ {
		x, y := a.pre[i], b.pre[i]
		xn, xerr := strconv.Atoi(x)
		yn, yerr := strconv.Atoi(y)
		switch {
		case xerr == nil && yerr == nil:
			if c := compareInts(xn, yn); c != 0 {
				return c
			}
		case xerr == nil:
			return -1 // 数字标识符低于非数字
		case yerr == nil:
			return 1
		default:
			if x != y {
				if x < y {
					return -1
				}
				return 1
			}
		}
	}
	return compareInts(len(a.pre), len(b.pre))
}

func compareInts(a, b int) int {
	switch {
	case a < b:
		return -1
	case a > b:
		return 1
	}
	return 0
}

// latestRelease 在可见的 release 里挑版本号最大的一个。不能直接取列表第一个：
// GitHub 按发布时间排序，补发的旧版本会排在前面。
func latestRelease(releases []releaseInfo, includePrerelease bool) (releaseInfo, semver, bool) {
	var best releaseInfo
	var bestVersion semver
	found := false
	for _, release := range releases {
		if release.Draft {
			continue
		}
		if release.Prerelease && !includePrerelease {
			continue
		}
		version, ok := parseSemver(release.TagName)
		if !ok {
			continue
		}
		if !found || compareSemver(version, bestVersion) > 0 {
			best, bestVersion, found = release, version, true
		}
	}
	return best, bestVersion, found
}

// classifyAsset 与官网 src/lib/github.ts 的 classifyAsset 保持同一套规则：
// 按扩展名定 kind，按文件名里的平台/架构词定 os/arch。签名文件、校验和、
// 更新元数据一律不算可下载产物。
func classifyAsset(asset releaseAsset) (kind, platform, arch string, ok bool) {
	name := strings.ToLower(asset.Name)
	if strings.HasSuffix(name, ".minisig") ||
		strings.HasSuffix(name, ".sha256") || strings.HasSuffix(name, ".sha512") ||
		strings.HasSuffix(name, ".sig") || strings.HasSuffix(name, ".asc") ||
		strings.HasSuffix(name, ".yml") || strings.HasSuffix(name, ".yaml") ||
		strings.HasSuffix(name, ".json") || strings.HasSuffix(name, ".txt") {
		return "", "", "", false
	}

	switch {
	case strings.HasSuffix(name, ".exe"), strings.HasSuffix(name, ".msi"):
		kind, platform = "installer", "windows"
	case strings.HasSuffix(name, ".dmg"):
		kind, platform = "dmg", "macos"
	case strings.HasSuffix(name, ".deb"):
		kind, platform = "deb", "linux"
	case strings.HasSuffix(name, ".rpm"):
		kind, platform = "rpm", "linux"
	case strings.HasSuffix(name, ".tar.gz"), strings.HasSuffix(name, ".tgz"),
		strings.HasSuffix(name, ".zip"), strings.HasSuffix(name, ".tar.xz"),
		strings.HasSuffix(name, ".appimage"):
		kind = "archive"
	default:
		return "", "", "", false
	}

	if platform == "" {
		switch {
		case strings.Contains(name, "windows") || strings.Contains(name, "win64") ||
			strings.Contains(name, "win32"):
			platform = "windows"
		case strings.Contains(name, "macos") || strings.Contains(name, "darwin"):
			platform = "macos"
		case strings.Contains(name, "linux"):
			platform = "linux"
		default:
			return "", "", "", false
		}
	}
	if platform == "windows" && kind == "archive" {
		kind = "portable"
	}

	if strings.Contains(name, "arm64") || strings.Contains(name, "aarch64") {
		arch = "arm64"
	} else {
		arch = "x64"
	}
	return kind, platform, arch, true
}

// pickAssets 选出目标平台的产物。kind 交给客户端按自己的安装形态挑
// （安装版用 installer，免安装版用 portable…），这里只负责过滤。
func pickAssets(release releaseInfo, platform, arch string) []updateAsset {
	var assets []updateAsset
	for _, asset := range release.Assets {
		kind, assetPlatform, assetArch, ok := classifyAsset(asset)
		if !ok || assetPlatform != platform || assetArch != arch {
			continue
		}
		sha256 := ""
		if strings.HasPrefix(asset.Digest, "sha256:") {
			sha256 = strings.TrimPrefix(asset.Digest, "sha256:")
		}
		signatureURL := ""
		if len(asset.BrowserDownloadURL) > 0 {
			signatureURL = asset.BrowserDownloadURL + ".minisig"
		}
		assets = append(assets, updateAsset{
			Kind:         kind,
			Name:         asset.Name,
			URL:          asset.BrowserDownloadURL,
			Size:         asset.Size,
			SHA256:       sha256,
			SignatureURL: signatureURL,
		})
	}
	return assets
}

// updateHandler 是 GET /v1/update 的实现。参数不合法的请求直接 400：
// 客户端调错了应当立刻报出来，而不是悄悄当成"没更新"。
func updateHandler(github *GithubClient) gin.HandlerFunc {
	return func(c *gin.Context) {
		current, ok := parseSemver(c.Query("version"))
		if !ok {
			c.JSON(http.StatusBadRequest, gin.H{"message": "invalid or missing version"})
			return
		}
		platform := c.Query("os")
		switch platform {
		case "windows", "macos", "linux":
		default:
			c.JSON(http.StatusBadRequest, gin.H{"message": "invalid or missing os"})
			return
		}
		arch := c.Query("arch")
		if arch != "x64" && arch != "arm64" {
			c.JSON(http.StatusBadRequest, gin.H{"message": "invalid or missing arch"})
			return
		}
		includePrerelease := c.Query("channel") == "beta"

		status, body := github.FetchWithTTL("/releases?per_page=30", updateCacheTTL)
		if status != http.StatusOK {
			// GitHub 挂了就如实告诉客户端"检查失败"，客户端下次启动再来；
			// 不要把 3xx 之后再也不会出现的错误当成"已是最新"。
			c.Data(status, "application/json; charset=utf-8", body)
			return
		}

		var releases []releaseInfo
		if err := json.Unmarshal(body, &releases); err != nil {
			c.JSON(http.StatusBadGateway, gin.H{"message": "unexpected releases payload"})
			return
		}

		release, latest, found := latestRelease(releases, includePrerelease)
		if !found {
			c.JSON(http.StatusOK, updateResponse{
				UpdateAvailable: false,
				Current:         c.Query("version"),
			})
			return
		}

		c.JSON(http.StatusOK, updateResponse{
			UpdateAvailable: compareSemver(latest, current) > 0,
			Current:         c.Query("version"),
			Latest:          strings.TrimPrefix(release.TagName, "v"),
			Notes:           release.Body,
			PublishedAt:     release.PublishedAt,
			ReleaseURL:      release.HTMLURL,
			Assets:          pickAssets(release, platform, arch),
		})
	}
}
