import React from 'react';
import ManagedStatusPicker from '../example-helpers/ManagedStatusPicker';
import { IntlProvider, addLocaleData } from 'react-intl';
import frLocaleData from 'react-intl/locale-data/fr';
import fr from '../src/i18n/fr';

addLocaleData(frLocaleData);

export default () => (
  <IntlProvider locale="fr" messages={fr}>
    <ManagedStatusPicker
      initialSelectedColor={'green'}
      initialText={'In progress'}
    />
  </IntlProvider>
);
