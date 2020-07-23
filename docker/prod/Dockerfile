FROM golang:1.14 as builder
RUN mkdir /build
COPY . /build/
WORKDIR /build
RUN CGO_ENABLED=0 GO111MODULE=on go build -o server cmd/api/server/main.go cmd/api/server/router.go cmd/api/server/middleware.go

FROM scratch
COPY --from=builder /build/server /go/bin/server
WORKDIR /app
EXPOSE 9000
CMD ["/go/bin/server"]
