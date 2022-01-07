# 背景
- VuexStoreを有効に活用する上で、APIからのレスポンスのみをStoreへ保存するのではなく、APIへ送信したパラメータとレスポンスをセットで保存することで、キャッシュとしてこれを利用したい。

# 目的
- APIへ送信したリクエストパラメータとレスポンスをセットでStoreへ保存し、再度同じエンドポイントを叩く際にStoreへ保存されたリクエストパラメータと、その時に送信しようとしていたリクエストパラメータを比較して、それらが同一であった場合はAPIを呼び出さずにStoreへ保存していたレスポンスを返すようにする。


# 利用方法
```typescript
// ApiWithCacheEnabledをインスタンス化する際の引数↓
// 第一引数(endpoint): 任意のリクエストパラメータを受け取り、Promiseを返す関数(APIを呼び出す関数)
// 第二引数(cacheModule): CacheModule<T, U extends Object>を継承したVuexModule(このVuexModuleは`/store/cache/**`で定義する)
const api = new ApiWithCacheEnabled(endpoint, cacheModule)

// リクエストパラメータとキャッシュの状況に応じて、APIを呼び出した結果かキャッシュされた値をPromise型で返す
// 引数はApiWithCacheEnabledのインスタンス化時に第一引数として渡した関数の引数と一致する
api.callApi({ id: 1 })

// Storeへ保存してあるデータをリセットする
// キャッシュを利用せずに確実にAPIを呼び出したい場合、callApi()を呼ぶ前にこの関数でキャッシュをリセットする
api.clearCache()
```

# 備考
- `Gateway`層での利用を想定しています
