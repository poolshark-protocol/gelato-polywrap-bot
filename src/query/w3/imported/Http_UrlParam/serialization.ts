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
import { Http_UrlParam } from "./";
import * as Types from "../..";

export function serializeHttp_UrlParam(type: Http_UrlParam): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing)  imported object-type: Http_UrlParam");
  const sizer = new WriteSizer(sizerContext);
  writeHttp_UrlParam(sizer, type);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) import object-type: Http_UrlParam");
  const encoder = new WriteEncoder(buffer, encoderContext);
  writeHttp_UrlParam(encoder, type);
  return buffer;
}

export function writeHttp_UrlParam(writer: Write, type: Http_UrlParam): void {
  writer.writeMapLength(2);
  writer.context().push("key", "string", "writing property");
  writer.writeString("key");
  writer.writeString(type.key);
  writer.context().pop();
  writer.context().push("value", "string", "writing property");
  writer.writeString("value");
  writer.writeString(type.value);
  writer.context().pop();
}

export function deserializeHttp_UrlParam(buffer: ArrayBuffer): Http_UrlParam {
  const context: Context = new Context("Deserializing imported object-type Http_UrlParam");
  const reader = new ReadDecoder(buffer, context);
  return readHttp_UrlParam(reader);
}

export function readHttp_UrlParam(reader: Read): Http_UrlParam {
  let numFields = reader.readMapLength();

  let _key: string = "";
  let _keySet: bool = false;
  let _value: string = "";
  let _valueSet: bool = false;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "key") {
      reader.context().push(field, "string", "type found, reading property");
      _key = reader.readString();
      _keySet = true;
      reader.context().pop();
    }
    else if (field == "value") {
      reader.context().push(field, "string", "type found, reading property");
      _value = reader.readString();
      _valueSet = true;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_keySet) {
    throw new Error(reader.context().printWithContext("Missing required property: 'key: String'"));
  }
  if (!_valueSet) {
    throw new Error(reader.context().printWithContext("Missing required property: 'value: String'"));
  }

  return {
    key: _key,
    value: _value
  };
}
