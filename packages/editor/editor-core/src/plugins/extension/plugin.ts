import {
  ProviderFactory,
  ExtensionHandlers,
  ExtensionProvider,
  getExtensionModuleNode,
  UpdateExtension,
} from '@atlaskit/editor-common';
import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { Dispatch } from '../../event-dispatcher';
import { PortalProviderAPI } from '../../ui/PortalProvider';
import { pluginFactory } from '../../utils/plugin-state-factory';

import { updateState } from './commands';
import ExtensionNodeView from './nodeviews/extension';
import reducer from './reducer';
import {
  getSelectedExtension,
  getSelectedDomElement,
  getSelectedNonContentExtension,
} from './utils';

const pluginKey = new PluginKey('extensionPlugin');
const { createPluginState, createCommand, getPluginState } = pluginFactory(
  pluginKey,
  reducer,
);

const updateEditButton = (
  view: EditorView,
  extensionProvider: ExtensionProvider,
) => {
  const nodeWithPos = getSelectedExtension(view.state, true);
  if (nodeWithPos) {
    const { extensionType, extensionKey } = nodeWithPos.node.attrs;
    getExtensionModuleNode(extensionProvider, extensionType, extensionKey)
      .then(extensionModuleNode => {
        const newNodeWithPos = getSelectedExtension(view.state, true);
        if (
          newNodeWithPos &&
          newNodeWithPos.node.attrs.extensionType === extensionType &&
          newNodeWithPos.node.attrs.extensionKey === extensionKey &&
          newNodeWithPos.pos === nodeWithPos.pos &&
          extensionModuleNode.update
        ) {
          updateState({
            showEditButton: true,
            updateExtension: extensionModuleNode.update,
          })(view.state, view.dispatch);
        }
      })
      .catch(() => {
        updateState({
          showEditButton: true,
          updateExtension: undefined,
        })(view.state, view.dispatch);
      });
  }
};

const createPlugin = (
  dispatch: Dispatch,
  providerFactory: ProviderFactory,
  extensionHandlers: ExtensionHandlers,
  portalProviderAPI: PortalProviderAPI,
  stickToolbarToBottom: boolean,
  allowBreakout: boolean,
) => {
  const state = createPluginState(dispatch, {
    layout: 'default',
    showEditButton: false,
    stickToolbarToBottom,
    allowBreakout,
  });

  return new Plugin({
    state,
    view: editorView => {
      const domAtPos = editorView.domAtPos.bind(editorView);

      const providerHandler = (
        name: string,
        provider?: Promise<ExtensionProvider>,
      ) => {
        if (name === 'extensionProvider' && provider) {
          provider
            .then(extensionProvider => {
              updateState({ extensionProvider })(
                editorView.state,
                editorView.dispatch,
              );

              updateEditButton(editorView, extensionProvider);
            })
            .catch(() =>
              updateState({ extensionProvider: undefined })(
                editorView.state,
                editorView.dispatch,
              ),
            );
        }
      };

      providerFactory.subscribe('extensionProvider', providerHandler);

      return {
        update: view => {
          const { state, dispatch } = view;
          const { element, extensionProvider } = getPluginState(state);

          // This fetches the selected extension node, either by keyboard selection or click for all types of extensions
          const selectedExtension = getSelectedExtension(state, true);
          if (!selectedExtension && !element) {
            return;
          }

          const isContentExtension = !!getSelectedNonContentExtension(state);

          const newElement = getSelectedDomElement(
            domAtPos,
            selectedExtension,
            isContentExtension,
          );

          if (element !== newElement) {
            let showEditButton = false;
            let updateExtension: UpdateExtension<object> | undefined;

            if (selectedExtension) {
              const { extensionType } = selectedExtension.node.attrs;

              const extensionHandler = extensionHandlers[extensionType];
              if (extensionHandler && typeof extensionHandler === 'object') {
                showEditButton = !!extensionHandler.update;
                updateExtension = extensionHandler.update;
              } else if (extensionProvider) {
                updateEditButton(view, extensionProvider);
              } else {
                showEditButton = true;
              }
            }

            const layout = selectedExtension
              ? selectedExtension.node.attrs.layout
              : 'default';

            updateState({
              nodeWithPos: selectedExtension,
              element: newElement,
              showEditButton,
              updateExtension,
              layout,
            })(state, dispatch);
          }
          return true;
        },
        destroy: () => {
          providerFactory.unsubscribe('extensionProvider', providerHandler);
        },
      };
    },
    key: pluginKey,
    props: {
      nodeViews: {
        extension: ExtensionNodeView(
          portalProviderAPI,
          providerFactory,
          extensionHandlers,
        ),
        bodiedExtension: ExtensionNodeView(
          portalProviderAPI,
          providerFactory,
          extensionHandlers,
        ),
        inlineExtension: ExtensionNodeView(
          portalProviderAPI,
          providerFactory,
          extensionHandlers,
        ),
      },
    },
  });
};

export { pluginKey, createPlugin, createCommand, getPluginState };
