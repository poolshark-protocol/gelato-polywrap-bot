import {
  Read,
  Write,
  Nullable,
  BigInt,
  JSON
} from "@web3api/wasm-as"
import {
  serializeGelato_CheckerResult,
  deserializeGelato_CheckerResult,
  writeGelato_CheckerResult,
  readGelato_CheckerResult
} from "./serialization";
import * as Types from "../..";

export class Gelato_CheckerResult {

  public static uri: string = "w3://ens/gelato.eth";

  canExec: bool;
  execPayload: string;

  static toBuffer(type: Gelato_CheckerResult): ArrayBuffer {
    return serializeGelato_CheckerResult(type);
  }

  static fromBuffer(buffer: ArrayBuffer): Gelato_CheckerResult {
    return deserializeGelato_CheckerResult(buffer);
  }

  static write(writer: Write, type: Gelato_CheckerResult): void {
    writeGelato_CheckerResult(writer, type);
  }

  static read(reader: Read): Gelato_CheckerResult {
    return readGelato_CheckerResult(reader);
  }
}
