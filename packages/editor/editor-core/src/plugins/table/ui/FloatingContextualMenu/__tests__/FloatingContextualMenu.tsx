import React from 'react';
import createEditorFactory from '@atlaskit/editor-test-helpers/create-editor';
import { shallowWithIntl } from '@atlaskit/editor-test-helpers/enzyme';
import {
  doc,
  tdEmpty,
  tdCursor,
  th,
  tr,
  table,
  p,
} from '@atlaskit/editor-test-helpers/schema-builder';
import { EditorView } from 'prosemirror-view';

import { getPluginState } from '../../../pm-plugins/main';
import FloatingContextualMenu from '../index';

describe('FloatingContextualMenu', () => {
  const createEditor = createEditorFactory();
  describe('with right position in plugin state', () => {
    let editorView: EditorView;
    beforeEach(() => {
      ({ editorView } = createEditor({
        doc: doc(table()(tr(th()(p('')), th()(p(''))), tr(tdCursor, tdEmpty))),
        editorProps: {
          allowTables: {
            advanced: true,
          },
        },
      }));
    });

    test('should render floating contextual menu when no tableCellPosition is passed but exist on editor state ', () => {
      const wrapper = shallowWithIntl(
        <FloatingContextualMenu
          editorView={editorView}
          isOpen={true}
          pluginConfig={getPluginState(editorView.state).pluginConfig}
        />,
      );
      expect(wrapper.find('Popup').length).toEqual(1);
    });
  });
});
