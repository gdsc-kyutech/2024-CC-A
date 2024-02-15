package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gdsc-kyutech/2024-CC-A/back/api"
	"github.com/gdsc-kyutech/2024-CC-A/back/gcloud"
)

const PROMPT = "./resource/prompt.md"

var prompt string

type MyServer struct{}

func (s *MyServer) PingGet(ctx context.Context) (*api.PingGetOK, error) {
	log.Print("/ping")
	res := api.PingGetOK{}
	str := api.NewOptString("pong")
	res.SetContent(str)
	log.Print(str)
	return &res, nil
}

func (s *MyServer) AnalyzeImagePost(ctx context.Context, req api.OptAnalyzeImagePostReq) (*api.AnalyzeImagePostOK, error) {
	log.Print("/analyze_image")
	res := api.AnalyzeImagePostOK{}
	str := api.NewOptString("pong")
	visionRes, err := gcloud.AskVision(ctx, req.Value.Image.Value)
	if err != nil {
		return nil, err
	}
	geminiRes, err := gcloud.AskGemini(ctx, prompt+strings.Split(visionRes, "\n")[0])
	if err != nil {
		return nil, err
	}
	optStr := api.NewOptString("これは「" + strings.Split(visionRes, "\n")[0] + "」ですね。\n \n " + geminiRes)
	res.SetContent(optStr)
	log.Print(str)
	return &res, nil
}

func (s *MyServer) NewError(ctx context.Context, err error) *api.ErrRespStatusCode {
	res := api.ErrRespStatusCode{}
	str := api.NewOptString("err")
	res.SetStatusCode(500)
	res.SetResponse(api.ErrResp{Error: str})
	return &res
}

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*")                                // Allow all origins, adjust as necessary
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE") // Allowed methods
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		// Check if the request is for CORS OPTIONS (pre-flight)
		if r.Method == "OPTIONS" {
			// Just add headers and send response
			w.WriteHeader(http.StatusOK)
			return
		}

		// Serve the next handler
		next.ServeHTTP(w, r)
	})
}

func main() {
	h := &MyServer{}
	srv, err := api.NewServer(h)
	if err != nil {
		log.Fatal(err)
	}

	// Wrap the server with the CORS middleware
	corsHandler := enableCORS(srv)

	// ファイルを読み込む
	bytes, err := os.ReadFile(PROMPT)
	if err != nil {
		log.Fatal(err)
	}
	prompt = string(bytes)

	if err := http.ListenAndServe("172.20.10.2:8080", corsHandler); err != nil {
		log.Fatal(err)
	}
}
