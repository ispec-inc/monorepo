name: go-test

on:
  push:
    branches:
      - master
  pull_request:
    paths:
      - go/**
      - .github/workflows/go-test.yml

jobs:
  test:
    name: runner / gotest
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v2

      - name: initialize
        run: |
          cp go/.env/server.default go/.env/server
          cp go/tools/gen/.env.default go/tools/gen/.env
          make ci-test

      - name: upload coverage to codecov
        uses: codecov/codecov-action@v1
        with:
          token: ${{ secrets.GO_DISTRIBUTED_MONOLITH_CODECOV_TOKEN }}
          name: coverage
          flags: unittests
          fail_ci_if_error: true
          directory: go
