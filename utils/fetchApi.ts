import { AxiosRequestConfig } from 'axios';
import { ApiResponse, EndpointConfigs } from '../api.types';
import { AxiosCacheInstance } from 'axios-cache-interceptor';

function replacePathParams(path: string, params: Record<string, string>) {
  Object.keys(params).forEach(key => {
    const searchKey = '<' + key + '>';
    if (path.includes(searchKey)) {
      path = path.replace(searchKey, params[key])
    }
  });

  const unmatchedParams = path.match(/<[a-zA-Z]+/g);

  if (unmatchedParams?.length) {
    const stringifiedParams = unmatchedParams.map(p => p.substring(1, p.length - 3)).join(', ');

    throw new Error(`The following parameters need to be supplied: ${stringifiedParams}`)
  }

  return path;
}

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
const fetchApi = async <T>(
  endpointKey: string,
  params: Record<string, string>,
  body: unknown,
  apiInstances: Record<string, AxiosCacheInstance>,
  endpoints: EndpointConfigs
): Promise<ApiResponse<T>> => {
  if(!apiInstances || !endpoints) throw new Error(`Neither apiInstances nor endpoints can be undefined.`);

  const config = { ...endpoints[endpointKey] };
  const instanceKey = config.instanceKey;
  const pathParams = (config.url?.match(/<([^>]+)>/g) || []).map(param => param.slice(1, -1));

  if (!config) throw new Error(`No endpoint configured for ${endpointKey}`);

  const api = apiInstances[instanceKey];

  if (!api) throw new Error(`No API instance found for ${instanceKey}`);

  config.url = replacePathParams(config.url!, params);

  if (!Object.keys(params).every(param => pathParams.includes(param))) {
    config.params = Object.fromEntries(Object.entries(params).filter(([key]) => !pathParams.includes(key)));
  }

  if (body && ['post', 'put', 'patch'].includes(config.method.toLowerCase())) {
    config.data = body;
  }

  try {
    const response = await api.request({
      ...(config as Omit<AxiosRequestConfig, 'instanceKey'>)
    });

    return { data: response.data };

  }
  catch (error) {
    return { error };
  }
}

export default fetchApi;