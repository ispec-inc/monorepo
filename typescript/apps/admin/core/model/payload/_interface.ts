// Record<string, unknown>だと、interfaceで定義されたものを割り当てることができないためanyで対応
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IPayloadModel<T extends Record<string, any>> {
  toObject(): T
}
