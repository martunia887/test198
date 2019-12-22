import { DefaultExtensionProvider } from '@atlaskit/editor-common';

import { manifest as awesomeExtension } from './awesome';
import { manifest as jqlTable } from './jql-table';
import { manifest as loremIpsum } from './lorem-ipsum';

export const getXProductExtensionProvider = () =>
  new DefaultExtensionProvider([jqlTable, loremIpsum, awesomeExtension]);
