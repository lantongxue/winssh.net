// ./cloud-functions/api.go
package main

import (
	"fmt"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"resty.dev/v3"
)

var (
	GITHUB_API_TOKEN string = os.Getenv("GITHUB_API_TOKEN")
	GITHUB_OWNER     string = "lantongxue"
	GITHUB_REPO      string = "winssh-pro"
)

// 成功的 GitHub 响应缓存这么久；发布新版本后，官网最迟在这段时间后看到
const cacheTTL = 1 * time.Hour

type SimpleCacheData struct {
	buff      []byte
	expiresAt time.Time
}

// SimpleCache 会被 gin 的多个请求 goroutine 同时读写，所以要加锁
type SimpleCache struct {
	mu   sync.RWMutex
	data map[string]SimpleCacheData
}

func NewCache() *SimpleCache {
	return &SimpleCache{
		data: make(map[string]SimpleCacheData),
	}
}

func (ctx *SimpleCache) Set(key string, buff []byte, ttl time.Duration) {
	ctx.mu.Lock()
	defer ctx.mu.Unlock()
	ctx.data[key] = SimpleCacheData{
		buff:      buff,
		expiresAt: time.Now().Add(ttl),
	}
}

// Get 返回缓存内容，fresh 表示是否仍在有效期内。过期的内容不删除，
// GitHub 请求失败时还能拿它兜底。
func (ctx *SimpleCache) Get(key string) (buff []byte, fresh bool, ok bool) {
	ctx.mu.RLock()
	defer ctx.mu.RUnlock()
	val, ok := ctx.data[key]
	if !ok {
		return nil, false, false
	}
	return val.buff, time.Now().Before(val.expiresAt), true
}

type GithubClient struct {
	client *resty.Client
	owner  string
	repo   string
	cache  *SimpleCache
}

func NewGithubClient(apiKey, owner, repo string) *GithubClient {
	// 整个进程共用一个 client，复用连接
	client := resty.New().
		SetBaseURL("https://api.github.com").
		SetHeader("X-GitHub-Api-Version", "2026-03-10").
		SetTimeout(10 * time.Second)
	if apiKey != "" {
		client.SetAuthToken(apiKey)
	}
	return &GithubClient{
		client: client,
		owner:  owner,
		repo:   repo,
		cache:  NewCache(),
	}
}

func (ctx *GithubClient) api(path string) string {
	return fmt.Sprintf("/repos/%s/%s%s", ctx.owner, ctx.repo, path)
}

// Fetch 返回仓库接口 path 的状态码和响应体，只缓存成功的响应。
// GitHub 出错（限流、5xx、超时）时有旧数据就返回旧数据；没有旧数据就把错误原样透传，
// 不把错误页当 200 缓存下来。
func (ctx *GithubClient) Fetch(path string) (int, []byte) {
	return ctx.FetchWithTTL(path, cacheTTL)
}

// FetchWithTTL 与 Fetch 相同，但允许调用方自定缓存时长。更新检查
// （update.go）要短得多的 TTL：发版后用户最多等这么久就能看到新版本，
// 撤回有问题的版本也只需要等这么久。
func (ctx *GithubClient) FetchWithTTL(path string, ttl time.Duration) (int, []byte) {
	cached, fresh, ok := ctx.cache.Get(path)
	if fresh {
		return http.StatusOK, cached
	}

	res, err := ctx.client.R().Get(ctx.api(path))
	if err == nil && res.IsStatusSuccess() {
		body := res.Bytes()
		ctx.cache.Set(path, body, ttl)
		return http.StatusOK, body
	}
	if ok {
		return http.StatusOK, cached
	}
	if err != nil {
		return http.StatusBadGateway, []byte(`{"message":"failed to reach GitHub"}`)
	}
	return res.StatusCode(), res.Bytes()
}

func main() {
	r := gin.Default()

	github := NewGithubClient(GITHUB_API_TOKEN, GITHUB_OWNER, GITHUB_REPO)

	proxy := func(path string) gin.HandlerFunc {
		return func(c *gin.Context) {
			status, body := github.Fetch(path)
			c.Data(status, "application/json; charset=utf-8", body)
		}
	}

	// REST API v1 group
	v1 := r.Group("/v1")
	{
		v1.GET("/releases", proxy("/releases"))
		v1.GET("/releases/latest", proxy("/releases/latest"))
		v1.GET("/repo", proxy(""))
		// 客户端自动更新检查与下载转发，实现见 update.go。
		v1.GET("/update", updateHandler(github))
		v1.GET("/update/download", updateDownloadHandler(github))
	}

	r.Run(":9000")
}
