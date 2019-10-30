import { Dimensions } from './getDataURIDimension';

const createObserverCallback = (
  callback: (dimensions: Dimensions) => void,
): ResizeObserverCallback => {
  return ([entry]: ResizeObserverEntry[]) => {
    // This block assumes that the css property writing-mode of the target element is 'horizontal-tb'
    // It also asumes that we care of contentBoxSize, not borderBoxSize
    if (entry.contentBoxSize) {
      const { inlineSize, blockSize } = entry.contentBoxSize;
      callback({
        width: Math.ceil(inlineSize),
        height: Math.ceil(blockSize),
      });
    } else {
      const { width, height } = entry.contentRect;
      callback({
        width: Math.ceil(width),
        height: Math.ceil(height),
      });
    }
  };
};

// Ensures ResizeObserver is fully supported
const isResizeObserverSupported = () =>
  typeof (window as any).ResizeObserver === 'function';
const implementsResizeObserver = (instance: ResizeObserver) =>
  typeof instance.observe === 'function' &&
  typeof instance.disconnect === 'function' &&
  typeof instance.unobserve === 'function';

export function createResizeObserver(
  element: Element,
  callback: (dimensions: Dimensions) => void,
): ResizeObserver | undefined {
  if (isResizeObserverSupported()) {
    const observerCallback = createObserverCallback(callback);
    const obs = new ResizeObserver(observerCallback);
    if (implementsResizeObserver(obs)) {
      obs.observe(element);
      return obs;
    }
  }
}
