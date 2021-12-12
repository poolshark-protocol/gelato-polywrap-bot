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
import { UserConfig } from "./";
import * as Types from "..";

export function serializeUserConfig(type: UserConfig): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) object-type: UserConfig");
  const sizer = new WriteSizer(sizerContext);
  writeUserConfig(sizer, type);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) object-type: UserConfig");
  const encoder = new WriteEncoder(buffer, encoderContext);
  writeUserConfig(encoder, type);
  return buffer;
}

export function writeUserConfig(writer: Write, type: UserConfig): void {
  writer.writeMapLength(1);
  writer.context().push("counterAddress", "string", "writing property");
  writer.writeString("counterAddress");
  writer.writeString(type.counterAddress);
  writer.context().pop();
}

export function deserializeUserConfig(buffer: ArrayBuffer): UserConfig {
  const context: Context = new Context("Deserializing object-type UserConfig");
  const reader = new ReadDecoder(buffer, context);
  return readUserConfig(reader);
}

export function readUserConfig(reader: Read): UserConfig {
  let numFields = reader.readMapLength();

  let _counterAddress: string = "";
  let _counterAddressSet: bool = false;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "counterAddress") {
      reader.context().push(field, "string", "type found, reading property");
      _counterAddress = reader.readString();
      _counterAddressSet = true;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_counterAddressSet) {
    throw new Error(reader.context().printWithContext("Missing required property: 'counterAddress: String'"));
  }

  return {
    counterAddress: _counterAddress
  };
}
