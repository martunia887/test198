import React from 'react';
import ReactDOM from 'react-dom';
import { ssr } from '@atlaskit/ssr';
import path from 'path';

export const ssr_hydrate = async (
  dirName: string,
  relativeFilePath: string,
): Promise<Element> => {
  const filePath = path.resolve(dirName, relativeFilePath);
  const Example = require(filePath).default;
  const elem = document.createElement('div');
  elem.innerHTML = await ssr(filePath);
  ReactDOM.hydrate(<Example />, elem);
  return elem;
};
