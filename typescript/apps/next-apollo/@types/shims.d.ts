/* eslint-disable */
import { AttributifyAttributes, AttributifyNames } from 'windicss/types/jsx'
type AttributesType = string
type CustomAttributifyAttributes = Partial<Record<AttributifyNames, AttributesType>>

declare module 'react' {
  interface HTMLAttributes<T> extends CustomAttributifyAttributes {}
}
