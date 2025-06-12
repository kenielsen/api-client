import { ApiInstanceConfigs } from '../types/config';
import { AdapterOptions, TransportClients } from '../types/transport';
import { buildAxiosClients } from './adapters/axiosAdapter';
// import { buildFetchClients } from './adapters/fetchAdapter';

export const buildApiClients = (options: AdapterOptions): TransportClients => {
  const { adapter, baseConfigs, customBuilders } = options;
  const builtIn: Record<
    string,
    (baseConfigs: ApiInstanceConfigs) => TransportClients
  > = {
    axios: buildAxiosClients,
    // fetch: buildFetchClients, // not implemented yet
  };
  const allBuilders = { ...builtIn, ...customBuilders };
  const builder = allBuilders[adapter];
  if (!builder) throw new Error(`Unknown adapter type: ${adapter}`);
  return builder(baseConfigs);
};
