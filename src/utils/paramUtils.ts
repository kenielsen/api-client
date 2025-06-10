import { NormalizedApiCallParams, ParamDefinition } from "../types";

export const getParameterError = (paramType: 'path' | 'query', params?: Record<string, unknown>, declaredParams?: ParamDefinition[]): string | null => {
  if (!params && !declaredParams) return null;

  if (params && !declaredParams) return `You have supplied ${paramType} parameters to the call, but no ${paramType} parameters are declared for this endpoint.`;

  const safeDeclaredParams = declaredParams ?? [];
  const safeParams = params ?? {};

  const requiredParams = safeDeclaredParams.filter(param => param.required).map(param => param.name);
  if (!requiredParams.length) return null;

  const providedParams= Object.keys(safeParams);

  const missingRequired = requiredParams.filter(param => !providedParams.includes(param));

  if (missingRequired.length)
    return `Missing ${paramType} parameter(s): ${missingRequired.join(', ')}`;

  const declaredNames = safeDeclaredParams.map(param => param.name);
  const extraParams = providedParams.filter(param => !declaredNames.includes(param));
  if (extraParams.length)
    return `Extra ${paramType} parameter(s) supplied: ${extraParams.join(', ')}. Expected: ${declaredNames.join(', ')}`;

  return null;
}

export const assertPathParams = (params?: NormalizedApiCallParams, declaredParams?: ParamDefinition[]) => {
  const err = getParameterError('path', params, declaredParams);
  if (err) throw new Error(err);
}

export const assertQueryParams = (params?: NormalizedApiCallParams, declaredParams?: ParamDefinition[]) => {
  getParameterError('query', params, declaredParams);
}