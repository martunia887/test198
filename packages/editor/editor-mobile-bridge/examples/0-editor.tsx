import * as React from 'react';
import { disableZooming } from './utils/viewport';

import {
  cardProvider,
  storyMediaProviderFactory,
} from '@atlaskit/editor-test-helpers';

import Editor from './../src/editor/mobile-editor-element';

// @ts-ignore
window.logBridge = window.logBridge || [];

export default class Example extends React.Component {
  componentDidMount() {
    disableZooming();

    // TEMP DEBUGGING...
    const pm = document.querySelector<HTMLElement>('.ProseMirror');
    if (pm) pm.style.backgroundColor = 'yellow';
    const wr = document.querySelector<HTMLElement>('#editor');
    if (wr) {
      /*
      wr.style.backgroundColor = 'blue';
      const themeWr = wr.firstElementChild as HTMLElement;
      themeWr.style.background = 'unset';
      */
    }
    document.body.style.backgroundColor = 'hotpink';

    // Set initial padding (this usually gets set by native)
    (window as any).bridge.setPadding(32, 16, 0, 16);
  }

  render() {
    return (
      <div id="editor">
        <Editor
          cardProvider={Promise.resolve(cardProvider)}
          mediaProvider={storyMediaProviderFactory({
            collectionName: 'InitialCollectionForTesting',
            includeUserAuthProvider: true,
          })}
          placeholder="Type something here"
          shouldFocus={true}
        />
      </div>
    );
  }
}
