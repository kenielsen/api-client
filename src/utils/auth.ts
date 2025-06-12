import {
  ApiKeyProviderOptions,
  AuthContextResolver,
  AuthProvider,
  AuthProviderContext,
  BasicCredentialsProviderOptions,
} from '../types/auth';
import { HttpHeaders } from '../types/generics';

export const createBearerAuthProvider = (
  tokenProvider: AuthContextResolver<string>,
  isAuthenticated?: AuthContextResolver<boolean>
): AuthProvider => {
  const getHeaders = async (
    context?: AuthProviderContext
  ): Promise<HttpHeaders> => {
    const token = await tokenProvider(context);
    if (!token) throw new Error('Missing token');
    return { Authorization: `Bearer ${token}` };
  };
  return buildAuthProvider(getHeaders, isAuthenticated);
};

export const buildBasicAuthHeaders = (
  username?: string,
  password?: string
): HttpHeaders => {
  if (!username || !password)
    throw new Error('Username or password was not supplied');

  const encoded = btoa(`${username}:${password}`);
  return { Authorization: encoded };
};

export const createBasicAuthProvider = (
  credentialsOptions: BasicCredentialsProviderOptions,
  isAuthenticated: AuthContextResolver<boolean>
): AuthProvider => {
  const getHeaders = async (
    context?: AuthProviderContext
  ): Promise<HttpHeaders> => {
    if (credentialsOptions.basicCredentialsProvider) {
      const { username, password } =
        await credentialsOptions.basicCredentialsProvider(context);
      return buildBasicAuthHeaders(username, password);
    }

    if (
      credentialsOptions.usernameProvider &&
      credentialsOptions.passwordProvider
    ) {
      const username = await credentialsOptions.usernameProvider(context);
      const password = await credentialsOptions.passwordProvider(context);
      return buildBasicAuthHeaders(username, password);
    }

    throw new Error('No credentials providers configured');
  };

  return buildAuthProvider(getHeaders, isAuthenticated);
};

export const createApiKeyAuthProvider = (
  apiKeyProviderOptions: ApiKeyProviderOptions,
  isAuthenticated: AuthContextResolver<boolean>
): AuthProvider => {
  const { apiKeyProvider, headerName, valueBuilder } = apiKeyProviderOptions;
  const getHeaders = async (
    context?: AuthProviderContext
  ): Promise<HttpHeaders> => {
    const apiKey = await apiKeyProvider(context);
    if (!apiKey) throw new Error('Missing API Key');
    return {
      [headerName ?? 'X-API-Key']: valueBuilder ? valueBuilder(apiKey) : apiKey,
    };
  };


  return buildAuthProvider(getHeaders, isAuthenticated);
};

export const buildAuthProvider = (
  getHeaders: AuthContextResolver<HttpHeaders>,
  isAuthenticated?: AuthContextResolver<boolean>
): AuthProvider => {
  return {
    isAuthenticated: buildIsAuthenticatedFunction(getHeaders, isAuthenticated),
    getHeaders,
  };
};

export function buildIsAuthenticatedFunction(
  getHeaders: AuthContextResolver<HttpHeaders>,
  customIsAuthenticated?: AuthContextResolver<boolean>
): (context?: AuthProviderContext) => Promise<boolean> {
  return async (context?: AuthProviderContext) => {
    if (customIsAuthenticated) {
      return await customIsAuthenticated(context);
    }
    try {
      const headers = await getHeaders(context);
      return Object.keys(headers).length > 0;
    } catch {
      return false;
    }
  };
}
