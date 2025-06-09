export { type EndpointConfigs, type BaseConfigs, type ApiErrorHandler } from './api.types';
export { ApiProvider } from './contexts/ApiProvider';
export { default as useApi } from './hooks/useApi';
export { default as useCallApi } from './hooks/useCallApi';

export function asJSON(data: unknown) {
  return (typeof data) === 'string' && data.length > 0 ? JSON.parse(data) : data;
}