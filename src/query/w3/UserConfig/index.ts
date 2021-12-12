import {
  Read,
  Write,
  Nullable,
  BigInt,
  JSON
} from "@web3api/wasm-as";
import {
  serializeUserConfig,
  deserializeUserConfig,
  writeUserConfig,
  readUserConfig
} from "./serialization";
import * as Types from "..";

export class UserConfig {
  counterAddress: string;

  static toBuffer(type: UserConfig): ArrayBuffer {
    return serializeUserConfig(type);
  }

  static fromBuffer(buffer: ArrayBuffer): UserConfig {
    return deserializeUserConfig(buffer);
  }

  static write(writer: Write, type: UserConfig): void {
    writeUserConfig(writer, type);
  }

  static read(reader: Read): UserConfig {
    return readUserConfig(reader);
  }
}
