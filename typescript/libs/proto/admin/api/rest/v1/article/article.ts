import * as dep_1 from "./../../../../view/article";
import * as pb_1 from "google-protobuf";
export namespace admin.api.article {
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
            article?: dep_1.admin.view.Article;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("article" in data && data.article != undefined) {
                    this.article = data.article;
                }
            }
        }
        get article() {
            return pb_1.Message.getWrapperField(this, dep_1.admin.view.Article, 1) as dep_1.admin.view.Article;
        }
        set article(value: dep_1.admin.view.Article) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        toObject() {
            var data: {
                article?: ReturnType<typeof dep_1.admin.view.Article.prototype.toObject>;
            } = {};
            if (this.article != null) {
                data.article = this.article.toObject();
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.article !== undefined)
                writer.writeMessage(1, this.article, () => this.article.serialize(writer));
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
                        reader.readMessage(message.article, () => message.article = dep_1.admin.view.Article.deserialize(reader));
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
    export class ListRequest extends pb_1.Message {
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ListRequest {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new ListRequest();
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
        static deserializeBinary(bytes: Uint8Array): ListRequest {
            return ListRequest.deserialize(bytes);
        }
    }
    export class ListResponse extends pb_1.Message {
        constructor(data?: any[] | {
            articles?: dep_1.admin.view.Article[];
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("articles" in data && data.articles != undefined) {
                    this.articles = data.articles;
                }
            }
        }
        get articles() {
            return pb_1.Message.getRepeatedWrapperField(this, dep_1.admin.view.Article, 1) as dep_1.admin.view.Article[];
        }
        set articles(value: dep_1.admin.view.Article[]) {
            pb_1.Message.setRepeatedWrapperField(this, 1, value);
        }
        toObject() {
            var data: {
                articles?: ReturnType<typeof dep_1.admin.view.Article.prototype.toObject>[];
            } = {};
            if (this.articles != null) {
                data.articles = this.articles.map((item: dep_1.admin.view.Article) => item.toObject());
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.articles !== undefined)
                writer.writeRepeatedMessage(1, this.articles, (item: dep_1.admin.view.Article) => item.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ListResponse {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new ListResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.articles, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dep_1.admin.view.Article.deserialize(reader), dep_1.admin.view.Article));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): ListResponse {
            return ListResponse.deserialize(bytes);
        }
    }
    export class CreateRequest extends pb_1.Message {
        constructor(data?: any[] | {
            user_id?: number;
            title?: string;
            body?: string;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("user_id" in data && data.user_id != undefined) {
                    this.user_id = data.user_id;
                }
                if ("title" in data && data.title != undefined) {
                    this.title = data.title;
                }
                if ("body" in data && data.body != undefined) {
                    this.body = data.body;
                }
            }
        }
        get user_id() {
            return pb_1.Message.getField(this, 1) as number;
        }
        set user_id(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get title() {
            return pb_1.Message.getField(this, 2) as string;
        }
        set title(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        get body() {
            return pb_1.Message.getField(this, 3) as string;
        }
        set body(value: string) {
            pb_1.Message.setField(this, 3, value);
        }
        toObject() {
            var data: {
                user_id?: number;
                title?: string;
                body?: string;
            } = {};
            if (this.user_id != null) {
                data.user_id = this.user_id;
            }
            if (this.title != null) {
                data.title = this.title;
            }
            if (this.body != null) {
                data.body = this.body;
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.user_id !== undefined)
                writer.writeInt64(1, this.user_id);
            if (typeof this.title === "string" && this.title.length)
                writer.writeString(2, this.title);
            if (typeof this.body === "string" && this.body.length)
                writer.writeString(3, this.body);
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
                        message.user_id = reader.readInt64();
                        break;
                    case 2:
                        message.title = reader.readString();
                        break;
                    case 3:
                        message.body = reader.readString();
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
            articles?: dep_1.admin.view.Article[];
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("articles" in data && data.articles != undefined) {
                    this.articles = data.articles;
                }
            }
        }
        get articles() {
            return pb_1.Message.getRepeatedWrapperField(this, dep_1.admin.view.Article, 1) as dep_1.admin.view.Article[];
        }
        set articles(value: dep_1.admin.view.Article[]) {
            pb_1.Message.setRepeatedWrapperField(this, 1, value);
        }
        toObject() {
            var data: {
                articles?: ReturnType<typeof dep_1.admin.view.Article.prototype.toObject>[];
            } = {};
            if (this.articles != null) {
                data.articles = this.articles.map((item: dep_1.admin.view.Article) => item.toObject());
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.articles !== undefined)
                writer.writeRepeatedMessage(1, this.articles, (item: dep_1.admin.view.Article) => item.serialize(writer));
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
                        reader.readMessage(message.articles, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dep_1.admin.view.Article.deserialize(reader), dep_1.admin.view.Article));
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
    export class UpdateRequest extends pb_1.Message {
        constructor(data?: any[] | {
            user_id?: number;
            title?: string;
            body?: string;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("user_id" in data && data.user_id != undefined) {
                    this.user_id = data.user_id;
                }
                if ("title" in data && data.title != undefined) {
                    this.title = data.title;
                }
                if ("body" in data && data.body != undefined) {
                    this.body = data.body;
                }
            }
        }
        get user_id() {
            return pb_1.Message.getField(this, 1) as number;
        }
        set user_id(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get title() {
            return pb_1.Message.getField(this, 2) as string;
        }
        set title(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        get body() {
            return pb_1.Message.getField(this, 3) as string;
        }
        set body(value: string) {
            pb_1.Message.setField(this, 3, value);
        }
        toObject() {
            var data: {
                user_id?: number;
                title?: string;
                body?: string;
            } = {};
            if (this.user_id != null) {
                data.user_id = this.user_id;
            }
            if (this.title != null) {
                data.title = this.title;
            }
            if (this.body != null) {
                data.body = this.body;
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.user_id !== undefined)
                writer.writeInt64(1, this.user_id);
            if (typeof this.title === "string" && this.title.length)
                writer.writeString(2, this.title);
            if (typeof this.body === "string" && this.body.length)
                writer.writeString(3, this.body);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): UpdateRequest {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new UpdateRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.user_id = reader.readInt64();
                        break;
                    case 2:
                        message.title = reader.readString();
                        break;
                    case 3:
                        message.body = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): UpdateRequest {
            return UpdateRequest.deserialize(bytes);
        }
    }
    export class UpdateResponse extends pb_1.Message {
        constructor(data?: any[] | {
            article?: dep_1.admin.view.Article;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("article" in data && data.article != undefined) {
                    this.article = data.article;
                }
            }
        }
        get article() {
            return pb_1.Message.getWrapperField(this, dep_1.admin.view.Article, 1) as dep_1.admin.view.Article;
        }
        set article(value: dep_1.admin.view.Article) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        toObject() {
            var data: {
                article?: ReturnType<typeof dep_1.admin.view.Article.prototype.toObject>;
            } = {};
            if (this.article != null) {
                data.article = this.article.toObject();
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.article !== undefined)
                writer.writeMessage(1, this.article, () => this.article.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): UpdateResponse {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new UpdateResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.article, () => message.article = dep_1.admin.view.Article.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): UpdateResponse {
            return UpdateResponse.deserialize(bytes);
        }
    }
    export class DeleteRequest extends pb_1.Message {
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DeleteRequest {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new DeleteRequest();
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
        static deserializeBinary(bytes: Uint8Array): DeleteRequest {
            return DeleteRequest.deserialize(bytes);
        }
    }
    export class DeleteResponse extends pb_1.Message {
        constructor(data?: any[] | {
            articles?: dep_1.admin.view.Article[];
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("articles" in data && data.articles != undefined) {
                    this.articles = data.articles;
                }
            }
        }
        get articles() {
            return pb_1.Message.getRepeatedWrapperField(this, dep_1.admin.view.Article, 1) as dep_1.admin.view.Article[];
        }
        set articles(value: dep_1.admin.view.Article[]) {
            pb_1.Message.setRepeatedWrapperField(this, 1, value);
        }
        toObject() {
            var data: {
                articles?: ReturnType<typeof dep_1.admin.view.Article.prototype.toObject>[];
            } = {};
            if (this.articles != null) {
                data.articles = this.articles.map((item: dep_1.admin.view.Article) => item.toObject());
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.articles !== undefined)
                writer.writeRepeatedMessage(1, this.articles, (item: dep_1.admin.view.Article) => item.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DeleteResponse {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new DeleteResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.articles, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dep_1.admin.view.Article.deserialize(reader), dep_1.admin.view.Article));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): DeleteResponse {
            return DeleteResponse.deserialize(bytes);
        }
    }
}
