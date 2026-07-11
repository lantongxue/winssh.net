// ./cloud-functions/api.go
package main

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"resty.dev/v3"
)

var (
	GITHUB_API_TOKEN string = os.Getenv("GITHUB_API_TOKEN")
	GITHUB_OWNER     string = "lantongxue"
	GITHUB_REPO      string = "winssh"
)

type SimpleCache struct {
	data map[string]*SimpleCacheData
}

type SimpleCacheData struct {
	buff []byte
	ttl  int
}

func NewCache() *SimpleCache {
	return &SimpleCache{
		data: make(map[string]*SimpleCacheData),
	}
}

func (ctx *SimpleCache) SetString(key, value string, ttl int) {
	ctx.data[key] = &SimpleCacheData{
		buff: []byte(value),
		ttl:  time.Now().Second() + ttl,
	}
}

func (ctx *SimpleCache) GetString(key string) string {
	data := ctx.get(key)
	if data == nil {
		return ""
	}
	return string(data.buff)
}

func (ctx *SimpleCache) get(key string) *SimpleCacheData {
	val, ok := ctx.data[key]
	if ok {
		if val.ttl > time.Now().Second() {
			return val
		}
		delete(ctx.data, key)
		return nil
	}
	return nil
}

type GithubClient struct {
	request    *resty.Request
	baseUrl    string
	apiKey     string
	owner      string
	repo       string
	apiVersion string
	endPoint   string
	cache      *SimpleCache
}

func NewGtihubClient(apiKey, owner, repo string) *GithubClient {
	return &GithubClient{
		apiKey:     apiKey,
		owner:      owner,
		repo:       repo,
		apiVersion: "2026-03-10",
		endPoint:   "https://api.github.com",
		cache:      NewCache(),
	}
}

func (ctx *GithubClient) httpClient() *resty.Request {
	client := resty.New()
	return client.R().SetHeader("X-GitHub-Api-Version", ctx.apiVersion).SetAuthToken(ctx.apiKey).SetTrace(true)
}

func (ctx *GithubClient) api(path string) string {
	return fmt.Sprintf("%s/repos/%s/%s%s", ctx.endPoint, ctx.owner, ctx.repo, path)
}

func (ctx *GithubClient) Releases() string {
	api := "/releases"
	s := ctx.cache.GetString(api)
	if s == "" {
		res, _ := ctx.httpClient().Get(ctx.api(api))
		s = res.String()
		ctx.cache.SetString(api, s, int(time.Hour)*12)
	}
	return s
}

func (ctx *GithubClient) Latest() string {
	api := "/releases/latest"
	s := ctx.cache.GetString(api)
	if s == "" {
		res, _ := ctx.httpClient().Get(ctx.api(api))
		s = res.String()
		ctx.cache.SetString(api, s, int(time.Hour)*12)
	}
	return s
}

func (ctx *GithubClient) Repo() string {
	api := "repo"
	s := ctx.cache.GetString("repo")
	if s == "" {
		res, _ := ctx.httpClient().Get(ctx.api(""))
		s = res.String()
		ctx.cache.SetString(api, s, int(time.Hour)*12)
	}
	return s
}

func main() {
	r := gin.Default()

	github := NewGtihubClient(GITHUB_API_TOKEN, GITHUB_OWNER, GITHUB_REPO)

	// REST API v1 group
	v1 := r.Group("/v1")
	{
		v1.GET("/releases", func(c *gin.Context) {
			c.Writer.Header().Set("content-type", "application/json; charset=utf-8")
			c.String(http.StatusOK, github.Releases())
		})

		v1.GET("/releases/latest", func(c *gin.Context) {
			c.Writer.Header().Set("content-type", "application/json; charset=utf-8")
			c.String(http.StatusOK, github.Latest())
		})

		v1.GET("/repo", func(c *gin.Context) {
			c.Writer.Header().Set("content-type", "application/json; charset=utf-8")
			c.String(http.StatusOK, github.Repo())
		})
	}

	r.Run(":9000")
}
