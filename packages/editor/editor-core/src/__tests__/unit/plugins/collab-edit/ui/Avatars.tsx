import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import { ProviderFactory } from '@atlaskit/editor-common';
import {
  doc,
  p,
  createEditorFactory,
  mountWithIntl,
} from '@atlaskit/editor-test-helpers';

import {
  PluginState,
  pluginKey,
} from '../../../../../plugins/collab-edit/plugin';
import { collabEditProvider } from '../../../../../../example-helpers/mock-collab-provider';

import Avatars from '../../../../../plugins/collab-edit/ui/avatars';
import ToolbarButton from '../../../../../ui/ToolbarButton';

describe('collab-edit | Avatars', () => {
  const createEditor = createEditorFactory<PluginState>();

  const providerFactory = ProviderFactory.create({
    collabEditProvider: collabEditProvider('rick'),
  });

  const editor = (doc: any) =>
    createEditor({
      doc,
      editorProps: {
        collabEdit: {},
        mentionProvider: new Promise(() => {}),
      },
      pluginKey,
      providerFactory,
    });

  const setPresence = (editorView: EditorView) => {
    editorView.dispatch(
      editorView.state.tr.setMeta('presence', {
        left: [],
        joined: [
          {
            sessionId: 'test',
            lastActive: 1,
            avatar: 'avatar.png',
            name: 'Bob',
          },
        ],
      }),
    );
  };

  afterEach(() => {
    providerFactory.destroy();
  });

  describe('when inviteToEditButton is provided', () => {
    it('should render inviteToEditButton', () => {
      const CustomButton = () => <button />;

      const { editorView } = editor(doc(p('text')));
      setPresence(editorView);

      const node = mountWithIntl(
        <Avatars
          editorView={editorView}
          inviteToEditComponent={CustomButton}
        />,
      );

      expect(node.find(CustomButton).length).toEqual(1);
      node.unmount();
    });
  });

  describe('when inviteToEditButton is undefined', () => {
    describe('when inviteToEditHandler is undefined', () => {
      it('should not render inviteToEdit button', () => {
        const { editorView } = editor(doc(p('text')));
        const node = mountWithIntl(<Avatars editorView={editorView} />);
        expect(node.find(ToolbarButton).length).toEqual(0);
        node.unmount();
      });
    });

    describe('when inviteToEditHandler is provided', () => {
      it('should render inviteToEdit button', () => {
        const { editorView } = editor(doc(p('text')));
        setPresence(editorView);

        const node = mountWithIntl(
          <Avatars editorView={editorView} inviteToEditHandler={() => {}} />,
        );

        expect(node.find(ToolbarButton).length).toEqual(1);
        node.unmount();
      });

      describe('when inviteToEdit is clicked', () => {
        it('should call inviteToEditHandler', () => {
          const { editorView } = editor(doc(p('text')));
          setPresence(editorView);
          const inviteToEditHandler = jest.fn();
          const node = mountWithIntl(
            <Avatars
              editorView={editorView}
              inviteToEditHandler={inviteToEditHandler}
            />,
          );
          node
            .find(ToolbarButton)
            .at(0)
            .find('button')
            .simulate('click');
          expect(inviteToEditHandler).toHaveBeenCalledTimes(1);
          node.unmount();
        });
      });

      describe('when isInviteToEditButtonSelected is true', () => {
        it('should make inviteToEdit button selected', () => {
          const { editorView } = editor(doc(p('text')));
          setPresence(editorView);
          const inviteToEditHandler = () => {};
          const node = mountWithIntl(
            <Avatars
              editorView={editorView}
              inviteToEditHandler={inviteToEditHandler}
              isInviteToEditButtonSelected={true}
            />,
          );
          expect(
            node
              .find(ToolbarButton)
              .at(0)
              .prop('selected'),
          ).toBe(true);
          node.unmount();
        });
      });
    });
  });
});
