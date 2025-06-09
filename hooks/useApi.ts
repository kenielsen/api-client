import { useEffect, useState } from 'react';
import fetchApi from '../utils/fetchApi';
import { useApiContext } from '../contexts/ApiContext';

/**
 * Hook that will immediately call the defined api endpoint.
 * @param endpointName Name of endpoint that will be called
 * @param params Url parameters, both for dynamic paths and query params.
 * @param body Json object representing the body for the request
 * @returns Object that has the data or error returned from the endpoint and whether or not the request is still running.
 */
export default function<T>(endpointName: string, params: Record<string, string> = {}, body?: unknown) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const {apiInstances, endpoints} = useApiContext();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await fetchApi<T>(endpointName, params, body, apiInstances, endpoints);
      setData(result.data || null);
      setError(result.error || null);
      setLoading(false);
    }

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {data, loading, error};
}