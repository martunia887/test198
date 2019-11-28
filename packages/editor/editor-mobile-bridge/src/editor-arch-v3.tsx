import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { determineMode } from './bridge-utils';
import { EditorActions, EditorContext } from '@atlaskit/editor-core';
import { EditorPresetMobile } from '@atlaskit/editor-core/src/labs/next/presets/mobile';
import { Mobile as MobileEditor } from '@atlaskit/editor-core/src/labs/next/mobile';
import { AtlaskitThemeProvider } from '@atlaskit/theme/components';
import { Provider as SmartCardProvider } from '@atlaskit/smart-card';
import { analyticsBridgeClient } from './analytics-client';
import FabricAnalyticsListeners, {
  AnalyticsWebClient,
} from '@atlaskit/analytics-listeners';
import { toNativeBridge } from './editor/web-to-native';
import WebBridgeImpl from './editor/native-to-web';
import { EditorViewWithComposition } from './types';
import {
  initPluginListeners,
  destroyPluginListeners,
} from './editor/plugin-subscription';
import { createProviders } from './providers';
import MobilePicker from './editor/MobileMediaPicker';
import {
  ProviderFactory,
  ProviderFactoryProvider,
} from '@atlaskit/editor-common/provider-factory';
import { Client as EditorCardClient } from '@atlaskit/smart-card';

// Expose WebBridge instance for use by native side
const bridge = new WebBridgeImpl();
window.bridge = bridge;

async function main(window: Window, document: Document) {
  const params = new URLSearchParams(window.location.search);
  const mode = determineMode(params.get('mode'));

  const {
    cardClient,
    mentionProvider,
    emojiProvider,
    mediaProvider,
    taskDecisionProvider,
  } = await createProviders();

  const providerFactory = ProviderFactory.create({
    mentionProvider: Promise.resolve(mentionProvider),
    emojiProvider: Promise.resolve(emojiProvider),
    mediaProvider: Promise.resolve(mediaProvider),
    taskAndDecisionProvider: Promise.resolve(taskDecisionProvider),
  });

  const actions = bridge.editorActions;

  const analyticsClient = analyticsBridgeClient(event => {
    toNativeBridge.call('analyticsBridge', 'trackEvent', {
      event: JSON.stringify(event),
    });
  });

  const mediaPicker = new MobilePicker();

  ReactDOM.render(
    <MobileEditorArchV3
      analyticsClient={analyticsClient}
      cardClient={cardClient}
      editorActions={bridge.editorActions}
      mediaPicker={mediaPicker}
      mode={mode}
      providerFactory={providerFactory}
      onChange={() => {
        toNativeBridge.updateText(bridge.getContent());
      }}
      onMount={actions => {
        const view = actions._privateGetEditorView() as EditorViewWithComposition;
        const eventDispatcher = actions._privateGetEventDispatcher()!;
        bridge.editorView = view;
        bridge.editorActions._privateRegisterEditor(view, eventDispatcher);
        bridge.mediaPicker = mediaPicker;
        initPluginListeners(eventDispatcher, bridge, view);
      }}
      onDestroy={() => {
        destroyPluginListeners(actions._privateGetEventDispatcher()!, bridge);
        bridge.editorActions._privateUnregisterEditor();
        bridge.editorView = null;
        bridge.mentionsPluginState = null;
      }}
    />,
    document.getElementById('editor'),
  );
}

interface MobileEditorArchV3Props {
  cardClient: EditorCardClient;
  editorActions: EditorActions;
  mode: 'dark' | 'light';
  mediaPicker: MobilePicker;
  analyticsClient: AnalyticsWebClient;
  providerFactory: ProviderFactory;
  onDestroy?(): void;
  onChange?(content: any): void;
  onMount?(actions: EditorActions): void;
}

function MobileEditorArchV3(props: MobileEditorArchV3Props): JSX.Element {
  return (
    <ProviderFactoryProvider value={props.providerFactory}>
      <FabricAnalyticsListeners client={props.analyticsClient}>
        {/* Temporarily opting out of the default oauth2 flow for phase 1 of Smart Links */}
        {/* See https://product-fabric.atlassian.net/browse/FM-2149 for details. */}
        <SmartCardProvider client={props.cardClient} authFlow="disabled">
          <AtlaskitThemeProvider mode={props.mode}>
            <EditorPresetMobile
              media={{
                picker: props.mediaPicker,
              }}
            >
              <EditorContext editorActions={props.editorActions}>
                <MobileEditor
                  onChange={props.onChange}
                  onDestroy={props.onDestroy}
                  onMount={props.onMount}
                />
              </EditorContext>
            </EditorPresetMobile>
          </AtlaskitThemeProvider>
        </SmartCardProvider>
      </FabricAnalyticsListeners>
    </ProviderFactoryProvider>
  );
}

document.addEventListener('DOMContentLoaded', () => main(window, document));
