// Code generated by ogen, DO NOT EDIT.

package api

import (
	"context"
)

// Handler handles operations described by OpenAPI v3 specification.
type Handler interface {
	// AnalyzeImagePost implements POST /analyze_image operation.
	//
	// POST /analyze_image
	AnalyzeImagePost(ctx context.Context, req OptAnalyzeImagePostReq) (*AnalyzeImagePostOK, error)
	// PingGet implements GET /ping operation.
	//
	// GET /ping
	PingGet(ctx context.Context) (*PingGetOK, error)
	// NewError creates *ErrRespStatusCode from error returned by handler.
	//
	// Used for common default response.
	NewError(ctx context.Context, err error) *ErrRespStatusCode
}

// Server implements http server based on OpenAPI v3 specification and
// calls Handler to handle requests.
type Server struct {
	h Handler
	baseServer
}

// NewServer creates new Server.
func NewServer(h Handler, opts ...ServerOption) (*Server, error) {
	s, err := newServerConfig(opts...).baseServer()
	if err != nil {
		return nil, err
	}
	return &Server{
		h:          h,
		baseServer: s,
	}, nil
}