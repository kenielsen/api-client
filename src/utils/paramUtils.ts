import {
  ApiCallParams,
  NormalizedApiCallParams,
  ParamContext,
  ParamDefinition,
} from '../types';

export const fillAndNormalizeParams = (
  params?: ApiCallParams,
  declaredParams?: ParamDefinition[],
  context?: ParamContext
): NormalizedApiCallParams => {
  if (!declaredParams || declaredParams.length === 0) return {};
  const safeParams = params ?? {};
  const providedParamNames = Object.keys(safeParams);
  for (const declaredParam of declaredParams) {
    if (!providedParamNames.includes(declaredParam.name)) {
      safeParams[declaredParam.name] = getParamValue(declaredParam, context);
    }
  }

  return normalizeParameters(safeParams);
};

export const getParamValue = (
  declaredParam: ParamDefinition,
  context?: ParamContext
): unknown => {
  if (context && context[declaredParam.name])
    return resolveContextValue(context[declaredParam.name]);

  if (declaredParam.defaultValue) return declaredParam.defaultValue;

  if (declaredParam.required)
    throw new Error(
      `Required parameter ${declaredParam.name} was not provided`
    );

  return undefined;
};

export function normalizeParameters(
  params?: Record<string, unknown>
): Record<string, string> {
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

export const getParameterError = (
  paramType: 'path' | 'query',
  params?: ApiCallParams,
  declaredParams?: ParamDefinition[]
): string | null => {
  if (!params && !declaredParams) return null;

  if (params && !declaredParams)
    return `You have supplied ${paramType} parameters to the call, but no ${paramType} parameters are declared for this endpoint.`;

  const safeDeclaredParams = declaredParams ?? [];
  const safeParams = params ?? {};

  const providedParams = Object.keys(safeParams);

  const declaredNames = safeDeclaredParams.map((param) => param.name);
  const extraParams = providedParams.filter(
    (param) => !declaredNames.includes(param)
  );
  if (extraParams.length)
    return `Extra ${paramType} parameter(s) supplied: ${extraParams.join(
      ', '
    )}. Expected: ${declaredNames.join(', ')}`;

  return null;
};

export const assertPathParams = (
  params?: NormalizedApiCallParams,
  declaredParams?: ParamDefinition[]
) => {
  const err = getParameterError('path', params, declaredParams);
  if (err) throw new Error(err);
};

export const assertQueryParams = (
  params?: NormalizedApiCallParams,
  declaredParams?: ParamDefinition[]
) => {
  const err = getParameterError('query', params, declaredParams);
  if (err) throw new Error(err);
};

export const resolveContextValue = (val: unknown): unknown => {
  if (typeof val === 'function') return (val as () => unknown)();

  return val;
};
