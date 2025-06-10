

export function replacePathParams(path: string, params: Record<string, unknown>, declaredParams: ParamDefinition[]) {
  const paramError = getParameterError('path', params, declaredParams);
  if (paramError) throw new Error(paramError);

  const normalized = normalizeParameters(params);
  // Object.keys(params).forEach(key => {
  //   const searchKey = '<' + key + '>';
  //   if (path.includes(searchKey)) {
  //     path = path.replace(searchKey, params[key])
  //   }
  // });

  // const unmatchedParams = path.match(/<[a-zA-Z]+/g);

  // if (unmatchedParams?.length) {
  //   const stringifiedParams = unmatchedParams.map(p => p.substring(1, p.length - 3)).join(', ');

  //   throw new Error(`The following parameters need to be supplied: ${stringifiedParams}`);
  // }

  return path;
}

export const buildQueryString = (params?: Record<string, unknown>, declaredParams?: ParamDefinition[]): string => {
  const paramError = getParameterError('query', params, declaredParams);
  if (paramError) throw new Error(paramError);
  if (!params) return '';

  // Check if all required query parameters exist

  const normalized = normalizeParameters(params);
  return params ? new URLSearchParams(normalized).toString() : '';
}

export function normalizeParameters(params?: Record<string, unknown>): Record<string, string> {
  if (!params) {
    return {};
  }

  return Object.entries(params).reduce((acc, [key, value]) => {
    if (value === null || value === undefined) {
      acc[key] = '';
    } else {
      acc[key] = JSON.stringify(value);
    }
    return acc;
  }, {});
}