import * as dep_1 from "./../google/protobuf/descriptor";
import * as dep_2 from "./../google/protobuf/duration";
import * as dep_3 from "./../google/protobuf/timestamp";
import * as pb_1 from "google-protobuf";
export namespace validate {
    export enum KnownRegex {
        UNKNOWN = 0,
        HTTP_HEADER_NAME = 1,
        HTTP_HEADER_VALUE = 2
    }
    export class FieldRules extends pb_1.Message {
        constructor(data?: any[] | ({
            message?: MessageRules;
        } & (({
            float: FloatRules;
            double?: never;
            int32?: never;
            int64?: never;
            uint32?: never;
            uint64?: never;
            sint32?: never;
            sint64?: never;
            fixed32?: never;
            fixed64?: never;
            sfixed32?: never;
            sfixed64?: never;
            bool?: never;
            string?: never;
            bytes?: never;
            enum?: never;
            repeated?: never;
            map?: never;
            any?: never;
            duration?: never;
            timestamp?: never;
        } | {
            float?: never;
            double: DoubleRules;
            int32?: never;
            int64?: never;
            uint32?: never;
            uint64?: never;
            sint32?: never;
            sint64?: never;
            fixed32?: never;
            fixed64?: never;
            sfixed32?: never;
            sfixed64?: never;
            bool?: never;
            string?: never;
            bytes?: never;
            enum?: never;
            repeated?: never;
            map?: never;
            any?: never;
            duration?: never;
            timestamp?: never;
        } | {
            float?: never;
            double?: never;
            int32: Int32Rules;
            int64?: never;
            uint32?: never;
            uint64?: never;
            sint32?: never;
            sint64?: never;
            fixed32?: never;
            fixed64?: never;
            sfixed32?: never;
            sfixed64?: never;
            bool?: never;
            string?: never;
            bytes?: never;
            enum?: never;
            repeated?: never;
            map?: never;
            any?: never;
            duration?: never;
            timestamp?: never;
        } | {
            float?: never;
            double?: never;
            int32?: never;
            int64: Int64Rules;
            uint32?: never;
            uint64?: never;
            sint32?: never;
            sint64?: never;
            fixed32?: never;
            fixed64?: never;
            sfixed32?: never;
            sfixed64?: never;
            bool?: never;
            string?: never;
            bytes?: never;
            enum?: never;
            repeated?: never;
            map?: never;
            any?: never;
            duration?: never;
            timestamp?: never;
        } | {
            float?: never;
            double?: never;
            int32?: never;
            int64?: never;
            uint32: UInt32Rules;
            uint64?: never;
            sint32?: never;
            sint64?: never;
            fixed32?: never;
            fixed64?: never;
            sfixed32?: never;
            sfixed64?: never;
            bool?: never;
            string?: never;
            bytes?: never;
            enum?: never;
            repeated?: never;
            map?: never;
            any?: never;
            duration?: never;
            timestamp?: never;
        } | {
            float?: never;
            double?: never;
            int32?: never;
            int64?: never;
            uint32?: never;
            uint64: UInt64Rules;
            sint32?: never;
            sint64?: never;
            fixed32?: never;
            fixed64?: never;
            sfixed32?: never;
            sfixed64?: never;
            bool?: never;
            string?: never;
            bytes?: never;
            enum?: never;
            repeated?: never;
            map?: never;
            any?: never;
            duration?: never;
            timestamp?: never;
        } | {
            float?: never;
            double?: never;
            int32?: never;
            int64?: never;
            uint32?: never;
            uint64?: never;
            sint32: SInt32Rules;
            sint64?: never;
            fixed32?: never;
            fixed64?: never;
            sfixed32?: never;
            sfixed64?: never;
            bool?: never;
            string?: never;
            bytes?: never;
            enum?: never;
            repeated?: never;
            map?: never;
            any?: never;
            duration?: never;
            timestamp?: never;
        } | {
            float?: never;
            double?: never;
            int32?: never;
            int64?: never;
            uint32?: never;
            uint64?: never;
            sint32?: never;
            sint64: SInt64Rules;
            fixed32?: never;
            fixed64?: never;
            sfixed32?: never;
            sfixed64?: never;
            bool?: never;
            string?: never;
            bytes?: never;
            enum?: never;
            repeated?: never;
            map?: never;
            any?: never;
            duration?: never;
            timestamp?: never;
        } | {
            float?: never;
            double?: never;
            int32?: never;
            int64?: never;
            uint32?: never;
            uint64?: never;
            sint32?: never;
            sint64?: never;
            fixed32: Fixed32Rules;
            fixed64?: never;
            sfixed32?: never;
            sfixed64?: never;
            bool?: never;
            string?: never;
            bytes?: never;
            enum?: never;
            repeated?: never;
            map?: never;
            any?: never;
            duration?: never;
            timestamp?: never;
        } | {
            float?: never;
            double?: never;
            int32?: never;
            int64?: never;
            uint32?: never;
            uint64?: never;
            sint32?: never;
            sint64?: never;
            fixed32?: never;
            fixed64: Fixed64Rules;
            sfixed32?: never;
            sfixed64?: never;
            bool?: never;
            string?: never;
            bytes?: never;
            enum?: never;
            repeated?: never;
            map?: never;
            any?: never;
            duration?: never;
            timestamp?: never;
        } | {
            float?: never;
            double?: never;
            int32?: never;
            int64?: never;
            uint32?: never;
            uint64?: never;
            sint32?: never;
            sint64?: never;
            fixed32?: never;
            fixed64?: never;
            sfixed32: SFixed32Rules;
            sfixed64?: never;
            bool?: never;
            string?: never;
            bytes?: never;
            enum?: never;
            repeated?: never;
            map?: never;
            any?: never;
            duration?: never;
            timestamp?: never;
        } | {
            float?: never;
            double?: never;
            int32?: never;
            int64?: never;
            uint32?: never;
            uint64?: never;
            sint32?: never;
            sint64?: never;
            fixed32?: never;
            fixed64?: never;
            sfixed32?: never;
            sfixed64: SFixed64Rules;
            bool?: never;
            string?: never;
            bytes?: never;
            enum?: never;
            repeated?: never;
            map?: never;
            any?: never;
            duration?: never;
            timestamp?: never;
        } | {
            float?: never;
            double?: never;
            int32?: never;
            int64?: never;
            uint32?: never;
            uint64?: never;
            sint32?: never;
            sint64?: never;
            fixed32?: never;
            fixed64?: never;
            sfixed32?: never;
            sfixed64?: never;
            bool: BoolRules;
            string?: never;
            bytes?: never;
            enum?: never;
            repeated?: never;
            map?: never;
            any?: never;
            duration?: never;
            timestamp?: never;
        } | {
            float?: never;
            double?: never;
            int32?: never;
            int64?: never;
            uint32?: never;
            uint64?: never;
            sint32?: never;
            sint64?: never;
            fixed32?: never;
            fixed64?: never;
            sfixed32?: never;
            sfixed64?: never;
            bool?: never;
            string: StringRules;
            bytes?: never;
            enum?: never;
            repeated?: never;
            map?: never;
            any?: never;
            duration?: never;
            timestamp?: never;
        } | {
            float?: never;
            double?: never;
            int32?: never;
            int64?: never;
            uint32?: never;
            uint64?: never;
            sint32?: never;
            sint64?: never;
            fixed32?: never;
            fixed64?: never;
            sfixed32?: never;
            sfixed64?: never;
            bool?: never;
            string?: never;
            bytes: BytesRules;
            enum?: never;
            repeated?: never;
            map?: never;
            any?: never;
            duration?: never;
            timestamp?: never;
        } | {
            float?: never;
            double?: never;
            int32?: never;
            int64?: never;
            uint32?: never;
            uint64?: never;
            sint32?: never;
            sint64?: never;
            fixed32?: never;
            fixed64?: never;
            sfixed32?: never;
            sfixed64?: never;
            bool?: never;
            string?: never;
            bytes?: never;
            enum: EnumRules;
            repeated?: never;
            map?: never;
            any?: never;
            duration?: never;
            timestamp?: never;
        } | {
            float?: never;
            double?: never;
            int32?: never;
            int64?: never;
            uint32?: never;
            uint64?: never;
            sint32?: never;
            sint64?: never;
            fixed32?: never;
            fixed64?: never;
            sfixed32?: never;
            sfixed64?: never;
            bool?: never;
            string?: never;
            bytes?: never;
            enum?: never;
            repeated: RepeatedRules;
            map?: never;
            any?: never;
            duration?: never;
            timestamp?: never;
        } | {
            float?: never;
            double?: never;
            int32?: never;
            int64?: never;
            uint32?: never;
            uint64?: never;
            sint32?: never;
            sint64?: never;
            fixed32?: never;
            fixed64?: never;
            sfixed32?: never;
            sfixed64?: never;
            bool?: never;
            string?: never;
            bytes?: never;
            enum?: never;
            repeated?: never;
            map: MapRules;
            any?: never;
            duration?: never;
            timestamp?: never;
        } | {
            float?: never;
            double?: never;
            int32?: never;
            int64?: never;
            uint32?: never;
            uint64?: never;
            sint32?: never;
            sint64?: never;
            fixed32?: never;
            fixed64?: never;
            sfixed32?: never;
            sfixed64?: never;
            bool?: never;
            string?: never;
            bytes?: never;
            enum?: never;
            repeated?: never;
            map?: never;
            any: AnyRules;
            duration?: never;
            timestamp?: never;
        } | {
            float?: never;
            double?: never;
            int32?: never;
            int64?: never;
            uint32?: never;
            uint64?: never;
            sint32?: never;
            sint64?: never;
            fixed32?: never;
            fixed64?: never;
            sfixed32?: never;
            sfixed64?: never;
            bool?: never;
            string?: never;
            bytes?: never;
            enum?: never;
            repeated?: never;
            map?: never;
            any?: never;
            duration: DurationRules;
            timestamp?: never;
        } | {
            float?: never;
            double?: never;
            int32?: never;
            int64?: never;
            uint32?: never;
            uint64?: never;
            sint32?: never;
            sint64?: never;
            fixed32?: never;
            fixed64?: never;
            sfixed32?: never;
            sfixed64?: never;
            bool?: never;
            string?: never;
            bytes?: never;
            enum?: never;
            repeated?: never;
            map?: never;
            any?: never;
            duration?: never;
            timestamp: TimestampRules;
        })))) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22]]);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("message" in data && data.message != undefined) {
                    this.message = data.message;
                }
                if ("float" in data && data.float != undefined) {
                    this.float = data.float;
                }
                if ("double" in data && data.double != undefined) {
                    this.double = data.double;
                }
                if ("int32" in data && data.int32 != undefined) {
                    this.int32 = data.int32;
                }
                if ("int64" in data && data.int64 != undefined) {
                    this.int64 = data.int64;
                }
                if ("uint32" in data && data.uint32 != undefined) {
                    this.uint32 = data.uint32;
                }
                if ("uint64" in data && data.uint64 != undefined) {
                    this.uint64 = data.uint64;
                }
                if ("sint32" in data && data.sint32 != undefined) {
                    this.sint32 = data.sint32;
                }
                if ("sint64" in data && data.sint64 != undefined) {
                    this.sint64 = data.sint64;
                }
                if ("fixed32" in data && data.fixed32 != undefined) {
                    this.fixed32 = data.fixed32;
                }
                if ("fixed64" in data && data.fixed64 != undefined) {
                    this.fixed64 = data.fixed64;
                }
                if ("sfixed32" in data && data.sfixed32 != undefined) {
                    this.sfixed32 = data.sfixed32;
                }
                if ("sfixed64" in data && data.sfixed64 != undefined) {
                    this.sfixed64 = data.sfixed64;
                }
                if ("bool" in data && data.bool != undefined) {
                    this.bool = data.bool;
                }
                if ("string" in data && data.string != undefined) {
                    this.string = data.string;
                }
                if ("bytes" in data && data.bytes != undefined) {
                    this.bytes = data.bytes;
                }
                if ("enum" in data && data.enum != undefined) {
                    this.enum = data.enum;
                }
                if ("repeated" in data && data.repeated != undefined) {
                    this.repeated = data.repeated;
                }
                if ("map" in data && data.map != undefined) {
                    this.map = data.map;
                }
                if ("any" in data && data.any != undefined) {
                    this.any = data.any;
                }
                if ("duration" in data && data.duration != undefined) {
                    this.duration = data.duration;
                }
                if ("timestamp" in data && data.timestamp != undefined) {
                    this.timestamp = data.timestamp;
                }
            }
        }
        get message() {
            return pb_1.Message.getWrapperField(this, MessageRules, 17) as MessageRules;
        }
        set message(value: MessageRules) {
            pb_1.Message.setWrapperField(this, 17, value);
        }
        get float() {
            return pb_1.Message.getWrapperField(this, FloatRules, 1) as FloatRules;
        }
        set float(value: FloatRules) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get double() {
            return pb_1.Message.getWrapperField(this, DoubleRules, 2) as DoubleRules;
        }
        set double(value: DoubleRules) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        get int32() {
            return pb_1.Message.getWrapperField(this, Int32Rules, 3) as Int32Rules;
        }
        set int32(value: Int32Rules) {
            pb_1.Message.setWrapperField(this, 3, value);
        }
        get int64() {
            return pb_1.Message.getWrapperField(this, Int64Rules, 4) as Int64Rules;
        }
        set int64(value: Int64Rules) {
            pb_1.Message.setWrapperField(this, 4, value);
        }
        get uint32() {
            return pb_1.Message.getWrapperField(this, UInt32Rules, 5) as UInt32Rules;
        }
        set uint32(value: UInt32Rules) {
            pb_1.Message.setWrapperField(this, 5, value);
        }
        get uint64() {
            return pb_1.Message.getWrapperField(this, UInt64Rules, 6) as UInt64Rules;
        }
        set uint64(value: UInt64Rules) {
            pb_1.Message.setWrapperField(this, 6, value);
        }
        get sint32() {
            return pb_1.Message.getWrapperField(this, SInt32Rules, 7) as SInt32Rules;
        }
        set sint32(value: SInt32Rules) {
            pb_1.Message.setWrapperField(this, 7, value);
        }
        get sint64() {
            return pb_1.Message.getWrapperField(this, SInt64Rules, 8) as SInt64Rules;
        }
        set sint64(value: SInt64Rules) {
            pb_1.Message.setWrapperField(this, 8, value);
        }
        get fixed32() {
            return pb_1.Message.getWrapperField(this, Fixed32Rules, 9) as Fixed32Rules;
        }
        set fixed32(value: Fixed32Rules) {
            pb_1.Message.setWrapperField(this, 9, value);
        }
        get fixed64() {
            return pb_1.Message.getWrapperField(this, Fixed64Rules, 10) as Fixed64Rules;
        }
        set fixed64(value: Fixed64Rules) {
            pb_1.Message.setWrapperField(this, 10, value);
        }
        get sfixed32() {
            return pb_1.Message.getWrapperField(this, SFixed32Rules, 11) as SFixed32Rules;
        }
        set sfixed32(value: SFixed32Rules) {
            pb_1.Message.setWrapperField(this, 11, value);
        }
        get sfixed64() {
            return pb_1.Message.getWrapperField(this, SFixed64Rules, 12) as SFixed64Rules;
        }
        set sfixed64(value: SFixed64Rules) {
            pb_1.Message.setWrapperField(this, 12, value);
        }
        get bool() {
            return pb_1.Message.getWrapperField(this, BoolRules, 13) as BoolRules;
        }
        set bool(value: BoolRules) {
            pb_1.Message.setWrapperField(this, 13, value);
        }
        get string() {
            return pb_1.Message.getWrapperField(this, StringRules, 14) as StringRules;
        }
        set string(value: StringRules) {
            pb_1.Message.setWrapperField(this, 14, value);
        }
        get bytes() {
            return pb_1.Message.getWrapperField(this, BytesRules, 15) as BytesRules;
        }
        set bytes(value: BytesRules) {
            pb_1.Message.setWrapperField(this, 15, value);
        }
        get enum() {
            return pb_1.Message.getWrapperField(this, EnumRules, 16) as EnumRules;
        }
        set enum(value: EnumRules) {
            pb_1.Message.setWrapperField(this, 16, value);
        }
        get repeated() {
            return pb_1.Message.getWrapperField(this, RepeatedRules, 18) as RepeatedRules;
        }
        set repeated(value: RepeatedRules) {
            pb_1.Message.setWrapperField(this, 18, value);
        }
        get map() {
            return pb_1.Message.getWrapperField(this, MapRules, 19) as MapRules;
        }
        set map(value: MapRules) {
            pb_1.Message.setWrapperField(this, 19, value);
        }
        get any() {
            return pb_1.Message.getWrapperField(this, AnyRules, 20) as AnyRules;
        }
        set any(value: AnyRules) {
            pb_1.Message.setWrapperField(this, 20, value);
        }
        get duration() {
            return pb_1.Message.getWrapperField(this, DurationRules, 21) as DurationRules;
        }
        set duration(value: DurationRules) {
            pb_1.Message.setWrapperField(this, 21, value);
        }
        get timestamp() {
            return pb_1.Message.getWrapperField(this, TimestampRules, 22) as TimestampRules;
        }
        set timestamp(value: TimestampRules) {
            pb_1.Message.setWrapperField(this, 22, value);
        }
        toObject() {
            var data: {
                message?: ReturnType<typeof MessageRules.prototype.toObject>;
                float?: ReturnType<typeof FloatRules.prototype.toObject>;
                double?: ReturnType<typeof DoubleRules.prototype.toObject>;
                int32?: ReturnType<typeof Int32Rules.prototype.toObject>;
                int64?: ReturnType<typeof Int64Rules.prototype.toObject>;
                uint32?: ReturnType<typeof UInt32Rules.prototype.toObject>;
                uint64?: ReturnType<typeof UInt64Rules.prototype.toObject>;
                sint32?: ReturnType<typeof SInt32Rules.prototype.toObject>;
                sint64?: ReturnType<typeof SInt64Rules.prototype.toObject>;
                fixed32?: ReturnType<typeof Fixed32Rules.prototype.toObject>;
                fixed64?: ReturnType<typeof Fixed64Rules.prototype.toObject>;
                sfixed32?: ReturnType<typeof SFixed32Rules.prototype.toObject>;
                sfixed64?: ReturnType<typeof SFixed64Rules.prototype.toObject>;
                bool?: ReturnType<typeof BoolRules.prototype.toObject>;
                string?: ReturnType<typeof StringRules.prototype.toObject>;
                bytes?: ReturnType<typeof BytesRules.prototype.toObject>;
                enum?: ReturnType<typeof EnumRules.prototype.toObject>;
                repeated?: ReturnType<typeof RepeatedRules.prototype.toObject>;
                map?: ReturnType<typeof MapRules.prototype.toObject>;
                any?: ReturnType<typeof AnyRules.prototype.toObject>;
                duration?: ReturnType<typeof DurationRules.prototype.toObject>;
                timestamp?: ReturnType<typeof TimestampRules.prototype.toObject>;
            } = {};
            if (this.message != null) {
                data.message = this.message.toObject();
            }
            if (this.float != null) {
                data.float = this.float.toObject();
            }
            if (this.double != null) {
                data.double = this.double.toObject();
            }
            if (this.int32 != null) {
                data.int32 = this.int32.toObject();
            }
            if (this.int64 != null) {
                data.int64 = this.int64.toObject();
            }
            if (this.uint32 != null) {
                data.uint32 = this.uint32.toObject();
            }
            if (this.uint64 != null) {
                data.uint64 = this.uint64.toObject();
            }
            if (this.sint32 != null) {
                data.sint32 = this.sint32.toObject();
            }
            if (this.sint64 != null) {
                data.sint64 = this.sint64.toObject();
            }
            if (this.fixed32 != null) {
                data.fixed32 = this.fixed32.toObject();
            }
            if (this.fixed64 != null) {
                data.fixed64 = this.fixed64.toObject();
            }
            if (this.sfixed32 != null) {
                data.sfixed32 = this.sfixed32.toObject();
            }
            if (this.sfixed64 != null) {
                data.sfixed64 = this.sfixed64.toObject();
            }
            if (this.bool != null) {
                data.bool = this.bool.toObject();
            }
            if (this.string != null) {
                data.string = this.string.toObject();
            }
            if (this.bytes != null) {
                data.bytes = this.bytes.toObject();
            }
            if (this.enum != null) {
                data.enum = this.enum.toObject();
            }
            if (this.repeated != null) {
                data.repeated = this.repeated.toObject();
            }
            if (this.map != null) {
                data.map = this.map.toObject();
            }
            if (this.any != null) {
                data.any = this.any.toObject();
            }
            if (this.duration != null) {
                data.duration = this.duration.toObject();
            }
            if (this.timestamp != null) {
                data.timestamp = this.timestamp.toObject();
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.message !== undefined)
                writer.writeMessage(17, this.message, () => this.message.serialize(writer));
            if (this.float !== undefined)
                writer.writeMessage(1, this.float, () => this.float.serialize(writer));
            if (this.double !== undefined)
                writer.writeMessage(2, this.double, () => this.double.serialize(writer));
            if (this.int32 !== undefined)
                writer.writeMessage(3, this.int32, () => this.int32.serialize(writer));
            if (this.int64 !== undefined)
                writer.writeMessage(4, this.int64, () => this.int64.serialize(writer));
            if (this.uint32 !== undefined)
                writer.writeMessage(5, this.uint32, () => this.uint32.serialize(writer));
            if (this.uint64 !== undefined)
                writer.writeMessage(6, this.uint64, () => this.uint64.serialize(writer));
            if (this.sint32 !== undefined)
                writer.writeMessage(7, this.sint32, () => this.sint32.serialize(writer));
            if (this.sint64 !== undefined)
                writer.writeMessage(8, this.sint64, () => this.sint64.serialize(writer));
            if (this.fixed32 !== undefined)
                writer.writeMessage(9, this.fixed32, () => this.fixed32.serialize(writer));
            if (this.fixed64 !== undefined)
                writer.writeMessage(10, this.fixed64, () => this.fixed64.serialize(writer));
            if (this.sfixed32 !== undefined)
                writer.writeMessage(11, this.sfixed32, () => this.sfixed32.serialize(writer));
            if (this.sfixed64 !== undefined)
                writer.writeMessage(12, this.sfixed64, () => this.sfixed64.serialize(writer));
            if (this.bool !== undefined)
                writer.writeMessage(13, this.bool, () => this.bool.serialize(writer));
            if (this.string !== undefined)
                writer.writeMessage(14, this.string, () => this.string.serialize(writer));
            if (this.bytes !== undefined)
                writer.writeMessage(15, this.bytes, () => this.bytes.serialize(writer));
            if (this.enum !== undefined)
                writer.writeMessage(16, this.enum, () => this.enum.serialize(writer));
            if (this.repeated !== undefined)
                writer.writeMessage(18, this.repeated, () => this.repeated.serialize(writer));
            if (this.map !== undefined)
                writer.writeMessage(19, this.map, () => this.map.serialize(writer));
            if (this.any !== undefined)
                writer.writeMessage(20, this.any, () => this.any.serialize(writer));
            if (this.duration !== undefined)
                writer.writeMessage(21, this.duration, () => this.duration.serialize(writer));
            if (this.timestamp !== undefined)
                writer.writeMessage(22, this.timestamp, () => this.timestamp.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): FieldRules {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new FieldRules();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 17:
                        reader.readMessage(message.message, () => message.message = MessageRules.deserialize(reader));
                        break;
                    case 1:
                        reader.readMessage(message.float, () => message.float = FloatRules.deserialize(reader));
                        break;
                    case 2:
                        reader.readMessage(message.double, () => message.double = DoubleRules.deserialize(reader));
                        break;
                    case 3:
                        reader.readMessage(message.int32, () => message.int32 = Int32Rules.deserialize(reader));
                        break;
                    case 4:
                        reader.readMessage(message.int64, () => message.int64 = Int64Rules.deserialize(reader));
                        break;
                    case 5:
                        reader.readMessage(message.uint32, () => message.uint32 = UInt32Rules.deserialize(reader));
                        break;
                    case 6:
                        reader.readMessage(message.uint64, () => message.uint64 = UInt64Rules.deserialize(reader));
                        break;
                    case 7:
                        reader.readMessage(message.sint32, () => message.sint32 = SInt32Rules.deserialize(reader));
                        break;
                    case 8:
                        reader.readMessage(message.sint64, () => message.sint64 = SInt64Rules.deserialize(reader));
                        break;
                    case 9:
                        reader.readMessage(message.fixed32, () => message.fixed32 = Fixed32Rules.deserialize(reader));
                        break;
                    case 10:
                        reader.readMessage(message.fixed64, () => message.fixed64 = Fixed64Rules.deserialize(reader));
                        break;
                    case 11:
                        reader.readMessage(message.sfixed32, () => message.sfixed32 = SFixed32Rules.deserialize(reader));
                        break;
                    case 12:
                        reader.readMessage(message.sfixed64, () => message.sfixed64 = SFixed64Rules.deserialize(reader));
                        break;
                    case 13:
                        reader.readMessage(message.bool, () => message.bool = BoolRules.deserialize(reader));
                        break;
                    case 14:
                        reader.readMessage(message.string, () => message.string = StringRules.deserialize(reader));
                        break;
                    case 15:
                        reader.readMessage(message.bytes, () => message.bytes = BytesRules.deserialize(reader));
                        break;
                    case 16:
                        reader.readMessage(message.enum, () => message.enum = EnumRules.deserialize(reader));
                        break;
                    case 18:
                        reader.readMessage(message.repeated, () => message.repeated = RepeatedRules.deserialize(reader));
                        break;
                    case 19:
                        reader.readMessage(message.map, () => message.map = MapRules.deserialize(reader));
                        break;
                    case 20:
                        reader.readMessage(message.any, () => message.any = AnyRules.deserialize(reader));
                        break;
                    case 21:
                        reader.readMessage(message.duration, () => message.duration = DurationRules.deserialize(reader));
                        break;
                    case 22:
                        reader.readMessage(message.timestamp, () => message.timestamp = TimestampRules.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): FieldRules {
            return FieldRules.deserialize(bytes);
        }
    }
    export class FloatRules extends pb_1.Message {
        constructor(data?: any[] | {
            const?: number;
            lt?: number;
            lte?: number;
            gt?: number;
            gte?: number;
            in: number[];
            not_in: number[];
            ignore_empty?: boolean;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [6, 7], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("const" in data && data.const != undefined) {
                    this.const = data.const;
                }
                if ("lt" in data && data.lt != undefined) {
                    this.lt = data.lt;
                }
                if ("lte" in data && data.lte != undefined) {
                    this.lte = data.lte;
                }
                if ("gt" in data && data.gt != undefined) {
                    this.gt = data.gt;
                }
                if ("gte" in data && data.gte != undefined) {
                    this.gte = data.gte;
                }
                this.in = data.in;
                this.not_in = data.not_in;
                if ("ignore_empty" in data && data.ignore_empty != undefined) {
                    this.ignore_empty = data.ignore_empty;
                }
            }
        }
        get const() {
            return pb_1.Message.getField(this, 1) as number;
        }
        set const(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get lt() {
            return pb_1.Message.getField(this, 2) as number;
        }
        set lt(value: number) {
            pb_1.Message.setField(this, 2, value);
        }
        get lte() {
            return pb_1.Message.getField(this, 3) as number;
        }
        set lte(value: number) {
            pb_1.Message.setField(this, 3, value);
        }
        get gt() {
            return pb_1.Message.getField(this, 4) as number;
        }
        set gt(value: number) {
            pb_1.Message.setField(this, 4, value);
        }
        get gte() {
            return pb_1.Message.getField(this, 5) as number;
        }
        set gte(value: number) {
            pb_1.Message.setField(this, 5, value);
        }
        get in() {
            return pb_1.Message.getField(this, 6) as number[];
        }
        set in(value: number[]) {
            pb_1.Message.setField(this, 6, value);
        }
        get not_in() {
            return pb_1.Message.getField(this, 7) as number[];
        }
        set not_in(value: number[]) {
            pb_1.Message.setField(this, 7, value);
        }
        get ignore_empty() {
            return pb_1.Message.getField(this, 8) as boolean;
        }
        set ignore_empty(value: boolean) {
            pb_1.Message.setField(this, 8, value);
        }
        toObject() {
            var data: {
                const?: number;
                lt?: number;
                lte?: number;
                gt?: number;
                gte?: number;
                in: number[];
                not_in: number[];
                ignore_empty?: boolean;
            } = {
                in: this.in,
                not_in: this.not_in
            };
            if (this.const != null) {
                data.const = this.const;
            }
            if (this.lt != null) {
                data.lt = this.lt;
            }
            if (this.lte != null) {
                data.lte = this.lte;
            }
            if (this.gt != null) {
                data.gt = this.gt;
            }
            if (this.gte != null) {
                data.gte = this.gte;
            }
            if (this.ignore_empty != null) {
                data.ignore_empty = this.ignore_empty;
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.const !== undefined)
                writer.writeFloat(1, this.const);
            if (this.lt !== undefined)
                writer.writeFloat(2, this.lt);
            if (this.lte !== undefined)
                writer.writeFloat(3, this.lte);
            if (this.gt !== undefined)
                writer.writeFloat(4, this.gt);
            if (this.gte !== undefined)
                writer.writeFloat(5, this.gte);
            if (this.in !== undefined)
                writer.writePackedFloat(6, this.in);
            if (this.not_in !== undefined)
                writer.writePackedFloat(7, this.not_in);
            if (this.ignore_empty !== undefined)
                writer.writeBool(8, this.ignore_empty);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): FloatRules {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new FloatRules();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.const = reader.readFloat();
                        break;
                    case 2:
                        message.lt = reader.readFloat();
                        break;
                    case 3:
                        message.lte = reader.readFloat();
                        break;
                    case 4:
                        message.gt = reader.readFloat();
                        break;
                    case 5:
                        message.gte = reader.readFloat();
                        break;
                    case 6:
                        message.in = reader.readPackedFloat();
                        break;
                    case 7:
                        message.not_in = reader.readPackedFloat();
                        break;
                    case 8:
                        message.ignore_empty = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): FloatRules {
            return FloatRules.deserialize(bytes);
        }
    }
    export class DoubleRules extends pb_1.Message {
        constructor(data?: any[] | {
            const?: number;
            lt?: number;
            lte?: number;
            gt?: number;
            gte?: number;
            in: number[];
            not_in: number[];
            ignore_empty?: boolean;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [6, 7], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("const" in data && data.const != undefined) {
                    this.const = data.const;
                }
                if ("lt" in data && data.lt != undefined) {
                    this.lt = data.lt;
                }
                if ("lte" in data && data.lte != undefined) {
                    this.lte = data.lte;
                }
                if ("gt" in data && data.gt != undefined) {
                    this.gt = data.gt;
                }
                if ("gte" in data && data.gte != undefined) {
                    this.gte = data.gte;
                }
                this.in = data.in;
                this.not_in = data.not_in;
                if ("ignore_empty" in data && data.ignore_empty != undefined) {
                    this.ignore_empty = data.ignore_empty;
                }
            }
        }
        get const() {
            return pb_1.Message.getField(this, 1) as number;
        }
        set const(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get lt() {
            return pb_1.Message.getField(this, 2) as number;
        }
        set lt(value: number) {
            pb_1.Message.setField(this, 2, value);
        }
        get lte() {
            return pb_1.Message.getField(this, 3) as number;
        }
        set lte(value: number) {
            pb_1.Message.setField(this, 3, value);
        }
        get gt() {
            return pb_1.Message.getField(this, 4) as number;
        }
        set gt(value: number) {
            pb_1.Message.setField(this, 4, value);
        }
        get gte() {
            return pb_1.Message.getField(this, 5) as number;
        }
        set gte(value: number) {
            pb_1.Message.setField(this, 5, value);
        }
        get in() {
            return pb_1.Message.getField(this, 6) as number[];
        }
        set in(value: number[]) {
            pb_1.Message.setField(this, 6, value);
        }
        get not_in() {
            return pb_1.Message.getField(this, 7) as number[];
        }
        set not_in(value: number[]) {
            pb_1.Message.setField(this, 7, value);
        }
        get ignore_empty() {
            return pb_1.Message.getField(this, 8) as boolean;
        }
        set ignore_empty(value: boolean) {
            pb_1.Message.setField(this, 8, value);
        }
        toObject() {
            var data: {
                const?: number;
                lt?: number;
                lte?: number;
                gt?: number;
                gte?: number;
                in: number[];
                not_in: number[];
                ignore_empty?: boolean;
            } = {
                in: this.in,
                not_in: this.not_in
            };
            if (this.const != null) {
                data.const = this.const;
            }
            if (this.lt != null) {
                data.lt = this.lt;
            }
            if (this.lte != null) {
                data.lte = this.lte;
            }
            if (this.gt != null) {
                data.gt = this.gt;
            }
            if (this.gte != null) {
                data.gte = this.gte;
            }
            if (this.ignore_empty != null) {
                data.ignore_empty = this.ignore_empty;
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.const !== undefined)
                writer.writeDouble(1, this.const);
            if (this.lt !== undefined)
                writer.writeDouble(2, this.lt);
            if (this.lte !== undefined)
                writer.writeDouble(3, this.lte);
            if (this.gt !== undefined)
                writer.writeDouble(4, this.gt);
            if (this.gte !== undefined)
                writer.writeDouble(5, this.gte);
            if (this.in !== undefined)
                writer.writePackedDouble(6, this.in);
            if (this.not_in !== undefined)
                writer.writePackedDouble(7, this.not_in);
            if (this.ignore_empty !== undefined)
                writer.writeBool(8, this.ignore_empty);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DoubleRules {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new DoubleRules();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.const = reader.readDouble();
                        break;
                    case 2:
                        message.lt = reader.readDouble();
                        break;
                    case 3:
                        message.lte = reader.readDouble();
                        break;
                    case 4:
                        message.gt = reader.readDouble();
                        break;
                    case 5:
                        message.gte = reader.readDouble();
                        break;
                    case 6:
                        message.in = reader.readPackedDouble();
                        break;
                    case 7:
                        message.not_in = reader.readPackedDouble();
                        break;
                    case 8:
                        message.ignore_empty = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): DoubleRules {
            return DoubleRules.deserialize(bytes);
        }
    }
    export class Int32Rules extends pb_1.Message {
        constructor(data?: any[] | {
            const?: number;
            lt?: number;
            lte?: number;
            gt?: number;
            gte?: number;
            in: number[];
            not_in: number[];
            ignore_empty?: boolean;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [6, 7], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("const" in data && data.const != undefined) {
                    this.const = data.const;
                }
                if ("lt" in data && data.lt != undefined) {
                    this.lt = data.lt;
                }
                if ("lte" in data && data.lte != undefined) {
                    this.lte = data.lte;
                }
                if ("gt" in data && data.gt != undefined) {
                    this.gt = data.gt;
                }
                if ("gte" in data && data.gte != undefined) {
                    this.gte = data.gte;
                }
                this.in = data.in;
                this.not_in = data.not_in;
                if ("ignore_empty" in data && data.ignore_empty != undefined) {
                    this.ignore_empty = data.ignore_empty;
                }
            }
        }
        get const() {
            return pb_1.Message.getField(this, 1) as number;
        }
        set const(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get lt() {
            return pb_1.Message.getField(this, 2) as number;
        }
        set lt(value: number) {
            pb_1.Message.setField(this, 2, value);
        }
        get lte() {
            return pb_1.Message.getField(this, 3) as number;
        }
        set lte(value: number) {
            pb_1.Message.setField(this, 3, value);
        }
        get gt() {
            return pb_1.Message.getField(this, 4) as number;
        }
        set gt(value: number) {
            pb_1.Message.setField(this, 4, value);
        }
        get gte() {
            return pb_1.Message.getField(this, 5) as number;
        }
        set gte(value: number) {
            pb_1.Message.setField(this, 5, value);
        }
        get in() {
            return pb_1.Message.getField(this, 6) as number[];
        }
        set in(value: number[]) {
            pb_1.Message.setField(this, 6, value);
        }
        get not_in() {
            return pb_1.Message.getField(this, 7) as number[];
        }
        set not_in(value: number[]) {
            pb_1.Message.setField(this, 7, value);
        }
        get ignore_empty() {
            return pb_1.Message.getField(this, 8) as boolean;
        }
        set ignore_empty(value: boolean) {
            pb_1.Message.setField(this, 8, value);
        }
        toObject() {
            var data: {
                const?: number;
                lt?: number;
                lte?: number;
                gt?: number;
                gte?: number;
                in: number[];
                not_in: number[];
                ignore_empty?: boolean;
            } = {
                in: this.in,
                not_in: this.not_in
            };
            if (this.const != null) {
                data.const = this.const;
            }
            if (this.lt != null) {
                data.lt = this.lt;
            }
            if (this.lte != null) {
                data.lte = this.lte;
            }
            if (this.gt != null) {
                data.gt = this.gt;
            }
            if (this.gte != null) {
                data.gte = this.gte;
            }
            if (this.ignore_empty != null) {
                data.ignore_empty = this.ignore_empty;
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.const !== undefined)
                writer.writeInt32(1, this.const);
            if (this.lt !== undefined)
                writer.writeInt32(2, this.lt);
            if (this.lte !== undefined)
                writer.writeInt32(3, this.lte);
            if (this.gt !== undefined)
                writer.writeInt32(4, this.gt);
            if (this.gte !== undefined)
                writer.writeInt32(5, this.gte);
            if (this.in !== undefined)
                writer.writePackedInt32(6, this.in);
            if (this.not_in !== undefined)
                writer.writePackedInt32(7, this.not_in);
            if (this.ignore_empty !== undefined)
                writer.writeBool(8, this.ignore_empty);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Int32Rules {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new Int32Rules();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.const = reader.readInt32();
                        break;
                    case 2:
                        message.lt = reader.readInt32();
                        break;
                    case 3:
                        message.lte = reader.readInt32();
                        break;
                    case 4:
                        message.gt = reader.readInt32();
                        break;
                    case 5:
                        message.gte = reader.readInt32();
                        break;
                    case 6:
                        message.in = reader.readPackedInt32();
                        break;
                    case 7:
                        message.not_in = reader.readPackedInt32();
                        break;
                    case 8:
                        message.ignore_empty = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): Int32Rules {
            return Int32Rules.deserialize(bytes);
        }
    }
    export class Int64Rules extends pb_1.Message {
        constructor(data?: any[] | {
            const?: number;
            lt?: number;
            lte?: number;
            gt?: number;
            gte?: number;
            in: number[];
            not_in: number[];
            ignore_empty?: boolean;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [6, 7], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("const" in data && data.const != undefined) {
                    this.const = data.const;
                }
                if ("lt" in data && data.lt != undefined) {
                    this.lt = data.lt;
                }
                if ("lte" in data && data.lte != undefined) {
                    this.lte = data.lte;
                }
                if ("gt" in data && data.gt != undefined) {
                    this.gt = data.gt;
                }
                if ("gte" in data && data.gte != undefined) {
                    this.gte = data.gte;
                }
                this.in = data.in;
                this.not_in = data.not_in;
                if ("ignore_empty" in data && data.ignore_empty != undefined) {
                    this.ignore_empty = data.ignore_empty;
                }
            }
        }
        get const() {
            return pb_1.Message.getField(this, 1) as number;
        }
        set const(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get lt() {
            return pb_1.Message.getField(this, 2) as number;
        }
        set lt(value: number) {
            pb_1.Message.setField(this, 2, value);
        }
        get lte() {
            return pb_1.Message.getField(this, 3) as number;
        }
        set lte(value: number) {
            pb_1.Message.setField(this, 3, value);
        }
        get gt() {
            return pb_1.Message.getField(this, 4) as number;
        }
        set gt(value: number) {
            pb_1.Message.setField(this, 4, value);
        }
        get gte() {
            return pb_1.Message.getField(this, 5) as number;
        }
        set gte(value: number) {
            pb_1.Message.setField(this, 5, value);
        }
        get in() {
            return pb_1.Message.getField(this, 6) as number[];
        }
        set in(value: number[]) {
            pb_1.Message.setField(this, 6, value);
        }
        get not_in() {
            return pb_1.Message.getField(this, 7) as number[];
        }
        set not_in(value: number[]) {
            pb_1.Message.setField(this, 7, value);
        }
        get ignore_empty() {
            return pb_1.Message.getField(this, 8) as boolean;
        }
        set ignore_empty(value: boolean) {
            pb_1.Message.setField(this, 8, value);
        }
        toObject() {
            var data: {
                const?: number;
                lt?: number;
                lte?: number;
                gt?: number;
                gte?: number;
                in: number[];
                not_in: number[];
                ignore_empty?: boolean;
            } = {
                in: this.in,
                not_in: this.not_in
            };
            if (this.const != null) {
                data.const = this.const;
            }
            if (this.lt != null) {
                data.lt = this.lt;
            }
            if (this.lte != null) {
                data.lte = this.lte;
            }
            if (this.gt != null) {
                data.gt = this.gt;
            }
            if (this.gte != null) {
                data.gte = this.gte;
            }
            if (this.ignore_empty != null) {
                data.ignore_empty = this.ignore_empty;
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.const !== undefined)
                writer.writeInt64(1, this.const);
            if (this.lt !== undefined)
                writer.writeInt64(2, this.lt);
            if (this.lte !== undefined)
                writer.writeInt64(3, this.lte);
            if (this.gt !== undefined)
                writer.writeInt64(4, this.gt);
            if (this.gte !== undefined)
                writer.writeInt64(5, this.gte);
            if (this.in !== undefined)
                writer.writePackedInt64(6, this.in);
            if (this.not_in !== undefined)
                writer.writePackedInt64(7, this.not_in);
            if (this.ignore_empty !== undefined)
                writer.writeBool(8, this.ignore_empty);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Int64Rules {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new Int64Rules();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.const = reader.readInt64();
                        break;
                    case 2:
                        message.lt = reader.readInt64();
                        break;
                    case 3:
                        message.lte = reader.readInt64();
                        break;
                    case 4:
                        message.gt = reader.readInt64();
                        break;
                    case 5:
                        message.gte = reader.readInt64();
                        break;
                    case 6:
                        message.in = reader.readPackedInt64();
                        break;
                    case 7:
                        message.not_in = reader.readPackedInt64();
                        break;
                    case 8:
                        message.ignore_empty = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): Int64Rules {
            return Int64Rules.deserialize(bytes);
        }
    }
    export class UInt32Rules extends pb_1.Message {
        constructor(data?: any[] | {
            const?: number;
            lt?: number;
            lte?: number;
            gt?: number;
            gte?: number;
            in: number[];
            not_in: number[];
            ignore_empty?: boolean;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [6, 7], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("const" in data && data.const != undefined) {
                    this.const = data.const;
                }
                if ("lt" in data && data.lt != undefined) {
                    this.lt = data.lt;
                }
                if ("lte" in data && data.lte != undefined) {
                    this.lte = data.lte;
                }
                if ("gt" in data && data.gt != undefined) {
                    this.gt = data.gt;
                }
                if ("gte" in data && data.gte != undefined) {
                    this.gte = data.gte;
                }
                this.in = data.in;
                this.not_in = data.not_in;
                if ("ignore_empty" in data && data.ignore_empty != undefined) {
                    this.ignore_empty = data.ignore_empty;
                }
            }
        }
        get const() {
            return pb_1.Message.getField(this, 1) as number;
        }
        set const(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get lt() {
            return pb_1.Message.getField(this, 2) as number;
        }
        set lt(value: number) {
            pb_1.Message.setField(this, 2, value);
        }
        get lte() {
            return pb_1.Message.getField(this, 3) as number;
        }
        set lte(value: number) {
            pb_1.Message.setField(this, 3, value);
        }
        get gt() {
            return pb_1.Message.getField(this, 4) as number;
        }
        set gt(value: number) {
            pb_1.Message.setField(this, 4, value);
        }
        get gte() {
            return pb_1.Message.getField(this, 5) as number;
        }
        set gte(value: number) {
            pb_1.Message.setField(this, 5, value);
        }
        get in() {
            return pb_1.Message.getField(this, 6) as number[];
        }
        set in(value: number[]) {
            pb_1.Message.setField(this, 6, value);
        }
        get not_in() {
            return pb_1.Message.getField(this, 7) as number[];
        }
        set not_in(value: number[]) {
            pb_1.Message.setField(this, 7, value);
        }
        get ignore_empty() {
            return pb_1.Message.getField(this, 8) as boolean;
        }
        set ignore_empty(value: boolean) {
            pb_1.Message.setField(this, 8, value);
        }
        toObject() {
            var data: {
                const?: number;
                lt?: number;
                lte?: number;
                gt?: number;
                gte?: number;
                in: number[];
                not_in: number[];
                ignore_empty?: boolean;
            } = {
                in: this.in,
                not_in: this.not_in
            };
            if (this.const != null) {
                data.const = this.const;
            }
            if (this.lt != null) {
                data.lt = this.lt;
            }
            if (this.lte != null) {
                data.lte = this.lte;
            }
            if (this.gt != null) {
                data.gt = this.gt;
            }
            if (this.gte != null) {
                data.gte = this.gte;
            }
            if (this.ignore_empty != null) {
                data.ignore_empty = this.ignore_empty;
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.const !== undefined)
                writer.writeUint32(1, this.const);
            if (this.lt !== undefined)
                writer.writeUint32(2, this.lt);
            if (this.lte !== undefined)
                writer.writeUint32(3, this.lte);
            if (this.gt !== undefined)
                writer.writeUint32(4, this.gt);
            if (this.gte !== undefined)
                writer.writeUint32(5, this.gte);
            if (this.in !== undefined)
                writer.writePackedUint32(6, this.in);
            if (this.not_in !== undefined)
                writer.writePackedUint32(7, this.not_in);
            if (this.ignore_empty !== undefined)
                writer.writeBool(8, this.ignore_empty);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): UInt32Rules {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new UInt32Rules();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.const = reader.readUint32();
                        break;
                    case 2:
                        message.lt = reader.readUint32();
                        break;
                    case 3:
                        message.lte = reader.readUint32();
                        break;
                    case 4:
                        message.gt = reader.readUint32();
                        break;
                    case 5:
                        message.gte = reader.readUint32();
                        break;
                    case 6:
                        message.in = reader.readPackedUint32();
                        break;
                    case 7:
                        message.not_in = reader.readPackedUint32();
                        break;
                    case 8:
                        message.ignore_empty = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): UInt32Rules {
            return UInt32Rules.deserialize(bytes);
        }
    }
    export class UInt64Rules extends pb_1.Message {
        constructor(data?: any[] | {
            const?: number;
            lt?: number;
            lte?: number;
            gt?: number;
            gte?: number;
            in: number[];
            not_in: number[];
            ignore_empty?: boolean;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [6, 7], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("const" in data && data.const != undefined) {
                    this.const = data.const;
                }
                if ("lt" in data && data.lt != undefined) {
                    this.lt = data.lt;
                }
                if ("lte" in data && data.lte != undefined) {
                    this.lte = data.lte;
                }
                if ("gt" in data && data.gt != undefined) {
                    this.gt = data.gt;
                }
                if ("gte" in data && data.gte != undefined) {
                    this.gte = data.gte;
                }
                this.in = data.in;
                this.not_in = data.not_in;
                if ("ignore_empty" in data && data.ignore_empty != undefined) {
                    this.ignore_empty = data.ignore_empty;
                }
            }
        }
        get const() {
            return pb_1.Message.getField(this, 1) as number;
        }
        set const(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get lt() {
            return pb_1.Message.getField(this, 2) as number;
        }
        set lt(value: number) {
            pb_1.Message.setField(this, 2, value);
        }
        get lte() {
            return pb_1.Message.getField(this, 3) as number;
        }
        set lte(value: number) {
            pb_1.Message.setField(this, 3, value);
        }
        get gt() {
            return pb_1.Message.getField(this, 4) as number;
        }
        set gt(value: number) {
            pb_1.Message.setField(this, 4, value);
        }
        get gte() {
            return pb_1.Message.getField(this, 5) as number;
        }
        set gte(value: number) {
            pb_1.Message.setField(this, 5, value);
        }
        get in() {
            return pb_1.Message.getField(this, 6) as number[];
        }
        set in(value: number[]) {
            pb_1.Message.setField(this, 6, value);
        }
        get not_in() {
            return pb_1.Message.getField(this, 7) as number[];
        }
        set not_in(value: number[]) {
            pb_1.Message.setField(this, 7, value);
        }
        get ignore_empty() {
            return pb_1.Message.getField(this, 8) as boolean;
        }
        set ignore_empty(value: boolean) {
            pb_1.Message.setField(this, 8, value);
        }
        toObject() {
            var data: {
                const?: number;
                lt?: number;
                lte?: number;
                gt?: number;
                gte?: number;
                in: number[];
                not_in: number[];
                ignore_empty?: boolean;
            } = {
                in: this.in,
                not_in: this.not_in
            };
            if (this.const != null) {
                data.const = this.const;
            }
            if (this.lt != null) {
                data.lt = this.lt;
            }
            if (this.lte != null) {
                data.lte = this.lte;
            }
            if (this.gt != null) {
                data.gt = this.gt;
            }
            if (this.gte != null) {
                data.gte = this.gte;
            }
            if (this.ignore_empty != null) {
                data.ignore_empty = this.ignore_empty;
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.const !== undefined)
                writer.writeUint64(1, this.const);
            if (this.lt !== undefined)
                writer.writeUint64(2, this.lt);
            if (this.lte !== undefined)
                writer.writeUint64(3, this.lte);
            if (this.gt !== undefined)
                writer.writeUint64(4, this.gt);
            if (this.gte !== undefined)
                writer.writeUint64(5, this.gte);
            if (this.in !== undefined)
                writer.writePackedUint64(6, this.in);
            if (this.not_in !== undefined)
                writer.writePackedUint64(7, this.not_in);
            if (this.ignore_empty !== undefined)
                writer.writeBool(8, this.ignore_empty);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): UInt64Rules {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new UInt64Rules();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.const = reader.readUint64();
                        break;
                    case 2:
                        message.lt = reader.readUint64();
                        break;
                    case 3:
                        message.lte = reader.readUint64();
                        break;
                    case 4:
                        message.gt = reader.readUint64();
                        break;
                    case 5:
                        message.gte = reader.readUint64();
                        break;
                    case 6:
                        message.in = reader.readPackedUint64();
                        break;
                    case 7:
                        message.not_in = reader.readPackedUint64();
                        break;
                    case 8:
                        message.ignore_empty = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): UInt64Rules {
            return UInt64Rules.deserialize(bytes);
        }
    }
    export class SInt32Rules extends pb_1.Message {
        constructor(data?: any[] | {
            const?: number;
            lt?: number;
            lte?: number;
            gt?: number;
            gte?: number;
            in: number[];
            not_in: number[];
            ignore_empty?: boolean;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [6, 7], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("const" in data && data.const != undefined) {
                    this.const = data.const;
                }
                if ("lt" in data && data.lt != undefined) {
                    this.lt = data.lt;
                }
                if ("lte" in data && data.lte != undefined) {
                    this.lte = data.lte;
                }
                if ("gt" in data && data.gt != undefined) {
                    this.gt = data.gt;
                }
                if ("gte" in data && data.gte != undefined) {
                    this.gte = data.gte;
                }
                this.in = data.in;
                this.not_in = data.not_in;
                if ("ignore_empty" in data && data.ignore_empty != undefined) {
                    this.ignore_empty = data.ignore_empty;
                }
            }
        }
        get const() {
            return pb_1.Message.getField(this, 1) as number;
        }
        set const(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get lt() {
            return pb_1.Message.getField(this, 2) as number;
        }
        set lt(value: number) {
            pb_1.Message.setField(this, 2, value);
        }
        get lte() {
            return pb_1.Message.getField(this, 3) as number;
        }
        set lte(value: number) {
            pb_1.Message.setField(this, 3, value);
        }
        get gt() {
            return pb_1.Message.getField(this, 4) as number;
        }
        set gt(value: number) {
            pb_1.Message.setField(this, 4, value);
        }
        get gte() {
            return pb_1.Message.getField(this, 5) as number;
        }
        set gte(value: number) {
            pb_1.Message.setField(this, 5, value);
        }
        get in() {
            return pb_1.Message.getField(this, 6) as number[];
        }
        set in(value: number[]) {
            pb_1.Message.setField(this, 6, value);
        }
        get not_in() {
            return pb_1.Message.getField(this, 7) as number[];
        }
        set not_in(value: number[]) {
            pb_1.Message.setField(this, 7, value);
        }
        get ignore_empty() {
            return pb_1.Message.getField(this, 8) as boolean;
        }
        set ignore_empty(value: boolean) {
            pb_1.Message.setField(this, 8, value);
        }
        toObject() {
            var data: {
                const?: number;
                lt?: number;
                lte?: number;
                gt?: number;
                gte?: number;
                in: number[];
                not_in: number[];
                ignore_empty?: boolean;
            } = {
                in: this.in,
                not_in: this.not_in
            };
            if (this.const != null) {
                data.const = this.const;
            }
            if (this.lt != null) {
                data.lt = this.lt;
            }
            if (this.lte != null) {
                data.lte = this.lte;
            }
            if (this.gt != null) {
                data.gt = this.gt;
            }
            if (this.gte != null) {
                data.gte = this.gte;
            }
            if (this.ignore_empty != null) {
                data.ignore_empty = this.ignore_empty;
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.const !== undefined)
                writer.writeSint32(1, this.const);
            if (this.lt !== undefined)
                writer.writeSint32(2, this.lt);
            if (this.lte !== undefined)
                writer.writeSint32(3, this.lte);
            if (this.gt !== undefined)
                writer.writeSint32(4, this.gt);
            if (this.gte !== undefined)
                writer.writeSint32(5, this.gte);
            if (this.in !== undefined)
                writer.writePackedSint32(6, this.in);
            if (this.not_in !== undefined)
                writer.writePackedSint32(7, this.not_in);
            if (this.ignore_empty !== undefined)
                writer.writeBool(8, this.ignore_empty);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SInt32Rules {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new SInt32Rules();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.const = reader.readSint32();
                        break;
                    case 2:
                        message.lt = reader.readSint32();
                        break;
                    case 3:
                        message.lte = reader.readSint32();
                        break;
                    case 4:
                        message.gt = reader.readSint32();
                        break;
                    case 5:
                        message.gte = reader.readSint32();
                        break;
                    case 6:
                        message.in = reader.readPackedSint32();
                        break;
                    case 7:
                        message.not_in = reader.readPackedSint32();
                        break;
                    case 8:
                        message.ignore_empty = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): SInt32Rules {
            return SInt32Rules.deserialize(bytes);
        }
    }
    export class SInt64Rules extends pb_1.Message {
        constructor(data?: any[] | {
            const?: number;
            lt?: number;
            lte?: number;
            gt?: number;
            gte?: number;
            in: number[];
            not_in: number[];
            ignore_empty?: boolean;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [6, 7], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("const" in data && data.const != undefined) {
                    this.const = data.const;
                }
                if ("lt" in data && data.lt != undefined) {
                    this.lt = data.lt;
                }
                if ("lte" in data && data.lte != undefined) {
                    this.lte = data.lte;
                }
                if ("gt" in data && data.gt != undefined) {
                    this.gt = data.gt;
                }
                if ("gte" in data && data.gte != undefined) {
                    this.gte = data.gte;
                }
                this.in = data.in;
                this.not_in = data.not_in;
                if ("ignore_empty" in data && data.ignore_empty != undefined) {
                    this.ignore_empty = data.ignore_empty;
                }
            }
        }
        get const() {
            return pb_1.Message.getField(this, 1) as number;
        }
        set const(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get lt() {
            return pb_1.Message.getField(this, 2) as number;
        }
        set lt(value: number) {
            pb_1.Message.setField(this, 2, value);
        }
        get lte() {
            return pb_1.Message.getField(this, 3) as number;
        }
        set lte(value: number) {
            pb_1.Message.setField(this, 3, value);
        }
        get gt() {
            return pb_1.Message.getField(this, 4) as number;
        }
        set gt(value: number) {
            pb_1.Message.setField(this, 4, value);
        }
        get gte() {
            return pb_1.Message.getField(this, 5) as number;
        }
        set gte(value: number) {
            pb_1.Message.setField(this, 5, value);
        }
        get in() {
            return pb_1.Message.getField(this, 6) as number[];
        }
        set in(value: number[]) {
            pb_1.Message.setField(this, 6, value);
        }
        get not_in() {
            return pb_1.Message.getField(this, 7) as number[];
        }
        set not_in(value: number[]) {
            pb_1.Message.setField(this, 7, value);
        }
        get ignore_empty() {
            return pb_1.Message.getField(this, 8) as boolean;
        }
        set ignore_empty(value: boolean) {
            pb_1.Message.setField(this, 8, value);
        }
        toObject() {
            var data: {
                const?: number;
                lt?: number;
                lte?: number;
                gt?: number;
                gte?: number;
                in: number[];
                not_in: number[];
                ignore_empty?: boolean;
            } = {
                in: this.in,
                not_in: this.not_in
            };
            if (this.const != null) {
                data.const = this.const;
            }
            if (this.lt != null) {
                data.lt = this.lt;
            }
            if (this.lte != null) {
                data.lte = this.lte;
            }
            if (this.gt != null) {
                data.gt = this.gt;
            }
            if (this.gte != null) {
                data.gte = this.gte;
            }
            if (this.ignore_empty != null) {
                data.ignore_empty = this.ignore_empty;
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.const !== undefined)
                writer.writeSint64(1, this.const);
            if (this.lt !== undefined)
                writer.writeSint64(2, this.lt);
            if (this.lte !== undefined)
                writer.writeSint64(3, this.lte);
            if (this.gt !== undefined)
                writer.writeSint64(4, this.gt);
            if (this.gte !== undefined)
                writer.writeSint64(5, this.gte);
            if (this.in !== undefined)
                writer.writePackedSint64(6, this.in);
            if (this.not_in !== undefined)
                writer.writePackedSint64(7, this.not_in);
            if (this.ignore_empty !== undefined)
                writer.writeBool(8, this.ignore_empty);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SInt64Rules {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new SInt64Rules();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.const = reader.readSint64();
                        break;
                    case 2:
                        message.lt = reader.readSint64();
                        break;
                    case 3:
                        message.lte = reader.readSint64();
                        break;
                    case 4:
                        message.gt = reader.readSint64();
                        break;
                    case 5:
                        message.gte = reader.readSint64();
                        break;
                    case 6:
                        message.in = reader.readPackedSint64();
                        break;
                    case 7:
                        message.not_in = reader.readPackedSint64();
                        break;
                    case 8:
                        message.ignore_empty = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): SInt64Rules {
            return SInt64Rules.deserialize(bytes);
        }
    }
    export class Fixed32Rules extends pb_1.Message {
        constructor(data?: any[] | {
            const?: number;
            lt?: number;
            lte?: number;
            gt?: number;
            gte?: number;
            in: number[];
            not_in: number[];
            ignore_empty?: boolean;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [6, 7], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("const" in data && data.const != undefined) {
                    this.const = data.const;
                }
                if ("lt" in data && data.lt != undefined) {
                    this.lt = data.lt;
                }
                if ("lte" in data && data.lte != undefined) {
                    this.lte = data.lte;
                }
                if ("gt" in data && data.gt != undefined) {
                    this.gt = data.gt;
                }
                if ("gte" in data && data.gte != undefined) {
                    this.gte = data.gte;
                }
                this.in = data.in;
                this.not_in = data.not_in;
                if ("ignore_empty" in data && data.ignore_empty != undefined) {
                    this.ignore_empty = data.ignore_empty;
                }
            }
        }
        get const() {
            return pb_1.Message.getField(this, 1) as number;
        }
        set const(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get lt() {
            return pb_1.Message.getField(this, 2) as number;
        }
        set lt(value: number) {
            pb_1.Message.setField(this, 2, value);
        }
        get lte() {
            return pb_1.Message.getField(this, 3) as number;
        }
        set lte(value: number) {
            pb_1.Message.setField(this, 3, value);
        }
        get gt() {
            return pb_1.Message.getField(this, 4) as number;
        }
        set gt(value: number) {
            pb_1.Message.setField(this, 4, value);
        }
        get gte() {
            return pb_1.Message.getField(this, 5) as number;
        }
        set gte(value: number) {
            pb_1.Message.setField(this, 5, value);
        }
        get in() {
            return pb_1.Message.getField(this, 6) as number[];
        }
        set in(value: number[]) {
            pb_1.Message.setField(this, 6, value);
        }
        get not_in() {
            return pb_1.Message.getField(this, 7) as number[];
        }
        set not_in(value: number[]) {
            pb_1.Message.setField(this, 7, value);
        }
        get ignore_empty() {
            return pb_1.Message.getField(this, 8) as boolean;
        }
        set ignore_empty(value: boolean) {
            pb_1.Message.setField(this, 8, value);
        }
        toObject() {
            var data: {
                const?: number;
                lt?: number;
                lte?: number;
                gt?: number;
                gte?: number;
                in: number[];
                not_in: number[];
                ignore_empty?: boolean;
            } = {
                in: this.in,
                not_in: this.not_in
            };
            if (this.const != null) {
                data.const = this.const;
            }
            if (this.lt != null) {
                data.lt = this.lt;
            }
            if (this.lte != null) {
                data.lte = this.lte;
            }
            if (this.gt != null) {
                data.gt = this.gt;
            }
            if (this.gte != null) {
                data.gte = this.gte;
            }
            if (this.ignore_empty != null) {
                data.ignore_empty = this.ignore_empty;
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.const !== undefined)
                writer.writeFixed32(1, this.const);
            if (this.lt !== undefined)
                writer.writeFixed32(2, this.lt);
            if (this.lte !== undefined)
                writer.writeFixed32(3, this.lte);
            if (this.gt !== undefined)
                writer.writeFixed32(4, this.gt);
            if (this.gte !== undefined)
                writer.writeFixed32(5, this.gte);
            if (this.in !== undefined)
                writer.writePackedFixed32(6, this.in);
            if (this.not_in !== undefined)
                writer.writePackedFixed32(7, this.not_in);
            if (this.ignore_empty !== undefined)
                writer.writeBool(8, this.ignore_empty);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Fixed32Rules {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new Fixed32Rules();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.const = reader.readFixed32();
                        break;
                    case 2:
                        message.lt = reader.readFixed32();
                        break;
                    case 3:
                        message.lte = reader.readFixed32();
                        break;
                    case 4:
                        message.gt = reader.readFixed32();
                        break;
                    case 5:
                        message.gte = reader.readFixed32();
                        break;
                    case 6:
                        message.in = reader.readPackedFixed32();
                        break;
                    case 7:
                        message.not_in = reader.readPackedFixed32();
                        break;
                    case 8:
                        message.ignore_empty = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): Fixed32Rules {
            return Fixed32Rules.deserialize(bytes);
        }
    }
    export class Fixed64Rules extends pb_1.Message {
        constructor(data?: any[] | {
            const?: number;
            lt?: number;
            lte?: number;
            gt?: number;
            gte?: number;
            in: number[];
            not_in: number[];
            ignore_empty?: boolean;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [6, 7], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("const" in data && data.const != undefined) {
                    this.const = data.const;
                }
                if ("lt" in data && data.lt != undefined) {
                    this.lt = data.lt;
                }
                if ("lte" in data && data.lte != undefined) {
                    this.lte = data.lte;
                }
                if ("gt" in data && data.gt != undefined) {
                    this.gt = data.gt;
                }
                if ("gte" in data && data.gte != undefined) {
                    this.gte = data.gte;
                }
                this.in = data.in;
                this.not_in = data.not_in;
                if ("ignore_empty" in data && data.ignore_empty != undefined) {
                    this.ignore_empty = data.ignore_empty;
                }
            }
        }
        get const() {
            return pb_1.Message.getField(this, 1) as number;
        }
        set const(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get lt() {
            return pb_1.Message.getField(this, 2) as number;
        }
        set lt(value: number) {
            pb_1.Message.setField(this, 2, value);
        }
        get lte() {
            return pb_1.Message.getField(this, 3) as number;
        }
        set lte(value: number) {
            pb_1.Message.setField(this, 3, value);
        }
        get gt() {
            return pb_1.Message.getField(this, 4) as number;
        }
        set gt(value: number) {
            pb_1.Message.setField(this, 4, value);
        }
        get gte() {
            return pb_1.Message.getField(this, 5) as number;
        }
        set gte(value: number) {
            pb_1.Message.setField(this, 5, value);
        }
        get in() {
            return pb_1.Message.getField(this, 6) as number[];
        }
        set in(value: number[]) {
            pb_1.Message.setField(this, 6, value);
        }
        get not_in() {
            return pb_1.Message.getField(this, 7) as number[];
        }
        set not_in(value: number[]) {
            pb_1.Message.setField(this, 7, value);
        }
        get ignore_empty() {
            return pb_1.Message.getField(this, 8) as boolean;
        }
        set ignore_empty(value: boolean) {
            pb_1.Message.setField(this, 8, value);
        }
        toObject() {
            var data: {
                const?: number;
                lt?: number;
                lte?: number;
                gt?: number;
                gte?: number;
                in: number[];
                not_in: number[];
                ignore_empty?: boolean;
            } = {
                in: this.in,
                not_in: this.not_in
            };
            if (this.const != null) {
                data.const = this.const;
            }
            if (this.lt != null) {
                data.lt = this.lt;
            }
            if (this.lte != null) {
                data.lte = this.lte;
            }
            if (this.gt != null) {
                data.gt = this.gt;
            }
            if (this.gte != null) {
                data.gte = this.gte;
            }
            if (this.ignore_empty != null) {
                data.ignore_empty = this.ignore_empty;
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.const !== undefined)
                writer.writeFixed64(1, this.const);
            if (this.lt !== undefined)
                writer.writeFixed64(2, this.lt);
            if (this.lte !== undefined)
                writer.writeFixed64(3, this.lte);
            if (this.gt !== undefined)
                writer.writeFixed64(4, this.gt);
            if (this.gte !== undefined)
                writer.writeFixed64(5, this.gte);
            if (this.in !== undefined)
                writer.writePackedFixed64(6, this.in);
            if (this.not_in !== undefined)
                writer.writePackedFixed64(7, this.not_in);
            if (this.ignore_empty !== undefined)
                writer.writeBool(8, this.ignore_empty);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Fixed64Rules {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new Fixed64Rules();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.const = reader.readFixed64();
                        break;
                    case 2:
                        message.lt = reader.readFixed64();
                        break;
                    case 3:
                        message.lte = reader.readFixed64();
                        break;
                    case 4:
                        message.gt = reader.readFixed64();
                        break;
                    case 5:
                        message.gte = reader.readFixed64();
                        break;
                    case 6:
                        message.in = reader.readPackedFixed64();
                        break;
                    case 7:
                        message.not_in = reader.readPackedFixed64();
                        break;
                    case 8:
                        message.ignore_empty = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): Fixed64Rules {
            return Fixed64Rules.deserialize(bytes);
        }
    }
    export class SFixed32Rules extends pb_1.Message {
        constructor(data?: any[] | {
            const?: number;
            lt?: number;
            lte?: number;
            gt?: number;
            gte?: number;
            in: number[];
            not_in: number[];
            ignore_empty?: boolean;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [6, 7], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("const" in data && data.const != undefined) {
                    this.const = data.const;
                }
                if ("lt" in data && data.lt != undefined) {
                    this.lt = data.lt;
                }
                if ("lte" in data && data.lte != undefined) {
                    this.lte = data.lte;
                }
                if ("gt" in data && data.gt != undefined) {
                    this.gt = data.gt;
                }
                if ("gte" in data && data.gte != undefined) {
                    this.gte = data.gte;
                }
                this.in = data.in;
                this.not_in = data.not_in;
                if ("ignore_empty" in data && data.ignore_empty != undefined) {
                    this.ignore_empty = data.ignore_empty;
                }
            }
        }
        get const() {
            return pb_1.Message.getField(this, 1) as number;
        }
        set const(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get lt() {
            return pb_1.Message.getField(this, 2) as number;
        }
        set lt(value: number) {
            pb_1.Message.setField(this, 2, value);
        }
        get lte() {
            return pb_1.Message.getField(this, 3) as number;
        }
        set lte(value: number) {
            pb_1.Message.setField(this, 3, value);
        }
        get gt() {
            return pb_1.Message.getField(this, 4) as number;
        }
        set gt(value: number) {
            pb_1.Message.setField(this, 4, value);
        }
        get gte() {
            return pb_1.Message.getField(this, 5) as number;
        }
        set gte(value: number) {
            pb_1.Message.setField(this, 5, value);
        }
        get in() {
            return pb_1.Message.getField(this, 6) as number[];
        }
        set in(value: number[]) {
            pb_1.Message.setField(this, 6, value);
        }
        get not_in() {
            return pb_1.Message.getField(this, 7) as number[];
        }
        set not_in(value: number[]) {
            pb_1.Message.setField(this, 7, value);
        }
        get ignore_empty() {
            return pb_1.Message.getField(this, 8) as boolean;
        }
        set ignore_empty(value: boolean) {
            pb_1.Message.setField(this, 8, value);
        }
        toObject() {
            var data: {
                const?: number;
                lt?: number;
                lte?: number;
                gt?: number;
                gte?: number;
                in: number[];
                not_in: number[];
                ignore_empty?: boolean;
            } = {
                in: this.in,
                not_in: this.not_in
            };
            if (this.const != null) {
                data.const = this.const;
            }
            if (this.lt != null) {
                data.lt = this.lt;
            }
            if (this.lte != null) {
                data.lte = this.lte;
            }
            if (this.gt != null) {
                data.gt = this.gt;
            }
            if (this.gte != null) {
                data.gte = this.gte;
            }
            if (this.ignore_empty != null) {
                data.ignore_empty = this.ignore_empty;
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.const !== undefined)
                writer.writeSfixed32(1, this.const);
            if (this.lt !== undefined)
                writer.writeSfixed32(2, this.lt);
            if (this.lte !== undefined)
                writer.writeSfixed32(3, this.lte);
            if (this.gt !== undefined)
                writer.writeSfixed32(4, this.gt);
            if (this.gte !== undefined)
                writer.writeSfixed32(5, this.gte);
            if (this.in !== undefined)
                writer.writePackedSfixed32(6, this.in);
            if (this.not_in !== undefined)
                writer.writePackedSfixed32(7, this.not_in);
            if (this.ignore_empty !== undefined)
                writer.writeBool(8, this.ignore_empty);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SFixed32Rules {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new SFixed32Rules();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.const = reader.readSfixed32();
                        break;
                    case 2:
                        message.lt = reader.readSfixed32();
                        break;
                    case 3:
                        message.lte = reader.readSfixed32();
                        break;
                    case 4:
                        message.gt = reader.readSfixed32();
                        break;
                    case 5:
                        message.gte = reader.readSfixed32();
                        break;
                    case 6:
                        message.in = reader.readPackedSfixed32();
                        break;
                    case 7:
                        message.not_in = reader.readPackedSfixed32();
                        break;
                    case 8:
                        message.ignore_empty = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): SFixed32Rules {
            return SFixed32Rules.deserialize(bytes);
        }
    }
    export class SFixed64Rules extends pb_1.Message {
        constructor(data?: any[] | {
            const?: number;
            lt?: number;
            lte?: number;
            gt?: number;
            gte?: number;
            in: number[];
            not_in: number[];
            ignore_empty?: boolean;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [6, 7], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("const" in data && data.const != undefined) {
                    this.const = data.const;
                }
                if ("lt" in data && data.lt != undefined) {
                    this.lt = data.lt;
                }
                if ("lte" in data && data.lte != undefined) {
                    this.lte = data.lte;
                }
                if ("gt" in data && data.gt != undefined) {
                    this.gt = data.gt;
                }
                if ("gte" in data && data.gte != undefined) {
                    this.gte = data.gte;
                }
                this.in = data.in;
                this.not_in = data.not_in;
                if ("ignore_empty" in data && data.ignore_empty != undefined) {
                    this.ignore_empty = data.ignore_empty;
                }
            }
        }
        get const() {
            return pb_1.Message.getField(this, 1) as number;
        }
        set const(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get lt() {
            return pb_1.Message.getField(this, 2) as number;
        }
        set lt(value: number) {
            pb_1.Message.setField(this, 2, value);
        }
        get lte() {
            return pb_1.Message.getField(this, 3) as number;
        }
        set lte(value: number) {
            pb_1.Message.setField(this, 3, value);
        }
        get gt() {
            return pb_1.Message.getField(this, 4) as number;
        }
        set gt(value: number) {
            pb_1.Message.setField(this, 4, value);
        }
        get gte() {
            return pb_1.Message.getField(this, 5) as number;
        }
        set gte(value: number) {
            pb_1.Message.setField(this, 5, value);
        }
        get in() {
            return pb_1.Message.getField(this, 6) as number[];
        }
        set in(value: number[]) {
            pb_1.Message.setField(this, 6, value);
        }
        get not_in() {
            return pb_1.Message.getField(this, 7) as number[];
        }
        set not_in(value: number[]) {
            pb_1.Message.setField(this, 7, value);
        }
        get ignore_empty() {
            return pb_1.Message.getField(this, 8) as boolean;
        }
        set ignore_empty(value: boolean) {
            pb_1.Message.setField(this, 8, value);
        }
        toObject() {
            var data: {
                const?: number;
                lt?: number;
                lte?: number;
                gt?: number;
                gte?: number;
                in: number[];
                not_in: number[];
                ignore_empty?: boolean;
            } = {
                in: this.in,
                not_in: this.not_in
            };
            if (this.const != null) {
                data.const = this.const;
            }
            if (this.lt != null) {
                data.lt = this.lt;
            }
            if (this.lte != null) {
                data.lte = this.lte;
            }
            if (this.gt != null) {
                data.gt = this.gt;
            }
            if (this.gte != null) {
                data.gte = this.gte;
            }
            if (this.ignore_empty != null) {
                data.ignore_empty = this.ignore_empty;
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.const !== undefined)
                writer.writeSfixed64(1, this.const);
            if (this.lt !== undefined)
                writer.writeSfixed64(2, this.lt);
            if (this.lte !== undefined)
                writer.writeSfixed64(3, this.lte);
            if (this.gt !== undefined)
                writer.writeSfixed64(4, this.gt);
            if (this.gte !== undefined)
                writer.writeSfixed64(5, this.gte);
            if (this.in !== undefined)
                writer.writePackedSfixed64(6, this.in);
            if (this.not_in !== undefined)
                writer.writePackedSfixed64(7, this.not_in);
            if (this.ignore_empty !== undefined)
                writer.writeBool(8, this.ignore_empty);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SFixed64Rules {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new SFixed64Rules();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.const = reader.readSfixed64();
                        break;
                    case 2:
                        message.lt = reader.readSfixed64();
                        break;
                    case 3:
                        message.lte = reader.readSfixed64();
                        break;
                    case 4:
                        message.gt = reader.readSfixed64();
                        break;
                    case 5:
                        message.gte = reader.readSfixed64();
                        break;
                    case 6:
                        message.in = reader.readPackedSfixed64();
                        break;
                    case 7:
                        message.not_in = reader.readPackedSfixed64();
                        break;
                    case 8:
                        message.ignore_empty = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): SFixed64Rules {
            return SFixed64Rules.deserialize(bytes);
        }
    }
    export class BoolRules extends pb_1.Message {
        constructor(data?: any[] | {
            const?: boolean;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("const" in data && data.const != undefined) {
                    this.const = data.const;
                }
            }
        }
        get const() {
            return pb_1.Message.getField(this, 1) as boolean;
        }
        set const(value: boolean) {
            pb_1.Message.setField(this, 1, value);
        }
        toObject() {
            var data: {
                const?: boolean;
            } = {};
            if (this.const != null) {
                data.const = this.const;
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.const !== undefined)
                writer.writeBool(1, this.const);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BoolRules {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new BoolRules();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.const = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): BoolRules {
            return BoolRules.deserialize(bytes);
        }
    }
    export class StringRules extends pb_1.Message {
        constructor(data?: any[] | ({
            const?: string;
            len?: number;
            min_len?: number;
            max_len?: number;
            len_bytes?: number;
            min_bytes?: number;
            max_bytes?: number;
            pattern?: string;
            prefix?: string;
            suffix?: string;
            contains?: string;
            not_contains?: string;
            in: string[];
            not_in: string[];
            strict?: boolean;
            ignore_empty?: boolean;
        } & (({
            email: boolean;
            hostname?: never;
            ip?: never;
            ipv4?: never;
            ipv6?: never;
            uri?: never;
            uri_ref?: never;
            address?: never;
            uuid?: never;
            well_known_regex?: never;
        } | {
            email?: never;
            hostname: boolean;
            ip?: never;
            ipv4?: never;
            ipv6?: never;
            uri?: never;
            uri_ref?: never;
            address?: never;
            uuid?: never;
            well_known_regex?: never;
        } | {
            email?: never;
            hostname?: never;
            ip: boolean;
            ipv4?: never;
            ipv6?: never;
            uri?: never;
            uri_ref?: never;
            address?: never;
            uuid?: never;
            well_known_regex?: never;
        } | {
            email?: never;
            hostname?: never;
            ip?: never;
            ipv4: boolean;
            ipv6?: never;
            uri?: never;
            uri_ref?: never;
            address?: never;
            uuid?: never;
            well_known_regex?: never;
        } | {
            email?: never;
            hostname?: never;
            ip?: never;
            ipv4?: never;
            ipv6: boolean;
            uri?: never;
            uri_ref?: never;
            address?: never;
            uuid?: never;
            well_known_regex?: never;
        } | {
            email?: never;
            hostname?: never;
            ip?: never;
            ipv4?: never;
            ipv6?: never;
            uri: boolean;
            uri_ref?: never;
            address?: never;
            uuid?: never;
            well_known_regex?: never;
        } | {
            email?: never;
            hostname?: never;
            ip?: never;
            ipv4?: never;
            ipv6?: never;
            uri?: never;
            uri_ref: boolean;
            address?: never;
            uuid?: never;
            well_known_regex?: never;
        } | {
            email?: never;
            hostname?: never;
            ip?: never;
            ipv4?: never;
            ipv6?: never;
            uri?: never;
            uri_ref?: never;
            address: boolean;
            uuid?: never;
            well_known_regex?: never;
        } | {
            email?: never;
            hostname?: never;
            ip?: never;
            ipv4?: never;
            ipv6?: never;
            uri?: never;
            uri_ref?: never;
            address?: never;
            uuid: boolean;
            well_known_regex?: never;
        } | {
            email?: never;
            hostname?: never;
            ip?: never;
            ipv4?: never;
            ipv6?: never;
            uri?: never;
            uri_ref?: never;
            address?: never;
            uuid?: never;
            well_known_regex: KnownRegex;
        })))) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [10, 11], [[12, 13, 14, 15, 16, 17, 18, 21, 22, 24]]);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("const" in data && data.const != undefined) {
                    this.const = data.const;
                }
                if ("len" in data && data.len != undefined) {
                    this.len = data.len;
                }
                if ("min_len" in data && data.min_len != undefined) {
                    this.min_len = data.min_len;
                }
                if ("max_len" in data && data.max_len != undefined) {
                    this.max_len = data.max_len;
                }
                if ("len_bytes" in data && data.len_bytes != undefined) {
                    this.len_bytes = data.len_bytes;
                }
                if ("min_bytes" in data && data.min_bytes != undefined) {
                    this.min_bytes = data.min_bytes;
                }
                if ("max_bytes" in data && data.max_bytes != undefined) {
                    this.max_bytes = data.max_bytes;
                }
                if ("pattern" in data && data.pattern != undefined) {
                    this.pattern = data.pattern;
                }
                if ("prefix" in data && data.prefix != undefined) {
                    this.prefix = data.prefix;
                }
                if ("suffix" in data && data.suffix != undefined) {
                    this.suffix = data.suffix;
                }
                if ("contains" in data && data.contains != undefined) {
                    this.contains = data.contains;
                }
                if ("not_contains" in data && data.not_contains != undefined) {
                    this.not_contains = data.not_contains;
                }
                this.in = data.in;
                this.not_in = data.not_in;
                if ("email" in data && data.email != undefined) {
                    this.email = data.email;
                }
                if ("hostname" in data && data.hostname != undefined) {
                    this.hostname = data.hostname;
                }
                if ("ip" in data && data.ip != undefined) {
                    this.ip = data.ip;
                }
                if ("ipv4" in data && data.ipv4 != undefined) {
                    this.ipv4 = data.ipv4;
                }
                if ("ipv6" in data && data.ipv6 != undefined) {
                    this.ipv6 = data.ipv6;
                }
                if ("uri" in data && data.uri != undefined) {
                    this.uri = data.uri;
                }
                if ("uri_ref" in data && data.uri_ref != undefined) {
                    this.uri_ref = data.uri_ref;
                }
                if ("address" in data && data.address != undefined) {
                    this.address = data.address;
                }
                if ("uuid" in data && data.uuid != undefined) {
                    this.uuid = data.uuid;
                }
                if ("well_known_regex" in data && data.well_known_regex != undefined) {
                    this.well_known_regex = data.well_known_regex;
                }
                if ("strict" in data && data.strict != undefined) {
                    this.strict = data.strict;
                }
                if ("ignore_empty" in data && data.ignore_empty != undefined) {
                    this.ignore_empty = data.ignore_empty;
                }
            }
        }
        get const() {
            return pb_1.Message.getField(this, 1) as string;
        }
        set const(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        get len() {
            return pb_1.Message.getField(this, 19) as number;
        }
        set len(value: number) {
            pb_1.Message.setField(this, 19, value);
        }
        get min_len() {
            return pb_1.Message.getField(this, 2) as number;
        }
        set min_len(value: number) {
            pb_1.Message.setField(this, 2, value);
        }
        get max_len() {
            return pb_1.Message.getField(this, 3) as number;
        }
        set max_len(value: number) {
            pb_1.Message.setField(this, 3, value);
        }
        get len_bytes() {
            return pb_1.Message.getField(this, 20) as number;
        }
        set len_bytes(value: number) {
            pb_1.Message.setField(this, 20, value);
        }
        get min_bytes() {
            return pb_1.Message.getField(this, 4) as number;
        }
        set min_bytes(value: number) {
            pb_1.Message.setField(this, 4, value);
        }
        get max_bytes() {
            return pb_1.Message.getField(this, 5) as number;
        }
        set max_bytes(value: number) {
            pb_1.Message.setField(this, 5, value);
        }
        get pattern() {
            return pb_1.Message.getField(this, 6) as string;
        }
        set pattern(value: string) {
            pb_1.Message.setField(this, 6, value);
        }
        get prefix() {
            return pb_1.Message.getField(this, 7) as string;
        }
        set prefix(value: string) {
            pb_1.Message.setField(this, 7, value);
        }
        get suffix() {
            return pb_1.Message.getField(this, 8) as string;
        }
        set suffix(value: string) {
            pb_1.Message.setField(this, 8, value);
        }
        get contains() {
            return pb_1.Message.getField(this, 9) as string;
        }
        set contains(value: string) {
            pb_1.Message.setField(this, 9, value);
        }
        get not_contains() {
            return pb_1.Message.getField(this, 23) as string;
        }
        set not_contains(value: string) {
            pb_1.Message.setField(this, 23, value);
        }
        get in() {
            return pb_1.Message.getField(this, 10) as string[];
        }
        set in(value: string[]) {
            pb_1.Message.setField(this, 10, value);
        }
        get not_in() {
            return pb_1.Message.getField(this, 11) as string[];
        }
        set not_in(value: string[]) {
            pb_1.Message.setField(this, 11, value);
        }
        get email() {
            return pb_1.Message.getField(this, 12) as boolean;
        }
        set email(value: boolean) {
            pb_1.Message.setField(this, 12, value);
        }
        get hostname() {
            return pb_1.Message.getField(this, 13) as boolean;
        }
        set hostname(value: boolean) {
            pb_1.Message.setField(this, 13, value);
        }
        get ip() {
            return pb_1.Message.getField(this, 14) as boolean;
        }
        set ip(value: boolean) {
            pb_1.Message.setField(this, 14, value);
        }
        get ipv4() {
            return pb_1.Message.getField(this, 15) as boolean;
        }
        set ipv4(value: boolean) {
            pb_1.Message.setField(this, 15, value);
        }
        get ipv6() {
            return pb_1.Message.getField(this, 16) as boolean;
        }
        set ipv6(value: boolean) {
            pb_1.Message.setField(this, 16, value);
        }
        get uri() {
            return pb_1.Message.getField(this, 17) as boolean;
        }
        set uri(value: boolean) {
            pb_1.Message.setField(this, 17, value);
        }
        get uri_ref() {
            return pb_1.Message.getField(this, 18) as boolean;
        }
        set uri_ref(value: boolean) {
            pb_1.Message.setField(this, 18, value);
        }
        get address() {
            return pb_1.Message.getField(this, 21) as boolean;
        }
        set address(value: boolean) {
            pb_1.Message.setField(this, 21, value);
        }
        get uuid() {
            return pb_1.Message.getField(this, 22) as boolean;
        }
        set uuid(value: boolean) {
            pb_1.Message.setField(this, 22, value);
        }
        get well_known_regex() {
            return pb_1.Message.getField(this, 24) as KnownRegex;
        }
        set well_known_regex(value: KnownRegex) {
            pb_1.Message.setField(this, 24, value);
        }
        get strict() {
            return pb_1.Message.getFieldWithDefault(this, 25, true) as boolean;
        }
        set strict(value: boolean) {
            pb_1.Message.setField(this, 25, value);
        }
        get ignore_empty() {
            return pb_1.Message.getField(this, 26) as boolean;
        }
        set ignore_empty(value: boolean) {
            pb_1.Message.setField(this, 26, value);
        }
        toObject() {
            var data: {
                const?: string;
                len?: number;
                min_len?: number;
                max_len?: number;
                len_bytes?: number;
                min_bytes?: number;
                max_bytes?: number;
                pattern?: string;
                prefix?: string;
                suffix?: string;
                contains?: string;
                not_contains?: string;
                in: string[];
                not_in: string[];
                email?: boolean;
                hostname?: boolean;
                ip?: boolean;
                ipv4?: boolean;
                ipv6?: boolean;
                uri?: boolean;
                uri_ref?: boolean;
                address?: boolean;
                uuid?: boolean;
                well_known_regex?: KnownRegex;
                strict?: boolean;
                ignore_empty?: boolean;
            } = {
                in: this.in,
                not_in: this.not_in
            };
            if (this.const != null) {
                data.const = this.const;
            }
            if (this.len != null) {
                data.len = this.len;
            }
            if (this.min_len != null) {
                data.min_len = this.min_len;
            }
            if (this.max_len != null) {
                data.max_len = this.max_len;
            }
            if (this.len_bytes != null) {
                data.len_bytes = this.len_bytes;
            }
            if (this.min_bytes != null) {
                data.min_bytes = this.min_bytes;
            }
            if (this.max_bytes != null) {
                data.max_bytes = this.max_bytes;
            }
            if (this.pattern != null) {
                data.pattern = this.pattern;
            }
            if (this.prefix != null) {
                data.prefix = this.prefix;
            }
            if (this.suffix != null) {
                data.suffix = this.suffix;
            }
            if (this.contains != null) {
                data.contains = this.contains;
            }
            if (this.not_contains != null) {
                data.not_contains = this.not_contains;
            }
            if (this.email != null) {
                data.email = this.email;
            }
            if (this.hostname != null) {
                data.hostname = this.hostname;
            }
            if (this.ip != null) {
                data.ip = this.ip;
            }
            if (this.ipv4 != null) {
                data.ipv4 = this.ipv4;
            }
            if (this.ipv6 != null) {
                data.ipv6 = this.ipv6;
            }
            if (this.uri != null) {
                data.uri = this.uri;
            }
            if (this.uri_ref != null) {
                data.uri_ref = this.uri_ref;
            }
            if (this.address != null) {
                data.address = this.address;
            }
            if (this.uuid != null) {
                data.uuid = this.uuid;
            }
            if (this.well_known_regex != null) {
                data.well_known_regex = this.well_known_regex;
            }
            if (this.strict != null) {
                data.strict = this.strict;
            }
            if (this.ignore_empty != null) {
                data.ignore_empty = this.ignore_empty;
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (typeof this.const === "string" && this.const.length)
                writer.writeString(1, this.const);
            if (this.len !== undefined)
                writer.writeUint64(19, this.len);
            if (this.min_len !== undefined)
                writer.writeUint64(2, this.min_len);
            if (this.max_len !== undefined)
                writer.writeUint64(3, this.max_len);
            if (this.len_bytes !== undefined)
                writer.writeUint64(20, this.len_bytes);
            if (this.min_bytes !== undefined)
                writer.writeUint64(4, this.min_bytes);
            if (this.max_bytes !== undefined)
                writer.writeUint64(5, this.max_bytes);
            if (typeof this.pattern === "string" && this.pattern.length)
                writer.writeString(6, this.pattern);
            if (typeof this.prefix === "string" && this.prefix.length)
                writer.writeString(7, this.prefix);
            if (typeof this.suffix === "string" && this.suffix.length)
                writer.writeString(8, this.suffix);
            if (typeof this.contains === "string" && this.contains.length)
                writer.writeString(9, this.contains);
            if (typeof this.not_contains === "string" && this.not_contains.length)
                writer.writeString(23, this.not_contains);
            if (this.in !== undefined)
                writer.writeRepeatedString(10, this.in);
            if (this.not_in !== undefined)
                writer.writeRepeatedString(11, this.not_in);
            if (this.email !== undefined)
                writer.writeBool(12, this.email);
            if (this.hostname !== undefined)
                writer.writeBool(13, this.hostname);
            if (this.ip !== undefined)
                writer.writeBool(14, this.ip);
            if (this.ipv4 !== undefined)
                writer.writeBool(15, this.ipv4);
            if (this.ipv6 !== undefined)
                writer.writeBool(16, this.ipv6);
            if (this.uri !== undefined)
                writer.writeBool(17, this.uri);
            if (this.uri_ref !== undefined)
                writer.writeBool(18, this.uri_ref);
            if (this.address !== undefined)
                writer.writeBool(21, this.address);
            if (this.uuid !== undefined)
                writer.writeBool(22, this.uuid);
            if (this.well_known_regex !== undefined)
                writer.writeEnum(24, this.well_known_regex);
            if (this.strict !== undefined)
                writer.writeBool(25, this.strict);
            if (this.ignore_empty !== undefined)
                writer.writeBool(26, this.ignore_empty);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): StringRules {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new StringRules();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.const = reader.readString();
                        break;
                    case 19:
                        message.len = reader.readUint64();
                        break;
                    case 2:
                        message.min_len = reader.readUint64();
                        break;
                    case 3:
                        message.max_len = reader.readUint64();
                        break;
                    case 20:
                        message.len_bytes = reader.readUint64();
                        break;
                    case 4:
                        message.min_bytes = reader.readUint64();
                        break;
                    case 5:
                        message.max_bytes = reader.readUint64();
                        break;
                    case 6:
                        message.pattern = reader.readString();
                        break;
                    case 7:
                        message.prefix = reader.readString();
                        break;
                    case 8:
                        message.suffix = reader.readString();
                        break;
                    case 9:
                        message.contains = reader.readString();
                        break;
                    case 23:
                        message.not_contains = reader.readString();
                        break;
                    case 10:
                        pb_1.Message.addToRepeatedField(message, 10, reader.readString());
                        break;
                    case 11:
                        pb_1.Message.addToRepeatedField(message, 11, reader.readString());
                        break;
                    case 12:
                        message.email = reader.readBool();
                        break;
                    case 13:
                        message.hostname = reader.readBool();
                        break;
                    case 14:
                        message.ip = reader.readBool();
                        break;
                    case 15:
                        message.ipv4 = reader.readBool();
                        break;
                    case 16:
                        message.ipv6 = reader.readBool();
                        break;
                    case 17:
                        message.uri = reader.readBool();
                        break;
                    case 18:
                        message.uri_ref = reader.readBool();
                        break;
                    case 21:
                        message.address = reader.readBool();
                        break;
                    case 22:
                        message.uuid = reader.readBool();
                        break;
                    case 24:
                        message.well_known_regex = reader.readEnum();
                        break;
                    case 25:
                        message.strict = reader.readBool();
                        break;
                    case 26:
                        message.ignore_empty = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): StringRules {
            return StringRules.deserialize(bytes);
        }
    }
    export class BytesRules extends pb_1.Message {
        constructor(data?: any[] | ({
            const?: Uint8Array;
            len?: number;
            min_len?: number;
            max_len?: number;
            pattern?: string;
            prefix?: Uint8Array;
            suffix?: Uint8Array;
            contains?: Uint8Array;
            in: Uint8Array[];
            not_in: Uint8Array[];
            ignore_empty?: boolean;
        } & (({
            ip: boolean;
            ipv4?: never;
            ipv6?: never;
        } | {
            ip?: never;
            ipv4: boolean;
            ipv6?: never;
        } | {
            ip?: never;
            ipv4?: never;
            ipv6: boolean;
        })))) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [8, 9], [[10, 11, 12]]);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("const" in data && data.const != undefined) {
                    this.const = data.const;
                }
                if ("len" in data && data.len != undefined) {
                    this.len = data.len;
                }
                if ("min_len" in data && data.min_len != undefined) {
                    this.min_len = data.min_len;
                }
                if ("max_len" in data && data.max_len != undefined) {
                    this.max_len = data.max_len;
                }
                if ("pattern" in data && data.pattern != undefined) {
                    this.pattern = data.pattern;
                }
                if ("prefix" in data && data.prefix != undefined) {
                    this.prefix = data.prefix;
                }
                if ("suffix" in data && data.suffix != undefined) {
                    this.suffix = data.suffix;
                }
                if ("contains" in data && data.contains != undefined) {
                    this.contains = data.contains;
                }
                this.in = data.in;
                this.not_in = data.not_in;
                if ("ip" in data && data.ip != undefined) {
                    this.ip = data.ip;
                }
                if ("ipv4" in data && data.ipv4 != undefined) {
                    this.ipv4 = data.ipv4;
                }
                if ("ipv6" in data && data.ipv6 != undefined) {
                    this.ipv6 = data.ipv6;
                }
                if ("ignore_empty" in data && data.ignore_empty != undefined) {
                    this.ignore_empty = data.ignore_empty;
                }
            }
        }
        get const() {
            return pb_1.Message.getField(this, 1) as Uint8Array;
        }
        set const(value: Uint8Array) {
            pb_1.Message.setField(this, 1, value);
        }
        get len() {
            return pb_1.Message.getField(this, 13) as number;
        }
        set len(value: number) {
            pb_1.Message.setField(this, 13, value);
        }
        get min_len() {
            return pb_1.Message.getField(this, 2) as number;
        }
        set min_len(value: number) {
            pb_1.Message.setField(this, 2, value);
        }
        get max_len() {
            return pb_1.Message.getField(this, 3) as number;
        }
        set max_len(value: number) {
            pb_1.Message.setField(this, 3, value);
        }
        get pattern() {
            return pb_1.Message.getField(this, 4) as string;
        }
        set pattern(value: string) {
            pb_1.Message.setField(this, 4, value);
        }
        get prefix() {
            return pb_1.Message.getField(this, 5) as Uint8Array;
        }
        set prefix(value: Uint8Array) {
            pb_1.Message.setField(this, 5, value);
        }
        get suffix() {
            return pb_1.Message.getField(this, 6) as Uint8Array;
        }
        set suffix(value: Uint8Array) {
            pb_1.Message.setField(this, 6, value);
        }
        get contains() {
            return pb_1.Message.getField(this, 7) as Uint8Array;
        }
        set contains(value: Uint8Array) {
            pb_1.Message.setField(this, 7, value);
        }
        get in() {
            return pb_1.Message.getField(this, 8) as Uint8Array[];
        }
        set in(value: Uint8Array[]) {
            pb_1.Message.setField(this, 8, value);
        }
        get not_in() {
            return pb_1.Message.getField(this, 9) as Uint8Array[];
        }
        set not_in(value: Uint8Array[]) {
            pb_1.Message.setField(this, 9, value);
        }
        get ip() {
            return pb_1.Message.getField(this, 10) as boolean;
        }
        set ip(value: boolean) {
            pb_1.Message.setField(this, 10, value);
        }
        get ipv4() {
            return pb_1.Message.getField(this, 11) as boolean;
        }
        set ipv4(value: boolean) {
            pb_1.Message.setField(this, 11, value);
        }
        get ipv6() {
            return pb_1.Message.getField(this, 12) as boolean;
        }
        set ipv6(value: boolean) {
            pb_1.Message.setField(this, 12, value);
        }
        get ignore_empty() {
            return pb_1.Message.getField(this, 14) as boolean;
        }
        set ignore_empty(value: boolean) {
            pb_1.Message.setField(this, 14, value);
        }
        toObject() {
            var data: {
                const?: Uint8Array;
                len?: number;
                min_len?: number;
                max_len?: number;
                pattern?: string;
                prefix?: Uint8Array;
                suffix?: Uint8Array;
                contains?: Uint8Array;
                in: Uint8Array[];
                not_in: Uint8Array[];
                ip?: boolean;
                ipv4?: boolean;
                ipv6?: boolean;
                ignore_empty?: boolean;
            } = {
                in: this.in,
                not_in: this.not_in
            };
            if (this.const != null) {
                data.const = this.const;
            }
            if (this.len != null) {
                data.len = this.len;
            }
            if (this.min_len != null) {
                data.min_len = this.min_len;
            }
            if (this.max_len != null) {
                data.max_len = this.max_len;
            }
            if (this.pattern != null) {
                data.pattern = this.pattern;
            }
            if (this.prefix != null) {
                data.prefix = this.prefix;
            }
            if (this.suffix != null) {
                data.suffix = this.suffix;
            }
            if (this.contains != null) {
                data.contains = this.contains;
            }
            if (this.ip != null) {
                data.ip = this.ip;
            }
            if (this.ipv4 != null) {
                data.ipv4 = this.ipv4;
            }
            if (this.ipv6 != null) {
                data.ipv6 = this.ipv6;
            }
            if (this.ignore_empty != null) {
                data.ignore_empty = this.ignore_empty;
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.const !== undefined)
                writer.writeBytes(1, this.const);
            if (this.len !== undefined)
                writer.writeUint64(13, this.len);
            if (this.min_len !== undefined)
                writer.writeUint64(2, this.min_len);
            if (this.max_len !== undefined)
                writer.writeUint64(3, this.max_len);
            if (typeof this.pattern === "string" && this.pattern.length)
                writer.writeString(4, this.pattern);
            if (this.prefix !== undefined)
                writer.writeBytes(5, this.prefix);
            if (this.suffix !== undefined)
                writer.writeBytes(6, this.suffix);
            if (this.contains !== undefined)
                writer.writeBytes(7, this.contains);
            if (this.in !== undefined)
                writer.writeRepeatedBytes(8, this.in);
            if (this.not_in !== undefined)
                writer.writeRepeatedBytes(9, this.not_in);
            if (this.ip !== undefined)
                writer.writeBool(10, this.ip);
            if (this.ipv4 !== undefined)
                writer.writeBool(11, this.ipv4);
            if (this.ipv6 !== undefined)
                writer.writeBool(12, this.ipv6);
            if (this.ignore_empty !== undefined)
                writer.writeBool(14, this.ignore_empty);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BytesRules {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new BytesRules();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.const = reader.readBytes();
                        break;
                    case 13:
                        message.len = reader.readUint64();
                        break;
                    case 2:
                        message.min_len = reader.readUint64();
                        break;
                    case 3:
                        message.max_len = reader.readUint64();
                        break;
                    case 4:
                        message.pattern = reader.readString();
                        break;
                    case 5:
                        message.prefix = reader.readBytes();
                        break;
                    case 6:
                        message.suffix = reader.readBytes();
                        break;
                    case 7:
                        message.contains = reader.readBytes();
                        break;
                    case 8:
                        pb_1.Message.addToRepeatedField(message, 8, reader.readBytes());
                        break;
                    case 9:
                        pb_1.Message.addToRepeatedField(message, 9, reader.readBytes());
                        break;
                    case 10:
                        message.ip = reader.readBool();
                        break;
                    case 11:
                        message.ipv4 = reader.readBool();
                        break;
                    case 12:
                        message.ipv6 = reader.readBool();
                        break;
                    case 14:
                        message.ignore_empty = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): BytesRules {
            return BytesRules.deserialize(bytes);
        }
    }
    export class EnumRules extends pb_1.Message {
        constructor(data?: any[] | {
            const?: number;
            defined_only?: boolean;
            in: number[];
            not_in: number[];
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3, 4], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("const" in data && data.const != undefined) {
                    this.const = data.const;
                }
                if ("defined_only" in data && data.defined_only != undefined) {
                    this.defined_only = data.defined_only;
                }
                this.in = data.in;
                this.not_in = data.not_in;
            }
        }
        get const() {
            return pb_1.Message.getField(this, 1) as number;
        }
        set const(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get defined_only() {
            return pb_1.Message.getField(this, 2) as boolean;
        }
        set defined_only(value: boolean) {
            pb_1.Message.setField(this, 2, value);
        }
        get in() {
            return pb_1.Message.getField(this, 3) as number[];
        }
        set in(value: number[]) {
            pb_1.Message.setField(this, 3, value);
        }
        get not_in() {
            return pb_1.Message.getField(this, 4) as number[];
        }
        set not_in(value: number[]) {
            pb_1.Message.setField(this, 4, value);
        }
        toObject() {
            var data: {
                const?: number;
                defined_only?: boolean;
                in: number[];
                not_in: number[];
            } = {
                in: this.in,
                not_in: this.not_in
            };
            if (this.const != null) {
                data.const = this.const;
            }
            if (this.defined_only != null) {
                data.defined_only = this.defined_only;
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.const !== undefined)
                writer.writeInt32(1, this.const);
            if (this.defined_only !== undefined)
                writer.writeBool(2, this.defined_only);
            if (this.in !== undefined)
                writer.writePackedInt32(3, this.in);
            if (this.not_in !== undefined)
                writer.writePackedInt32(4, this.not_in);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): EnumRules {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new EnumRules();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.const = reader.readInt32();
                        break;
                    case 2:
                        message.defined_only = reader.readBool();
                        break;
                    case 3:
                        message.in = reader.readPackedInt32();
                        break;
                    case 4:
                        message.not_in = reader.readPackedInt32();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): EnumRules {
            return EnumRules.deserialize(bytes);
        }
    }
    export class MessageRules extends pb_1.Message {
        constructor(data?: any[] | {
            skip?: boolean;
            required?: boolean;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("skip" in data && data.skip != undefined) {
                    this.skip = data.skip;
                }
                if ("required" in data && data.required != undefined) {
                    this.required = data.required;
                }
            }
        }
        get skip() {
            return pb_1.Message.getField(this, 1) as boolean;
        }
        set skip(value: boolean) {
            pb_1.Message.setField(this, 1, value);
        }
        get required() {
            return pb_1.Message.getField(this, 2) as boolean;
        }
        set required(value: boolean) {
            pb_1.Message.setField(this, 2, value);
        }
        toObject() {
            var data: {
                skip?: boolean;
                required?: boolean;
            } = {};
            if (this.skip != null) {
                data.skip = this.skip;
            }
            if (this.required != null) {
                data.required = this.required;
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.skip !== undefined)
                writer.writeBool(1, this.skip);
            if (this.required !== undefined)
                writer.writeBool(2, this.required);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MessageRules {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new MessageRules();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.skip = reader.readBool();
                        break;
                    case 2:
                        message.required = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): MessageRules {
            return MessageRules.deserialize(bytes);
        }
    }
    export class RepeatedRules extends pb_1.Message {
        constructor(data?: any[] | {
            min_items?: number;
            max_items?: number;
            unique?: boolean;
            items?: FieldRules;
            ignore_empty?: boolean;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("min_items" in data && data.min_items != undefined) {
                    this.min_items = data.min_items;
                }
                if ("max_items" in data && data.max_items != undefined) {
                    this.max_items = data.max_items;
                }
                if ("unique" in data && data.unique != undefined) {
                    this.unique = data.unique;
                }
                if ("items" in data && data.items != undefined) {
                    this.items = data.items;
                }
                if ("ignore_empty" in data && data.ignore_empty != undefined) {
                    this.ignore_empty = data.ignore_empty;
                }
            }
        }
        get min_items() {
            return pb_1.Message.getField(this, 1) as number;
        }
        set min_items(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get max_items() {
            return pb_1.Message.getField(this, 2) as number;
        }
        set max_items(value: number) {
            pb_1.Message.setField(this, 2, value);
        }
        get unique() {
            return pb_1.Message.getField(this, 3) as boolean;
        }
        set unique(value: boolean) {
            pb_1.Message.setField(this, 3, value);
        }
        get items() {
            return pb_1.Message.getWrapperField(this, FieldRules, 4) as FieldRules;
        }
        set items(value: FieldRules) {
            pb_1.Message.setWrapperField(this, 4, value);
        }
        get ignore_empty() {
            return pb_1.Message.getField(this, 5) as boolean;
        }
        set ignore_empty(value: boolean) {
            pb_1.Message.setField(this, 5, value);
        }
        toObject() {
            var data: {
                min_items?: number;
                max_items?: number;
                unique?: boolean;
                items?: ReturnType<typeof FieldRules.prototype.toObject>;
                ignore_empty?: boolean;
            } = {};
            if (this.min_items != null) {
                data.min_items = this.min_items;
            }
            if (this.max_items != null) {
                data.max_items = this.max_items;
            }
            if (this.unique != null) {
                data.unique = this.unique;
            }
            if (this.items != null) {
                data.items = this.items.toObject();
            }
            if (this.ignore_empty != null) {
                data.ignore_empty = this.ignore_empty;
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.min_items !== undefined)
                writer.writeUint64(1, this.min_items);
            if (this.max_items !== undefined)
                writer.writeUint64(2, this.max_items);
            if (this.unique !== undefined)
                writer.writeBool(3, this.unique);
            if (this.items !== undefined)
                writer.writeMessage(4, this.items, () => this.items.serialize(writer));
            if (this.ignore_empty !== undefined)
                writer.writeBool(5, this.ignore_empty);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RepeatedRules {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new RepeatedRules();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.min_items = reader.readUint64();
                        break;
                    case 2:
                        message.max_items = reader.readUint64();
                        break;
                    case 3:
                        message.unique = reader.readBool();
                        break;
                    case 4:
                        reader.readMessage(message.items, () => message.items = FieldRules.deserialize(reader));
                        break;
                    case 5:
                        message.ignore_empty = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): RepeatedRules {
            return RepeatedRules.deserialize(bytes);
        }
    }
    export class MapRules extends pb_1.Message {
        constructor(data?: any[] | {
            min_pairs?: number;
            max_pairs?: number;
            no_sparse?: boolean;
            keys?: FieldRules;
            values?: FieldRules;
            ignore_empty?: boolean;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("min_pairs" in data && data.min_pairs != undefined) {
                    this.min_pairs = data.min_pairs;
                }
                if ("max_pairs" in data && data.max_pairs != undefined) {
                    this.max_pairs = data.max_pairs;
                }
                if ("no_sparse" in data && data.no_sparse != undefined) {
                    this.no_sparse = data.no_sparse;
                }
                if ("keys" in data && data.keys != undefined) {
                    this.keys = data.keys;
                }
                if ("values" in data && data.values != undefined) {
                    this.values = data.values;
                }
                if ("ignore_empty" in data && data.ignore_empty != undefined) {
                    this.ignore_empty = data.ignore_empty;
                }
            }
        }
        get min_pairs() {
            return pb_1.Message.getField(this, 1) as number;
        }
        set min_pairs(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get max_pairs() {
            return pb_1.Message.getField(this, 2) as number;
        }
        set max_pairs(value: number) {
            pb_1.Message.setField(this, 2, value);
        }
        get no_sparse() {
            return pb_1.Message.getField(this, 3) as boolean;
        }
        set no_sparse(value: boolean) {
            pb_1.Message.setField(this, 3, value);
        }
        get keys() {
            return pb_1.Message.getWrapperField(this, FieldRules, 4) as FieldRules;
        }
        set keys(value: FieldRules) {
            pb_1.Message.setWrapperField(this, 4, value);
        }
        get values() {
            return pb_1.Message.getWrapperField(this, FieldRules, 5) as FieldRules;
        }
        set values(value: FieldRules) {
            pb_1.Message.setWrapperField(this, 5, value);
        }
        get ignore_empty() {
            return pb_1.Message.getField(this, 6) as boolean;
        }
        set ignore_empty(value: boolean) {
            pb_1.Message.setField(this, 6, value);
        }
        toObject() {
            var data: {
                min_pairs?: number;
                max_pairs?: number;
                no_sparse?: boolean;
                keys?: ReturnType<typeof FieldRules.prototype.toObject>;
                values?: ReturnType<typeof FieldRules.prototype.toObject>;
                ignore_empty?: boolean;
            } = {};
            if (this.min_pairs != null) {
                data.min_pairs = this.min_pairs;
            }
            if (this.max_pairs != null) {
                data.max_pairs = this.max_pairs;
            }
            if (this.no_sparse != null) {
                data.no_sparse = this.no_sparse;
            }
            if (this.keys != null) {
                data.keys = this.keys.toObject();
            }
            if (this.values != null) {
                data.values = this.values.toObject();
            }
            if (this.ignore_empty != null) {
                data.ignore_empty = this.ignore_empty;
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.min_pairs !== undefined)
                writer.writeUint64(1, this.min_pairs);
            if (this.max_pairs !== undefined)
                writer.writeUint64(2, this.max_pairs);
            if (this.no_sparse !== undefined)
                writer.writeBool(3, this.no_sparse);
            if (this.keys !== undefined)
                writer.writeMessage(4, this.keys, () => this.keys.serialize(writer));
            if (this.values !== undefined)
                writer.writeMessage(5, this.values, () => this.values.serialize(writer));
            if (this.ignore_empty !== undefined)
                writer.writeBool(6, this.ignore_empty);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MapRules {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new MapRules();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.min_pairs = reader.readUint64();
                        break;
                    case 2:
                        message.max_pairs = reader.readUint64();
                        break;
                    case 3:
                        message.no_sparse = reader.readBool();
                        break;
                    case 4:
                        reader.readMessage(message.keys, () => message.keys = FieldRules.deserialize(reader));
                        break;
                    case 5:
                        reader.readMessage(message.values, () => message.values = FieldRules.deserialize(reader));
                        break;
                    case 6:
                        message.ignore_empty = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): MapRules {
            return MapRules.deserialize(bytes);
        }
    }
    export class AnyRules extends pb_1.Message {
        constructor(data?: any[] | {
            required?: boolean;
            in: string[];
            not_in: string[];
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2, 3], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("required" in data && data.required != undefined) {
                    this.required = data.required;
                }
                this.in = data.in;
                this.not_in = data.not_in;
            }
        }
        get required() {
            return pb_1.Message.getField(this, 1) as boolean;
        }
        set required(value: boolean) {
            pb_1.Message.setField(this, 1, value);
        }
        get in() {
            return pb_1.Message.getField(this, 2) as string[];
        }
        set in(value: string[]) {
            pb_1.Message.setField(this, 2, value);
        }
        get not_in() {
            return pb_1.Message.getField(this, 3) as string[];
        }
        set not_in(value: string[]) {
            pb_1.Message.setField(this, 3, value);
        }
        toObject() {
            var data: {
                required?: boolean;
                in: string[];
                not_in: string[];
            } = {
                in: this.in,
                not_in: this.not_in
            };
            if (this.required != null) {
                data.required = this.required;
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.required !== undefined)
                writer.writeBool(1, this.required);
            if (this.in !== undefined)
                writer.writeRepeatedString(2, this.in);
            if (this.not_in !== undefined)
                writer.writeRepeatedString(3, this.not_in);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): AnyRules {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new AnyRules();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.required = reader.readBool();
                        break;
                    case 2:
                        pb_1.Message.addToRepeatedField(message, 2, reader.readString());
                        break;
                    case 3:
                        pb_1.Message.addToRepeatedField(message, 3, reader.readString());
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): AnyRules {
            return AnyRules.deserialize(bytes);
        }
    }
    export class DurationRules extends pb_1.Message {
        constructor(data?: any[] | {
            required?: boolean;
            const?: dep_2.google.protobuf.Duration;
            lt?: dep_2.google.protobuf.Duration;
            lte?: dep_2.google.protobuf.Duration;
            gt?: dep_2.google.protobuf.Duration;
            gte?: dep_2.google.protobuf.Duration;
            in: dep_2.google.protobuf.Duration[];
            not_in: dep_2.google.protobuf.Duration[];
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [7, 8], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("required" in data && data.required != undefined) {
                    this.required = data.required;
                }
                if ("const" in data && data.const != undefined) {
                    this.const = data.const;
                }
                if ("lt" in data && data.lt != undefined) {
                    this.lt = data.lt;
                }
                if ("lte" in data && data.lte != undefined) {
                    this.lte = data.lte;
                }
                if ("gt" in data && data.gt != undefined) {
                    this.gt = data.gt;
                }
                if ("gte" in data && data.gte != undefined) {
                    this.gte = data.gte;
                }
                this.in = data.in;
                this.not_in = data.not_in;
            }
        }
        get required() {
            return pb_1.Message.getField(this, 1) as boolean;
        }
        set required(value: boolean) {
            pb_1.Message.setField(this, 1, value);
        }
        get const() {
            return pb_1.Message.getWrapperField(this, dep_2.google.protobuf.Duration, 2) as dep_2.google.protobuf.Duration;
        }
        set const(value: dep_2.google.protobuf.Duration) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        get lt() {
            return pb_1.Message.getWrapperField(this, dep_2.google.protobuf.Duration, 3) as dep_2.google.protobuf.Duration;
        }
        set lt(value: dep_2.google.protobuf.Duration) {
            pb_1.Message.setWrapperField(this, 3, value);
        }
        get lte() {
            return pb_1.Message.getWrapperField(this, dep_2.google.protobuf.Duration, 4) as dep_2.google.protobuf.Duration;
        }
        set lte(value: dep_2.google.protobuf.Duration) {
            pb_1.Message.setWrapperField(this, 4, value);
        }
        get gt() {
            return pb_1.Message.getWrapperField(this, dep_2.google.protobuf.Duration, 5) as dep_2.google.protobuf.Duration;
        }
        set gt(value: dep_2.google.protobuf.Duration) {
            pb_1.Message.setWrapperField(this, 5, value);
        }
        get gte() {
            return pb_1.Message.getWrapperField(this, dep_2.google.protobuf.Duration, 6) as dep_2.google.protobuf.Duration;
        }
        set gte(value: dep_2.google.protobuf.Duration) {
            pb_1.Message.setWrapperField(this, 6, value);
        }
        get in() {
            return pb_1.Message.getRepeatedWrapperField(this, dep_2.google.protobuf.Duration, 7) as dep_2.google.protobuf.Duration[];
        }
        set in(value: dep_2.google.protobuf.Duration[]) {
            pb_1.Message.setRepeatedWrapperField(this, 7, value);
        }
        get not_in() {
            return pb_1.Message.getRepeatedWrapperField(this, dep_2.google.protobuf.Duration, 8) as dep_2.google.protobuf.Duration[];
        }
        set not_in(value: dep_2.google.protobuf.Duration[]) {
            pb_1.Message.setRepeatedWrapperField(this, 8, value);
        }
        toObject() {
            var data: {
                required?: boolean;
                const?: ReturnType<typeof dep_2.google.protobuf.Duration.prototype.toObject>;
                lt?: ReturnType<typeof dep_2.google.protobuf.Duration.prototype.toObject>;
                lte?: ReturnType<typeof dep_2.google.protobuf.Duration.prototype.toObject>;
                gt?: ReturnType<typeof dep_2.google.protobuf.Duration.prototype.toObject>;
                gte?: ReturnType<typeof dep_2.google.protobuf.Duration.prototype.toObject>;
                in: ReturnType<typeof dep_2.google.protobuf.Duration.prototype.toObject>[];
                not_in: ReturnType<typeof dep_2.google.protobuf.Duration.prototype.toObject>[];
            } = {
                in: this.in.map((item: dep_2.google.protobuf.Duration) => item.toObject()),
                not_in: this.not_in.map((item: dep_2.google.protobuf.Duration) => item.toObject())
            };
            if (this.required != null) {
                data.required = this.required;
            }
            if (this.const != null) {
                data.const = this.const.toObject();
            }
            if (this.lt != null) {
                data.lt = this.lt.toObject();
            }
            if (this.lte != null) {
                data.lte = this.lte.toObject();
            }
            if (this.gt != null) {
                data.gt = this.gt.toObject();
            }
            if (this.gte != null) {
                data.gte = this.gte.toObject();
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.required !== undefined)
                writer.writeBool(1, this.required);
            if (this.const !== undefined)
                writer.writeMessage(2, this.const, () => this.const.serialize(writer));
            if (this.lt !== undefined)
                writer.writeMessage(3, this.lt, () => this.lt.serialize(writer));
            if (this.lte !== undefined)
                writer.writeMessage(4, this.lte, () => this.lte.serialize(writer));
            if (this.gt !== undefined)
                writer.writeMessage(5, this.gt, () => this.gt.serialize(writer));
            if (this.gte !== undefined)
                writer.writeMessage(6, this.gte, () => this.gte.serialize(writer));
            if (this.in !== undefined)
                writer.writeRepeatedMessage(7, this.in, (item: dep_2.google.protobuf.Duration) => item.serialize(writer));
            if (this.not_in !== undefined)
                writer.writeRepeatedMessage(8, this.not_in, (item: dep_2.google.protobuf.Duration) => item.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DurationRules {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new DurationRules();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.required = reader.readBool();
                        break;
                    case 2:
                        reader.readMessage(message.const, () => message.const = dep_2.google.protobuf.Duration.deserialize(reader));
                        break;
                    case 3:
                        reader.readMessage(message.lt, () => message.lt = dep_2.google.protobuf.Duration.deserialize(reader));
                        break;
                    case 4:
                        reader.readMessage(message.lte, () => message.lte = dep_2.google.protobuf.Duration.deserialize(reader));
                        break;
                    case 5:
                        reader.readMessage(message.gt, () => message.gt = dep_2.google.protobuf.Duration.deserialize(reader));
                        break;
                    case 6:
                        reader.readMessage(message.gte, () => message.gte = dep_2.google.protobuf.Duration.deserialize(reader));
                        break;
                    case 7:
                        reader.readMessage(message.in, () => pb_1.Message.addToRepeatedWrapperField(message, 7, dep_2.google.protobuf.Duration.deserialize(reader), dep_2.google.protobuf.Duration));
                        break;
                    case 8:
                        reader.readMessage(message.not_in, () => pb_1.Message.addToRepeatedWrapperField(message, 8, dep_2.google.protobuf.Duration.deserialize(reader), dep_2.google.protobuf.Duration));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): DurationRules {
            return DurationRules.deserialize(bytes);
        }
    }
    export class TimestampRules extends pb_1.Message {
        constructor(data?: any[] | {
            required?: boolean;
            const?: dep_3.google.protobuf.Timestamp;
            lt?: dep_3.google.protobuf.Timestamp;
            lte?: dep_3.google.protobuf.Timestamp;
            gt?: dep_3.google.protobuf.Timestamp;
            gte?: dep_3.google.protobuf.Timestamp;
            lt_now?: boolean;
            gt_now?: boolean;
            within?: dep_2.google.protobuf.Duration;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("required" in data && data.required != undefined) {
                    this.required = data.required;
                }
                if ("const" in data && data.const != undefined) {
                    this.const = data.const;
                }
                if ("lt" in data && data.lt != undefined) {
                    this.lt = data.lt;
                }
                if ("lte" in data && data.lte != undefined) {
                    this.lte = data.lte;
                }
                if ("gt" in data && data.gt != undefined) {
                    this.gt = data.gt;
                }
                if ("gte" in data && data.gte != undefined) {
                    this.gte = data.gte;
                }
                if ("lt_now" in data && data.lt_now != undefined) {
                    this.lt_now = data.lt_now;
                }
                if ("gt_now" in data && data.gt_now != undefined) {
                    this.gt_now = data.gt_now;
                }
                if ("within" in data && data.within != undefined) {
                    this.within = data.within;
                }
            }
        }
        get required() {
            return pb_1.Message.getField(this, 1) as boolean;
        }
        set required(value: boolean) {
            pb_1.Message.setField(this, 1, value);
        }
        get const() {
            return pb_1.Message.getWrapperField(this, dep_3.google.protobuf.Timestamp, 2) as dep_3.google.protobuf.Timestamp;
        }
        set const(value: dep_3.google.protobuf.Timestamp) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        get lt() {
            return pb_1.Message.getWrapperField(this, dep_3.google.protobuf.Timestamp, 3) as dep_3.google.protobuf.Timestamp;
        }
        set lt(value: dep_3.google.protobuf.Timestamp) {
            pb_1.Message.setWrapperField(this, 3, value);
        }
        get lte() {
            return pb_1.Message.getWrapperField(this, dep_3.google.protobuf.Timestamp, 4) as dep_3.google.protobuf.Timestamp;
        }
        set lte(value: dep_3.google.protobuf.Timestamp) {
            pb_1.Message.setWrapperField(this, 4, value);
        }
        get gt() {
            return pb_1.Message.getWrapperField(this, dep_3.google.protobuf.Timestamp, 5) as dep_3.google.protobuf.Timestamp;
        }
        set gt(value: dep_3.google.protobuf.Timestamp) {
            pb_1.Message.setWrapperField(this, 5, value);
        }
        get gte() {
            return pb_1.Message.getWrapperField(this, dep_3.google.protobuf.Timestamp, 6) as dep_3.google.protobuf.Timestamp;
        }
        set gte(value: dep_3.google.protobuf.Timestamp) {
            pb_1.Message.setWrapperField(this, 6, value);
        }
        get lt_now() {
            return pb_1.Message.getField(this, 7) as boolean;
        }
        set lt_now(value: boolean) {
            pb_1.Message.setField(this, 7, value);
        }
        get gt_now() {
            return pb_1.Message.getField(this, 8) as boolean;
        }
        set gt_now(value: boolean) {
            pb_1.Message.setField(this, 8, value);
        }
        get within() {
            return pb_1.Message.getWrapperField(this, dep_2.google.protobuf.Duration, 9) as dep_2.google.protobuf.Duration;
        }
        set within(value: dep_2.google.protobuf.Duration) {
            pb_1.Message.setWrapperField(this, 9, value);
        }
        toObject() {
            var data: {
                required?: boolean;
                const?: ReturnType<typeof dep_3.google.protobuf.Timestamp.prototype.toObject>;
                lt?: ReturnType<typeof dep_3.google.protobuf.Timestamp.prototype.toObject>;
                lte?: ReturnType<typeof dep_3.google.protobuf.Timestamp.prototype.toObject>;
                gt?: ReturnType<typeof dep_3.google.protobuf.Timestamp.prototype.toObject>;
                gte?: ReturnType<typeof dep_3.google.protobuf.Timestamp.prototype.toObject>;
                lt_now?: boolean;
                gt_now?: boolean;
                within?: ReturnType<typeof dep_2.google.protobuf.Duration.prototype.toObject>;
            } = {};
            if (this.required != null) {
                data.required = this.required;
            }
            if (this.const != null) {
                data.const = this.const.toObject();
            }
            if (this.lt != null) {
                data.lt = this.lt.toObject();
            }
            if (this.lte != null) {
                data.lte = this.lte.toObject();
            }
            if (this.gt != null) {
                data.gt = this.gt.toObject();
            }
            if (this.gte != null) {
                data.gte = this.gte.toObject();
            }
            if (this.lt_now != null) {
                data.lt_now = this.lt_now;
            }
            if (this.gt_now != null) {
                data.gt_now = this.gt_now;
            }
            if (this.within != null) {
                data.within = this.within.toObject();
            }
            return data;
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.required !== undefined)
                writer.writeBool(1, this.required);
            if (this.const !== undefined)
                writer.writeMessage(2, this.const, () => this.const.serialize(writer));
            if (this.lt !== undefined)
                writer.writeMessage(3, this.lt, () => this.lt.serialize(writer));
            if (this.lte !== undefined)
                writer.writeMessage(4, this.lte, () => this.lte.serialize(writer));
            if (this.gt !== undefined)
                writer.writeMessage(5, this.gt, () => this.gt.serialize(writer));
            if (this.gte !== undefined)
                writer.writeMessage(6, this.gte, () => this.gte.serialize(writer));
            if (this.lt_now !== undefined)
                writer.writeBool(7, this.lt_now);
            if (this.gt_now !== undefined)
                writer.writeBool(8, this.gt_now);
            if (this.within !== undefined)
                writer.writeMessage(9, this.within, () => this.within.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TimestampRules {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new TimestampRules();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.required = reader.readBool();
                        break;
                    case 2:
                        reader.readMessage(message.const, () => message.const = dep_3.google.protobuf.Timestamp.deserialize(reader));
                        break;
                    case 3:
                        reader.readMessage(message.lt, () => message.lt = dep_3.google.protobuf.Timestamp.deserialize(reader));
                        break;
                    case 4:
                        reader.readMessage(message.lte, () => message.lte = dep_3.google.protobuf.Timestamp.deserialize(reader));
                        break;
                    case 5:
                        reader.readMessage(message.gt, () => message.gt = dep_3.google.protobuf.Timestamp.deserialize(reader));
                        break;
                    case 6:
                        reader.readMessage(message.gte, () => message.gte = dep_3.google.protobuf.Timestamp.deserialize(reader));
                        break;
                    case 7:
                        message.lt_now = reader.readBool();
                        break;
                    case 8:
                        message.gt_now = reader.readBool();
                        break;
                    case 9:
                        reader.readMessage(message.within, () => message.within = dep_2.google.protobuf.Duration.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): TimestampRules {
            return TimestampRules.deserialize(bytes);
        }
    }
}
