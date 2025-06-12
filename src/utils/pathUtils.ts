import { NormalizedApiCallParams } from "../types";


export const buildUrl = (url: string, pathParams?: NormalizedApiCallParams, queryParams?: NormalizedApiCallParams): string => {
  let updatedUrl = replacePathParams(url, pathParams);
  if (queryParams) {
    updatedUrl += `?${buildQueryString(queryParams)}`;
  }

  return updatedUrl;
}

export function replacePathParams(path: string, params?: NormalizedApiCallParams) {
  if (!params)
    return path;

  return path.replace(/(?::|<|{)(\w+)(?:}|>)?/g, (_, paramName )=> {
    const value = params[paramName];
    if (value === '')
      throw new Error(`Missing path parameter: ${paramName}`);
    
    return encodeURIComponent(value);
  })
}

export const buildQueryString = (params?: NormalizedApiCallParams): string => {
  if (!params)
    return '';

  return Object.values(params).map((param) => param[0]+'='+param[1]).join('&');
}

