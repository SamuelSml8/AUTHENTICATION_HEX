export interface JSONResponse<S> {
  ok: boolean;
  message: string;
  data?: S;
}
