name: ts-test

on:
  push:
    branches:
      - master
  pull_request:
    paths:
      - typescript/apps/admin/**
      - .github/workflows/ts-test.yml

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
        run: yarn workspace @monorepo/admin install
        working-directory: typescript

      - name: run test
        run: yarn workspace @monorepo/admin test
        working-directory: typescript