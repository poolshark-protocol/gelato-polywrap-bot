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
import { Http_Request } from "./";
import * as Types from "../..";

export function serializeHttp_Request(type: Http_Request): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing)  imported object-type: Http_Request");
  const sizer = new WriteSizer(sizerContext);
  writeHttp_Request(sizer, type);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) import object-type: Http_Request");
  const encoder = new WriteEncoder(buffer, encoderContext);
  writeHttp_Request(encoder, type);
  return buffer;
}

export function writeHttp_Request(writer: Write, type: Http_Request): void {
  writer.writeMapLength(4);
  writer.context().push("headers", "Array<Types.Http_Header> | null", "writing property");
  writer.writeString("headers");
  writer.writeNullableArray(type.headers, (writer: Write, item: Types.Http_Header): void => {
    Types.Http_Header.write(writer, item);
  });
  writer.context().pop();
  writer.context().push("urlParams", "Array<Types.Http_UrlParam> | null", "writing property");
  writer.writeString("urlParams");
  writer.writeNullableArray(type.urlParams, (writer: Write, item: Types.Http_UrlParam): void => {
    Types.Http_UrlParam.write(writer, item);
  });
  writer.context().pop();
  writer.context().push("responseType", "Types.Http_ResponseType", "writing property");
  writer.writeString("responseType");
  writer.writeInt32(type.responseType);
  writer.context().pop();
  writer.context().push("body", "string | null", "writing property");
  writer.writeString("body");
  writer.writeNullableString(type.body);
  writer.context().pop();
}

export function deserializeHttp_Request(buffer: ArrayBuffer): Http_Request {
  const context: Context = new Context("Deserializing imported object-type Http_Request");
  const reader = new ReadDecoder(buffer, context);
  return readHttp_Request(reader);
}

export function readHttp_Request(reader: Read): Http_Request {
  let numFields = reader.readMapLength();

  let _headers: Array<Types.Http_Header> | null = null;
  let _urlParams: Array<Types.Http_UrlParam> | null = null;
  let _responseType: Types.Http_ResponseType = 0;
  let _responseTypeSet: bool = false;
  let _body: string | null = null;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "headers") {
      reader.context().push(field, "Array<Types.Http_Header> | null", "type found, reading property");
      _headers = reader.readNullableArray((reader: Read): Types.Http_Header => {
        const object = Types.Http_Header.read(reader);
        return object;
      });
      reader.context().pop();
    }
    else if (field == "urlParams") {
      reader.context().push(field, "Array<Types.Http_UrlParam> | null", "type found, reading property");
      _urlParams = reader.readNullableArray((reader: Read): Types.Http_UrlParam => {
        const object = Types.Http_UrlParam.read(reader);
        return object;
      });
      reader.context().pop();
    }
    else if (field == "responseType") {
      reader.context().push(field, "Types.Http_ResponseType", "type found, reading property");
      let value: Types.Http_ResponseType;
      if (reader.isNextString()) {
        value = Types.getHttp_ResponseTypeValue(reader.readString());
      } else {
        value = reader.readInt32();
        Types.sanitizeHttp_ResponseTypeValue(value);
      }
      _responseType = value;
      _responseTypeSet = true;
      reader.context().pop();
    }
    else if (field == "body") {
      reader.context().push(field, "string | null", "type found, reading property");
      _body = reader.readNullableString();
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_responseTypeSet) {
    throw new Error(reader.context().printWithContext("Missing required property: 'responseType: Http_ResponseType'"));
  }

  return {
    headers: _headers,
    urlParams: _urlParams,
    responseType: _responseType,
    body: _body
  };
}
