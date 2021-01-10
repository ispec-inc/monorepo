FROM golang:1.14

CMD ["go", "run", "./cmd/db/init"]
