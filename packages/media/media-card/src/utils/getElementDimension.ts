import * as React from 'react';
import * as ReactDOM from 'react-dom';

export const getElementDimensions = (component: React.Component) => {
  const element = ReactDOM.findDOMNode(component) as Element;
  const { width, height } = element.getBoundingClientRect();
  return {
    width: Math.round(width),
    height: Math.round(height),
  };
};
