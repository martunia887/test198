// does every key have a value key inside?
function getParamValue(macroParam: any | { value: any }): any {
  if (macroParam.hasOwnProperty('value')) {
    return macroParam.value;
  }
  return macroParam;
}

// { a : b, c: { value: d } } -> { a: { value: b }, c: { value: d } }
export function wrapMacroParams(macroParams) {
  return Object.keys(macroParams).reduce((curr, key) => {
    const value = getParamValue(macroParams[key]);
    if (key !== '' || value !== '') {
      curr[key] = { value };
    }
    return curr;
  }, {});
}

export function extensionToADF(node) {
  const { type, content, ...attrs } = node;
  const { macroParams } = attrs.parameters;

  const adf: ADNode = {
    type,
    attrs,
  };

  // confluence needs to be updated to get rid of bodyType as per
  // https://product-fabric.atlassian.net/wiki/spaces/E/pages/252351342/Splitting+Extension+node+into+three+nodes
  // but for now, the beackend requires it to be sent
  adf.attrs.bodyType = 'none';

  if (type === 'bodiedExtension') {
    adf.content = content && content.length > 0 ? content : [];
    adf.attrs.bodyType = 'rich';
  }

  adf.attrs.parameters.macroParams = wrapMacroParams(macroParams);

  return adf;
}
