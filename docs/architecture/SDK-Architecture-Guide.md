# @kenielsen/api-client — SDK Architecture Guide (v1.0)

## Purpose

Fully transport-agnostic, declarative HTTP client SDK with:

-  Declarative endpoint configs
- Runtime param resolution
- Composable auth strategies
- Pluggable request transform pipeline
- Durable contract for future middleware, streaming, and codegen

## Core Design Decisions


### 1. API Client Entry Point

- `ApiClient` orchestrates runtime execution.
- `call()` method supports any HTTP verb declared.
- Fluent config via `.useAuth()` and `.useGlobalParamContext()`.

---

### 2. Declarative Config Separation

- `ApiInstanceConfig` — instance-level transport configs (base URLs, auth flags).
- `ApiRequestConfig` — endpoint-level definitions (paths, params, transforms).
- `ApiCall` — runtime request execution object.
- `ApiCallContext` — runtime resolution context (paramContext, authProviderContext).

### 3. Param Resolution

- `fillAndNormalizeParams()` handles param merging & normalization.
- Resolution order:
  1. Explicit call-time params
  2. Global + per-call ParamContext
  3. Declared defaultValue
  4. Required assertion triggers error

---

### 4. Path & Query Serialization

- `replacePathParams()` supports multiple token formats: `:param`, `{param}`, `<param>`.
- `buildQueryString()` safely URL-encodes query params using `Object.entries()`.

---

### 5. Auth Pipeline

- `AuthProvider` abstraction exposes:
  - `createBearerAuthProvider()`
  - `createBasicAuthProvider()`
  - `createApiKeyAuthProvider()`
  - `createCustomAuthProvider()`
- Full context-aware header generation via `getHeaders()`.

---

### 6. TransformRequestFn Pipeline

- All request transforms are applied as a strict ordered array.
- Internal transforms (ex: auth injection) integrate into consumer pipelines uniformly.
- Full middleware pipeline deferred to v1.1.

---

### 7. Error Handling

- `ApiResponse<T>` wraps every call.
- `ok` property is computed (`error == null`).
- Full `error: unknown` object passed through for consumer-side parsing.

## Intentionally Deferred for v1.1

- Middleware pipeline (`useMiddleware()`)
- Streaming (`stream()`)
- Multipart/form serialization
- Plugin-based serializers
- SDK codegen integration (external scaffolding ready)
- Retry, tracing, and correlation ID hooks

## Mental Models

- Glue first, enforce after.
- Runtime context separation from definitions.
- Full type safety across transport and glue layers.
- Fully composable extension points.
- Minimal runtime assumptions.

## Current v1.0 Exports

```typescript
export type {
  ApiRequestConfig,
  ApiRequestConfigs,
  ApiInstanceConfig,
  ApiInstanceConfigs,
  ApiCall,
  ApiCallContext,
  ApiRequest,
  ApiResponse,
  ParamContext,
  AuthProvider,
  AuthContextResolver,
  Resolver,
  TransformRequestFn,
  HttpHeader,
  HttpMethod
} from './types';

export { ApiClient } from './core/ApiClient';
export { buildApiClients } from './utils/buildApiClients';

export {
  createBearerAuthProvider,
  createBasicAuthProvider,
  createApiKeyAuthProvider,
  buildAuthProvider as createCustomAuthProvider
} from './utils/auth';

export * from './utils/requests';
```

@kenielsen/api-client v1.0.0 (transport core stable, tests scaffolding WIP, v1.1 design queued)
