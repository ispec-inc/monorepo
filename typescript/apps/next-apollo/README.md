# Next-apollo App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
cd ../../

yarn workspace @monorepo/next-apollo dev
```

Open <http://localhost:3000> with your browser to see the result.

## Stylyng

Reference to [unocss](https://github.com/unocss/unocss) [tailwind.css](https://tailwindcss.com/docs/installation)

# **Data Flow Architectue**

# Domain

## 背景

アプリケーションは、とあるドメイン(領域)の問題を解決するために開発するものである。

ドメインに関わる振る舞いは絶えず変化するものであるため、開発上においてはそれを集約し、ドメインを再現する必要がある。

その振る舞いはバックエンド側で定義されるものであり、フロントエンドおよびそのフレームワークはそのドメインに対する単なるユーザインターフェースとして機能させるのが理想である。

## 課題と目的

ドメインに関する実装に対してもバックエンドで扱いきれないものが出てくる。

それをフロントで扱う必要があるが、上記背景の通り、フロント側でもドメインに関する知識は適切に扱う必要がある。

## 実装

ドメインに関する知識は `domain/` 配下に集約して配置する。

可能な限りバックエンドで定義するべきものであるため、取り扱う必要が出てきた場合はバックエンド側にその実装を依頼する。

そのためフロントはこの層がスリムであることが理想である。

### value object

アプリケーションで扱う固有の値を定義する(email, phone-numberなど)。

定義の基準としては、そこにルールが存在する値について定義する。

不変な値であるため、setterを持たない

### entity

アプリケーションで扱うドメインのモデルを定義する。

`value object` とは違い、ライフサイクルの存在するモデルを定義する(userなど)。

`entity` の振る舞い(値の変化のルール)を定義し、想定しないドメインの振る舞いを制限する。

### domain service

`entity` で定義するには不自然なドメインの振る舞いをこの層で定義する。

## Domain の利用

フロントエンドにおいては、ドメインに関するルールはUIの詳細なロジックであったり、値の変換、アプリケーションのユースケースなどさまざまな場所で利用される事になる。

よって、適宜各層より呼び出し、依存することができる。

また、バリデーションなどのドメイン知識ををUIのライブラリに沿って利用したい場合など、 `/util` などで定義したツールを利用して、適宜アクセスしやすくする。

### 参照

[DDDまとめ](https://www.notion.so/ispec/92549f51cc6b4da0b573474a8eb8061c)

# Hooks

`React` における `Custom Hook` を定義する。

また、アプリケーションサービス、およびそのユースケースを `Custom Hook` として定義する。

## 背景

アプリケーションではドメインの問題を解決するための活動を保有する。

それを我々はユースケースとして定義している。

## 課題と目的

アプリケーションロジックはフロントエンドフレームワーク上で各所に散らばりがちなものであり、変更されることも往々にしてある。

また、フレームワーク側に存在するUIに関するロジックにまぎれ、管理が煩雑になるものである。

よってそのアプリケーションロジックをサービス層として取りまとめ、 `React Custom Hooks` として表現することとしたい。

## 実装

ユースケースを `Custom Hook` として表現する。

ユースケースの例としては下記が挙げられる。

*   情報の表示
*   情報の作成、更新、アップデート
*   UI へのインタラクト

また、いくつか制約を持つ

*   状態は持たない(Apolloが持つ)
*   状態によって振る舞いは影響を受けない(状態に関係ない粒度でユースケースを分割する)

### 実装における課題

アプリケーションロジックはしばし煩雑なロジックを内包することが多い。

ユースケースの変更に柔軟に対応するためには、このhooksに存在するロジックはリーダブルに保つ必要がある。

そのために、後述の `Model` などの利用により、詳細なロジックはそれにカプセル化し、抽象的に扱うことでアプリケーションロジックをクリアに保つことを心がける。

## 代表的な Hooks

### Page hook

必要な情報を`Apollo`を操作して受け取り、UIへ渡す役割を持つ。

値の変換ロジックや、複雑な問い合わせが存在する場合は後述の `Query Model` を利用する。(原則的に利用する)

その他、error や loading状態 の受け渡しも行う。

周辺ファイルは `yarn hygen query new` で作成可能。

### Mutate hook

情報の作成、更新、アップデートの操作を `Apollo` を操作してバックエンドに伝える役割を持つ。

値の変換ロジックの記載を減らしたり、関数のシグネチャの変更を一部にとどめるために、 `Mutate Model` をinterfaceとして持つ

その他、error や loading状態 の受け渡しも行う。

周辺ファイルは `yarn hygen mutate new` で作成可能。

# Models

## 背景

アプリケーション上にはしばしば煩雑で複雑なロジックが存在することがある。

それらは可能な限り共通化し、一箇所にまとめておきたい。

## 課題と目的

それらのロジックを `Model` として取りまとめ、詳細な情報としてカプセル化することでより抽象的な取り扱いが可能になる結果、より変更に強いアプリケーションとなる。

例として挙げられるのが、特定のフレームワークへの依存度が高いロジックである。(apolloへの依存など)

それらへの依存を一手に引き受けることによっても、改修箇所がより明確で、影響範囲の限定された、変更に強いアプリケーションとすることができる。

## Apollo へ依存する Model

これらにより、UIの `Apollo` への結合を疎にすることができる。

それぞれ `/models/query` `/models/mutate` に定義する。

また、UIなどで詳細なロジックをカプセル化するために、適宜 `/models` にその他モデルを定義する。

### Query

UIが必要なデータを問い合わせるためのモデル。

`Apollo` に依存し、UIに必要な値を計算するためのロジックを集約し、UIへと渡される。

UI側で必要なデータは `/pages` 配下の `Container Component` によって同階層に interface として定義され、`Query Model` はそれを実装する。

*   interfaceに依存することで、UI側からは抽象概念に依存することができ、データのモッキングなどが容易になる。

### Mutate

`Apollo` に対して mutate をかける際に、そのロジックを集約させるるためのモデル。

UI側から instance化することによって、constructor のシグネチャ変更を `hooks` で行う必要性をなくす。

## 保守性について

複雑なロジックを model という形で集約することで、 testing が容易になる。

テストの価値が高まるロジックは、より複雑なロジックかと思われるが、それをこの model に定義し、 mock のデータを使って利用することでテストし、より信頼性の高いコードとすることができる。

適宜 graphql の mock データの generator などを利用してテストを行う。

# English ver

# Domain

## Background

Applications are developed to solve problems in a domain.

Since the behavior related to the domain is constantly changing, it is necessary to aggregate it and reproduce the domain in development.

Ideally, the behavior is defined on the back-end side, and the front-end and its framework should function as a simple user interface to the domain.

## Issues and Objectives

There are some things that cannot be handled by the backend even for implementations related to the domain.

These need to be handled by the front end, but as mentioned in the background above, knowledge about the domain needs to be handled appropriately on the front side as well.

## Implementation

Knowledge about the domain should be consolidated and placed under `domain/`.

If it is necessary to handle it, the backend side should be asked to implement it, since it should be defined in the backend as much as possible.

Therefore, it is ideal for the front-end to have a slim layer.

### value object

Defines a unique value to be handled by the application (email, phone-number, etc.).

The definition should be based on values for which rules exist.

Since it is an immutable value, it does not have a setter.

### entity

Defines the model of the domain to be handled by the application.

Unlike `value object`, it defines a model with a life cycle (e.g. user).

Define the behavior of the `entity` (rules for value changes) and restrict the behavior of unexpected domains.

### domain service

This layer defines the behavior of the domain that is not natural to define in `entity`.

## Using Domain

In the front end, domain rules are used in various places such as detailed UI logic, value conversion, and application use cases.

Therefore, they can be called from each layer as needed.

Also, if you want to use domain knowledge such as validation along with UI libraries, you can use tools defined in `/util` and so on for easy access as needed.

### See also.

[DDD Summary](https://www.notion.so/ispec/92549f51cc6b4da0b573474a8eb8061c)

# Hooks

Define `Custom Hooks` in `React`.

Also define application services and their use cases as `Custom Hooks`.

## Background

Applications have activities to solve domain problems.

We define them as use cases.

## Problem and Objective

Application logic tends to be scattered all over the front-end framework and is often subject to change.

In addition, the management of the application logic is complicated by the UI logic that exists on the framework side.

Therefore, the application logic should be organized as a service layer and expressed as `React Custom Hooks`.

## Implementation

Use cases are represented as `Custom Hooks`.

Examples of use cases are as follows.

*   Displaying information
*   Creating, updating, and updating information
*   Interacting with the UI

It also has some constraints

*   Does not have state (Apollo does)
*   Behavior is not affected by state (use cases are partitioned at state-independent granularity)

### Challenges in Implementation

Application logic often contains complicated logic.

In order to respond flexibly to changes in use cases, the logic in these hooks must remain readable.

For this purpose, try to keep the application logic clear by encapsulating the detailed logic in the hooks and treating them abstractly by using `Model` and so on, as described below.

## Typical Hooks

### Page hook

This function receives necessary information by manipulating `Apollo` and passes it to the UI.

If there are complex queries or value conversion logic, use `Query Model` described below. (In principle, this model is used.)

In addition, error and loading status are also passed.

You can create a peripheral file by `yarn hygen query new`.

### Mutate hook

This function is responsible for conveying the operations of creating, updating, and updating information to the backend by manipulating `Apollo`.

It has `Mutate Model` as an interface to reduce the description of value conversion logic and to keep some of the function signatures unchanged.

In addition, error and loading status are passed.

The surrounding files can be created with `yarn hygen mutate new`.

## Models

## Background

Applications often have complicated and complex logic.

We would like to make them common as much as possible and put them all in one place.

## Challenges and Objectives

The logic should be organized as a `Model` and encapsulated as detailed information so that it can be handled in a more abstract manner, resulting in a more change-resistant application.

An example of this is logic that is highly dependent on a specific framework (e.g., dependence on apollo). (e.g., dependency on apollo).

By taking on these dependencies, it is possible to make the application more resistant to change, with clear modification points and a limited scope of influence.

## Models that depend on Apollo

These make it possible to loosely bind UI to `Apollo`.

Define them in `/models/query` `/models/mutate` respectively.

In order to encapsulate detailed logic in UI and so on, define other models in `/models` as needed.

### Query

Models for querying necessary data by UI.

It depends on `Apollo` and aggregates logic to calculate values necessary for UI, and is passed to UI.

The data required by the UI is defined by `Container Component` under `/pages` as an interface in the same hierarchy, and `Query Model` implements it.

*   By relying on the interface, the UI side can rely on abstract concepts, which facilitates data mocking and so on.

### Mutate

This model is used to aggregate the logic when mutating against `Apollo`.

By instantiating from the UI side, there is no need to use `hooks` to change the constructor's signature.

## Maintainability

Aggregating complex logic in the form of models facilitates testing.

Logic that is more valuable for testing is likely to be more complex logic, which can be defined in this model and used with mock data to test and make the code more reliable.

Use graphql's mock data generator, etc. as appropriate for testing.
