import { ApiInstanceConfigs } from './config';
import { ApiRequest, ApiResponse } from './requests';

// Adapter configuration
export type AdapterType = 'axios'; // | 'fetch';

// Adapter options
export interface AdapterOptions {
  adapter: AdapterType;
  baseConfigs: ApiInstanceConfigs;
  customBuilders?: Record<
    string,
    (baseConfigs: ApiInstanceConfigs) => TransportClients
  >;
}

// Transport client interface
export interface TransportClient {
  instance?: unknown;
  request<T>(request: ApiRequest): Promise<ApiResponse<T>>;
}

export type TransportClients = Record<string, TransportClient>;
