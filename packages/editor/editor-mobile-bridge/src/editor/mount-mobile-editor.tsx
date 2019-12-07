import '@babel/polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MobileEditor } from './mobile-editor';
import { determineMode } from '../bridge-utils';
import { NativeBridge } from './native-bridge';
import { WebBridge } from './web-bridge';
import * as Providers from '../providers';

export function mountMobileEditor(window: Window) {
  const params = new URLSearchParams(window.location.search);
  const mode = determineMode(params.get('mode'));

  const nativeBridge = NativeBridge.fromWindow(window);
  const webBridge = WebBridge.fromWindow(window);

  ReactDOM.render(
    <MobileEditor
      cardClient={Providers.createCardClient()}
      cardsProvider={Providers.createCardProvider()}
      emojiProvider={Providers.createEmojiProvider()}
      mediaProvider={Providers.createMediaProvider()}
      mentionProvider={Providers.createMentionProvider()}
      taskDecisionProvider={Providers.createTaskAndDecisionProvider()}
      nativeBridge={nativeBridge}
      webBridge={webBridge}
      mode={mode}
    />,
    window.document.getElementById('editor'),
  );
}
