import { AuthProviderContext } from './auth';
import { TransformRequestFn } from './config';
import { HttpMethod } from './generics';

// Parameter types
export type ApiCallParams = Record<string, unknown>;
export type NormalizedApiCallParams = Record<string, string>;
export type ParamContext = Record<string, unknown>;

/**
 * Complete definition of a single API endpoint call.
 * Fully resolved (no unresolved params or templates).
 */
export interface ApiCall {
  endpointKey: string;
  pathParams?: ApiCallParams;
  queryParams?: ApiCallParams;
  body?: unknown;
}

export interface ApiCallContext {
  paramContext?: ParamContext;
  authProviderContext?: AuthProviderContext;
}

// Fully resolved transport-ready request
export interface ApiRequest {
  url: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  data?: unknown;
  transformRequest?: TransformRequestFn[];
}

// Unified response shape
export class ApiResponse<T> {
  constructor(public readonly data?: T, public readonly error?: unknown) {}

  get ok(): boolean {
    return this.error == null;
  }
}
