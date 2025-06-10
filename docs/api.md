# API Reference

This page documents the core types, classes, and methods provided by `@kenielsen/api-client`.

---

## `ApiClient` Class
The main entrypoint for performing typed, declarative API calls.

### Constructor
```ts
new ApiClient(options: AdapterOptions, endpoints: ApiRequestConfigs)
```
- `options.adapter`: `'axios' | 'fetch'`
- `options.baseConfigs`: per-instance configuration (base URL, headers)
- `options.customBuilders`: optional, for adding custom transport clients
- `endpoints`: your declarative endpoint definitions

### Methods
```ts
client.fetch<T>(call: ApiCall): Promise<ApiResponse<T>>
```
Executes a typed request using the defined config.

```ts
client.useAuth(getTokenFn: () => string): this
```
Adds a bearer token header for all requests.

```ts
client.useParamContext(getParamsFn: () => ParamContext): this
```
Injects additional parameters (e.g. `orgId`, `userId`) into path/query.

---

## Key Types

### `ApiCall`
```ts
interface ApiCall {
  endpointKey: string;
  pathParams?: Record<string, unknown>;
  queryParams?: Record<string, unknown>;
  body?: unknown;
}
```
Used by developers when calling `client.fetch()`.

### `ApiRequestConfig`
```ts
interface ApiRequestConfig {
  instanceKey: string;
  url: string;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  headers?: Record<string, string>;
  pathParams?: ParamDefinition[];
  queryParams?: ParamDefinition[];
  transformRequest?: TransformRequestFn[];
  transformResponse?: TransformResponseFn;
}
```
Describes a single endpoint.

### `ParamDefinition`
```ts
interface ParamDefinition {
  name: string;
  required: boolean;
  defaultValue?: unknown;
}
```
Used to validate and fill parameters before request execution.

---

## Utility Types
- `ApiCallParams = Record<string, unknown>`
- `NormalizedApiCallParams = Record<string, string>`
- `ParamContext = Record<string, unknown>`

---

## Extending
You can extend `ApiClient` or write your own adapters by implementing:
```ts
interface TransportClient {
  request<T>(request: ApiRequest): Promise<ApiResponse<T>>;
}
```

To inject custom behavior, override `fetch()` or extend it with middleware.

For full examples, see [Adapters](./Adapters.md) and [Usage](./Usage.md).
