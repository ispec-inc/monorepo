export default function () {
  return {
    httpEndpoint: 'http://localhost:9000/graphql',
    httpLinkOptions: {
      fetchOptions: {
        mode: 'cors',
      },
      credentials: 'include',
    },
  }
}
