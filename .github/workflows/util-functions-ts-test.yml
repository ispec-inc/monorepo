name: util-functions-ts-test

on:
  push:
    branches:
      - master
  pull_request:
    paths:
      - typescript/libs/util-functions/**
      - .github/workflows/util-functions-ts-test.yml

jobs:
  test:
    name: runner / tstest
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v2

      - name: setup node version
        uses: actions/setup-node@v1
        with:
          node-version: '14.17.4'

      - name: initialize
        run: |
          yarn workspace @monorepo/util-functions install
          yarn workspace @monorepo/util-functions update
        working-directory: typescript

      - name: run test
        run: yarn workspace @monorepo/util-functions test
        working-directory: typescript