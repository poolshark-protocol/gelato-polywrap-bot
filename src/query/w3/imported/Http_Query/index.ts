import {
  w3_subinvoke,
  Nullable,
  BigInt,
  JSON
} from "@web3api/wasm-as";
import {
  serializegetArgs,
  deserializegetResult,
  Input_get,
  serializepostArgs,
  deserializepostResult,
  Input_post
} from "./serialization";
import * as Types from "../..";

export class Http_Query {

  public static uri: string = "w3://ens/http.web3api.eth";

  public static get(input: Input_get): Types.Http_Response | null {
    const args = serializegetArgs(input);
    const result = w3_subinvoke(
      "w3://ens/http.web3api.eth",
      "query",
      "get",
      args
    );
    return deserializegetResult(result);
  }

  public static post(input: Input_post): Types.Http_Response | null {
    const args = serializepostArgs(input);
    const result = w3_subinvoke(
      "w3://ens/http.web3api.eth",
      "query",
      "post",
      args
    );
    return deserializepostResult(result);
  }
}
