// libs/errors/src/rpc-exceptions.ts
import { RpcException } from '@nestjs/microservices';
import type { RpcErrorPayload } from './types/rpc-error.types';

export class NotFoundRpcException extends RpcException {
  constructor(message = 'Not found') {
    super({ message, code: 404 } satisfies RpcErrorPayload);
  }
}

export class ConflictRpcException extends RpcException {
  constructor(message = 'Conflict') {
    super({ message, code: 409 } satisfies RpcErrorPayload);
  }
}

export class ValidationRpcException extends RpcException {
  constructor(message = 'Validation failed') {
    super({ message, code: 400 } satisfies RpcErrorPayload);
  }
}
