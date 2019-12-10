import { PluginActions } from '../../domain/plugin';
import { SelectedItem } from '../../popup/domain';

export type ForgeInvokeType = 'search' | 'lookup' | 'pattern';
export type ForgeViewType = 'bricks' | 'directory';
export interface ForgeExtension {
  id: string;
  key: string;
  properties: {
    picker: ForgePickerProperties;
    domains: string[];
    typeId: string;
    function: string;
  };
}
export interface ForgePickerProperties {
  name: string;
  dataSource: ForgeInvokeType;
  view: ForgeViewType;
  iconUrl: string;
}

export interface ForgeInvokeParams {
  query?: string;
  resourceUrl?: string;
}
export interface ForgeInvokeResponse {
  data: {
    invokeExtension: {
      response: {
        body: any;
      };
    };
  };
}

export interface ForgeViewProps {
  actions: PluginActions;
  selectedItems: SelectedItem[];
  extensionOpts: {
    id: string;
    view: string;
    type: ForgeInvokeType;
    name: string;
  };
}
