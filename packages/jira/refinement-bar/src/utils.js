export const isObject = o =>
  typeof o === 'object' && o !== null && !Array.isArray(o);
export const isPromise = p => p.then && typeof p.then === 'function'; // maybe?
export const isEmptyString = str => typeof str === 'string' && str.length === 0;

export const cloneArr = (arr, { add, remove, sort }) => {
  let array = [...arr];

  if (Array.isArray(add)) array = [...array, ...add];
  else if (add) array.push(add);
  if (remove) array = array.filter(v => v !== remove);

  return sort ? array.sort() : array;
};
export const cloneObj = (obj, { add, remove }) => {
  // add key/value pair
  if (add) {
    return { ...obj, ...add };
  }

  // remove by key
  if (remove) {
    const n = { ...obj };
    delete n[remove];
    return n;
  }

  return { ...obj };
};

export const arrayToObject = arr =>
  arr.reduce((obj, { key, ...value }) => ({ ...obj, [key]: value }), {});

export const objectMap = (object, mapFn) => {
  return Object.keys(object).reduce((result, key) => {
    result[key] = mapFn(object[key], key);
    return result;
  }, {});
};
