import * as dep_1 from "./../../../../view/user";
import * as dep_2 from "./../../../../../validate/validate";
import * as pb_1 from "google-protobuf";
export namespace article.api.user {
    export class GetRequest extends pb_1.Message {
        constructor(data?: any[] | {}) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
            if (!Array.isArray(data) && typeof data == "object") { }
        }
        toObject() {
            var data: {} = {};
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetRequest {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new GetRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): GetRequest {
            return GetRequest.deserialize(bytes);
        }
    }
    export class GetResponse extends pb_1.Message {
        constructor(data?: any[] | {
            user?: dep_1.article.view.User;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("user" in data && data.user != undefined) {
                    this.user = data.user;
                }
            }
        }
        get user() {
            return pb_1.Message.getWrapperField(this, dep_1.article.view.User, 1) as dep_1.article.view.User;
        }
        set user(value: dep_1.article.view.User) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        toObject() {
            var data: {
                user?: ReturnType<typeof dep_1.article.view.User.prototype.toObject>;
            } = {};
            if (this.user != null) {
                data.user = this.user.toObject();
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.user !== undefined)
                writer.writeMessage(1, this.user, () => this.user.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetResponse {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new GetResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.user, () => message.user = dep_1.article.view.User.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): GetResponse {
            return GetResponse.deserialize(bytes);
        }
    }
    export class CreateRequest extends pb_1.Message {
        constructor(data?: any[] | {
            name?: string;
            description?: string;
            email?: string;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("name" in data && data.name != undefined) {
                    this.name = data.name;
                }
                if ("description" in data && data.description != undefined) {
                    this.description = data.description;
                }
                if ("email" in data && data.email != undefined) {
                    this.email = data.email;
                }
            }
        }
        get name() {
            return pb_1.Message.getField(this, 1) as string;
        }
        set name(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        get description() {
            return pb_1.Message.getField(this, 2) as string;
        }
        set description(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        get email() {
            return pb_1.Message.getField(this, 3) as string;
        }
        set email(value: string) {
            pb_1.Message.setField(this, 3, value);
        }
        toObject() {
            var data: {
                name?: string;
                description?: string;
                email?: string;
            } = {};
            if (this.name != null) {
                data.name = this.name;
            }
            if (this.description != null) {
                data.description = this.description;
            }
            if (this.email != null) {
                data.email = this.email;
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (typeof this.name === "string" && this.name.length)
                writer.writeString(1, this.name);
            if (typeof this.description === "string" && this.description.length)
                writer.writeString(2, this.description);
            if (typeof this.email === "string" && this.email.length)
                writer.writeString(3, this.email);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CreateRequest {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new CreateRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.name = reader.readString();
                        break;
                    case 2:
                        message.description = reader.readString();
                        break;
                    case 3:
                        message.email = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): CreateRequest {
            return CreateRequest.deserialize(bytes);
        }
    }
    export class CreateResponse extends pb_1.Message {
        constructor(data?: any[] | {
            users?: dep_1.article.view.User[];
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("users" in data && data.users != undefined) {
                    this.users = data.users;
                }
            }
        }
        get users() {
            return pb_1.Message.getRepeatedWrapperField(this, dep_1.article.view.User, 1) as dep_1.article.view.User[];
        }
        set users(value: dep_1.article.view.User[]) {
            pb_1.Message.setRepeatedWrapperField(this, 1, value);
        }
        toObject() {
            var data: {
                users?: ReturnType<typeof dep_1.article.view.User.prototype.toObject>[];
            } = {};
            if (this.users != null) {
                data.users = this.users.map((item: dep_1.article.view.User) => item.toObject());
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.users !== undefined)
                writer.writeRepeatedMessage(1, this.users, (item: dep_1.article.view.User) => item.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CreateResponse {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new CreateResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.users, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dep_1.article.view.User.deserialize(reader), dep_1.article.view.User));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): CreateResponse {
            return CreateResponse.deserialize(bytes);
        }
    }
}
