//
// This mock is intended to be a super basic version of lodash.debounce (https://github.com/lodash/lodash/blob/master/debounce.js)
// We want to use Jest's faked timers, however because Lodash closes over the global (window/self/global),
// Jest doesn't end up wrapping the methods that Lodash references.
//
/* eslint-disable */

export default function debounce(fn, delay, opts) {
  let timer;
  return function(...args) {
    let context = this;
    window.clearTimeout(timer);
    timer = window.setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}
