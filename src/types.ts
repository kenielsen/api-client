type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface TransportClient {
  request<T>(request: ApiRequest): Promise<ApiResponse<T>>;
}

export interface ApiBaseConfig {
  baseURL: string;
  headers?: Record<string, string>;
  responseType?: string;
}

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

export interface ParamDefinition {
  name: string;
  required: boolean;
}

export interface ApiCall {
  endpointKey: string;
  pathParams?: Record<string, unknown>;
  queryParams?: Record<string, unknown>;
  body?: unknown;
}

export interface ApiRequest {
  url: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  queryString?: string;
  data?: unknown;
  transformRequest?: TransformRequestFn[];
  transformResponse?: TransformResponseFn;

}

export interface ApiResponse<T> {
  data?: T;
  error?: unknown;
};

export type TransformRequestFn = (body: unknown) => unknown;
export type TransformResponseFn = (response: unknown) => unknown;

export type ApiRequestConfigs = Record<string, ApiRequestConfig>;
export type ApiBaseConfigs = Record<string, ApiBaseConfig>;
export type TransportClients = Record<string, TransportClient>;