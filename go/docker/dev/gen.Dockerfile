FROM golang:1.16

RUN go install github.com/smallnest/gen@v0.9.27 && \
    go install golang.org/x/tools/cmd/goimports@latest
