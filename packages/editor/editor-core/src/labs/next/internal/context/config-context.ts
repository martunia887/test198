import * as React from 'react';
import { ProviderFactory } from '@atlaskit/editor-common';

export interface EditorConfig {
  featureFlags: {};
  providerFactory: ProviderFactory;
}

const ConfigContext = React.createContext<EditorConfig>({
  featureFlags: {},
  providerFactory: new ProviderFactory(),
});

const ConfigProvider = ConfigContext.Provider;
const useConfigContext = () => React.useContext(ConfigContext);

export { ConfigProvider, useConfigContext };
