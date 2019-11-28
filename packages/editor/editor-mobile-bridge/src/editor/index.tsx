import '@babel/polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MobileEditor } from './mobile-editor-element';
import { determineMode } from '../bridge-utils';
import { createProviders } from '../providers';

async function main() {
  const params = new URLSearchParams(window.location.search);
  const mode = determineMode(params.get('mode'));
  const {
    cardClient,
    cardProvider,
    emojiProvider,
    mediaProvider,
    mentionProvider,
    taskDecisionProvider,
  } = await createProviders();

  ReactDOM.render(
    <MobileEditor
      mode={mode}
      UNSAFE_cards={{ provider: Promise.resolve(cardProvider) }}
      cardClient={cardClient}
      emojiProvider={Promise.resolve(emojiProvider)}
      mediaProvider={mediaProvider}
      mentionProvider={Promise.resolve(mentionProvider)}
      taskDecisionProvider={Promise.resolve(taskDecisionProvider)}
    />,
    document.getElementById('editor'),
  );
}

main().catch(err => console.error(err));
