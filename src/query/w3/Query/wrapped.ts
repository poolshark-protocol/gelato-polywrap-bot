import {
  checker
} from "../../index";
import {
  deserializecheckerArgs,
  serializecheckerResult
} from "./serialization";

export function checkerWrapped(argsBuf: ArrayBuffer): ArrayBuffer {
  const args = deserializecheckerArgs(argsBuf);
  const result = checker({
    connection: args.connection,
    argBuffer: args.argBuffer
  });
  return serializecheckerResult(result);
}
