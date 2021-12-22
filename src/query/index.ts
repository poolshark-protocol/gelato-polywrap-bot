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

const predaDexAddress = "0xaFC73be4B159d4a87A1F104c345fF7eb2B3967f1";
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

  let executeDataFromTokens = new JSON.Arr();
  let executeDataDestTokens = new JSON.Arr();
  let executeDataAmount = new JSON.Arr();
  let executeDataQuoteAmount = new JSON.Arr();
  let executeDataDistribution = new JSON.Arr();

  let shouldExecute = false;

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

    // log(`id: ${idJSONStr}`);
    // log(`groupWei: ${groupWeiJSONStr}`);

    // log(`\n\n`);
    // log(`fromToken: ${fromTokenJSONStr}`);
    // log(`destToken: ${destTokenJSONStr}`);
    // log(`groupAmnt: ${groupAmountJSONStr}`);
    // log(`parts: ${parts}`);
    // log(`flags: ${flags}`);
    // log(`destTokenEthPriceTimesGasPrice: ${destTokenEthPriceTimesGasPrice}`);

    const res = Ethereum_Query.callContractView({
      address: predaDexAddress,
      method: "function quoteAndDistribute(address, address, uint256, uint256, uint256, uint256) external view returns (uint256, uint256[] memory, uint256)",
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

    const returns = res.split(',');

    const quoteAmount = new JSON.Str(returns[0]);
    returns.splice(0, 1);

    const estimatedGasUnits = returns[returns.length - 1];
    returns.splice(returns.length - 1, 1);

    const distribution = new JSON.Str(returns.join());

    log(`quoteAmount: ${quoteAmount}`);
    log(`estimatedGasUnits: ${estimatedGasUnits}`);
    log(`distribution: ${distribution}`);

    // process res
    const weiRequired = BigInt.fromString(estimatedGasUnits).mul(gasPrice);

    if (BigInt.fromString(groupWeiJSONStr.toString()).gte(weiRequired) && BigInt.fromString(quoteAmount.toString()).gt(ZERO)) {
      executeDataFromTokens.push(fromTokenJSONStr);
      executeDataDestTokens.push(destTokenJSONStr);
      executeDataAmount.push(groupAmountJSONStr);
      executeDataQuoteAmount.push(quoteAmount);
      executeDataDistribution.push(distribution);

      shouldExecute = true;
    }
  }

  log(`executeDataFromTokens: ${executeDataFromTokens}`);
  log(`executeDataDestTokens: ${executeDataDestTokens}`);
  log(`executeDataAmount: ${executeDataAmount}`);
  log(`executeDataQuoteAmount: ${executeDataQuoteAmount}`);
  log(`executeDataDistribution: ${executeDataDistribution}`);

  // Make execPayload
  // TODO: Fix execPayload
  const execPayload = Ethereum_Query.encodeFunction({
    method: "function executeGroups(address[], address[], uint256[], uint256[], uint256[][])",
    args: [
      executeDataFromTokens.stringify.toString(),
      executeDataDestTokens.stringify.toString(),
      executeDataAmount.stringify.toString(),
      executeDataQuoteAmount.stringify.toString(),
      executeDataDistribution.stringify.toString()
    ],
  });

  const resolverData: Gelato_CheckerResult = {
    canExec: shouldExecute,
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
