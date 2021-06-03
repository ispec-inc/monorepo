import * as dep_1 from "./../../google/protobuf/timestamp";
import * as pb_1 from "google-protobuf";
export namespace admin.view {
    export class Article extends pb_1.Message {
        constructor(data?: any[] | {
            id?: number;
            user_id?: number;
            title?: string;
            body?: string;
            created_at?: dep_1.google.protobuf.Timestamp;
            updated_at?: dep_1.google.protobuf.Timestamp;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("id" in data && data.id != undefined) {
                    this.id = data.id;
                }
                if ("user_id" in data && data.user_id != undefined) {
                    this.user_id = data.user_id;
                }
                if ("title" in data && data.title != undefined) {
                    this.title = data.title;
                }
                if ("body" in data && data.body != undefined) {
                    this.body = data.body;
                }
                if ("created_at" in data && data.created_at != undefined) {
                    this.created_at = data.created_at;
                }
                if ("updated_at" in data && data.updated_at != undefined) {
                    this.updated_at = data.updated_at;
                }
            }
        }
        get id() {
            return pb_1.Message.getField(this, 1) as number;
        }
        set id(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get user_id() {
            return pb_1.Message.getField(this, 2) as number;
        }
        set user_id(value: number) {
            pb_1.Message.setField(this, 2, value);
        }
        get title() {
            return pb_1.Message.getField(this, 3) as string;
        }
        set title(value: string) {
            pb_1.Message.setField(this, 3, value);
        }
        get body() {
            return pb_1.Message.getField(this, 4) as string;
        }
        set body(value: string) {
            pb_1.Message.setField(this, 4, value);
        }
        get created_at() {
            return pb_1.Message.getWrapperField(this, dep_1.google.protobuf.Timestamp, 5) as dep_1.google.protobuf.Timestamp;
        }
        set created_at(value: dep_1.google.protobuf.Timestamp) {
            pb_1.Message.setWrapperField(this, 5, value);
        }
        get updated_at() {
            return pb_1.Message.getWrapperField(this, dep_1.google.protobuf.Timestamp, 6) as dep_1.google.protobuf.Timestamp;
        }
        set updated_at(value: dep_1.google.protobuf.Timestamp) {
            pb_1.Message.setWrapperField(this, 6, value);
        }
        toObject() {
            var data: {
                id?: number;
                user_id?: number;
                title?: string;
                body?: string;
                created_at?: ReturnType<typeof dep_1.google.protobuf.Timestamp.prototype.toObject>;
                updated_at?: ReturnType<typeof dep_1.google.protobuf.Timestamp.prototype.toObject>;
            } = {};
            if (this.id != null) {
                data.id = this.id;
            }
            if (this.user_id != null) {
                data.user_id = this.user_id;
            }
            if (this.title != null) {
                data.title = this.title;
            }
            if (this.body != null) {
                data.body = this.body;
            }
            if (this.created_at != null) {
                data.created_at = this.created_at.toObject();
            }
            if (this.updated_at != null) {
                data.updated_at = this.updated_at.toObject();
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.id !== undefined)
                writer.writeInt64(1, this.id);
            if (this.user_id !== undefined)
                writer.writeInt64(2, this.user_id);
            if (typeof this.title === "string" && this.title.length)
                writer.writeString(3, this.title);
            if (typeof this.body === "string" && this.body.length)
                writer.writeString(4, this.body);
            if (this.created_at !== undefined)
                writer.writeMessage(5, this.created_at, () => this.created_at.serialize(writer));
            if (this.updated_at !== undefined)
                writer.writeMessage(6, this.updated_at, () => this.updated_at.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Article {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new Article();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.id = reader.readInt64();
                        break;
                    case 2:
                        message.user_id = reader.readInt64();
                        break;
                    case 3:
                        message.title = reader.readString();
                        break;
                    case 4:
                        message.body = reader.readString();
                        break;
                    case 5:
                        reader.readMessage(message.created_at, () => message.created_at = dep_1.google.protobuf.Timestamp.deserialize(reader));
                        break;
                    case 6:
                        reader.readMessage(message.updated_at, () => message.updated_at = dep_1.google.protobuf.Timestamp.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): Article {
            return Article.deserialize(bytes);
        }
    }
}
