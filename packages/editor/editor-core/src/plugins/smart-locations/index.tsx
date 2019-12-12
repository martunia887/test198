import * as React from 'react';
import { inlineLocation } from '@atlaskit/adf-schema';
import { LocationPicker } from '@atlaskit/maps-viewer';

import { EditorPlugin } from '../../types';
import { IconImages } from '../quick-insert/assets';
import WithPluginState from '../../ui/WithPluginState';

import smartLocationPlugin, { pluginKey } from './pm-plugins/main';
import { toggleModal, createLocation } from './commands';

const smartLocationsPlugin = (): EditorPlugin => ({
  name: 'smartLocations',

  nodes() {
    return [{ name: 'inlineLocation', node: inlineLocation }];
  },

  pmPlugins() {
    return [
      {
        name: 'smartLocation',
        plugin: ({ dispatch, portalProviderAPI }) =>
          smartLocationPlugin(dispatch, portalProviderAPI),
      },
    ];
  },

  contentComponent({ editorView, eventDispatcher }) {
    return (
      <WithPluginState
        editorView={editorView}
        plugins={{
          smartLocationState: pluginKey,
        }}
        render={({ smartLocationState }) => (
          <LocationPicker
            isOpen={smartLocationState.modalOpen}
            onSelected={location => {
              createLocation(location)(editorView.state, editorView.dispatch);
            }}
            onClose={() => {
              toggleModal()(editorView.state, editorView.dispatch);
            }}
          />
        )}
      />
    );
  },

  pluginsOptions: {
    quickInsert: ({ formatMessage }) => [
      {
        title: 'Location',
        description: '',
        priority: 400,

        icon: () => <IconImages label="Location" />,
        action(insert) {
          const tr = insert('');
          tr.setMeta(pluginKey, { type: 'TOGGLE_MODAL' });
          return tr;
        },
      },
    ],
  },
});

export default smartLocationsPlugin;
