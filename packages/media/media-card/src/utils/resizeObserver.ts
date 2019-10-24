import { Component } from 'react';
import ReactDOM from 'react-dom';
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

export function createResizeObserver(
  component: Component,
  callback: (dimensions: Dimensions) => void,
): ResizeObserver | undefined {
  if (ResizeObserver) {
    const element = ReactDOM.findDOMNode(component) as HTMLElement;
    const observerCallback = createObserverCallback(callback);
    const obs = new ResizeObserver(observerCallback);
    obs.observe(element);
    return obs;
  }
}
