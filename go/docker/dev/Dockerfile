FROM golang:1.16

ENV GOPATH /go
ENV GO111MODULE=on

WORKDIR /go/src/app
COPY go.mod go.sum ./

RUN go mod download \
    && go get -u github.com/cosmtrek/air@v1.27.3 \
    && go install github.com/go-delve/delve/cmd/dlv@latest
