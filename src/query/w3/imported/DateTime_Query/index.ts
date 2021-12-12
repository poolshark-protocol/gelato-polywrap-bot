import {
  w3_subinvoke,
  Nullable,
  BigInt,
  JSON
} from "@web3api/wasm-as";
import {
  serializecurrentTimeArgs,
  deserializecurrentTimeResult,
  Input_currentTime
} from "./serialization";
import * as Types from "../..";

export class DateTime_Query {

  public static uri: string = "w3://ens/datetime.eth";

  public static currentTime(input: Input_currentTime): BigInt {
    const args = serializecurrentTimeArgs(input);
    const result = w3_subinvoke(
      "w3://ens/datetime.eth",
      "query",
      "currentTime",
      args
    );
    return deserializecurrentTimeResult(result);
  }
}
