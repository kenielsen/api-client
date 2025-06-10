import { buildApiClients } from './buildApiClients';
import { normalizeParameters, replacePathParams } from '../utils/pathUtils';
import {
  AdapterOptions,
  ApiCall,
  ApiRequest,
  ApiRequestConfigs,
  ApiResponse,
  TransportClients,
} from '../types';

export class ApiClient {
  public readonly clients: TransportClients;
  private paramContextProvider?: () => Record<string, unknown>;

  /**
   *
   */
  constructor(
    adapterOptions: AdapterOptions,
    private readonly requestConfigs: ApiRequestConfigs
  ) {
    this.clients = buildApiClients(adapterOptions);
  }

  useParamContext(provider: () => Record<string, unknown>) {
    this.paramContextProvider = provider;
    return this;
  }

  async fetch<T>(apiCall: ApiCall): Promise<ApiResponse<T>> {
    // move fetchApi implementation here
    if (!this.clients || !this.requestConfigs)
      throw new Error(`Neither apiInstances nor endpoints can be undefined.`);

    const config = this.requestConfigs[apiCall.endpointKey];
    const request: ApiRequest = {
      url: config.url,
      method: config.method,
    };

    const instanceKey = config.instanceKey;

    if (!config)
      throw new Error(`No endpoint configured for ${apiCall.endpointKey}`);

    const api = this.clients[instanceKey];

    if (!api) throw new Error(`No API instance found for ${instanceKey}`);

    const providedParams = apiCall.pathParams
      ? normalizeParameters(apiCall.pathParams)
      : {};
    let url = config.url;

    // parse path params
    // parse query params

    if (
      apiCall.body &&
      ['post', 'put', 'patch'].includes(config.method.toLowerCase())
    ) {
      request.data = apiCall.body;
    }

    try {
      const response = await api.request<T>(request);

      return { data: response.data };
    } catch (error) {
      return { error };
    }
  }
}
