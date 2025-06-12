# @kenielsen/api-client

[![npm version](https://badge.fury.io/js/%40kenielsen%2Fapi-client.svg)](https://www.npmjs.com/package/@kenielsen/api-client)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

> A fully transport-agnostic, declarative HTTP client SDK for strongly typed API contracts.

Designed for teams building scalable platforms with durable interfaces, context-driven resolution, and zero runtime lock-in.

## Documentation

- [Usage](docs/usage.md)
- [API Reference](docs/api.md)
- [Adapters](docs/adapters.md)
- [CLI](docs/cli.md)
- [Philosophy](docs/philosophy.md)
- [Design Reference](docs/SDK-Design-Reference.md)
- [Architecture Guide](docs/SDK-Architecture-Guide.md)
- [Architecture Map](docs/SDK-Architecture-Map.md)

## Features

- ✅ **Transport-agnostic**: pluggable adapters (`axios` supported, `fetch` queued for v1.1)
- ✅ **Declarative API definitions**: Type-safe `api.def.ts`, `.json`, or `.yaml`
- ✅ **Smart param validation**: Required/default/contextual param resolution
- ✅ **Composable auth system**: Bearer, Basic, API Key, or fully custom
- ✅ **TransformRequestFn**: Middleware-style request mutation
- ✅ **Codegen-friendly**: Clean separation of config & runtime orchestration
- ✅ **Fully testable**: Thin transport core for durable unit tests

---

## v1.1 Roadmap

- [ ] `fetchAdapter` transport module
- [ ] `useMiddleware()` API for registered middleware chains
- [ ] CLI tool for `api.def.*` codegen scaffolding
- [ ] `fromFileDef()` static convenience initializer
- [ ] Streaming pipeline support (`stream()`)
- [ ] Multipart/form-data serialization

---

## Installation

```bash
npm install @kenielsen/api-client

```

or

```bash
pnpm add @kenielsen/api-client
```

or

```bash
yarn add @kenielsen/api-client
```

## Quick Example
```ts
import { ApiClient } from '@kenielsen/api-client';
import { instanceConfigs, requestConfigs } from './api.def.ts';
import { createBearerAuthProvider } from '@kenielsen/api-client/auth';

const client = new ApiClient({ adapter: 'axios', baseConfigs: instanceConfigs }, requestConfigs)
  .useGlobalParamContext(() => ({ orgId: 'abc123' }))
  .useAuth(createBearerAuthProvider(() => localStorage.getItem('token') ?? ''));

const result = await client.call({
  endpointKey: 'getUser',
  pathParams: { userId: '123' }
});
```

---

## License
MIT &copy; [kenielsen](https://github.com/kenielsen)
