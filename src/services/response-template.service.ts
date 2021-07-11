export interface ErrorMessage {
  statusCode: number;
  error: string;
}

export interface SuccessMessage {
  statusCode: number;
  data: unknown;
}

export function createErrMsg(statusCode: number, error: string): ErrorMessage {
  return { statusCode, error };
}

export function createSuccessMsg(
  statusCode: number,
  data: unknown,
): SuccessMessage {
  return { statusCode, data };
}
