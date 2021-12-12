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
import { Gelato_CheckerResult } from "./";
import * as Types from "../..";

export function serializeGelato_CheckerResult(type: Gelato_CheckerResult): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing)  imported object-type: Gelato_CheckerResult");
  const sizer = new WriteSizer(sizerContext);
  writeGelato_CheckerResult(sizer, type);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) import object-type: Gelato_CheckerResult");
  const encoder = new WriteEncoder(buffer, encoderContext);
  writeGelato_CheckerResult(encoder, type);
  return buffer;
}

export function writeGelato_CheckerResult(writer: Write, type: Gelato_CheckerResult): void {
  writer.writeMapLength(2);
  writer.context().push("canExec", "bool", "writing property");
  writer.writeString("canExec");
  writer.writeBool(type.canExec);
  writer.context().pop();
  writer.context().push("execPayload", "string", "writing property");
  writer.writeString("execPayload");
  writer.writeString(type.execPayload);
  writer.context().pop();
}

export function deserializeGelato_CheckerResult(buffer: ArrayBuffer): Gelato_CheckerResult {
  const context: Context = new Context("Deserializing imported object-type Gelato_CheckerResult");
  const reader = new ReadDecoder(buffer, context);
  return readGelato_CheckerResult(reader);
}

export function readGelato_CheckerResult(reader: Read): Gelato_CheckerResult {
  let numFields = reader.readMapLength();

  let _canExec: bool = false;
  let _canExecSet: bool = false;
  let _execPayload: string = "";
  let _execPayloadSet: bool = false;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "canExec") {
      reader.context().push(field, "bool", "type found, reading property");
      _canExec = reader.readBool();
      _canExecSet = true;
      reader.context().pop();
    }
    else if (field == "execPayload") {
      reader.context().push(field, "string", "type found, reading property");
      _execPayload = reader.readString();
      _execPayloadSet = true;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_canExecSet) {
    throw new Error(reader.context().printWithContext("Missing required property: 'canExec: Boolean'"));
  }
  if (!_execPayloadSet) {
    throw new Error(reader.context().printWithContext("Missing required property: 'execPayload: String'"));
  }

  return {
    canExec: _canExec,
    execPayload: _execPayload
  };
}
