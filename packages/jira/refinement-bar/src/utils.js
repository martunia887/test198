// @flow

export const isObject = (o: *) =>
  typeof o === 'object' && o !== null && !Array.isArray(o);
export const isPromise = (p: *) => p.then && typeof p.then === 'function'; // maybe?
export const isEmptyString = (str: *) =>
  typeof str === 'string' && str.length === 0;

type cloneArrOptions = { add?: any, remove?: any, sort?: boolean };
export const cloneArr = (
  arr: Array<any>,
  options: cloneArrOptions = {},
): Array<any> => {
  const { add, remove, sort } = options;

  let array = [...arr];

  if (Array.isArray(add)) array = [...array, ...add];
  else if (add) array.push(add);
  if (remove) array = array.filter(v => v !== remove);

  return sort ? array.sort() : array;
};

type cloneObjOptions = { add?: Object, remove?: string };
export const cloneObj = (obj: Object, options: cloneObjOptions = {}) => {
  const { add, remove } = options;

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

export const objectMap = (object: Object, mapFn: (any, string) => any) => {
  return Object.keys(object).reduce((res, key) => {
    const result = cloneObj(res);
    const value = mapFn(object[key], key);

    if (value) {
      result[key] = value;
      return result;
    }

    return res;
  }, {});
};
