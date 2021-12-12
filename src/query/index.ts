import {
  DateTime_Query,
  Ethereum_Connection,
  Ethereum_Query,
  Gelato_CheckerResult,
  Gelato_Ethereum_Connection,
  GraphNode_Query,
  Http_Query,
  Input_checker,
  Logger_Logger_LogLevel,
  Logger_Query,
  UserConfig,
} from "./w3";

const predaDexAddress = "";
const groupSwapAddress = "";

export function checker(input: Input_checker): Gelato_CheckerResult {
  // query subgraph to get a list of all the groups and group data
  const groups = [];

  // get current gas rate
  const currentGasRate = 0;

  // it is approx 100k gas for the cheapest dex
  const minGasUnitsForSwap = 100_000;

  // optimal args
  const parts = 0;
  const flags = 0;
  const destTokenEthPriceTimesGasPrice = 0;

  let groupsToExecute = [];


  for (let groupId = 0; groupId < groups.length; groupId++) {
    const currentGroup = groups[groupId];
    if (currentGroup.fromAmount == 0
     || currentGroup.totalGas == 0) continue;

    if (currentGroup.totalGas < minGasUnitsForSwap * currentGasRate) continue;

    const { quoteAmount, distribution, quotedGas } = Ethereum_Query.callContractView({
      address: predaDexAddress,
      method: "function quoteAndDistribute(IERC20 fromToken, IERC20 destToken, uint256 amount, uint256 parts, uint256 flags, uint256 destTokenEthPriceTimesGasPrice) view returns(uint256 returnAmount, uint256[] memory distribution, uint256 gas)",
      // TODO: how is this supposed to be formatted
      args: [currentGroup.fromToken, currentGroup.destToken, currentGroup.fromAmount, parts, flags, destTokenEthPriceTimesGasPrice],
      connection: ethConnection
    });

    if (currentGroup.totalGas < quotedGas * currentGasRate) continue;

    groupsToExecute.push(currentGroup);
  }

  for (let groupId = 0; groupId < groupsToExecute.length; groupId++) {
    const currentGroup = groups[groupId];

    // prepare/validate swap things
  }

  // make execPayload

/*
  const execPayload = Ethereum_Query.encodeFunction({
    method: "function increaseCount(uint256)",
    args: ["100"],
  });

  const resolverData: Gelato_CheckerResult = {
    canExec: canExec,
    execPayload: execPayload,
  };

  return resolverData;
*/
}
