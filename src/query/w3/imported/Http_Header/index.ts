import {
  Read,
  Write,
  Nullable,
  BigInt,
  JSON
} from "@web3api/wasm-as"
import {
  serializeHttp_Header,
  deserializeHttp_Header,
  writeHttp_Header,
  readHttp_Header
} from "./serialization";
import * as Types from "../..";

export class Http_Header {

  public static uri: string = "w3://ens/http.web3api.eth";

  key: string;
  value: string;

  static toBuffer(type: Http_Header): ArrayBuffer {
    return serializeHttp_Header(type);
  }

  static fromBuffer(buffer: ArrayBuffer): Http_Header {
    return deserializeHttp_Header(buffer);
  }

  static write(writer: Write, type: Http_Header): void {
    writeHttp_Header(writer, type);
  }

  static read(reader: Read): Http_Header {
    return readHttp_Header(reader);
  }
}
