export enum Logger_Logger_LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR,
  _MAX_
}

export function sanitizeLogger_Logger_LogLevelValue(value: i32): void {
  const valid = value >= 0 && value < Logger_Logger_LogLevel._MAX_;
  if (!valid) {
    throw new Error("Invalid value for enum 'Logger_Logger_LogLevel': " + value.toString());
  }
}

export function getLogger_Logger_LogLevelValue(key: string): Logger_Logger_LogLevel {
  if (key == "DEBUG") {
    return Logger_Logger_LogLevel.DEBUG;
  }
  if (key == "INFO") {
    return Logger_Logger_LogLevel.INFO;
  }
  if (key == "WARN") {
    return Logger_Logger_LogLevel.WARN;
  }
  if (key == "ERROR") {
    return Logger_Logger_LogLevel.ERROR;
  }

  throw new Error("Invalid key for enum 'Logger_Logger_LogLevel': " + key);
}

export function getLogger_Logger_LogLevelKey(value: Logger_Logger_LogLevel): string {
  sanitizeLogger_Logger_LogLevelValue(value);

  switch (value) {
    case Logger_Logger_LogLevel.DEBUG: return "DEBUG";
    case Logger_Logger_LogLevel.INFO: return "INFO";
    case Logger_Logger_LogLevel.WARN: return "WARN";
    case Logger_Logger_LogLevel.ERROR: return "ERROR";
    default:
      throw new Error("Invalid value for enum 'Logger_Logger_LogLevel': " + value.toString());
  }
}
