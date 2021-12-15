import {
  Ethereum_Connection,
  Ethereum_Query,
  Gelato_CheckerResult,
  Gelato_Ethereum_Connection,
  GelatoPlugin_Query,
  GraphNode_Query,
  Http_Query,
  Input_checker,
  Logger_Logger_LogLevel,
  Logger_Query,
  UserConfig,
} from "./w3";
import { JSON, BigInt } from "@web3api/wasm-as";

const predaDexAddress = "0x5101feD546FacccD309A77Ad755170f8fBf1E81D";
const groupSwapAddress = "";
const ZERO = BigInt.fromString("0");
const parts = "0";
const flags = "0";
const destTokenEthPriceTimesGasPrice = "0";

export function checker(input: Input_checker): Gelato_CheckerResult {
  // Get arguments
  const gasPrice = input.gasPrice;
  const gelatoEthConnection = input.connection;
  let ethConnection: Ethereum_Connection | null = null;
  if (gelatoEthConnection) {
    ethConnection = {
      node: gelatoEthConnection.node,
      networkNameOrChainId: gelatoEthConnection.networkNameOrChainId,
    };
  }

  // Get orders from subgraph
  const groups = GraphNode_Query.querySubgraph({
    subgraphAuthor: "alphak3y",
    subgraphName: "predadex",
    query: `{
      groupOrders(orderBy: groupGwei, orderDirection: asc) {
        id
        groupAmount
        groupGwei
        fromToken
        destToken
      }
    }`,
  });

  const resObj = <JSON.Obj>JSON.parse(groups);

  const dataObj = resObj.getObj("data");
  if (dataObj == null) throw Error("Data Obj null");

  const ordersArrayJSON = dataObj.getArr("groupOrders");
  if (ordersArrayJSON == null) throw Error("Orders Array null");

  const ordersArray = ordersArrayJSON.valueOf();
  // log(`ordersArray ${ordersArray.toString()}`);

  // Get minimum gas required according to gasPrice passed by Gelato
  const minGasUnitsForSwap = BigInt.fromString("100000");
  const minGwei = minGasUnitsForSwap.mul(gasPrice);
  log(`Min gwei: ${minGwei}`);

  // let groupsToExecute;

  for (let i = 0; i < ordersArray.length; i++) {
    const ordersObj = <JSON.Obj>JSON.parse(ordersArray[i].stringify());

    const idJSONStr = ordersObj.getString("id");
    const groupGweiJSONStr = ordersObj.getString("groupGwei");
    const groupAmountJSONStr = ordersObj.getString("groupAmount");
    const fromTokenJSONStr = ordersObj.getString("fromToken");
    const destTokenJSONStr = ordersObj.getString("destToken");
    if (
      idJSONStr == null ||
      groupGweiJSONStr == null ||
      groupAmountJSONStr == null ||
      fromTokenJSONStr == null ||
      destTokenJSONStr == null
    )
      continue;

    // groupAmount should not be zero
    const groupAmount = BigInt.fromString(groupAmountJSONStr.valueOf());
    if (groupAmount.lte(ZERO)) {
      log(`[${idJSONStr.valueOf()}] : groupAmount <= zero`);
      continue;
    }

    // groupGwei should be more than gas for swap
    const groupGwei = BigInt.fromString(groupGweiJSONStr.valueOf());
    if (groupGwei.lt(minGwei)) {
      log(`[${idJSONStr.valueOf()}] : groupGwei < minGwei`);
      continue;
    }

    const res = Ethereum_Query.callContractView({
      address: predaDexAddress,
      method:
        "function quoteAndDistribute(address fromToken, address destToken, uint256 amount, uint256 parts, uint256 flags, uint256 destTokenEthPriceTimesGasPrice) view returns(uint256 returnAmount, uint256[] memory distribution, uint256 gas)",
      // TODO: how is this supposed to be formatted
      args: [
        fromTokenJSONStr.valueOf(),
        destTokenJSONStr.valueOf(),
        groupAmountJSONStr.valueOf(),
        parts,
        flags,
        destTokenEthPriceTimesGasPrice,
      ],
      connection: ethConnection,
    });

    log(`RES: ${res}`);
    // process res
    // if (groupGwei < quotedGas * gasPrice) continue;
    // groupsToExecute.push(currentGroup);
  }

  // Make execPayload
  // const execPayload = Ethereum_Query.encodeFunction({
  //   method: "function increaseCount(uint256)",
  //   args: ["100"],
  // });

  const resolverData: Gelato_CheckerResult = {
    canExec: false,
    execPayload: "",
  };

  return resolverData;
}

function log(msg: string): void {
  Logger_Query.log({
    message: msg,
    level: Logger_Logger_LogLevel.INFO,
  });
}
