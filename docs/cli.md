# CLI (Coming Soon)

The `@kenielsen/api-client` CLI helps you generate and manage your `api.def.*` files.

---

## Planned Features

### ✅ Generate Definition Files
Quickly scaffold an empty API definition file in your preferred format:

```bash
npx api-def-gen --yaml
npx api-def-gen --json
```

This will create `api.def.yaml` or `api.def.json` in your current directory with sample structure.

---

### 🔜 Read and Parse Definitions
Import existing `.json` or `.yaml` files directly into your app:
```ts
import fs from 'fs';
import yaml from 'yaml';

const file = fs.readFileSync('./api.def.yaml', 'utf-8');
const endpoints = yaml.parse(file);
```
Or use JSON:
```ts
const endpoints = JSON.parse(fs.readFileSync('./api.def.json', 'utf-8'));
```

Eventually, the CLI will handle this for you:
```bash
npx api-def-load ./api.def.yaml
```

---

### 🧭 OpenAPI Import (Planned)
You’ll be able to import OpenAPI specs and convert them into `api.def.yaml` files:
```bash
npx api-def-gen --from-openapi openapi.yaml
```
This will map HTTP methods, URLs, params, and response types into a format usable by the SDK.

---

## Goals
- Fast scaffolding of definition files
- Simple loading of typed definitions
- Optional OpenAPI import for teams using Swagger or Stoplight

---

## Status
> This CLI is under development. Stay tuned!

Want to help shape the CLI? Open an issue or feature request!

