import {
  Read,
  Write,
  Nullable,
  BigInt,
  JSON
} from "@web3api/wasm-as"
import {
  serializeHttp_UrlParam,
  deserializeHttp_UrlParam,
  writeHttp_UrlParam,
  readHttp_UrlParam
} from "./serialization";
import * as Types from "../..";

export class Http_UrlParam {

  public static uri: string = "w3://ens/http.web3api.eth";

  key: string;
  value: string;

  static toBuffer(type: Http_UrlParam): ArrayBuffer {
    return serializeHttp_UrlParam(type);
  }

  static fromBuffer(buffer: ArrayBuffer): Http_UrlParam {
    return deserializeHttp_UrlParam(buffer);
  }

  static write(writer: Write, type: Http_UrlParam): void {
    writeHttp_UrlParam(writer, type);
  }

  static read(reader: Read): Http_UrlParam {
    return readHttp_UrlParam(reader);
  }
}
