import {
  Read,
  Write,
  Nullable,
  BigInt,
  JSON
} from "@web3api/wasm-as"
import {
  serializeGelato_Ethereum_Connection,
  deserializeGelato_Ethereum_Connection,
  writeGelato_Ethereum_Connection,
  readGelato_Ethereum_Connection
} from "./serialization";
import * as Types from "../..";

export class Gelato_Ethereum_Connection {

  public static uri: string = "w3://ens/gelato.eth";

  node: string | null;
  networkNameOrChainId: string | null;

  static toBuffer(type: Gelato_Ethereum_Connection): ArrayBuffer {
    return serializeGelato_Ethereum_Connection(type);
  }

  static fromBuffer(buffer: ArrayBuffer): Gelato_Ethereum_Connection {
    return deserializeGelato_Ethereum_Connection(buffer);
  }

  static write(writer: Write, type: Gelato_Ethereum_Connection): void {
    writeGelato_Ethereum_Connection(writer, type);
  }

  static read(reader: Read): Gelato_Ethereum_Connection {
    return readGelato_Ethereum_Connection(reader);
  }
}
