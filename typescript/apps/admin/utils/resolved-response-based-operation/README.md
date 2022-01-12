# 背景
- `ResolvedApiResponse<T>`型の値を処理する際に、毎回「`data`プロパティがあるかどうか」「`error`プロパティがあるかどうか」の場合分けの処理をかかなくてはならないため、この処理を隠蔽して再利用可能な形にしたい。

# 目的
- 「`data`プロパティがある時の処理内容」「`error`プロパティがある時の処理内容」「`ResolvedApiResponse<T>`型の値」の3つを渡すと、場合分けとそれに対応した処理の実行を行ってくれる関数の実装を行うことで、この関数を利用する側では最低限の処理を書くだけで済むようにする。


# 利用方法
```typescript
const operation = resolvedResponseBasedOperation</* 扱う`ResolvedApiResponse<T>のTの型` */>(
  (data) => {
    // `data`プロパティがあった場合の処理
    console.log(data)
  },
  (error) => {
    // `error`プロパティがあった場合の処理
    console.log(error)
  })
)

operation(responseValue)
```

# 備考
- 主に`Repository`層での利用を想定しています
