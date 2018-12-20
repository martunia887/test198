import * as React from 'react';
import { StatusPicker } from '../src';
import { IntlProvider, addLocaleData } from 'react-intl';

const fr = {
  'fabric.status.color.grey': 'Gris',
  'fabric.status.color.purple': 'Violet',
  'fabric.status.color.blue': 'Bleu',
  'fabric.status.color.red': 'Rouge',
  'fabric.status.color.yellow': 'Jaune',
  'fabric.status.color.green': 'Vert',
};

addLocaleData([{ locale: 'en' }, { locale: 'fr' }]);

export default () => (
  <div style={{ width: '225px' }}>
    <IntlProvider locale="fr" messages={fr}>
      <StatusPicker
        text={'In progress'}
        selectedColor={'green'}
        onTextChanged={t => console.log(`Text changed: ${t}`)}
        onColorClick={c => console.log(`Color clicked: ${c}`)}
        onEnter={() => console.log(`Enter pressed`)}
      />
    </IntlProvider>
  </div>
);
