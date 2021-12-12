import {
  w3_subinvoke,
  Nullable,
  BigInt,
  JSON
} from "@web3api/wasm-as";
import {
  serializequerySubgraphArgs,
  deserializequerySubgraphResult,
  Input_querySubgraph
} from "./serialization";
import * as Types from "../..";

export class GraphNode_Query {

  public static uri: string = "w3://ens/graph-node.web3api.eth";

  public static querySubgraph(input: Input_querySubgraph): string {
    const args = serializequerySubgraphArgs(input);
    const result = w3_subinvoke(
      "w3://ens/graph-node.web3api.eth",
      "query",
      "querySubgraph",
      args
    );
    return deserializequerySubgraphResult(result);
  }
}
