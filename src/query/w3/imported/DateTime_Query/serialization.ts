import {
  Nullable,
  Write,
  WriteSizer,
  WriteEncoder,
  ReadDecoder,
  BigInt,
  JSON,
  Context
} from "@web3api/wasm-as";
import * as Types from "../..";

export class Input_currentTime {
}

export function serializecurrentTimeArgs(input: Input_currentTime): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported query-type: currentTime");
  const sizer = new WriteSizer(sizerContext);
  writecurrentTimeArgs(sizer, input);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported query-type: currentTime");
  const encoder = new WriteEncoder(buffer, encoderContext);
  writecurrentTimeArgs(encoder, input);
  return buffer;
}

export function writecurrentTimeArgs(
  writer: Write,
  input: Input_currentTime
): void {
  writer.writeMapLength(0);
}

export function deserializecurrentTimeResult(buffer: ArrayBuffer): BigInt {
  const context: Context =  new Context("Deserializing imported query-type: currentTime");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("currentTime", "BigInt", "reading function output");
  const res: BigInt = reader.readBigInt();
  reader.context().pop();

  return res;
}
