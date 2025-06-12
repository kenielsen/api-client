# Design Philosophy — @kenielsen/api-client (v1.0)

`@kenielsen/api-client` is built with one core goal:

> Make HTTP requests clean, composable, and transport-agnostic — without forcing your app to fit someone else's mold.

We believe a good SDK offers **ergonomic defaults** without creating unnecessary lock-in.

---

## Explicit Separation of Concerns

- **Declarative-first**:  
  Define endpoints using codegen-friendly `api.def.ts` (or `.json` / `.yaml` inputs).
  
- **Runtime-resolved**:  
  Parameters are lazily resolved and validated just-in-time at request execution.

- **Transport-agnostic**:  
  The SDK abstracts HTTP execution into fully pluggable adapters (`axios` supported in v1.0, `fetch` adapter deferred to v1.1).

- **Composable auth pipeline**:  
  Auth strategies are injected via `AuthProvider` factories, not hardcoded configuration objects.

---

## Developer Experience (DX) Principles

> This SDK is written for humans first, systems second.

### Opt-in, not forced

You use only what you need:

- `.useAuth()` accepts any valid `AuthProvider` — bearer, basic, API key, or fully custom.
- `.useGlobalParamContext()` allows dynamic param injection globally, or per call.
- No required decorators, magic, or framework lock-in.

### Fluent, chainable configuration

The SDK encourages expressive, readable setup:

```typescript
const client = new ApiClient(configs, requestConfigs)
  .useGlobalParamContext(() => ({ orgId: 'abc123' }))
  .useAuth(createBearerAuthProvider(() => getToken()));
```

### Helpful defaults, not hidden assumptions
- Missing required parameters? Clear, explicit validation errors.
- Param names not declared? Helpful extra-parameter warnings
- Path tokens fully support flexible formats: `:param`, `{param}`, `<param>`

### Supports both human and machine editing
- use `api.def.yaml` or `api.def.json` for configuration.
- Codegen utilities can consume either for CI pipelines or automation.
- The SDK separates runtime resolution from declarative definitions cleanly.

### Build for scale, not demos
- Transport-agnostic core
- Type-save end-to-end
- Fully pluggable auth layer
- Context-driven param system
- Fully isolated transform pipeline (`TransformRequestFn[]`)
- Middleware pipeline scaffolding intentionally deferred for v1.1+
- Safe to extend for multi-tentant, retry, telemetry or tracing needs

**@kenielsen/api-client v1.0**