# @kenielsen/api-client

A transport-agnostic, framework-agnostic SDK for declarative HTTP APIs

Designed for teams building modern platforms with strong typing durable interfaces, and zero runtime lock in.

---

## Features
- **Transport-agnostic**: use with `fetch`, `axios` or your own adapter
- **Declarative API definitions**: Centralize and type your HTTP contract
- **Smart param validation**: Get helpful errors for missing or extra parameters
- **Extendable client**: Inject auth, param context, middleware, and more
- **Suports JSON and YAML**: Write `api.def.ts`, `.json`, or `.yaml` - all supported
### *Future Features*
- [ ] CLI tool to generate `api.def.*` files
- [ ] Reader of `api.def.*` so you don't have to parse it, just pass the file!

---

## Installation
```bash
npm install @kenielsen/api-client
```

or

```bash
pnpm add @kenielsen/api-client
```

---

## Usage
```ts
import { ApiClient } from '@kenielsen/api-client';
import { baseConfigs, endpoints } from './api.def.ts';

const client = new ApiClient({adapter: 'axios', baseConfigs, endpoints})
  .useAuth(() => localStorage.getItem('token') ?? '')
  .useParamContext(9) => ({orgId: 'abc123'});

const result = await client.fetch({
  endpointKey: 'getUser',
  pathParams: { userId: '123' },
});
```

---
## Design Philosophy
`@kenielsen/api-client` is build with one goal in mind:
> To make HTTP requests clean, extensible, and transport-agnostic, all without forcing your app to fit someone else's mold!

We believe a good SDK should offer **ergonomic defaults**, but never **lock you in**. This library follows these principles:

### Explicit Separation of Concerns
- **Declarative**: Define endpoints in one place with `api.def.ts`, `api.def.json` or `api.def.yaml`
- **Runtime-resolved**: Normalize, validate and transform params only when needed
- **Transport-agnostic**: Adapters like `axios` or `fetch` implement the actual request logic, not the core

---

### Extensible by Design
- Use `.useAuth()` to plug in token logic — or skip it entirely
- Use `.useParamContext()` to inject things like orgId, env, or userId into requests
- Extend the ApiClient class or create custom middleware if needed — no magic

---

### You're in Control
- Prefer `{param}` in URLs? We support it. Like `<param>` or `:param`? We’ve got you.
- Want auto-injected tenant IDs? You can. Want to type it all yourself? That works too.
- Need full access to the request objects? You always have the raw `TransportClient`

---

### Developer Ergonomics

We believe fluent APIs make for happier developers.

That's why `useX()` calls are chainable, param checks are descriptive, and validation is automatic (but opt-out-able).

---

This SDK is made for **teams building platforms**, not just one-off apps! Because that's where durability, type safety, and control matter most.

## Developer Experience (DX) Principles
We care about how it feels to use this SDK - not just that it works. Everything in `@kenielsen\api-client` is designed to support **ergonomic, composable, and durable developer workflows**.

### Opt-in, not forced
You can use what you need:
- `.useAuth()` to add token support only if you want it
- `.useParamContext()` to auto-fill parameters like `orgId` or `userId`, or skip it entirely
- No required decorators, no magic, no framework lock-in

### Fluent and readable
Setup is chainable and expressive:

```ts
const client = new ApiClient(config)
  .useAuth(() => getToken())
  .useParamContext(() => ({orgId: 'abc123'}));
```

### Helpful defaults, not assumptions
* Missing parametrs? You'll get clear errors, not cryptic stack traces
* Param names not declared? You'll know exactly which ones are extra.
* Path formats like `<param>`, `{param}` and `:param` are all supported - use what fits your team.

### Supports both human and machine editing
- Use `api.def.yaml` for hand-edited definitions
- Or generated `api.def.json` for tooling and automation
- Load either oen seamlessly with `yaml.parse()` or `JSON.parse()`

### Built for scale, not just demos
- Works with Fetch, Axios, or custom transports
- Typed all the way through
- Easy to extend for auth, logging, retries, or multi-tenant needs

---

## File Formats

---

### CLI (in progress)
You can use the CLI to scaffold `api.def.yaml` or `api.def.json`:
```bash
npx api-def-gen --yaml
npx api-def-gen --json
```

Future addition of generation from OpenAPI contracts

---

## License
MIT &copy; [kenielsen](https://github.com/kenielsen)