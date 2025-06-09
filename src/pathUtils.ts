export function replacePathParams(path: string, params: Record<string, string>) {
  Object.keys(params).forEach(key => {
    const searchKey = '<' + key + '>';
    if (path.includes(searchKey)) {
      path = path.replace(searchKey, params[key])
    }
  });

  const unmatchedParams = path.match(/<[a-zA-Z]+/g);

  if (unmatchedParams?.length) {
    const stringifiedParams = unmatchedParams.map(p => p.substring(1, p.length - 3)).join(', ');

    throw new Error(`The following parameters need to be supplied: ${stringifiedParams}`)
  }

  return path;
}