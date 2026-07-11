// ./cloud-functions/api.go
package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"resty.dev/v3"
)

var (
	GITHUB_API_TOKEN string = os.Getenv("GITHUB_API_TOKEN")
	GITHUB_OWNER     string = "lantongxue"
	GITHUB_REPO      string = "winssh"
)

type GithubClient struct {
	request    *resty.Request
	baseUrl    string
	apiKey     string
	owner      string
	repo       string
	apiVersion string
	endPoint   string
}

func NewGtihubClient(apiKey, owner, repo string) *GithubClient {
	return &GithubClient{
		apiKey:     apiKey,
		owner:      owner,
		repo:       repo,
		apiVersion: "2026-03-10",
		endPoint:   "https://api.github.com",
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
	res, _ := ctx.httpClient().Get(ctx.api("/releases"))
	return res.String()
}

func (ctx *GithubClient) Latest() string {
	res, _ := ctx.httpClient().Get(ctx.api("/releases/latest"))
	return res.String()
}

func (ctx *GithubClient) Repo() string {
	res, _ := ctx.httpClient().Get(ctx.api(""))
	return res.String()
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
