import { ADFEntity } from '@atlaskit/adf-utils';
import { Icon, MaybeADFEntity } from './extension-manifest';

export type MenuItem = {
  key: string;
  title: string;
  description: string;
  icon: Icon;
  node: ADFEntity | (() => MaybeADFEntity);
};

export type MenuItemMap = { [key: string]: MenuItem };
