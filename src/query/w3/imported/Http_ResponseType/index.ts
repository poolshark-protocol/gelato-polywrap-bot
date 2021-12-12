export enum Http_ResponseType {
  TEXT,
  BINARY,
  _MAX_
}

export function sanitizeHttp_ResponseTypeValue(value: i32): void {
  const valid = value >= 0 && value < Http_ResponseType._MAX_;
  if (!valid) {
    throw new Error("Invalid value for enum 'Http_ResponseType': " + value.toString());
  }
}

export function getHttp_ResponseTypeValue(key: string): Http_ResponseType {
  if (key == "TEXT") {
    return Http_ResponseType.TEXT;
  }
  if (key == "BINARY") {
    return Http_ResponseType.BINARY;
  }

  throw new Error("Invalid key for enum 'Http_ResponseType': " + key);
}

export function getHttp_ResponseTypeKey(value: Http_ResponseType): string {
  sanitizeHttp_ResponseTypeValue(value);

  switch (value) {
    case Http_ResponseType.TEXT: return "TEXT";
    case Http_ResponseType.BINARY: return "BINARY";
    default:
      throw new Error("Invalid value for enum 'Http_ResponseType': " + value.toString());
  }
}
