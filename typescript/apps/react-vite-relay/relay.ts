import {
  Environment,
  Network,
  RecordSource,
  Store,
  RequestParameters,
  Variables,
  CacheConfig,
  UploadableMap,
  // GraphQLResponse,
} from "relay-runtime";

const STORE_MAX_ENTRIES = 300;
const STORE_CACHE_EXPIRE = 10 * 60 * 1000; // 10 mins

const source = new RecordSource();
const relayStore = new Store(source, {
  gcReleaseBufferSize: STORE_MAX_ENTRIES,
  queryCacheExpirationTime: STORE_CACHE_EXPIRE,
});

async function fetchQuery(
  request: RequestParameters,
  variables: Variables,
  _cacheConfig: CacheConfig,
  uploadables?: UploadableMap | null,
) {
  const headers = new Headers();
  let body;

  // const jwt = getToken();
  // if (jwt) {
  //   const authHeader = `Bearer ${jwt}`;
  //   headers.set("Authorization", authHeader);
  // }

  if (uploadables && request.text) {
    const formData = new FormData();
    formData.append("query", request.text);
    formData.append("variables", JSON.stringify(variables));
    Object.keys(uploadables).forEach((key) => {
      formData.append("files", uploadables[key]);
    });
    body = formData;
  } else {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify({
      query: request.text,
      variables,
    });
  }

  console.groupCollapsed(
    `GraphQL ${(request.text as string).split("(")[0].split(" {")[0]}`,
  );
  console.group("Request");
  console.log((headers as any).map);
  console.log(variables);
  console.groupCollapsed("Body");
  console.log(request.text);
  console.groupEnd();
  console.groupEnd();

  try {
    // TODO: Add enpoint URL
    const endpoint = "http://localhost:9000/graphql";

    const res = await fetch(endpoint, {
      method: "POST",
      credentials: "include",
      headers,
      body,
    });

    const data = await res.json();
    console.group("Response");
    console.log(data);
    console.groupEnd();
    console.groupEnd();

    // エラーのsnackbarをもし入れたら、このコードを使える
    // if (data?.errors?.length > 0) {
    //   console.log(data.errors);
    //   data.errors.forEach((error: any) => {
    //     errorToast(`Error: ${error.message}. [${error.path?.join(", ")}]`);
    //   });
    // }

    return data;
  } catch (e) {
    console.group("Error");
    console.log(e);
    console.groupEnd();
    console.groupEnd();
    // errorToast("Error: " + e.message);     // エラーのsnackbarをもし入れたら、このコードを使える
  }
}

// const subscriptionClient = new SubscriptionClient(
//   'ws://localhost:4000/graphql', // TODO: env
//   {
//     reconnect: true,
//     connectionParams: {
//       token: getToken(),
//     },
//   }
// )

// const subscribe = (
//   request: RequestParameters,
//   variables: Variables,
//   _cacheConfig: CacheConfig
// ) => {
//   const observable = subscriptionClient.request({
//     query: request.text || '',
//     operationName: request.name,
//     variables,
//   })
//   return observable as RelayObservable<GraphQLResponse>
// }

const network = Network.create(fetchQuery); //, subscribe)

export const relayEnvironment = new Environment({
  network,
  store: relayStore,
});
