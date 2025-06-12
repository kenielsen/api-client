# @kenielsen/api-client — SDK Architecture Map

This SDK implements a transport-agnostic, declarative HTTP client for building maintainable API access layers.

---

## Core Components

| Component | Purpose |
| --------- | ------- |
| `ApiRequestConfig` | Declarative endpoint definitions (codegen target). |
| `ApiUrlConfig` | Declarative instance/baseURL configs (codegen target). |
| `ApiCall` | Runtime execution request model. |
| `ApiResponse<T>` | Transport result wrapper with invariant `ok` property. |
| `ParamContext` | SDK-controlled dynamic runtime context. |
| `AuthProvider` | Auth strategy interface resolved via factory pattern. |
| `TransformRequestFn` | Pluggable preflight transforms (auth injection, etc). |
| `resolveParams()` | Core param resolution pipeline. |
| `mapResponse()` | Consumer-layer domain projection helper. |

---

## Execution Flow
1.  Build `ApiCall` object →  
2.  Apply `ParamContext` →  
3. Resolve `pathParams` + `queryParams` →  
4. Apply `TransformRequestFn` pipeline →  
5.  Execute request via transport adapter →  
66. Wrap result in `ApiResponse<T>`.

---

## Public SDK Surface

- `createBearerAuthProvider()`
- `createBasicAuthProvider()`
- `createApiKeyAuthProvider()`
- `createCustomAuthProvider()` (via alias of `buildAuthProvider`)
- `buildApiClients()`
- `resolveParams()`
- `mapResponse()`
