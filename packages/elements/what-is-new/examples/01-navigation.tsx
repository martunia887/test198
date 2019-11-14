import React, { useState } from 'react';
import { AtlassianNavigation } from '@atlaskit/atlassian-navigation';
import Button from '@atlaskit/Button';

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
import { Feature } from '../src/types';

export default function AtlassianNavigationExample() {
  const [features, setFeatures] = useState<Feature[]>(getFeatures(4));

  const onClick = () => {
    setFeatures([
      ...getFeatures(Math.floor(Math.random() * 4) + 1, features.length),
      ...features,
    ]);
  };

  return (
    <>
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
            whatIsNewProvider={createWhatIsNewProviderFromJson(features)}
          />
        )}
      />

      <div style={{ marginLeft: '30px', marginTop: '30px' }}>
        <Button onClick={onClick}>Create Features 😮</Button>
      </div>
    </>
  );
}
