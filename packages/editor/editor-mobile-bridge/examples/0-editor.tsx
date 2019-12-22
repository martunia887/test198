import * as React from 'react';
import {
  cardProvider,
  storyMediaProviderFactory,
} from '@atlaskit/editor-test-helpers';

import Editor from './../src/editor/mobile-editor-element';
import { disableZooming } from './utils/viewport';

// @ts-ignore
window.logBridge = window.logBridge || [];

export default class Example extends React.Component {
  componentDidMount() {
    disableZooming();
    // Set initial padding (this usually gets set by native)
    (window as any).bridge.setPadding(32, 16, 0, 16);
  }

  render() {
    return (
      <div id="editor">
        <Editor
          UNSAFE_cards={{
            provider: Promise.resolve(cardProvider),
          }}
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
