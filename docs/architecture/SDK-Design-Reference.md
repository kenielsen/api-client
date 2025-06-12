### `ParamContext` / `ParamContextProvider()`

- Dynamic context injection system.
- Consumers may inject global or per-call param context.
- Lazily resolves `() => value` functions at request-time.

### `AuthProvider`

- Fully factory-based auth provider system.
- No `AuthType` enum / discriminators.
- Strategies exposed via factories:
    - `createBearerAuthProvider()`
    - `createBasicAuthProvider()`
    - `createApiKeyAuthProvider()`
    - `createCustomAuthProvider()`

### `TransformRequestFn[]`

- Strict transform pipeline array.    
- Handles:    
    - Auth injection
    - Request mutation
    - Future retries, telemetry, correlation IDs, etc.
- Middleware expansion deferred to v1.1.
    

### `ApiResponse<T>`

- Concrete return model with `data`, `error`, and computed `ok` property.
```typescript
class ApiResponse<T> {
  constructor(public readonly data?: T, public readonly error?: unknown) {}

  get ok(): boolean {
    return this.error == null;
  }
}
```

### `mapResponse()`

- Consumer-side domain model mapper:
```typescript
export async function mapResponse<TIn, TOut>(
  response: ApiResponse<TIn>,
  mapper: (input: TIn) => TOut
): Promise<ApiResponse<TOut>> { ... }
```

## Architectural Rules

- All consumer-facing contracts are declarative.
- Transport adapters handle execution (`axios` in v1.0, `fetch` deferred to v1.1).
- Auth is fully pluggable — no static config coupling.
- Param resolution supports:
    - Required enforcement
    - Default value injection
    - Context resolution
    - Lazy function evaluation
- `ApiResponse.error` passes through `unknown` — domain error parsing lives in app layer.
- Response projection lives fully outside SDK core.
- No speculative abstractions baked into transport core.
- Codegen drives config generation — runtime logic is isolated.
- `package-lock.json` committed for reproducible builds.
- Transform pipeline is fully composable but internally consistent.

## Optional Future Extensions (v1.1+ Planned)

- Middleware pipeline (`useMiddleware()`)
- Streaming pipeline (`stream()`)
- Form/multipart serialization
- Transport adapter expansion (`fetch`)
- Retry & resilience pipelines
- Structured error parsing
- Correlation ID / tracing hooks
- SDK codegen CLI integration


**SDK v1.0 Status:**

- Transport stable
- Glue hardened
- Contract locked
- Extensibility preserved
- v1.1 roadmap queued

This SDK foundation is stable, scalable, and intentionally simple to maintain long-term.