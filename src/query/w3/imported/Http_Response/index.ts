import {
  Read,
  Write,
  Nullable,
  BigInt,
  JSON
} from "@web3api/wasm-as"
import {
  serializeHttp_Response,
  deserializeHttp_Response,
  writeHttp_Response,
  readHttp_Response
} from "./serialization";
import * as Types from "../..";

export class Http_Response {

  public static uri: string = "w3://ens/http.web3api.eth";

  status: i32;
  statusText: string;
  headers: Array<Types.Http_Header> | null;
  body: string | null;

  static toBuffer(type: Http_Response): ArrayBuffer {
    return serializeHttp_Response(type);
  }

  static fromBuffer(buffer: ArrayBuffer): Http_Response {
    return deserializeHttp_Response(buffer);
  }

  static write(writer: Write, type: Http_Response): void {
    writeHttp_Response(writer, type);
  }

  static read(reader: Read): Http_Response {
    return readHttp_Response(reader);
  }
}
