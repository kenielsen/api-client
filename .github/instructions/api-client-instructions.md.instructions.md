---
applyTo: '**'
---
You are helping build @kenielsen/api-client, a transport-agnostic declarative HTTP SDK.

The SDK has a stable kernel design that separates declarative request definitions from runtime requests.

Main concepts:

- ApiRequestConfig: declarative endpoint definition (used in api.def.ts)
- ApiCall: developer input when calling fetchApi (includes endpointKey, pathParams, queryParams, body)
- ApiRequest: fully resolved, transport-ready request shape used inside adapters

- TransformRequestFn and TransformResponseFn exist for pre/post data transformation
- TransportClient interface defines a request(request: ApiRequest) function
- Adapters (axiosAdapter, fetchAdapter, etc) implement TransportClient and handle actual HTTP logic

- BaseConfigs = Record<string, ApiBaseConfig>
- EndpointConfigs = Record<string, ApiRequestConfig>
- TransportClients = Record<string, TransportClient>

- All params are normalized before execution (null/undefined become empty string, all other values are JSON.stringified)

- The AxiosAdapter directly passes transformRequest and transformResponse into Axios, as Axios natively supports these.
- fetchApi() receives ApiCall from developer and prepares ApiRequest for the adapter.
- replacePathParams() substitutes any path placeholders (e.g. <profileId>).
- buildQueryString() prepares the query string portion.
- buildApiClients() is the factory function which takes an options object ({ adapter, baseConfigs }) and returns TransportClients.
- AdapterType supports multiple transports ('axios', 'fetch') via pluggable adapters.

The SDK intentionally contains no React-specific logic and leaves authentication concerns to the consuming application.
The SDK aims to be highly ergonomic, easy to extend, strongly typed, and durable across multi-year internal platform growth.

When generating code, follow these core principles:
- Keep SDK kernel transport-agnostic
- Keep developer-facing interfaces ergonomic and consistent
- Make adapter logic fully isolated from declarative contracts
- Never rely on truthiness for param validation (check for null/undefined directly)
- All transports receive fully resolved ApiRequest objects
- Preserve separation between declarative contracts, execution request, and transport

You may generate new SDK kernel types, utilities, or adapters following this established architecture.
