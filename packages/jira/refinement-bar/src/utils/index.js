// ==============================
// REFS
// ==============================

const apply = (ref, value) => {
  if (typeof ref === 'object') {
    ref.current = value;
  }
  if (typeof ref === 'function') {
    ref(value);
  }
};

export const applyRefs = value => (...refs) => {
  refs.forEach(ref => apply(ref, value));
};
