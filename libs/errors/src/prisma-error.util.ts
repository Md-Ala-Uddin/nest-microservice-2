// libs/errors/src/prisma-error.util.ts
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
  PrismaClientInitializationError,
  PrismaClientRustPanicError,
} from '@prisma/client/runtime/library';
import { RpcException } from '@nestjs/microservices';
import type { RpcErrorPayload } from './types/rpc-error.types';

/**
 * Maps Prisma errors to RpcExceptions with type-safe structured payloads.
 */
export function handlePrismaError(error: unknown): never {
  if (error instanceof PrismaClientKnownRequestError) {
    const message =
      typeof error.meta?.target === 'string' ||
      Array.isArray(error.meta?.target)
        ? `Duplicate field: ${JSON.stringify(error.meta.target)}`
        : 'Unique constraint violation';

    const payload: RpcErrorPayload = {
      message,
      code: error.code === 'P2002' ? 409 : 500,
    };

    if (error.code === 'P2025') {
      payload.message = 'Resource not found';
      payload.code = 404;
    }

    if (error.code === 'P2003') {
      payload.message = 'Foreign key constraint failed';
      payload.code = 400;
    }

    throw new RpcException(payload);
  }

  if (error instanceof PrismaClientValidationError) {
    throw new RpcException({
      message: 'Invalid input data',
      code: 400,
    } satisfies RpcErrorPayload);
  }

  if (error instanceof PrismaClientInitializationError) {
    throw new RpcException({
      message: 'Prisma initialization failed',
      code: 500,
    } satisfies RpcErrorPayload);
  }

  if (error instanceof PrismaClientRustPanicError) {
    throw new RpcException({
      message: 'Database panic (Rust)',
      code: 500,
    } satisfies RpcErrorPayload);
  }

  throw new RpcException({
    message: 'Unhandled database error',
    code: 500,
  } satisfies RpcErrorPayload);
}
