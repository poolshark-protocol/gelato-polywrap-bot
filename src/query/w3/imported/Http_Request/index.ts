import {
  Read,
  Write,
  Nullable,
  BigInt,
  JSON
} from "@web3api/wasm-as"
import {
  serializeHttp_Request,
  deserializeHttp_Request,
  writeHttp_Request,
  readHttp_Request
} from "./serialization";
import * as Types from "../..";

export class Http_Request {

  public static uri: string = "w3://ens/http.web3api.eth";

  headers: Array<Types.Http_Header> | null;
  urlParams: Array<Types.Http_UrlParam> | null;
  responseType: Types.Http_ResponseType;
  body: string | null;

  static toBuffer(type: Http_Request): ArrayBuffer {
    return serializeHttp_Request(type);
  }

  static fromBuffer(buffer: ArrayBuffer): Http_Request {
    return deserializeHttp_Request(buffer);
  }

  static write(writer: Write, type: Http_Request): void {
    writeHttp_Request(writer, type);
  }

  static read(reader: Read): Http_Request {
    return readHttp_Request(reader);
  }
}
