// Export your types:
export {
  ApiBaseConfig,
  ApiBaseConfigs,
  ApiRequestConfig,
  ApiRequestConfigs,
  ApiCall,
  ApiCallContext,
  ApiResponse,
  AuthProvider,
  ParamContext,
  TransformRequestFn
} from './types';

// Export your core ApiClient system:
export { ApiClient } from './core/ApiClient';
export { buildApiClients } from './utils/buildApiClients';

// Export auth provider factories:
export {
  createBearerAuthProvider,
  createBasicAuthProvider,
  createApiKeyAuthProvider,
  buildAuthProvider as createCustomAuthProvider
} from './utils/auth';  // or wherever you're holding them

// Export the request-level helpers:
export * from './utils/requests';  // contains mapResponse()
