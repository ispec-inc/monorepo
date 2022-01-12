# 背景
- `rxjs`の`Subject`を`subscribe()`してそれを`Subescription`へ登録する際のコードが、関数が重なる形になってしまいネストが深くなりがち。

```typescript
const subjectA = new Subject()
const subjectB = new Subject()

const subscription = new Subscription()

subscription.add(
  subjectA.subscribe(() => {
    ...
  })
)

subscription.add(
  subjectB.subscribe(() => {
    ...
  })
)

subscription.unsubscribe()
```

# 目的
-  `Subject`を`subscribe()`してから`Subscription`へ登録するまでをメソッドチェーンでかけるようにする。


# 利用方法
```typescript
const streamA = new Stream()
const streamB = new Stream()

const subscription = new Subscription()

streamA
  .subscribeAsDisposable(() => {
    ...
  })
  .disposedBy(subscription)

streamB
  .subscribeAsDisposable(() => {
    ...
  })
  .disposedBy(subscription)

subscription.unsubscribe()
```

# 備考
- 主にvueファイルのscript部分での利用を想定しています
