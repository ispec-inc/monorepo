// package: admin.api.auth
// file: admin/api/rest/v1/auth/auth.proto

import * as jspb from "google-protobuf"
import * as admin_view_auth_pb from "../../../../../admin/view/auth_pb"
import * as validate_validate_pb from "../../../../../validate/validate_pb"

export class LoginRequest extends jspb.Message {
  getEmail(): string
  setEmail(value: string): void

  getPassword(): string
  setPassword(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): LoginRequest.AsObject
  static toObject(
    includeInstance: boolean,
    msg: LoginRequest
  ): LoginRequest.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>
  }
  static serializeBinaryToWriter(
    message: LoginRequest,
    writer: jspb.BinaryWriter
  ): void
  static deserializeBinary(bytes: Uint8Array): LoginRequest
  static deserializeBinaryFromReader(
    message: LoginRequest,
    reader: jspb.BinaryReader
  ): LoginRequest
}

export namespace LoginRequest {
  export type AsObject = {
    email: string
    password: string
  }
}

export class LoginResponse extends jspb.Message {
  hasAuth(): boolean
  clearAuth(): void
  getAuth(): LoginResponse.Auth | undefined
  setAuth(value?: LoginResponse.Auth): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): LoginResponse.AsObject
  static toObject(
    includeInstance: boolean,
    msg: LoginResponse
  ): LoginResponse.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>
  }
  static serializeBinaryToWriter(
    message: LoginResponse,
    writer: jspb.BinaryWriter
  ): void
  static deserializeBinary(bytes: Uint8Array): LoginResponse
  static deserializeBinaryFromReader(
    message: LoginResponse,
    reader: jspb.BinaryReader
  ): LoginResponse
}

export namespace LoginResponse {
  export type AsObject = {
    auth?: LoginResponse.Auth.AsObject
  }

  export class Auth extends jspb.Message {
    getAccessToken(): string
    setAccessToken(value: string): void

    getRefreshToken(): string
    setRefreshToken(value: string): void

    getStaffId(): number
    setStaffId(value: number): void

    serializeBinary(): Uint8Array
    toObject(includeInstance?: boolean): Auth.AsObject
    static toObject(includeInstance: boolean, msg: Auth): Auth.AsObject
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>
    }
    static serializeBinaryToWriter(
      message: Auth,
      writer: jspb.BinaryWriter
    ): void
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
      staffId: number
    }
  }
}

export class RefreshRequest extends jspb.Message {
  getAccessToken(): string
  setAccessToken(value: string): void

  getRefreshToken(): string
  setRefreshToken(value: string): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): RefreshRequest.AsObject
  static toObject(
    includeInstance: boolean,
    msg: RefreshRequest
  ): RefreshRequest.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>
  }
  static serializeBinaryToWriter(
    message: RefreshRequest,
    writer: jspb.BinaryWriter
  ): void
  static deserializeBinary(bytes: Uint8Array): RefreshRequest
  static deserializeBinaryFromReader(
    message: RefreshRequest,
    reader: jspb.BinaryReader
  ): RefreshRequest
}

export namespace RefreshRequest {
  export type AsObject = {
    accessToken: string
    refreshToken: string
  }
}

export class RefreshResponse extends jspb.Message {
  hasAuth(): boolean
  clearAuth(): void
  getAuth(): admin_view_auth_pb.Auth | undefined
  setAuth(value?: admin_view_auth_pb.Auth): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): RefreshResponse.AsObject
  static toObject(
    includeInstance: boolean,
    msg: RefreshResponse
  ): RefreshResponse.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>
  }
  static serializeBinaryToWriter(
    message: RefreshResponse,
    writer: jspb.BinaryWriter
  ): void
  static deserializeBinary(bytes: Uint8Array): RefreshResponse
  static deserializeBinaryFromReader(
    message: RefreshResponse,
    reader: jspb.BinaryReader
  ): RefreshResponse
}

export namespace RefreshResponse {
  export type AsObject = {
    auth?: admin_view_auth_pb.Auth.AsObject
  }
}
