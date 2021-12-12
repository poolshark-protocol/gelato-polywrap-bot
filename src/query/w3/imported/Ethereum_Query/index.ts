import {
  w3_subinvoke,
  Nullable,
  BigInt,
  JSON
} from "@web3api/wasm-as";
import {
  serializecallContractViewArgs,
  deserializecallContractViewResult,
  Input_callContractView,
  serializecallContractStaticArgs,
  deserializecallContractStaticResult,
  Input_callContractStatic,
  serializeencodeParamsArgs,
  deserializeencodeParamsResult,
  Input_encodeParams,
  serializeencodeFunctionArgs,
  deserializeencodeFunctionResult,
  Input_encodeFunction,
  serializegetSignerAddressArgs,
  deserializegetSignerAddressResult,
  Input_getSignerAddress,
  serializegetSignerBalanceArgs,
  deserializegetSignerBalanceResult,
  Input_getSignerBalance,
  serializegetSignerTransactionCountArgs,
  deserializegetSignerTransactionCountResult,
  Input_getSignerTransactionCount,
  serializegetGasPriceArgs,
  deserializegetGasPriceResult,
  Input_getGasPrice,
  serializeestimateTransactionGasArgs,
  deserializeestimateTransactionGasResult,
  Input_estimateTransactionGas,
  serializeestimateContractCallGasArgs,
  deserializeestimateContractCallGasResult,
  Input_estimateContractCallGas,
  serializecheckAddressArgs,
  deserializecheckAddressResult,
  Input_checkAddress,
  serializetoWeiArgs,
  deserializetoWeiResult,
  Input_toWei,
  serializetoEthArgs,
  deserializetoEthResult,
  Input_toEth,
  serializeawaitTransactionArgs,
  deserializeawaitTransactionResult,
  Input_awaitTransaction,
  serializewaitForEventArgs,
  deserializewaitForEventResult,
  Input_waitForEvent
} from "./serialization";
import * as Types from "../..";

export class Ethereum_Query {

  public static uri: string = "w3://ens/ethereum.web3api.eth";

  public static callContractView(input: Input_callContractView): string {
    const args = serializecallContractViewArgs(input);
    const result = w3_subinvoke(
      "w3://ens/ethereum.web3api.eth",
      "query",
      "callContractView",
      args
    );
    return deserializecallContractViewResult(result);
  }

  public static callContractStatic(input: Input_callContractStatic): Types.Ethereum_StaticTxResult {
    const args = serializecallContractStaticArgs(input);
    const result = w3_subinvoke(
      "w3://ens/ethereum.web3api.eth",
      "query",
      "callContractStatic",
      args
    );
    return deserializecallContractStaticResult(result);
  }

  public static encodeParams(input: Input_encodeParams): string {
    const args = serializeencodeParamsArgs(input);
    const result = w3_subinvoke(
      "w3://ens/ethereum.web3api.eth",
      "query",
      "encodeParams",
      args
    );
    return deserializeencodeParamsResult(result);
  }

  public static encodeFunction(input: Input_encodeFunction): string {
    const args = serializeencodeFunctionArgs(input);
    const result = w3_subinvoke(
      "w3://ens/ethereum.web3api.eth",
      "query",
      "encodeFunction",
      args
    );
    return deserializeencodeFunctionResult(result);
  }

  public static getSignerAddress(input: Input_getSignerAddress): string {
    const args = serializegetSignerAddressArgs(input);
    const result = w3_subinvoke(
      "w3://ens/ethereum.web3api.eth",
      "query",
      "getSignerAddress",
      args
    );
    return deserializegetSignerAddressResult(result);
  }

  public static getSignerBalance(input: Input_getSignerBalance): BigInt {
    const args = serializegetSignerBalanceArgs(input);
    const result = w3_subinvoke(
      "w3://ens/ethereum.web3api.eth",
      "query",
      "getSignerBalance",
      args
    );
    return deserializegetSignerBalanceResult(result);
  }

  public static getSignerTransactionCount(input: Input_getSignerTransactionCount): BigInt {
    const args = serializegetSignerTransactionCountArgs(input);
    const result = w3_subinvoke(
      "w3://ens/ethereum.web3api.eth",
      "query",
      "getSignerTransactionCount",
      args
    );
    return deserializegetSignerTransactionCountResult(result);
  }

  public static getGasPrice(input: Input_getGasPrice): BigInt {
    const args = serializegetGasPriceArgs(input);
    const result = w3_subinvoke(
      "w3://ens/ethereum.web3api.eth",
      "query",
      "getGasPrice",
      args
    );
    return deserializegetGasPriceResult(result);
  }

  public static estimateTransactionGas(input: Input_estimateTransactionGas): BigInt {
    const args = serializeestimateTransactionGasArgs(input);
    const result = w3_subinvoke(
      "w3://ens/ethereum.web3api.eth",
      "query",
      "estimateTransactionGas",
      args
    );
    return deserializeestimateTransactionGasResult(result);
  }

  public static estimateContractCallGas(input: Input_estimateContractCallGas): BigInt {
    const args = serializeestimateContractCallGasArgs(input);
    const result = w3_subinvoke(
      "w3://ens/ethereum.web3api.eth",
      "query",
      "estimateContractCallGas",
      args
    );
    return deserializeestimateContractCallGasResult(result);
  }

  public static checkAddress(input: Input_checkAddress): bool {
    const args = serializecheckAddressArgs(input);
    const result = w3_subinvoke(
      "w3://ens/ethereum.web3api.eth",
      "query",
      "checkAddress",
      args
    );
    return deserializecheckAddressResult(result);
  }

  public static toWei(input: Input_toWei): BigInt {
    const args = serializetoWeiArgs(input);
    const result = w3_subinvoke(
      "w3://ens/ethereum.web3api.eth",
      "query",
      "toWei",
      args
    );
    return deserializetoWeiResult(result);
  }

  public static toEth(input: Input_toEth): string {
    const args = serializetoEthArgs(input);
    const result = w3_subinvoke(
      "w3://ens/ethereum.web3api.eth",
      "query",
      "toEth",
      args
    );
    return deserializetoEthResult(result);
  }

  public static awaitTransaction(input: Input_awaitTransaction): Types.Ethereum_TxReceipt {
    const args = serializeawaitTransactionArgs(input);
    const result = w3_subinvoke(
      "w3://ens/ethereum.web3api.eth",
      "query",
      "awaitTransaction",
      args
    );
    return deserializeawaitTransactionResult(result);
  }

  public static waitForEvent(input: Input_waitForEvent): Types.Ethereum_EventNotification {
    const args = serializewaitForEventArgs(input);
    const result = w3_subinvoke(
      "w3://ens/ethereum.web3api.eth",
      "query",
      "waitForEvent",
      args
    );
    return deserializewaitForEventResult(result);
  }
}
