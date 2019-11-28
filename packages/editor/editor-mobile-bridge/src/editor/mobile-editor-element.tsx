import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import { EditorViewWithComposition } from '../types';
import { Editor, EditorProps } from '@atlaskit/editor-core';
import FabricAnalyticsListeners, {
  AnalyticsWebClient,
} from '@atlaskit/analytics-listeners';
import {
  GasPurePayload,
  GasPureScreenEventPayload,
} from '@atlaskit/analytics-gas-types';
import { AtlaskitThemeProvider } from '@atlaskit/theme';
import { toNativeBridge } from './web-to-native';
import WebBridgeImpl from './native-to-web';
import MobilePicker from './MobileMediaPicker';
import {
  initPluginListeners,
  destroyPluginListeners,
} from './plugin-subscription';
import { Provider as SmartCardProvider } from '@atlaskit/smart-card';
import { analyticsBridgeClient } from '../analytics-client';
import { Client as EditorCardClient } from '@atlaskit/smart-card';
import { MediaProvider } from '@atlaskit/editor-core';

export const bridge: WebBridgeImpl = ((window as any).bridge = new WebBridgeImpl());

const handleAnalyticsEvent = (
  event: GasPurePayload | GasPureScreenEventPayload,
) => {
  toNativeBridge.call('analyticsBridge', 'trackEvent', {
    event: JSON.stringify(event),
  });
};

class EditorWithState extends Editor {
  onEditorCreated(instance: {
    view: EditorView & EditorViewWithComposition;
    eventDispatcher: any;
    transformer?: any;
  }) {
    super.onEditorCreated(instance);

    const { eventDispatcher, view } = instance;
    bridge.editorView = view;
    bridge.editorActions._privateRegisterEditor(view, eventDispatcher);
    if (this.props.media && this.props.media.customMediaPicker) {
      bridge.mediaPicker = this.props.media.customMediaPicker;
    }

    initPluginListeners(eventDispatcher, bridge, view);
  }

  onEditorDestroyed(instance: {
    view: EditorView;
    eventDispatcher: any;
    transformer?: any;
  }) {
    super.onEditorDestroyed(instance);

    destroyPluginListeners(instance.eventDispatcher, bridge);

    bridge.editorActions._privateUnregisterEditor();
    bridge.editorView = null;
    bridge.mentionsPluginState = null;
  }
}

type MobileEditorProps = EditorProps & {
  mode?: 'light' | 'dark';
  cardClient: EditorCardClient;
  mediaProvider: MediaProvider;
};

export const MobileEditor: React.FunctionComponent<MobileEditorProps> = (
  props,
): JSX.Element => {
  const mode = props.mode || 'light';

  // Temporarily opting out of the default oauth2 flow for phase 1 of Smart Links
  // See https://product-fabric.atlassian.net/browse/FM-2149 for details.
  const authFlow = 'disabled';
  const analyticsClient: AnalyticsWebClient = analyticsBridgeClient(
    handleAnalyticsEvent,
  );

  return (
    <FabricAnalyticsListeners client={analyticsClient}>
      <SmartCardProvider client={props.cardClient} authFlow={authFlow}>
        <AtlaskitThemeProvider mode={mode}>
          <EditorWithState
            appearance="mobile"
            mentionProvider={props.mentionProvider}
            emojiProvider={props.emojiProvider}
            media={{
              customMediaPicker: new MobilePicker(),
              provider: Promise.resolve(props.mediaProvider),
              allowMediaSingle: true,
            }}
            allowConfluenceInlineComment={true}
            onChange={() => {
              toNativeBridge.updateText(bridge.getContent());
            }}
            allowPanel={true}
            allowTables={{
              allowControls: false,
            }}
            UNSAFE_cards={{
              provider: props.UNSAFE_cards
                ? props.UNSAFE_cards.provider
                : undefined,
            }}
            allowExtension={true}
            allowTextColor={true}
            allowDate={true}
            allowRule={true}
            allowStatus={true}
            allowLayouts={{
              allowBreakout: true,
            }}
            allowAnalyticsGASV3={true}
            UNSAFE_allowExpand={true}
            taskDecisionProvider={props.taskDecisionProvider}
            {...props}
          />
        </AtlaskitThemeProvider>
      </SmartCardProvider>
    </FabricAnalyticsListeners>
  );
};
