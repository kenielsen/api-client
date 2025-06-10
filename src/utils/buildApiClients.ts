import { buildAxiosClients } from "./adapters/axiosAdapter";
import { buildFetchClients } from "./adapters/fetchAdapter";
import { AdapterOptions, ApiBaseConfigs, TransportClients } from "./types";

export const buildApiClients = (options: AdapterOptions): TransportClients => {
  const { adapter, baseConfigs, customBuilders } = options;
  const builtIn: Record<
    string,
    (baseConfigs: ApiBaseConfigs) => TransportClients
  > = {
    axios: buildAxiosClients,
    fetch: buildFetchClients,
  };
  const allBuilders = { ...builtIn, ...customBuilders };
  const builder = allBuilders[adapter];
  if (!builder) throw new Error(`Unknown adapter type: ${adapter}`);
  return builder(baseConfigs);
};
