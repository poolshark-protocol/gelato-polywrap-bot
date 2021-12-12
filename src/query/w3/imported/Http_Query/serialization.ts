import {
  Nullable,
  Write,
  WriteSizer,
  WriteEncoder,
  ReadDecoder,
  BigInt,
  JSON,
  Context
} from "@web3api/wasm-as";
import * as Types from "../..";

export class Input_get {
  url: string;
  request: Types.Http_Request | null;
}

export function serializegetArgs(input: Input_get): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported query-type: get");
  const sizer = new WriteSizer(sizerContext);
  writegetArgs(sizer, input);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported query-type: get");
  const encoder = new WriteEncoder(buffer, encoderContext);
  writegetArgs(encoder, input);
  return buffer;
}

export function writegetArgs(
  writer: Write,
  input: Input_get
): void {
  writer.writeMapLength(2);
  writer.context().push("url", "string", "writing property");
  writer.writeString("url");
  writer.writeString(input.url);
  writer.context().pop();
  writer.context().push("request", "Types.Http_Request | null", "writing property");
  writer.writeString("request");
  if (input.request) {
    Types.Http_Request.write(writer, input.request as Types.Http_Request);
  } else {
    writer.writeNil();
  }
  writer.context().pop();
}

export function deserializegetResult(buffer: ArrayBuffer): Types.Http_Response | null {
  const context: Context =  new Context("Deserializing imported query-type: get");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("get", "Types.Http_Response | null", "reading function output");
  let object: Types.Http_Response | null = null;
  if (!reader.isNextNil()) {
    object = Types.Http_Response.read(reader);
  }
  const res: Types.Http_Response | null =  object;
  reader.context().pop();

  return res;
}

export class Input_post {
  url: string;
  request: Types.Http_Request | null;
}

export function serializepostArgs(input: Input_post): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported query-type: post");
  const sizer = new WriteSizer(sizerContext);
  writepostArgs(sizer, input);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported query-type: post");
  const encoder = new WriteEncoder(buffer, encoderContext);
  writepostArgs(encoder, input);
  return buffer;
}

export function writepostArgs(
  writer: Write,
  input: Input_post
): void {
  writer.writeMapLength(2);
  writer.context().push("url", "string", "writing property");
  writer.writeString("url");
  writer.writeString(input.url);
  writer.context().pop();
  writer.context().push("request", "Types.Http_Request | null", "writing property");
  writer.writeString("request");
  if (input.request) {
    Types.Http_Request.write(writer, input.request as Types.Http_Request);
  } else {
    writer.writeNil();
  }
  writer.context().pop();
}

export function deserializepostResult(buffer: ArrayBuffer): Types.Http_Response | null {
  const context: Context =  new Context("Deserializing imported query-type: post");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("post", "Types.Http_Response | null", "reading function output");
  let object: Types.Http_Response | null = null;
  if (!reader.isNextNil()) {
    object = Types.Http_Response.read(reader);
  }
  const res: Types.Http_Response | null =  object;
  reader.context().pop();

  return res;
}
