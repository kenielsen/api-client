import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import {
  ApiInstanceConfigs,
  ApiRequest,
  ApiResponse,
  TransportClient,
  TransportClients,
} from '../../types';

const buildAxiosClient = (instance: AxiosInstance): TransportClient => ({
  instance,
  request: async <T>(request: ApiRequest): Promise<ApiResponse<T>> => {
    try {
      const response = await instance.request<T>({
        url: request.url,
        method: request.method,
        headers: request.headers,
        data: request.data,
        transformRequest: request.transformRequest,
      });
      return new ApiResponse<T>(response.data);
    } catch (error) {
      return new ApiResponse<T>(undefined, error);
    }
  },
});

export const buildAxiosClients = (
  baseConfigs: ApiInstanceConfigs
): TransportClients => {
  const instances: TransportClients = {};

  Object.entries(baseConfigs).forEach(([key, config]) => {
    const instance = axios.create(config as CreateAxiosDefaults);
    instances[key] = buildAxiosClient(instance);
  });

  return instances;
};
