# Usage

```ts
import { ApiClient } from '@kenielsen/api-client';
import { instanceConfigs, requestConfigs } from './api.def.ts';
import { createBearerAuthProvider } from '@kenielsen/api-client/auth';

// Build and configure the API client (fluent chaining)
const client = new ApiClient(
  { adapter: 'axios', baseConfigs: instanceConfigs },
  requestConfigs
)
  .useGlobalParamContext(() => ({ orgId: 'abc123' }))
  .useAuth(
    createBearerAuthProvider(
      () => localStorage.getItem('token') ?? ''
    )
  );

// Perform an API call
const result = await client.call({
  endpointKey: 'getUser',
  pathParams: { userId: '123' }
});
```

---

## Key Usage Notes
- Both `.useAuth()` and `.useGlobalParamContext()` are **fluent** - they return `this` for convenient chaining.
- `.useAuth()` accepts fully pluggable `AuthProvider` instances created via the provided factory methods.
- `.useGlobalParamContext()` injects dynamic global param context merged into all requests.
- All parameters are normalized, resolved and validated before request execution
- `ApiCall` objects remain simple declarative request shapes.
- The 'call()` method supports any HttpMethod declared in your configs.

## Auth Provider Factory Options

| Factory | Usage |
| --- | --- |
| `createBearerAuthProvider()` | Bearer token injection |
| `createBasicAuthProvider()` | Basic Auth (username/password) |
| `createApiKeyAuthProvider()` | API Key injection |
| `createCustomAuthProvider()` | Fully custom header providers |

## Future Extensions
- `TransformRequestFn` allows request-time mutation (middleware ready)
- Transport adapters are fully pluggable(`axios` supported in v1.0, `fetch` coming in v1.1)
- Streaming and advanced middleware pipelines are part of planned v1.1 extensions (currently)

**@kenielsen/api-client — v1.0 Usage Locked**