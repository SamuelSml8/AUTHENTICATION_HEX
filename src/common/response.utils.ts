import { JSONResponse } from './json-response.interface';

export function jsonResponse(
  ok: boolean,
  message: string,
  data: any,
): JSONResponse<any> {
  return { ok, message, data };
}
