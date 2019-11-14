import React from 'react';
import { AtlassianNavigation } from '@atlaskit/atlassian-navigation';

import { DefaultCreate } from '../../../navigation/atlassian-navigation/examples/shared/Create';
import { defaultPrimaryItems } from '../../../navigation/atlassian-navigation/examples/shared/PrimaryItems';
import { DefaultProductHome } from '../../../navigation/atlassian-navigation/examples/shared/ProductHome';
import { DefaultSettings } from '../../../navigation/atlassian-navigation/examples/shared/Settings';
import { ProfilePopup } from '../../../navigation/atlassian-navigation/examples/shared/ProfilePopup';
import { SwitcherPopup } from '../../../navigation/atlassian-navigation/examples/shared/SwitcherPopup';
import { HelpPopup } from '../../../navigation/atlassian-navigation/examples/shared/HelpPopup';
import { WhatIsNew } from '../src';
import { createWhatIsNewProviderFromJson } from '../src/clients/what-is-new-from-json';
import { getFeatures } from './assets/features';

export default function AtlassianNavigationExample() {
  return (
    <AtlassianNavigation
      primaryItems={defaultPrimaryItems}
      renderAppSwitcher={SwitcherPopup}
      renderCreate={DefaultCreate}
      renderHelp={HelpPopup}
      renderProductHome={DefaultProductHome}
      renderProfile={ProfilePopup}
      renderSettings={DefaultSettings}
      renderWhatIsNew={() => (
        <WhatIsNew
          whatIsNewProvider={createWhatIsNewProviderFromJson(getFeatures(10))}
        />
      )}
    />
  );
}
