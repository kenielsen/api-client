export type Resolver<T> = Promise<T> | T;

export type ContextResolver<TContext, TResult> = (
  context?: TContext
) => Resolver<TResult>;

/**
 * Type alias representing HTTP headers to be injected into requests.
 */
export type HttpHeaders = Record<string, string>;

/**
 * Basic HTTP methods supported by the SDK.
 */
export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';