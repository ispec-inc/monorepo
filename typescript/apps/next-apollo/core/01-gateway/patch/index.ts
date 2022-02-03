/* eslint-disable */
// ----------- example apollo client ------------------

// import { ApolloError, ApolloQueryResult } from '@apollo/client'
// import { IPatchGateway } from './interface'
// import { apollo } from '~/utils/apollo'
// import getPatches from '~/types/response/patch/query.gql'
// import { PatchResponse } from '~/types/response/patch'

// type responseType = PatchResponse.Patch

// export class PatchGatewayImpl implements IPatchGateway {
//   fetch(noCache = false): Promise<responseType> {
//     return new Promise<responseType>((resolve, reject) => {
//       apollo
//         .query<responseType>({
//           query: getPatches,
//           fetchPolicy: noCache ? 'no-cache' : undefined,
//         })
//         .then((res: ApolloQueryResult<responseType>) => {
//           const data = res.data
//           if (!data) {
//             throw reject(
//               new ApolloError({ errorMessage: '情報の取得に失敗しました' })
//             )
//           }
//           resolve(data)
//         })
//         .catch((error: ApolloError) => {
//           reject(error)
//         })
//     })
//   }
// }
