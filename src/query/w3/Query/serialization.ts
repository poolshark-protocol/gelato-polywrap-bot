import {
  Read,
  ReadDecoder,
  WriteSizer,
  WriteEncoder,
  Write,
  Nullable,
  BigInt,
  JSON,
  Context
} from "@web3api/wasm-as";
import * as Types from "..";

export class Input_checker {
  connection: Types.Gelato_Ethereum_Connection | null;
  argBuffer: ArrayBuffer;
}

export function deserializecheckerArgs(argsBuf: ArrayBuffer): Input_checker {
  const context: Context =  new Context("Deserializing query-type: checker");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _connection: Types.Gelato_Ethereum_Connection | null = null;
  let _argBuffer: ArrayBuffer = new ArrayBuffer(0);
  let _argBufferSet: bool = false;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "connection") {
      reader.context().push(field, "Types.Gelato_Ethereum_Connection | null", "type found, reading property");
      let object: Types.Gelato_Ethereum_Connection | null = null;
      if (!reader.isNextNil()) {
        object = Types.Gelato_Ethereum_Connection.read(reader);
      }
      _connection = object;
      reader.context().pop();
    }
    else if (field == "argBuffer") {
      reader.context().push(field, "ArrayBuffer", "type found, reading property");
      _argBuffer = reader.readBytes();
      _argBufferSet = true;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_argBufferSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'argBuffer: Bytes'"));
  }

  return {
    connection: _connection,
    argBuffer: _argBuffer
  };
}

export function serializecheckerResult(result: Types.Gelato_CheckerResult): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) query-type: checker");
  const sizer = new WriteSizer(sizerContext);
  writecheckerResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) query-type: checker");
  const encoder = new WriteEncoder(buffer, encoderContext);
  writecheckerResult(encoder, result);
  return buffer;
}

export function writecheckerResult(writer: Write, result: Types.Gelato_CheckerResult): void {
  writer.context().push("checker", "Types.Gelato_CheckerResult", "writing property");
  Types.Gelato_CheckerResult.write(writer, result);
  writer.context().pop();
}
