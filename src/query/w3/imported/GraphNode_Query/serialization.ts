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

export class Input_querySubgraph {
  subgraphAuthor: string;
  subgraphName: string;
  query: string;
}

export function serializequerySubgraphArgs(input: Input_querySubgraph): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported query-type: querySubgraph");
  const sizer = new WriteSizer(sizerContext);
  writequerySubgraphArgs(sizer, input);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported query-type: querySubgraph");
  const encoder = new WriteEncoder(buffer, encoderContext);
  writequerySubgraphArgs(encoder, input);
  return buffer;
}

export function writequerySubgraphArgs(
  writer: Write,
  input: Input_querySubgraph
): void {
  writer.writeMapLength(3);
  writer.context().push("subgraphAuthor", "string", "writing property");
  writer.writeString("subgraphAuthor");
  writer.writeString(input.subgraphAuthor);
  writer.context().pop();
  writer.context().push("subgraphName", "string", "writing property");
  writer.writeString("subgraphName");
  writer.writeString(input.subgraphName);
  writer.context().pop();
  writer.context().push("query", "string", "writing property");
  writer.writeString("query");
  writer.writeString(input.query);
  writer.context().pop();
}

export function deserializequerySubgraphResult(buffer: ArrayBuffer): string {
  const context: Context =  new Context("Deserializing imported query-type: querySubgraph");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("querySubgraph", "string", "reading function output");
  const res: string = reader.readString();
  reader.context().pop();

  return res;
}
