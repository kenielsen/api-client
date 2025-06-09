import { useApiContext } from '../contexts/ApiContext';
import fetchApi from '../utils/fetchApi';

/**
 * 
 * @returns An async function that can be used to call an api endpoint. This function takes the same parameters as useApi
 */
export default function() {
  const {apiInstances, endpoints} = useApiContext();

  return async <T>(endpointName: string, params: Record<string, string> = {}, body?: unknown) => {
    return await fetchApi<T>(endpointName, params, body, apiInstances, endpoints);
  }
}