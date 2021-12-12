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

export class Input_checker {
  connection: Types.Gelato_Ethereum_Connection | null;
  argBuffer: ArrayBuffer;
}

export function serializecheckerArgs(input: Input_checker): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported query-type: checker");
  const sizer = new WriteSizer(sizerContext);
  writecheckerArgs(sizer, input);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported query-type: checker");
  const encoder = new WriteEncoder(buffer, encoderContext);
  writecheckerArgs(encoder, input);
  return buffer;
}

export function writecheckerArgs(
  writer: Write,
  input: Input_checker
): void {
  writer.writeMapLength(2);
  writer.context().push("connection", "Types.Gelato_Ethereum_Connection | null", "writing property");
  writer.writeString("connection");
  if (input.connection) {
    Types.Gelato_Ethereum_Connection.write(writer, input.connection as Types.Gelato_Ethereum_Connection);
  } else {
    writer.writeNil();
  }
  writer.context().pop();
  writer.context().push("argBuffer", "ArrayBuffer", "writing property");
  writer.writeString("argBuffer");
  writer.writeBytes(input.argBuffer);
  writer.context().pop();
}

export function deserializecheckerResult(buffer: ArrayBuffer): Types.Gelato_CheckerResult {
  const context: Context =  new Context("Deserializing imported query-type: checker");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("checker", "Types.Gelato_CheckerResult", "reading function output");
  const object = Types.Gelato_CheckerResult.read(reader);
  const res: Types.Gelato_CheckerResult =  object;
  reader.context().pop();

  return res;
}
