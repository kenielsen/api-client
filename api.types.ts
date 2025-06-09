import {AxiosError, AxiosRequestConfig, AxiosRequestTransformer, AxiosResponseTransformer, CreateAxiosDefaults} from 'axios';

/** Handles all api errors in a standardized way */
export type ApiErrorHandler = (error: AxiosError, instanceKey: string) => void;

interface EndpointDefinition extends AxiosRequestConfig {
  instanceKey: string;
  url: string;
  method: string;
  transformRequest?: AxiosRequestTransformer[];
  TransformResponse?: AxiosResponseTransformer | AxiosResponseTransformer[];
}

export interface ApiResponse<T> {
  data?: T;
  error?: unknown;
};

export type BaseConfigs = Record<string, CreateAxiosDefaults>;
export type EndpointConfigs = Record<string, EndpointDefinition>;