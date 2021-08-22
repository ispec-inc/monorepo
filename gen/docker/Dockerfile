FROM golang:1.17

RUN apt-get update \
    && apt-get -y -q --no-install-recommends install clang-format \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && go install github.com/smallnest/gen@v0.9.27 \
    && go install golang.org/x/tools/cmd/goimports@latest
