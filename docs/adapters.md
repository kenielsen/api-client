# Adapters

`@kenielsen/api-client` is built to be transport-agnostic. This means you can plug in any adapter that implements the `TransportClient` interface.

Out of the box, the SDK supports:

- ✅ `axios`
- 🚧 `fetch` (in progress)
- ✨ Custom adapters

---

## Built-in Adapters

### Axios Adapter
Supports all standard features of Axios, including:
- `transformRequest` and `transformResponse`
- Interceptors (set up outside the SDK)
- Full request config support

### Fetch Adapter (in progress)
Supports basic `fetch()` functionality with:
- Optional JSON parsing
- Customizable request init
- Streaming and other advanced use cases TBD

---

## Writing Your Own Adapter

To create a custom adapter, implement the `TransportClient` interface:

```ts
export interface TransportClient {
  instance?: unknown;
  request<T>(request: ApiRequest): Promise<ApiResponse<T>>;
}
```

Then use the `customBuilders` field when creating your client:

```ts
const client = new ApiClient({
  adapter: 'customHttp',
  baseConfigs,
  customBuilders: {
    customHttp: (baseConfigs) => buildCustomTransportClients(baseConfigs),
  },
  endpoints,
});
```

This lets you bring your own:
- HTTP stack (e.g. GraphQL, gRPC, WebSocket abstraction)
- Internal transport layer (e.g. logging, retry, batching)

---

## Adapter Flexibility

Adapters only receive normalized, fully-resolved `ApiRequest` objects — they don't need to know anything about endpoint configs or param validation.

This makes the SDK:
- Easy to test
- Easy to replace transports
- Durable over multi-year product evolutions

If you need help writing an adapter, open an issue or start with the `axiosAdapter.ts` in `src/utils/adapters/`.
