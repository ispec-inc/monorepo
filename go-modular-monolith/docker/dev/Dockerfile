FROM golang:1.18

ENV GOPATH /go
ENV GO111MODULE=on

WORKDIR /go/src/app
COPY go.mod go.sum ./

RUN go mod download \
    && go install github.com/cosmtrek/air@latest \
    && go install github.com/go-delve/delve/cmd/dlv@latest
