// Adapter configuration
export type AdapterType = "axios" | "fetch";

// Parameter types
export type ApiCallParams = Record<string, unknown>;
export type NormalizedApiCallParams = Record<string, string>;
export type ParamContext = Record<string, unknown>;

// Adapter options
export interface AdapterOptions {
  adapter: AdapterType;
  baseConfigs: ApiBaseConfigs;
  customBuilders?: Record<
    string,
    (baseConfigs: ApiBaseConfigs) => TransportClients
  >;
}

// Transport client interface
export interface TransportClient {
  instance?: unknown;
  request<T>(request: ApiRequest): Promise<ApiResponse<T>>;
}

// Base config for each API instance
export interface ApiBaseConfig {
  baseURL: string;
  headers?: Record<string, string>;
  responseType?: string;
}

// HTTP method types
export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

// Endpoint configuration
export interface ApiRequestConfig {
  instanceKey: string;
  url: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  pathParams?: ParamDefinition[];
  queryParams?: ParamDefinition[];
  transformRequest?: TransformRequestFn[];
  transformResponse?: TransformResponseFn;
}

// Param schema for validation and defaults
export interface ParamDefinition {
  name: string;
  required: boolean;
  defaultValue?: unknown;
}

// Shape of developer-supplied API call
export interface ApiCall {
  endpointKey: string;
  pathParams?: ApiCallParams;
  queryParams?: ApiCallParams;
  body?: unknown;
}

// Fully resolved transport-ready request
export interface ApiRequest {
  url: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  queryString?: string;
  data?: unknown;
  transformRequest?: TransformRequestFn[];
  transformResponse?: TransformResponseFn;
}

// Unified response shape
export interface ApiResponse<T> {
  data?: T;
  error?: unknown;
}

// Request/response transformers
export type TransformRequestFn = (body: unknown) => unknown;
export type TransformResponseFn = (response: unknown) => unknown;

// Config maps
export type ApiRequestConfigs = Record<string, ApiRequestConfig>;
export type ApiBaseConfigs = Record<string, ApiBaseConfig>;
export type TransportClients = Record<string, TransportClient>;
