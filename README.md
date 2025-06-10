# @kenielsen/api-client

[![npm version](https://badge.fury.io/js/%40kenielsen%2Fapi-client.svg)](https://www.npmjs.com/package/@kenielsen/api-client)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

A transport-agnostic, framework-agnostic SDK for declarative HTTP APIs.

Designed for teams building modern platforms with strong typing, durable interfaces, and zero runtime lock-in.

---

## Documentation
- [Usage](docs/Usage.md)
- [API Reference](docs/Api.md)
- [Adapters](docs/Adapters.md)
- [CLI](docs/CLI.md)
- [Philosophy](docs/Philosophy.md)

---

## Features
- **Transport-agnostic**: use with `fetch`, `axios`, or your own adapter
- **Declarative API definitions**: Centralize and type your HTTP contract
- **Smart param validation**: Get helpful errors for missing or extra parameters
- **Extendable client**: Inject auth, param context, middleware, and more
- **Supports JSON and YAML**: Write `api.def.ts`, `.json`, or `.yaml` – all supported

### *Future Features*
- [ ] CLI tool to generate `api.def.*` files
- [ ] Reader for `api.def.*` so you can load config files directly

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

---

## Quick Example
```ts
import { ApiClient } from '@kenielsen/api-client';
import { baseConfigs, endpoints } from './api.def.ts';

const client = new ApiClient({ adapter: 'axios', baseConfigs, endpoints })
  .useAuth(() => localStorage.getItem('token') ?? '')
  .useParamContext(() => ({ orgId: 'abc123' }));

const result = await client.fetch({
  endpointKey: 'getUser',
  pathParams: { userId: '123' },
});
```

---

## License
MIT &copy; [kenielsen](https://github.com/kenielsen)
