import * as React from 'react';
import { IntlProvider } from 'react-intl';
import {
  ProviderFactory,
  combineExtensionProviders,
} from '@atlaskit/editor-common';
import {
  createEditorFactory,
  doc,
  extension,
  activityProviderFactory,
} from '@atlaskit/editor-test-helpers';
import { createFakeExtensionProvider } from '@atlaskit/editor-test-helpers/extensions';
import EditIcon from '@atlaskit/icon/glyph/editor/edit';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';

import commonMessages from '../../../../messages';
import { pluginKey } from '../../../../plugins/extension/plugin';
import { getToolbarConfig } from '../../../../plugins/extension/toolbar';
import { ExtensionState } from '../../../../plugins/extension/types';
import { EditorProps } from '../../../../types';
import { waitForProvider, flushPromises } from '../../../__helpers/utils';
import { getToolbarItems } from '../floating-toolbar/_helpers';

describe('extension toolbar', () => {
  const createEditor = createEditorFactory();
  const providerFactory = ProviderFactory.create({
    activityProvider: activityProviderFactory([]),
  });

  const editor = (
    doc: any,
    props: Partial<EditorProps> = {},
    providerFactory?: ProviderFactory,
  ) => {
    return createEditor({
      doc,
      editorProps: {
        appearance: 'full-page',
        allowBreakout: true,
        allowExtension: {
          allowBreakout: true,
        },
        ...props,
      },
      pluginKey,
      providerFactory,
    });
  };

  describe('toolbar', () => {
    const intlProvider = new IntlProvider({ locale: 'en' });
    const { intl } = intlProvider.getChildContext();

    const defaultBreakoutTitle = intl.formatMessage(
      commonMessages.layoutFixedWidth,
    );
    const wideBreakoutTitle = intl.formatMessage(commonMessages.layoutWide);
    const fullWidthBreakoutTitle = intl.formatMessage(
      commonMessages.layoutFullWidth,
    );
    const removeTitle = intl.formatMessage(commonMessages.remove);

    it('has a remove button', () => {
      const { editorView } = editor(
        doc(
          '{<node>}',
          extension({ extensionKey: 'key', extensionType: 'type' })(),
        ),
      );

      const toolbar = getToolbarConfig()(
        editorView.state,
        intl,
        providerFactory,
      );
      expect(toolbar).toBeDefined();
      const removeButton = getToolbarItems(toolbar!, editorView).find(
        item => item.type === 'button' && item.title === removeTitle,
      );

      expect(removeButton).toBeDefined();
      expect(removeButton).toMatchObject({
        appearance: 'danger',
        icon: RemoveIcon,
      });
    });

    it('has an edit button', () => {
      const { editorView } = editor(
        doc(
          '{<node>}',
          extension({ extensionKey: 'key', extensionType: 'type' })(),
        ),
      );

      const toolbar = getToolbarConfig()(
        editorView.state,
        intl,
        providerFactory,
      );
      expect(toolbar).toBeDefined();
      const editButton = getToolbarItems(toolbar!, editorView).find(
        item => item.type === 'button' && item.title === 'Edit',
      );

      expect(editButton).toBeDefined();
      expect(editButton).toMatchObject({
        icon: EditIcon,
      });
    });

    it('has breakout buttons', () => {
      const { editorView } = editor(
        doc(
          '{<node>}',
          extension({ extensionKey: 'key', extensionType: 'type' })(),
        ),
      );

      const toolbar = getToolbarConfig(true)(
        editorView.state,
        intl,
        providerFactory,
      );
      expect(toolbar).toBeDefined();
      const breakoutButtons = getToolbarItems(toolbar!, editorView).filter(
        item =>
          item.type === 'button' &&
          [
            defaultBreakoutTitle,
            wideBreakoutTitle,
            fullWidthBreakoutTitle,
          ].indexOf(item.title) > -1,
      );

      expect(breakoutButtons).toBeDefined();
      expect(breakoutButtons).toHaveLength(3);
    });

    it('has no breakout buttons when breakout is disabled', () => {
      const { editorView } = editor(
        doc(
          '{<node>}',
          extension({ extensionKey: 'key', extensionType: 'type' })(),
        ),
      );

      const toolbar = getToolbarConfig(false)(
        editorView.state,
        intl,
        providerFactory,
      );
      expect(toolbar).toBeDefined();
      const breakoutButtons = getToolbarItems(toolbar!, editorView).filter(
        item =>
          item.type === 'button' &&
          [
            defaultBreakoutTitle,
            wideBreakoutTitle,
            fullWidthBreakoutTitle,
          ].indexOf(item.title) > -1,
      );

      expect(breakoutButtons).toBeDefined();
      expect(breakoutButtons).toHaveLength(0);
    });

    describe('Extension Provider', () => {
      const ExtensionHandlerComponent = () => <div>Awesome Extension</div>;
      const extensionUpdater = () => Promise.resolve();

      it('should show the edit button when update method is provided', async () => {
        const extensionProvider = createFakeExtensionProvider(
          'fake.confluence',
          'expand',
          ExtensionHandlerComponent,
          extensionUpdater,
        );

        const providerFactory = ProviderFactory.create({
          extensionProvider: Promise.resolve(
            combineExtensionProviders([extensionProvider]),
          ),
        });

        const { editorView } = editor(
          doc(
            '{<node>}',
            extension({
              extensionType: 'fake.confluence',
              extensionKey: 'expand',
            })(),
          ),
          {},
          providerFactory,
        );

        expect(providerFactory.hasProvider('extensionProvider')).toBeTruthy();
        await waitForProvider(providerFactory)('extensionProvider');
        // Need to wait for promises to get the updated state from getExtensionModuleNode
        await flushPromises();

        // Getting `pluginState` from `editor` will give an old state
        const pluginState = pluginKey.getState(
          editorView.state,
        ) as ExtensionState;

        expect(pluginState.extensionProvider).toBeDefined();
        expect(pluginState.showEditButton).toBeTruthy();
        expect(pluginState.updateExtension).toBeDefined();
      });

      it('should not show the edit button when update method is not provided', async () => {
        const extensionProvider = createFakeExtensionProvider(
          'fake.confluence',
          'expand',
          ExtensionHandlerComponent,
        );

        const providerFactory = ProviderFactory.create({
          extensionProvider: Promise.resolve(
            combineExtensionProviders([extensionProvider]),
          ),
        });

        const { editorView } = editor(
          doc(
            '{<node>}',
            extension({
              extensionType: 'fake.confluence',
              extensionKey: 'expand',
            })(),
          ),
          {},
          providerFactory,
        );

        expect(providerFactory.hasProvider('extensionProvider')).toBeTruthy();
        await waitForProvider(providerFactory)('extensionProvider');
        // Need to wait for promises to get the updated state from getExtensionModuleNode
        await flushPromises();

        // Getting `pluginState` from `editor` will give an old state
        const pluginState = pluginKey.getState(
          editorView.state,
        ) as ExtensionState;

        expect(pluginState.extensionProvider).toBeDefined();
        expect(pluginState.showEditButton).toBeTruthy();
        expect(pluginState.updateExtension).not.toBeDefined();
      });
    });
  });
});
