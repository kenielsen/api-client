#### Adapter Options

```typescript
interface AdapterOptions {
	adapter: 'axios';  // Fetch deferred to v1.1
	baseConfigs: ApiInstanceConfigs;
	   customBuilders?: Record<string, TransportClient>;
}
```

- `adapter`: Current transport engine (`axios` supported).
- `baseConfigs`: Your per-instance connection configs.
- `customBuilders`: Optional — for injecting additional transport clients.

#### Endpoints

- Declarative `ApiRequestConfigs` defining all endpoint behaviors.

### Methods

#### `.call<T>()`

```typescript


`client.call<T>(call: ApiCall, context?: ApiCallContext): Promise<ApiResponse<T>>`
```

- Executes an API call using declarative configs.
- Supports runtime parameter context injection.
- Always returns an `ApiResponse<T>` for consistent result handling.

#### `.useAuth()`

```typescript
client.useAuth(authProvider: AuthProvider): this
```

- Injects pluggable auth providers via factory functions:
    - `createBearerAuthProvider()`
    - `createBasicAuthProvider()`
    - `createApiKeyAuthProvider()`
    - `createCustomAuthProvider()`

#### `.useGlobalParamContext()`

```typescript
client.useGlobalParamContext(provider: () => ParamContext): this
```

- Injects global dynamic parameter context for path/query params.

## Key Types

### `ApiCall`

typescript

CopyEdit

```typescript
interface ApiCall {   endpointKey: string;   pathParams?: Record<string, unknown>;   queryParams?: Record<string, unknown>;   body?: unknown; }
```

### `ApiRequestConfig`

```typescript
interface ApiRequestConfig {
	instanceKey: string;
	url: string;
	method: HttpMethod;
	pathParams?: ParamDefinition[];
	queryParams?: ParamDefinition[];
	transformRequest?: TransformRequestFn[];
}
```

### `ApiInstanceConfig`

```typescript
interface ApiInstanceConfig {
	baseUrl: string;
	requireAuthentication?: boolean;
}
```

### `ParamDefinition`

```typescript
interface ParamDefinition {
	name: string;
	required: boolean;
	defaultValue?: unknown;
}
```

### `ApiResponse<T>`

typescript

CopyEdit
```typescript
class ApiResponse<T> {
	constructor(public readonly data?: T, public readonly error?: unknown) {}
	
	get ok(): boolean {
		return this.error == null;
	} 
}
```
---

## Utility Types

| Type                     | Purpose                                           |
| ------------------------ | ------------------------------------------------- |
| `ParamContext`           | Dynamic parameter context object                  |
| `AuthContextResolver<T>` | Resolver used for auth providers                  |
| `Resolver<T>`            | General-purpose context resolver pattern          |
| `TransformRequestFn`     | Request mutation pipeline function                |
| `HttpMethod`             | `'get' \| 'post' \| 'put' \| 'patch' \| 'delete'` |

---

## Extending

### Custom Transport Adapters

Implement `TransportClient` to provide custom HTTP engines:

```typescript
interface TransportClient {
	request<T>(request: ApiRequest): Promise<ApiResponse<T>>;
}
```

### Custom Param Contexts

Dynamic parameter injection is fully pluggable via `ParamContext` provider functions.

### Custom Transform Pipelines

Use `TransformRequestFn[]` to inject request-time middleware.

## Notes

- The `fetch` adapter is deferred until v1.1
- Response transformation (`transformResponse`) is intentionally deferred.    
- Middleware pipeline support will expand further in future versions.

---

**@kenielsen/api-client v1.0 — Contract Stable**