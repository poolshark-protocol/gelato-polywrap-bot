import {
  w3_subinvoke,
  Nullable,
  BigInt,
  JSON
} from "@web3api/wasm-as";
import {
  serializecheckerArgs,
  deserializecheckerResult,
  Input_checker
} from "./serialization";
import * as Types from "../..";

export class Gelato_Query {

  public static uri: string = "w3://ens/gelato.eth";

  public static checker(input: Input_checker): Types.Gelato_CheckerResult {
    const args = serializecheckerArgs(input);
    const result = w3_subinvoke(
      "w3://ens/gelato.eth",
      "query",
      "checker",
      args
    );
    return deserializecheckerResult(result);
  }
}
