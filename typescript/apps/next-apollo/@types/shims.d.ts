/* eslint-disable */
// import { AriaAttributes, DOMAttributes } from 'react';

// declare module 'react' {
//   interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
//     w?: string
//     h?: string
//     flex?: string | boolean
//     items?: string | boolean
//     justify?: string | boolean
//   }
// }
import { AttributifyAttributes, AttributifyNames } from 'windicss/types/jsx'
type AttributesType = string
type CustomAttributifyAttributes = Partial<Record<AttributifyNames, AttributesType>>

declare module 'react' {
  interface HTMLAttributes<T> extends CustomAttributifyAttributes {}
}
