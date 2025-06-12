import { ApiBaseConfigs } from "./config";
import { ApiRequest, ApiResponse } from "./requests";

// Adapter configuration
export type AdapterType = "axios" | "fetch";

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

export type TransportClients = Record<string, TransportClient>;