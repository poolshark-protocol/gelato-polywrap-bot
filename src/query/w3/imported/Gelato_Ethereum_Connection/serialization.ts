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
import { Gelato_Ethereum_Connection } from "./";
import * as Types from "../..";

export function serializeGelato_Ethereum_Connection(type: Gelato_Ethereum_Connection): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing)  imported object-type: Gelato_Ethereum_Connection");
  const sizer = new WriteSizer(sizerContext);
  writeGelato_Ethereum_Connection(sizer, type);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) import object-type: Gelato_Ethereum_Connection");
  const encoder = new WriteEncoder(buffer, encoderContext);
  writeGelato_Ethereum_Connection(encoder, type);
  return buffer;
}

export function writeGelato_Ethereum_Connection(writer: Write, type: Gelato_Ethereum_Connection): void {
  writer.writeMapLength(2);
  writer.context().push("node", "string | null", "writing property");
  writer.writeString("node");
  writer.writeNullableString(type.node);
  writer.context().pop();
  writer.context().push("networkNameOrChainId", "string | null", "writing property");
  writer.writeString("networkNameOrChainId");
  writer.writeNullableString(type.networkNameOrChainId);
  writer.context().pop();
}

export function deserializeGelato_Ethereum_Connection(buffer: ArrayBuffer): Gelato_Ethereum_Connection {
  const context: Context = new Context("Deserializing imported object-type Gelato_Ethereum_Connection");
  const reader = new ReadDecoder(buffer, context);
  return readGelato_Ethereum_Connection(reader);
}

export function readGelato_Ethereum_Connection(reader: Read): Gelato_Ethereum_Connection {
  let numFields = reader.readMapLength();

  let _node: string | null = null;
  let _networkNameOrChainId: string | null = null;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "node") {
      reader.context().push(field, "string | null", "type found, reading property");
      _node = reader.readNullableString();
      reader.context().pop();
    }
    else if (field == "networkNameOrChainId") {
      reader.context().push(field, "string | null", "type found, reading property");
      _networkNameOrChainId = reader.readNullableString();
      reader.context().pop();
    }
    reader.context().pop();
  }


  return {
    node: _node,
    networkNameOrChainId: _networkNameOrChainId
  };
}
