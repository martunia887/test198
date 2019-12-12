import { JsonLdCollection, JsonLdMetaAuth } from './types-json-ld';
import { PluginActions } from '../../../domain/plugin';
import { SelectedItem } from '../../../popup/domain';

export type ForgeInvokeType = 'search' | 'lookup' | 'pattern';
export type ForgeViewType = 'bricks' | 'folders';
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
  folderId?: string;
}
export interface ForgeInvokeResponse {
  data: {
    invokeExtension: {
      auth: JsonLdMetaAuth[];
      response: {
        body: JsonLdCollection;
      };
      success: boolean;
      message: string;
      statusCode: number;
    };
  };
}
export interface ForgeInvokeError {
  name: string;
  message: string;
  status: number;
}

export interface ForgeViewProps {
  actions: PluginActions;
  selectedItems: SelectedItem[];
  extensionOpts: {
    id: string;
    view: ForgeViewType;
    type: ForgeInvokeType;
    name: string;
    iconUrl: string;
  };
}

export interface ForgeViewBaseProps {
  selectedItems: SelectedItem[];
  pluginName: string;
}
