# 背景
- API疎通をする際に、素直に`$axios.post('/admin/v1/articles/1', data, config)`とすると、`data`と`config.params`の型が`any`になってしまいTypescirptでかくにしては型安全であるとは言えない。

# 目的
- 実際にAPIを呼び出す`$axios.~~`の部分を関数でラップし、引数にジェネリクスを用いて型をつけられるようにすることで、型安全にAPIを呼び出せるようにする。


# 利用方法
```typescript
export namespace ApiRequestHelper {
  export const ApiBaseUrl = {
　　// エンドポイントのパスの頭で共通するパスを一部切り出してここで定義する
    Admin: '/admin/v1',
    Client: '/client/v1',
  } as const
  ...
 }
```

```typescript
// 引数には先述したApiBaseUrlの値を使い、これがエンドポイントのパスの頭になる
const adminEndpointProvider = ApiRequestHelper.request(ApiRequestHelper.ApiBaseUrl.Admin)

// 引数にはApiRequestHelper.request()の引数に渡した値に続くパスを渡す
const adminAuthEndpointProvider = adminEndpointProvider('/auth/login')

// 上記までで設定したエンドポイントにして送信するリクエストメソッドを決定する
// 引数にAxiosRequestConfig型の値を渡すこともできる
// その際、`.post<{ id: number }>()`のように、ジェネリクスを利用することで、AxiosRequestConfig["params"]の型を明示的に指定できる
const adminLoginEndpoint = adminAuthEndpointProvider.post()

// 実際にAPIを呼び出す(Promise型を返す)
// 型引数のうち、第一引数がAPIからのレスポンスの型、第二引数がリクエスト時にAPIへ送信する値の型(第二引数は、POST、PUTリクエストの際に利用)
adminLoginEndpoint<AnyResnponseType, AnyRequestType>(requestBody)

// 実際に利用する際は、上記のように段階的に変数を定義せず、以下のように続けて関数の呼び出しをおこなっていく
const adminLoginEndpoint = ApiRequestHelper.request(ApiRequestHelper.ApiBaseUrl.Admin)('/auth/login').post()

adminLoginEndpoint<AnyResnponseType, AnyRequestType>(requestBody)
```

# 備考
- `Gateway`層での利用を想定しています
