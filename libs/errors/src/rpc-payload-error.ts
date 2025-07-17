import { RpcErrorPayload } from './types/rpc-error.types';

export class RpcPayloadError extends Error {
  readonly code: number;
  readonly details?: unknown;

  constructor(payload: RpcErrorPayload) {
    super(payload.message);
    this.name = 'RpcPayloadError';
    this.code = payload.code;
    this.details = payload.details;
    Object.setPrototypeOf(this, new.target.prototype); // 👈 ensures instanceof works
  }

  getPayload(): RpcErrorPayload {
    return {
      message: this.message,
      code: this.code,
      details: this.details,
    };
  }
}
