import * as React from 'react';
import { IntlProvider } from 'react-intl';
import {
  EditorInstance,
  EditorPlugin,
  EditorProps,
  getDefaultPluginsList,
  PortalProvider,
  PortalProviderAPI,
  PortalRenderer,
  ReactEditorView,
} from '@atlaskit/editor-core';
import { ProviderFactory } from '@atlaskit/editor-common';
import { mount, ReactWrapper } from 'enzyme';
import { Refs, RefsNode } from './schema-builder';
import { Schema } from 'prosemirror-model';
import { PluginKey } from 'prosemirror-state';
import patchEditorViewForJSDOM from './jsdom-fixtures';
import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import { setSelection } from './utils/set-selection';

class TestReactEditorView extends ReactEditorView<{
  plugins?: EditorPlugin[];
}> {
  getPlugins(editorProps: EditorProps): EditorPlugin[] {
    return (
      this.props.plugins ||
      super.getPlugins(editorProps, undefined, this.props.createAnalyticsEvent)
    );
  }
}

/**
 * Currently skipping these three failing tests
 * TODO: JEST-23 Fix these tests
 */

export type Options = {
  doc?: (schema: Schema) => RefsNode;
  // It needs to be any, otherwise TypeScript complains about mismatching types when dist folder exists
  editorPlugins?: any[];
  editorProps?: EditorProps;
  providerFactory?: ProviderFactory;
  pluginKey?: PluginKey;
  createAnalyticsEvent?: CreateUIAnalyticsEvent;
};

export default function createEditorFactoryForTests<T = any>() {
  let place: HTMLDivElement;
  let wrapper: ReactWrapper;

  afterEach(() => {
    if (wrapper) {
      if (wrapper.length > 0) {
        wrapper.unmount();
      }
      wrapper.detach();
    }

    if (place && place.parentNode) {
      place.parentNode.removeChild(place);
    }
  });

  return ({
    doc,
    editorProps = {},
    editorPlugins,
    providerFactory,
    pluginKey,
    createAnalyticsEvent,
  }: Options): EditorInstance & {
    portalProviderAPI: PortalProviderAPI;
    refs: Refs;
    sel: number;
    plugin: any;
    pluginState: T;
    editorProps: EditorProps;
  } => {
    let portalProviderAPI: PortalProviderAPI | undefined;
    const plugins = editorPlugins
      ? [...getDefaultPluginsList(editorProps), ...editorPlugins]
      : undefined;
    place = document.body.appendChild(document.createElement('div'));

    wrapper = mount(
      <PortalProvider
        render={(portalProvider: PortalProviderAPI) => {
          portalProviderAPI = portalProvider;
          return (
            <IntlProvider locale="en">
              <>
                <TestReactEditorView
                  editorProps={editorProps}
                  createAnalyticsEvent={createAnalyticsEvent}
                  allowAnalyticsGASV3={editorProps.allowAnalyticsGASV3}
                  portalProviderAPI={portalProvider}
                  providerFactory={
                    providerFactory ? providerFactory : new ProviderFactory()
                  }
                  onEditorCreated={() => {}}
                  onEditorDestroyed={() => {}}
                  plugins={plugins}
                />
                <PortalRenderer portalProviderAPI={portalProviderAPI} />
              </>
            </IntlProvider>
          );
        }}
      />,
      { attachTo: place },
    );
    const editor = wrapper.find(TestReactEditorView);

    // Work around JSDOM/Node not supporting DOM Selection API
    if (!('getSelection' in window)) {
      // TODO JEST-23
      patchEditorViewForJSDOM((editor.instance() as ReactEditorView).view);
    }

    const {
      view: editorView,
      eventDispatcher,
      config: {
        contentComponents,
        primaryToolbarComponents,
        secondaryToolbarComponents,
      },
    } = editor.instance() as ReactEditorView;

    let refs: Refs | undefined = setSelection(doc, editorView);

    let plugin;
    let pluginState;

    if (pluginKey) {
      plugin = pluginKey.get(editorView!.state);
      pluginState = pluginKey.getState(editorView!.state);
    }

    return {
      portalProviderAPI: portalProviderAPI!,
      editorView: editorView!,
      eventDispatcher,
      contentComponents,
      primaryToolbarComponents,
      secondaryToolbarComponents,
      refs: refs!,
      sel: refs ? refs['<>'] : 0,
      plugin,
      pluginState,
      editorProps,
    };
  };
}
