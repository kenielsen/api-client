import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import type { ApiBaseConfigs, ApiRequest, ApiResponse, TransportClient, TransportClients } from '../types';

const buildAxiosClient = (instance: AxiosInstance): TransportClient => ({
  instance,
  request: async<T>(request: ApiRequest): Promise<ApiResponse<T>> => {
    try {
      const response = await instance.request<T>({
        url: request.queryString ? `${request.url}?${request.queryString}` : request.url,
        method: request.method,
        headers: request.headers,
        data: request.data,
        transformRequest: request.transformRequest,
        transformResponse: request.transformResponse
      });
      return {data: response.data}
    } catch (error) {
      return {error};
    }
  }
});

export const buildAxiosClients = (baseConfigs: ApiBaseConfigs): TransportClients => {
  const instances: TransportClients = {};

  Object.entries(baseConfigs).forEach(([key, config]) => {
    const instance = axios.create(config as CreateAxiosDefaults);
    instances[key] = buildAxiosClient(instance);
  });

  return instances;
}