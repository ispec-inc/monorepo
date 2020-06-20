FROM golang:alpine as builder
RUN mkdir /build
ADD . /build/
WORKDIR /build
RUN CGO_ENABLED=0 GO111MODULE=on go build -o server cmd/api/server/main.go cmd/api/server/router.go cmd/api/server/middleware.go

FROM alpine
RUN adduser -S -D -H -h /app appuser
RUN apk --no-cache add tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apk del tzdata
COPY --from=builder /build/server /app/
WORKDIR /app

EXPOSE 9000

CMD ["./server"]