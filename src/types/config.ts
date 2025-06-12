import { HttpMethod, Resolver } from './generics';
import { ApiRequest } from './requests';

// Request/response transformers
export type TransformRequestFn = (request: ApiRequest) => Resolver<ApiRequest>;

// Base config for each API instance
export interface ApiInstanceConfig {
  baseURL: string;
  headers?: Record<string, string>;
  responseType?: string;
  requireAuthentication?: boolean;
}

// Endpoint configuration
export interface ApiRequestConfig {
  instanceKey: string;
  url: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  pathParams?: ParamDefinition[];
  queryParams?: ParamDefinition[];
  transformRequest?: TransformRequestFn[];
  requireAuthentication?: boolean;
}

// Param schema for validation and defaults
export interface ParamDefinition {
  name: string;
  required: boolean;
  defaultValue?: unknown;
}

// Config maps
export type ApiRequestConfigs = Record<string, ApiRequestConfig>;
export type ApiInstanceConfigs = Record<string, ApiInstanceConfig>;
