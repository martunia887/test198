// @noflow

import { SELECT_CLEAR_OPTION } from '../../components/Select';

// return the inverse predicate
export function not(predicate) {
  return function negate(...args) {
    return !predicate(...args);
  };
}

// for an array of objects, flatten nested arrays on the given key
export function flattenByKey(arr, key) {
  return arr.reduce(
    (acc, item) =>
      Array.isArray(item[key])
        ? acc.concat(flattenByKey(item[key]))
        : acc.concat(item),
    [],
  );
}

// for an array of objects, remove non-unique items by comparing equality on the given key
export function uniqueByKey(arr, key) {
  return arr.reduce((acc, item) => {
    if (!acc.some(i => i[key] === item[key])) {
      acc.push(item);
    }

    return acc;
  }, []);
}

// for an array of objects, handle filtering of nested arrays by comparing key equality
export function filterRecursive(arr, key, predicate) {
  return arr
    .map(item => {
      // the item has a nested array on the given key -- start again
      if (Array.isArray(item[key])) {
        return {
          ...item,
          [key]: filterRecursive(item[key], key, predicate),
        };
      }

      // the item meets the condition
      if (predicate(item)) {
        return item;
      }

      return null;
    })
    .filter(Boolean); // remove null values
}

// NOTE: rebuild the options array to accomodate:
// 1. pin selected options to the top
//    a) flatten: parental groups are stripped from pinned options
//    b) unique: where the "value" also appears in the "options"
// 2. add a special "clear" option
// 3. return unselected options below the clear
export function getOptions({ pluck, options, selected }) {
  if (!selected || !selected.length) return options;

  const includes = opt => selected.includes(pluck(opt));
  const excludes = not(includes);

  const selectedOptions = filterRecursive(options, 'options', includes);
  const pinned = uniqueByKey(flattenByKey(selectedOptions, 'options'), 'value');
  const rest = filterRecursive(options, 'options', excludes);

  // early out to avoid orphaned clear option; applicable to async
  if (!pinned.length) {
    return rest;
  }

  return []
    .concat(pinned)
    .concat([SELECT_CLEAR_OPTION])
    .concat(rest);
}
