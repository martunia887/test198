import * as React from 'react';

import {
  MediaProvider as MediaProviderType,
  EditorProps,
  MentionProvider,
  CardProvider,
} from '@atlaskit/editor-core';
import FabricAnalyticsListeners, {
  AnalyticsWebClient,
} from '@atlaskit/analytics-listeners';
import {
  GasPurePayload,
  GasPureScreenEventPayload,
} from '@atlaskit/analytics-gas-types';
import { AtlaskitThemeProvider } from '@atlaskit/theme';
import { Provider as SmartCardProvider } from '@atlaskit/smart-card';

import { MobileEditorWithState } from './mobile-editor-with-state';
import MobilePicker from './MobileMediaPicker';

import { analyticsBridgeClient } from '../analytics-client';
import { NativeBridge } from './native-bridge';
import { WebBridge } from './web-bridge';
import CardClient from '../../../../media/smart-card/src/client';
import { EmojiProvider } from '../../../../elements/emoji/src';
import { TaskDecisionProvider } from '../../../../elements/task-decision/src';

type AnalyticsEvent = GasPurePayload | GasPureScreenEventPayload;

export interface MobileEditorProps extends EditorProps {
  cardClient: CardClient;
  cardsProvider: Promise<CardProvider>;
  emojiProvider: Promise<EmojiProvider>;
  mediaProvider: Promise<MediaProviderType>;
  mentionProvider: Promise<MentionProvider>;
  mode?: 'light' | 'dark';
  nativeBridge: NativeBridge;
  taskDecisionProvider: Promise<TaskDecisionProvider>;
  webBridge: WebBridge;
}

export const MobileEditor: React.FunctionComponent<MobileEditorProps> = props => {
  const mode = props.mode || 'light';

  // Temporarily opting out of the default oauth2 flow for phase 1 of Smart Links
  // See https://product-fabric.atlassian.net/browse/FM-2149 for details.
  const authFlow = 'disabled';
  const analyticsClient: AnalyticsWebClient = analyticsBridgeClient(
    (event: AnalyticsEvent) =>
      props.nativeBridge.trackEvent(JSON.stringify(event)),
  );

  return (
    <FabricAnalyticsListeners client={analyticsClient}>
      <SmartCardProvider client={props.cardClient} authFlow={authFlow}>
        <AtlaskitThemeProvider mode={mode}>
          <MobileEditorWithState
            appearance="mobile"
            mentionProvider={props.mentionProvider}
            emojiProvider={props.emojiProvider}
            media={{
              customMediaPicker: new MobilePicker(),
              provider: props.mediaProvider,
              allowMediaSingle: true,
            }}
            allowConfluenceInlineComment={true}
            onChange={() =>
              props.nativeBridge.updateText(props.webBridge.getContent())
            }
            allowPanel={true}
            allowTables={{
              allowControls: false,
            }}
            UNSAFE_cards={{
              provider: props.cardsProvider,
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
