export const getElementDimensions = (element: Element) => {
  const { width, height } = element.getBoundingClientRect();
  return {
    width: Math.round(width),
    height: Math.round(height),
  };
};
