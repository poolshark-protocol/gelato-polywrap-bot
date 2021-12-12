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
import { Http_Header } from "./";
import * as Types from "../..";

export function serializeHttp_Header(type: Http_Header): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing)  imported object-type: Http_Header");
  const sizer = new WriteSizer(sizerContext);
  writeHttp_Header(sizer, type);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) import object-type: Http_Header");
  const encoder = new WriteEncoder(buffer, encoderContext);
  writeHttp_Header(encoder, type);
  return buffer;
}

export function writeHttp_Header(writer: Write, type: Http_Header): void {
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

export function deserializeHttp_Header(buffer: ArrayBuffer): Http_Header {
  const context: Context = new Context("Deserializing imported object-type Http_Header");
  const reader = new ReadDecoder(buffer, context);
  return readHttp_Header(reader);
}

export function readHttp_Header(reader: Read): Http_Header {
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
