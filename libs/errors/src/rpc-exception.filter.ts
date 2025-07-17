import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { RpcPayloadError } from './rpc-payload-error';
import { RpcErrorPayload } from './types/rpc-error.types';

export type { RpcErrorPayload };

function isRpcErrorPayloadLike(
  raw: unknown,
): raw is { message: string; code: number; details?: unknown } {
  if (
    typeof raw === 'object' &&
    raw !== null &&
    'message' in raw &&
    'code' in raw
  ) {
    const maybe = raw as { [key: string]: unknown };
    return typeof maybe.message === 'string' && typeof maybe.code === 'number';
  }
  return false;
}

@Catch(RpcException)
export class RpcGlobalExceptionFilter
  implements RpcExceptionFilter<RpcException>
{
  catch(exception: RpcException): Observable<never> {
    const raw = exception.getError();

    if (isRpcErrorPayloadLike(raw)) {
      const safeError: RpcErrorPayload = {
        message: raw.message,
        code: raw.code,
        ...(typeof raw.details !== 'undefined' ? { details: raw.details } : {}),
      };
      return throwError(() => new RpcPayloadError(safeError));
    }

    const fallback: RpcErrorPayload = {
      message: typeof raw === 'string' ? raw : 'Unexpected RPC exception',
      code: 500,
    };

    return throwError(() => new RpcPayloadError(fallback));
  }
}
