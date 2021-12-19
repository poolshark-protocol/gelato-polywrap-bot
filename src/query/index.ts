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
// TODO: Update groupSwapAddress
const groupSwapAddress = "0x5101feD546FacccD309A77Ad755170f8fBf1E81D";
const ZERO = BigInt.fromString("0");
const parts = "1";
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

  // Get minimum gas required according to gasPrice passed by Gelato
  const minGasUnitsForSwap = BigInt.fromString("100000"); // TODO: Validate this 100k number
  const minWei = minGasUnitsForSwap.mul(gasPrice);
  log(`Min wei: ${minWei}`);

  // Get orders from subgraph
  // This query will return us only the groups that meet minimum requirements
  const groups = GraphNode_Query.querySubgraph({
    subgraphAuthor: "alphak3y",
    subgraphName: "predadex",
    query: `{
      groupOrders(
        orderBy: groupWei
        orderDirection: desc
        where: {
          groupWei_gt: ${minWei}
          groupAmount_gt: 0
        }
      ) {
        id
        groupAmount
        groupWei
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

  let executeDataFromTokens = new JSON.Arr();
  let executeDataDestTokens = new JSON.Arr();
  let executeDataAmount = new JSON.Arr();
  let executeDataQuoteAmount = new JSON.Arr();

  for (let i = 0; i < ordersArray.length; i++) {
    const ordersObj = <JSON.Obj>JSON.parse(ordersArray[i].stringify());

    const idJSONStr = ordersObj.getString("id");
    const groupWeiJSONStr = ordersObj.getString("groupWei");
    const groupAmountJSONStr = ordersObj.getString("groupAmount");
    const fromTokenJSONStr = ordersObj.getString("fromToken");
    const destTokenJSONStr = ordersObj.getString("destToken");
    if (
      idJSONStr == null ||
      groupWeiJSONStr == null ||
      groupAmountJSONStr == null ||
      fromTokenJSONStr == null ||
      destTokenJSONStr == null
    )
      continue;

    log(`id: ${idJSONStr}`);
    log(`groupWei: ${groupWeiJSONStr}`);

    // This is failing probably because the contract is not deployed on ETH mainnet?
    const res = Ethereum_Query.callContractView({
      address: predaDexAddress,
      method:
        "function quoteAndDistribute(address fromToken, address destToken, uint256 amount, uint256 parts, uint256 flags, uint256 destTokenEthPriceTimesGasPrice) view returns(uint256 returnAmount, uint256[] memory distribution, uint256 gas)",
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

    // It looks like res is a string type
    // TODO: How do we convert the res string to the response args?

    // process res
    const weiRequired = BigInt.fromString(res).mul(gasPrice); // res.gas

    const quoteAmount = new JSON.Str(res); // res.returnAmount

    if (weiRequired <= BigInt.fromString(groupWeiJSONStr.toString())) {
      executeDataFromTokens.push(fromTokenJSONStr);
      executeDataDestTokens.push(destTokenJSONStr);
      executeDataAmount.push(groupAmountJSONStr);
      executeDataQuoteAmount.push(quoteAmount);
    }
  }

  // Make execPayload
  const execPayload = Ethereum_Query.encodeFunction({
    method: "function executeGroups(address[], address[], uint256[], uint256[])",
    args: [
      executeDataFromTokens.stringify.toString(),
      executeDataDestTokens.stringify.toString(),
      executeDataAmount.stringify.toString(),
      executeDataQuoteAmount.stringify.toString()
    ],
  });

  const resolverData: Gelato_CheckerResult = {
    canExec: false,
    execPayload: execPayload,
  };

  return resolverData;
}

function log(msg: string): void {
  Logger_Query.log({
    message: msg,
    level: Logger_Logger_LogLevel.INFO,
  });
}
