import {
  assertPathParams,
  assertQueryParams,
  buildApiClients,
  buildUrl,
  fillAndNormalizeParams,
  createAuthRequestTransform,
} from '../utils';
import {
  AdapterOptions,
  ApiCall,
  ApiRequest,
  ApiRequestConfigs,
  ApiResponse,
  ParamContext,
  TransportClients,
  AuthProvider,
  ApiInstanceConfigs,
  ApiCallContext,
} from '../types';

export class ApiClient {
  public readonly clients: TransportClients;

  private readonly instanceConfigs: ApiInstanceConfigs;
  private globalParamContextProvider?: () => ParamContext;
  private authProvider?: AuthProvider;

  private get globalParamContext() {
    return this.globalParamContextProvider?.() ?? {};
  }

  constructor(
    adapterOptions: AdapterOptions,
    private readonly requestConfigs: ApiRequestConfigs
  ) {
    this.clients = buildApiClients(adapterOptions);
    this.instanceConfigs = adapterOptions.baseConfigs;
  }

  useGlobalParamContext(provider: () => ParamContext) {
    this.globalParamContextProvider = provider;
    return this;
  }

  useAuth(authProvider: AuthProvider) {
    this.authProvider = authProvider;
    return this;
  }

  async call<T>(
    apiCall: ApiCall,
    apiCallContext?: ApiCallContext
  ): Promise<ApiResponse<T>> {
    if (!this.clients || !this.requestConfigs)
      throw new Error(`Neither apiInstances nor endpoints can be undefined.`);

    const config = this.requestConfigs[apiCall.endpointKey];

    if (!config)
      throw new Error(`No endpoint configured for ${apiCall.endpointKey}`);

    const request: ApiRequest = {
      url: config.url,
      method: config.method,
    };

    const instanceKey = config.instanceKey;

    const api = this.clients[instanceKey];

    if (!api) throw new Error(`No API instance found for ${instanceKey}`);

    const authRequired =
      config.requireAuthentication ||
      this.instanceConfigs[instanceKey].requireAuthentication;

    if (this.authProvider && authRequired) {
      const isAuth = await this.authProvider.isAuthenticated(
        apiCallContext?.authProviderContext
      );
      if (!isAuth)
        throw new Error(
          `Authentication required but not satisfied for ${instanceKey}:${apiCall.endpointKey}`
        );
    }

    const paramContext = {
      ...this.globalParamContext,
      ...(apiCallContext?.paramContext ?? {}),
    };

    const pathParams = fillAndNormalizeParams(
      apiCall.pathParams,
      config.pathParams,
      paramContext
    );
    assertPathParams(pathParams, config.pathParams);
    const queryParams = fillAndNormalizeParams(
      apiCall.queryParams,
      config.queryParams,
      paramContext
    );
    assertQueryParams(queryParams, config.queryParams);

    request.url = buildUrl(config.url, pathParams, queryParams);

    request.transformRequest = [
      ...(config.transformRequest ?? []),
      createAuthRequestTransform(
        this.authProvider,
        apiCallContext?.authProviderContext
      ),
    ];

    if (
      apiCall.body &&
      ['post', 'put', 'patch'].includes(config.method.toLowerCase())
    ) {
      request.data = apiCall.body;
    }

    try {
      const response = await api.request<T>(request);

      return response;
    } catch (error) {
      return new ApiResponse<T>(undefined, error);
    }
  }
}
