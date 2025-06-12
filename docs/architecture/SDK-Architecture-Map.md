# @kenielsen/api-client — SDK Architecture Map (v1.0)

This SDK implements a fully transport-agnostic, declarative HTTP client for building maintainable, fully testable, and extensible API access layers.

## Core Types & Configurations

| Component | Purpose |
| --------- | ------- |
| `ApiInstanceConfig` / `ApiInstanceConfigs` | Declarative instance-level configs (base URLs, auth flags) — codegen target |
| `ApiRequestConfig` / `ApiRequestConfigs` | Declarative endpoint definitions — codegen target |
| `ApiCall` | Runtime execution request object |
| `ApiCallContext` | Runtime resolution context (paramContext + authProviderContext) |
| `ApiRequest` | Fully assembled request object passed to transport adapters |
| `ApiResponse<T>` | Normalized transport result wrapper |
| `ParamContext` | Dynamic runtime parameter resolution |
| `AuthProvider` | Auth strategy abstraction with factory pattern |
| `TransformRequestFn[]` | Pluggable request-time mutation pipeline |


## Param Resolution Pipeline

- `fillAndNormalizeParams()` — primary param normalization and default resolution
- `resolveContextValue()` — handles lazy context value resolution (`() => value`)
- `assertPathParams()` / `assertQueryParams()` — contract safety enforcement
- `replacePathParams()` — template substitution (`:param`, `<param>`, `{param}`)
- `buildQueryString()` — query serialization with URL encoding
- `buildUrl()` — full URL assembly

## Execution Flow

1. Build `ApiCall`  
2. Merge `globalParamContext` + `ApiCallContext`  
3. Normalize parameters via `fillAndNormalizeParams()`  
4. Apply parameter assertions  
5. Build final request URL via `buildUrl()`  
6. Attach request body for applicable methods  
7. Build transform pipeline (`TransformRequestFn[]`)  
8. Execute transforms sequentially  
9. Invoke transport adapter via `api.request<T>(request)`  
10. Wrap result into `ApiResponse<T>`

## Auth Pipeline

- Factory-based auth providers:
  - `createBearerAuthProvider()`
  - `createBasicAuthProvider()`
  - `createApiKeyAuthProvider()`
  - `createCustomAuthProvider()` (via `buildAuthProvider()`)
- Auth pipeline inserts header transforms into the request pipeline.

---

## Public SDK Surface

| Export | Purpose |
| ------ | ------- |
| `ApiClient` | Main orchestration entry point |
| `buildApiClients()` | Transport adapter factory |
| Auth factories | Prebuilt `AuthProvider` constructors |
| `fillAndNormalizeParams()` | Param normalization glue |
| `mapResponse()` | Consumer response mapping utility |
| `TransformRequestFn` | Transform pipeline contract |

---

## Future Extensions (v1.1+)

- Middleware pipeline (`useMiddleware()`)
- Streaming pipeline (`stream()`)
- Form serialization support
- Plugin-based serialization engines
- SDK codegen integration
- Retry and resilience pipelines
- Correlation ID / tracing hooks

---

✅ **SDK v1.0 Status:**  
- Contract locked  
- Transport pipeline stable  
- Glue fully normalized  
- Extensibility preserved  
- Test scaffolding WIP  
- v1.1 backlog established

