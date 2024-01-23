package main

import (
	"context"
	"log"
	"net/http"

	"github.com/gdsc-kyutech/2024-CC-A/back/api"
)

type MyServer struct{}

func (s *MyServer) PingGet(ctx context.Context) (*api.PingGetOK, error) {
	res := api.PingGetOK{}
	str := api.NewOptString("pong")
	res.SetContent(str)
	return &res, nil
}

func (s *MyServer) AnalyzeImagePost(ctx context.Context, req api.OptAnalyzeImagePostReq) (*api.AnalyzeImagePostOK, error) {
	res := api.AnalyzeImagePostOK{}
	str := api.NewOptString("pong")
	res.SetContent(str)
	return &res, nil
}

func (s *MyServer) NewError(ctx context.Context, err error) *api.ErrRespStatusCode {
	res := api.ErrRespStatusCode{}
	str := api.NewOptString("err")
	res.SetStatusCode(500)
	res.SetResponse(api.ErrResp{Error: str})
	return &res
}

func main() {
	h := &MyServer{}
	srv, err := api.NewServer(h)
	if err != nil {
		log.Fatal(err)
	}
	if err := http.ListenAndServe(":8080", srv); err != nil {
		log.Fatal(err)
	}
}
