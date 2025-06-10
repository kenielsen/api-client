# Design Philosophy

`@kenielsen/api-client` is built with one goal in mind:

> To make HTTP requests clean, extensible, and transport-agnostic — all without forcing your app to fit someone else's mold!

We believe a good SDK should offer **ergonomic defaults**, but never **lock you in**.

## Explicit Separation of Concerns

- **Declarative**: Define endpoints in one place with `api.def.ts`, `api.def.json`, or `api.def.yaml`
- **Runtime-resolved**: Normalize, validate, and transform params only when needed
- **Transport-agnostic**: Adapters like `axios` or `fetch` implement the actual request logic

---

# Developer Experience (DX) Principles

We care about how it feels to use this SDK — not just that it works.

## Opt-in, not forced
You can use what you need:
- `.useAuth()` to add token support only if you want it
- `.useParamContext()` to auto-fill parameters like `orgId` or `userId`, or skip it entirely
- No required decorators, no magic, no framework lock-in

## Fluent and readable
Setup is chainable and expressive:
```ts
const client = new ApiClient(config)
  .useAuth(() => getToken())
  .useParamContext(() => ({ orgId: 'abc123' }));
```

## Helpful defaults, not assumptions
- Missing parameters? You'll get clear errors, not cryptic stack traces
- Param names not declared? You'll know exactly which ones are extra
- Path formats like `<param>`, `{param}`, and `:param` are all supported

## Supports both human and machine editing
- Use `api.def.yaml` for hand-edited definitions
- Use `api.def.json` for tooling and automation
- Load either one seamlessly with `yaml.parse()` or `JSON.parse()`

## Built for scale, not just demos
- Works with Fetch, Axios, or custom transports
- Typed all the way through
- Easy to extend for auth, logging, retries, or multi-tenant needs
