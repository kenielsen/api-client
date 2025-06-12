import { ContextResolver, HttpHeaders } from './generics';

/**
 * Context object passed into authentication providers.
 * Allows dynamically resolving credentials based on caller context.
 */
export type AuthProviderContext = Record<string, unknown>;

export type AuthContextResolver<T> = ContextResolver<AuthProviderContext, T>;

/**
 * Interface representing an AuthProvider instance.
 *
 * AuthProviders are responsible for:
 * - determining whether valid credentials exist
 * - resolving headers to inject into HTTP requests
 */
export interface AuthProvider {
  /**
   * Determines if authentication is currently valid.
   *
   * This may perform lightweight checks or more complex evaluations
   * based on the provided context.
   *
   * @param context Optional runtime context for dynamic resolution.
   * @returns boolean or Promise<boolean> indicating validity
   */
  isAuthenticated: AuthContextResolver<boolean>;

  /**
   * Resolves authentication headers to inject into the request.
   *
   * May throw if headers cannot be resolved (e.g., missing credentials).
   *
   * @param context Optional runtime context for dynamic resolution.
   * @returns Headers to apply to the outgoing request.
   */
  getHeaders: AuthContextResolver<HttpHeaders>;
}

export interface BasicCredentialsProviderOptions {
  basicCredentialsProvider?: AuthContextResolver<{
    username: string;
    password: string;
  }>;
  usernameProvider?: AuthContextResolver<string>;
  passwordProvider?: AuthContextResolver<string>;
}

export interface ApiKeyProviderOptions {
  apiKeyProvider: AuthContextResolver<string>;
  valueBuilder?: (value: string) => string;
  headerName?: string;
}
