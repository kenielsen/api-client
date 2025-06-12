// Export your types:
export {
  ApiInstanceConfig as ApiBaseConfig,
  ApiInstanceConfigs as ApiBaseConfigs,
  ApiRequestConfig,
  ApiRequestConfigs,
  ApiCall,
  ApiCallContext,
  ApiRequest,
  ApiResponse,
  AuthContextResolver,
  AuthProvider,
  HttpHeaders,
  HttpMethod,
  ParamContext,
  Resolver,
  TransformRequestFn,
} from './types';

// Export your core ApiClient system:
export { ApiClient } from './core/ApiClient';
export { buildApiClients } from './utils/buildApiClients';

// Export auth provider factories:
export {
  createBearerAuthProvider,
  createBasicAuthProvider,
  createApiKeyAuthProvider,
  buildAuthProvider as createCustomAuthProvider,
} from './utils/auth'; // or wherever you're holding them

// Export the request-level helpers:
export * from './utils/requests'; // contains mapResponse()
