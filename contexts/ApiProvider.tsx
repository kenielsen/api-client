import axios from 'axios';
import { AxiosCacheInstance, setupCache } from 'axios-cache-interceptor';
import { FC, PropsWithChildren, useMemo } from 'react';
import { EndpointConfigs, ApiErrorHandler, BaseConfigs } from '../api.types';
import { ApiContext } from './ApiContext';



interface ApiProviderProps {
  apis: BaseConfigs;
  endpoints: EndpointConfigs;
  onApiError: ApiErrorHandler;
}

export const ApiProvider: FC<ApiProviderProps & PropsWithChildren> = ({ apis, endpoints, children, onApiError }) => {
  const apiInstances = useMemo(() => {
    const instances: { [key: string]: AxiosCacheInstance } = {};

    Object.keys(apis).forEach(key => {
      const config = apis[key];
      const instance = axios.create(config);
      const cachedInstance = setupCache(instance);

      // Global response interceptor for error handling
      cachedInstance.interceptors.response.use(
        (response) => response,
        (error) => {
          console.log(error)
          if (onApiError) {
            onApiError(error, key);  // Call the global error handler if provided
          }
          return Promise.reject(error);
        }
      );

      instances[key] = cachedInstance;
    });

    return instances;
  }, [apis, onApiError]);

  return <ApiContext.Provider value={{ apiInstances, endpoints }}>{children}</ApiContext.Provider>;
};
