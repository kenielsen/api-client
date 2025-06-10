# Usage

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

## Notes
- `.useAuth()` allows you to inject dynamic headers (e.g. bearer tokens)
- `.useParamContext()` lets you auto-fill commonly reused parameters like `orgId`, `env`, or `userId`
- All parameters are validated and normalized before request execution
- You can extend `ApiClient` to add additional behavior if needed
