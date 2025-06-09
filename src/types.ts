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
  pathParams?: string[];
  queryParams?: string[];
  transformRequest?: TransformRequestFn[];
  transformResponse?: TransformResponseFn;
}

export interface ApiCall {
  endpointKey: string;
  pathParams?: Record<string, string>;
  queryParams?: Record<string, string>;
  body?: unknown;
}

export interface ApiRequest {

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