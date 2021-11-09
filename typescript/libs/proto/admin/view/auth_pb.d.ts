// package: admin.view
// file: admin/view/auth.proto

import * as jspb from "google-protobuf"

export class Auth extends jspb.Message {
  getAccessToken(): string
  setAccessToken(value: string): void

  getRefreshToken(): string
  setRefreshToken(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): Auth.AsObject
  static toObject(includeInstance: boolean, msg: Auth): Auth.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>
  }
  static serializeBinaryToWriter(message: Auth, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): Auth
  static deserializeBinaryFromReader(
    message: Auth,
    reader: jspb.BinaryReader
  ): Auth
}

export namespace Auth {
  export type AsObject = {
    accessToken: string
    refreshToken: string
  }
}
