import * as React from 'react';
import { injectGlobal } from 'styled-components';
import {
  profilecard as profilecardUtils,
  emoji,
  taskDecision,
} from '@atlaskit/util-data-test';
import {
  storyMediaProviderFactory,
  storyContextIdentifierProviderFactory,
} from '@atlaskit/editor-test-helpers';
import { ProfileClient, modifyResponse } from '@atlaskit/profilecard';
import { PresentationMode } from '../src';
import { ProviderFactory } from '@atlaskit/editor-common';
import defaultADF from '../__tests__/__fixtures__/default.adf.json';

injectGlobal`
  @font-face {
    font-family: "Charlie_Display_Regular";
    src: url("https://marketplace-cdn.atlassian.com/s/public/Charlie_Display-Regular-1-7c1c0a53957fc3b9f2716e8f26d50cf1.woff") format("font-woff"),
         url("https://marketplace-cdn.atlassian.com/s/public/Charlie_Display-Regular-1-7c1c0a53957fc3b9f2716e8f26d50cf1.woff") format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "Charlie_Display_Semibold";
    src: url("https://marketplace-cdn.atlassian.com/s/public/Charlie_Display-Semibold-1-aa4aa85c7ef84dd4cb06bba4cd08a1b6.woff") format("font-woff"),
         url("https://marketplace-cdn.atlassian.com/s/public/Charlie_Display-Semibold-1-aa4aa85c7ef84dd4cb06bba4cd08a1b6.woff") format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "Charlie_Display_Bold";
    src: url("https://marketplace-cdn.atlassian.com/s/public/Charlie_Display-Bold-1-6bf3af7a4a02d59eb95811b5a85ea443.woff") format("font-woff"),
         url("https://marketplace-cdn.atlassian.com/s/public/Charlie_Display-Bold-1-6bf3af7a4a02d59eb95811b5a85ea443.woff") format("woff2");
    font-weight: normal;
    font-style: normal;
  }
`;

const { getMockProfileClient: getMockProfileClientUtil } = profilecardUtils;
const MockProfileClient = getMockProfileClientUtil(
  ProfileClient,
  modifyResponse,
);

const mentionProvider = Promise.resolve({
  shouldHighlightMention(mention: { id: string }) {
    return mention.id === 'ABCDE-ABCDE-ABCDE-ABCDE';
  },
});

const mediaProvider = storyMediaProviderFactory();

const emojiProvider = emoji.storyData.getEmojiResource();

const profilecardProvider = Promise.resolve({
  cloudId: 'DUMMY-CLOUDID',
  resourceClient: new MockProfileClient({
    cacheSize: 10,
    cacheMaxAge: 5000,
  }),
  getActions: (id: string) => {
    const actions = [
      {
        label: 'Mention',
        callback: () => console.log('profile-card:mention'),
      },
      {
        label: 'Message',
        callback: () => console.log('profile-card:message'),
      },
    ];

    return id === '1' ? actions : actions.slice(0, 1);
  },
});

const taskDecisionProvider = Promise.resolve(
  taskDecision.getMockTaskDecisionResource(),
);

const contextIdentifierProvider = storyContextIdentifierProviderFactory();

const providerFactory = ProviderFactory.create({
  mentionProvider,
  mediaProvider,
  emojiProvider,
  profilecardProvider,
  taskDecisionProvider,
  contextIdentifierProvider,
});

export default class Example extends React.Component<
  {},
  { adf: string; showPresentation: boolean }
> {
  inputBox?: HTMLTextAreaElement | null;
  constructor(props: {}) {
    super(props);

    this.state = {
      adf: JSON.stringify(defaultADF),
      showPresentation: false,
    };
  }

  render() {
    const { adf, showPresentation } = this.state;

    return (
      <>
        {!showPresentation && (
          <>
            <textarea
              id="presentation-value-input"
              style={{
                boxSizing: 'border-box',
                border: '1px solid lightgray',
                fontFamily: 'monospace',
                fontSize: 16,
                padding: 10,
                width: '100%',
                height: 320,
              }}
              ref={ref => {
                this.inputBox = ref;
              }}
              value={this.state.adf}
              onChange={this.onADFChange}
            />
            <button onClick={this.startPresentation} disabled={!adf}>
              Start!
            </button>
          </>
        )}
        {showPresentation && (
          <PresentationMode
            providerFactory={providerFactory}
            adf={JSON.parse(adf)}
            onExit={this.onExit}
          />
        )}
      </>
    );
  }

  private onExit = () => {
    this.setState({ showPresentation: false });
    return false;
  };

  private onADFChange = () => {
    if (this.inputBox) {
      this.setState({ adf: this.inputBox.value });
    }
  };

  private startPresentation = () => {
    this.setState({ showPresentation: true });
  };
}
