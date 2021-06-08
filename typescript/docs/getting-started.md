## Getting Started

This repository uses the `yarn workspace` to manage multiple applications and libraries.

## Usage
```
$ yarn workspace @monorepo/admin install
$ yarn workspace @monorepo/admin run dev
```

## Add package

1. Add the code to `lib/`.
2. Run `yarn init` and create `package.json` and `tsconfig.json`
- Please write with reference to other libs.

3. Run `add` command
```
$ yarn workspace @monorepo/admin add ./libs/path/to/package
```
