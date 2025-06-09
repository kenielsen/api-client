import { AxiosCacheInstance } from 'axios-cache-interceptor';
import { EndpointConfigs } from '../api.types';
import { createContext, useContext } from 'react';

interface ApiContextValue {
  apiInstances: Record<string, AxiosCacheInstance>;
  endpoints: EndpointConfigs;
}

export const ApiContext = createContext<ApiContextValue | null>(null);
export const useApiContext = () => {
  const context = useContext(ApiContext);

  if (!context) {
    throw new Error('must be used within an ApiProvider');
  }

  return context;
}