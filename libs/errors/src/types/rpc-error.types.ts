export interface RpcErrorPayload {
  message: string;
  code: number;
  details?: unknown;
}
