import { replacePathParams } from './pathUtils';
import { ApiResponse, ApiRequestConfigs, TransportClient, ApiRequest, ApiCall } from './types';

/**
 * 
 * @param endpointKey 
 * @param params 
 * @param body 
 * @param apiInstances
 * @param endpoints
 * 
 * @throws Error if apiInstances or endpoints is undefined
 * @throws Error if configured endpoints do not contain endpointKey
 * @throws Error if endpoint.instanceKey does not have an associated apiInstance
 */
export const fetchApi = async <T>(
  apiCall: ApiCall,
  params: Record<string, string>,
  body: unknown,
  apiInstances: Record<string, TransportClient>,
  endpoints: ApiRequestConfigs
): Promise<ApiResponse<T>> => {
  if(!apiInstances || !endpoints) throw new Error(`Neither apiInstances nor endpoints can be undefined.`);

  const config = endpoints[apiCall.endpointKey];
  const request: ApiRequest = {
    url: config.url,
    method: config.method
  }

  const instanceKey = config.instanceKey;

  if (!config) throw new Error(`No endpoint configured for ${apiCall.endpointKey}`);

  const api = apiInstances[instanceKey];

  if (!api) throw new Error(`No API instance found for ${instanceKey}`);

  if (config.pathParams) {
    // check if 

  }

  if (config.queryParams) {

  }

  if (body && ['post', 'put', 'patch'].includes(config.method.toLowerCase())) {
    request.data = apiCall.body;
  }

  try {
    const response = await api.request<T>(request);

    return { data: response.data };

  }
  catch (error) {
    return { error };
  }
}
