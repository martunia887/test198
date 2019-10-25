import ReactDOM from 'react-dom';
import { Component } from 'react';

export const findDOMNode = (component: Component) =>
  ReactDOM.findDOMNode(component);
