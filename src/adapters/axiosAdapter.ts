import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import type { ApiBaseConfigs, TransportClients } from '../types';

export const buildApiClients = (baseConfigs: ApiBaseConfigs): TransportClients => {
  const instances: Record<string, AxiosInstance> = {};

  Object.entries(baseConfigs).forEach(([key, config]) => {
    instances[key] = axios.create(config as CreateAxiosDefaults);
  });

  return instances;
}