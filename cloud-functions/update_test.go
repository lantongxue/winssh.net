package main

import (
	"bytes"
	"encoding/json"
	"testing"
)

func TestParseSemver(t *testing.T) {
	cases := []struct {
		raw string
		ok  bool
		pre int
		maj int
		min int
		pat int
	}{
		{"0.0.6", true, 0, 0, 0, 6},
		{"v0.1.0-beta.1", true, 2, 0, 1, 0},
		{"1.2.3+build.5", true, 0, 1, 2, 3},
		{"0.1.0-dev.abc1234", true, 2, 0, 1, 0},
		{"0.1", false, 0, 0, 0, 0},
		{"abc", false, 0, 0, 0, 0},
		{"0.0.-1", false, 0, 0, 0, 0},
	}
	for _, c := range cases {
		v, ok := parseSemver(c.raw)
		if ok != c.ok {
			t.Fatalf("parseSemver(%q) ok=%v, want %v", c.raw, ok, c.ok)
		}
		if !ok {
			continue
		}
		if v.major != c.maj || v.minor != c.min || v.patch != c.pat || len(v.pre) != c.pre {
			t.Fatalf("parseSemver(%q) = %+v", c.raw, v)
		}
	}
}

// 线上踩过的坑：直接用字符串比较会把 0.0.10 判成小于 0.0.9，
// 也会把 0.1.0-beta 判成大于 0.1.0。这条测试守的就是这个。
func TestCompareSemver(t *testing.T) {
	cases := []struct {
		a, b string
		want int
	}{
		{"0.0.6", "0.0.5", 1},
		{"0.0.5", "0.0.5", 0},
		{"0.0.10", "0.0.9", 1},
		{"1.0.0", "0.9.9", 1},
		{"0.1.0-beta.1", "0.1.0", -1},
		{"0.1.0", "0.1.0-beta.1", 1},
		{"0.1.0-beta.2", "0.1.0-beta.1", 1},
		{"0.1.0-beta", "0.1.0-beta.1", -1},
		{"0.1.0-alpha", "0.1.0-beta", -1},
		{"0.1.0-beta.10", "0.1.0-beta.9", 1},
		{"0.1.0-rc.1", "0.1.0-beta.9", 1},
	}
	for _, c := range cases {
		a, _ := parseSemver(c.a)
		b, _ := parseSemver(c.b)
		if got := compareSemver(a, b); got != c.want {
			t.Errorf("compareSemver(%q, %q) = %d, want %d", c.a, c.b, got, c.want)
		}
	}
}

func TestLatestReleasePicksHighestAndSkipsPrerelease(t *testing.T) {
	releases := []releaseInfo{
		{TagName: "v0.0.6", PublishedAt: "2026-10-19"},
		{TagName: "v0.0.10", PublishedAt: "2026-10-20"},
		{TagName: "v0.1.0-beta.1", Prerelease: true, PublishedAt: "2026-10-21"},
		{TagName: "v9.9.9", Draft: true, PublishedAt: "2026-10-22"},
	}
	got, _, ok := latestRelease(releases, false)
	if !ok || got.TagName != "v0.0.10" {
		t.Fatalf("stable latest = %q", got.TagName)
	}
	got, _, ok = latestRelease(releases, true)
	if !ok || got.TagName != "v0.1.0-beta.1" {
		t.Fatalf("beta latest = %q", got.TagName)
	}
}

// 产物命名与官网 src/lib/github.ts 的 classifyAsset 保持一致。Windows 的
// tar.gz 是免安装版，不算普通 archive；签名与校验和文件不参与筛选。
func TestClassifyAsset(t *testing.T) {
	cases := []struct {
		name string
		kind string
		os   string
		arch string
		ok   bool
	}{
		{"winssh-pro-x64-0.0.6-setup.exe", "installer", "windows", "x64", true},
		{"winssh-pro-arm64-0.0.6-setup.exe", "installer", "windows", "arm64", true},
		{"winssh-pro-windows-x64.tar.gz", "portable", "windows", "x64", true},
		{"winssh-pro-0.0.6-macos-arm64.dmg", "dmg", "macos", "arm64", true},
		{"winssh-pro-linux-x64.deb", "deb", "linux", "x64", true},
		{"winssh-pro-linux-arm64.rpm", "rpm", "linux", "arm64", true},
		{"winssh-pro-macos-arm64.tar.gz", "archive", "macos", "arm64", true},
		{"winssh-pro-x64-0.0.6-setup.exe.minisig", "", "", "", false},
		{"SHA256SUMS.txt", "", "", "", false},
		{"notes.json", "", "", "", false},
	}
	for _, c := range cases {
		kind, platform, arch, ok := classifyAsset(releaseAsset{Name: c.name})
		if ok != c.ok || kind != c.kind || platform != c.os || arch != c.arch {
			t.Errorf("classifyAsset(%q) = (%q,%q,%q,%v), want (%q,%q,%q,%v)",
				c.name, kind, platform, arch, ok, c.kind, c.os, c.arch, c.ok)
		}
	}
}

func TestPickAssetsFiltersByPlatformAndArch(t *testing.T) {
	release := releaseInfo{TagName: "v0.0.6", Assets: []releaseAsset{
		{Name: "winssh-pro-x64-0.0.6-setup.exe", Size: 1, Digest: "sha256:abc"},
		{Name: "winssh-pro-arm64-0.0.6-setup.exe", Size: 2},
		{Name: "winssh-pro-windows-x64.tar.gz", Size: 3},
		{Name: "winssh-pro-linux-x64.deb", Size: 4},
	}}
	assets := pickAssets(release, "windows", "x64")
	if len(assets) != 2 {
		t.Fatalf("got %d assets: %+v", len(assets), assets)
	}
	// 下载地址必须是镜像加速站地址，不能是 GitHub 直链；
	// 客户端拿到什么就下什么，不做拼接。
	if assets[0].Kind != "installer" || assets[0].SHA256 != "abc" ||
		assets[0].URL != "https://gh-proxy.com/https://github.com/lantongxue/winssh-pro/releases/download/v0.0.6/winssh-pro-x64-0.0.6-setup.exe" ||
		assets[0].SignatureURL != "https://gh-proxy.com/https://github.com/lantongxue/winssh-pro/releases/download/v0.0.6/winssh-pro-x64-0.0.6-setup.exe.minisig" {
		t.Fatalf("installer asset = %+v", assets[0])
	}
	if assets[1].Kind != "portable" {
		t.Fatalf("portable asset = %+v", assets[1])
	}
}

// 加速站地址来自 GITHUB_MIRROR：换加速站或自建同用法服务时只改环境变量。
func TestDownloadURLUsesMirrorFromEnv(t *testing.T) {
	t.Setenv("GITHUB_MIRROR", "https://mirror.example.com/")
	got := downloadURL("v0.0.6", "winssh-pro-x64-0.0.6-setup.exe")
	want := "https://mirror.example.com/https://github.com/lantongxue/winssh-pro/releases/download/v0.0.6/winssh-pro-x64-0.0.6-setup.exe"
	if got != want {
		t.Fatalf("downloadURL = %q, want %q", got, want)
	}
}

// 官网的下载链接取自 release 数据的 browser_download_url，云函数统一把它
// 改写成加速地址；其它字段（尤其是大整数 id）必须原样保留。
func TestAccelerateReleasePayload(t *testing.T) {
	t.Setenv("GITHUB_MIRROR", "https://mirror.example.com")
	body := []byte(`[
		{"tag_name":"v0.0.6","id":123456789012345678,"assets":[
			{"name":"a.exe","browser_download_url":"https://github.com/lantongxue/winssh-pro/releases/download/v0.0.6/a.exe"},
			{"name":"SHA256SUMS.txt"}
		]}
	]`)
	rewritten := accelerateReleasePayload(body)

	decoder := json.NewDecoder(bytes.NewReader(rewritten))
	decoder.UseNumber()
	var releases []map[string]any
	if err := decoder.Decode(&releases); err != nil {
		t.Fatalf("decode rewritten payload: %v", err)
	}
	if id, ok := releases[0]["id"].(json.Number); !ok || id.String() != "123456789012345678" {
		t.Fatalf("id was not preserved: %v", releases[0]["id"])
	}
	assets := releases[0]["assets"].([]any)
	first := assets[0].(map[string]any)
	want := "https://mirror.example.com/https://github.com/lantongxue/winssh-pro/releases/download/v0.0.6/a.exe"
	if first["browser_download_url"] != want {
		t.Fatalf("browser_download_url = %v, want %q", first["browser_download_url"], want)
	}
	if _, ok := assets[1].(map[string]any)["browser_download_url"]; ok {
		t.Fatalf("asset without browser_download_url gained one: %v", assets[1])
	}

	// /releases/latest 返回单个对象，也要改写。
	single := accelerateReleasePayload([]byte(`{"assets":[{"browser_download_url":"https://github.com/x/y/README.md"}]}`))
	if !bytes.Contains(single, []byte(`"https://mirror.example.com/https://github.com/x/y/README.md"`)) {
		t.Fatalf("single release was not rewritten: %s", single)
	}
}
