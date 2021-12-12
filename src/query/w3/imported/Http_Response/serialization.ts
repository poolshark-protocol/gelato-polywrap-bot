import {
  Read,
  ReadDecoder,
  Write,
  WriteSizer,
  WriteEncoder,
  Nullable,
  BigInt,
  JSON,
  Context
} from "@web3api/wasm-as";
import { Http_Response } from "./";
import * as Types from "../..";

export function serializeHttp_Response(type: Http_Response): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing)  imported object-type: Http_Response");
  const sizer = new WriteSizer(sizerContext);
  writeHttp_Response(sizer, type);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) import object-type: Http_Response");
  const encoder = new WriteEncoder(buffer, encoderContext);
  writeHttp_Response(encoder, type);
  return buffer;
}

export function writeHttp_Response(writer: Write, type: Http_Response): void {
  writer.writeMapLength(4);
  writer.context().push("status", "i32", "writing property");
  writer.writeString("status");
  writer.writeInt32(type.status);
  writer.context().pop();
  writer.context().push("statusText", "string", "writing property");
  writer.writeString("statusText");
  writer.writeString(type.statusText);
  writer.context().pop();
  writer.context().push("headers", "Array<Types.Http_Header> | null", "writing property");
  writer.writeString("headers");
  writer.writeNullableArray(type.headers, (writer: Write, item: Types.Http_Header): void => {
    Types.Http_Header.write(writer, item);
  });
  writer.context().pop();
  writer.context().push("body", "string | null", "writing property");
  writer.writeString("body");
  writer.writeNullableString(type.body);
  writer.context().pop();
}

export function deserializeHttp_Response(buffer: ArrayBuffer): Http_Response {
  const context: Context = new Context("Deserializing imported object-type Http_Response");
  const reader = new ReadDecoder(buffer, context);
  return readHttp_Response(reader);
}

export function readHttp_Response(reader: Read): Http_Response {
  let numFields = reader.readMapLength();

  let _status: i32 = 0;
  let _statusSet: bool = false;
  let _statusText: string = "";
  let _statusTextSet: bool = false;
  let _headers: Array<Types.Http_Header> | null = null;
  let _body: string | null = null;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "status") {
      reader.context().push(field, "i32", "type found, reading property");
      _status = reader.readInt32();
      _statusSet = true;
      reader.context().pop();
    }
    else if (field == "statusText") {
      reader.context().push(field, "string", "type found, reading property");
      _statusText = reader.readString();
      _statusTextSet = true;
      reader.context().pop();
    }
    else if (field == "headers") {
      reader.context().push(field, "Array<Types.Http_Header> | null", "type found, reading property");
      _headers = reader.readNullableArray((reader: Read): Types.Http_Header => {
        const object = Types.Http_Header.read(reader);
        return object;
      });
      reader.context().pop();
    }
    else if (field == "body") {
      reader.context().push(field, "string | null", "type found, reading property");
      _body = reader.readNullableString();
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_statusSet) {
    throw new Error(reader.context().printWithContext("Missing required property: 'status: Int'"));
  }
  if (!_statusTextSet) {
    throw new Error(reader.context().printWithContext("Missing required property: 'statusText: String'"));
  }

  return {
    status: _status,
    statusText: _statusText,
    headers: _headers,
    body: _body
  };
}
