// tslint:disable:no-console
import * as React from 'react';
import {
  profilecard as profilecardUtils,
  emoji,
  taskDecision,
} from '@atlaskit/util-data-test';
import { CardEvent } from '@atlaskit/media-card';
import { defaultSchema, ActionMarkAction } from '@atlaskit/adf-schema';
import {
  CardSurroundings,
  ProviderFactory,
  ExtensionHandlers,
  EventHandlers,
} from '@atlaskit/editor-common';
import Button from '@atlaskit/button';
import {
  storyMediaProviderFactory,
  storyContextIdentifierProviderFactory,
} from '@atlaskit/editor-test-helpers';
import * as Clock from 'react-live-clock';

import { document as storyDataDocument } from './story-data';
import {
  default as Renderer,
  Props as RendererProps,
} from '../../src/ui/Renderer';

import { ProfileClient, modifyResponse } from '@atlaskit/profilecard';

import { EmailSerializer, renderDocument, TextSerializer } from '../../src';

import Sidebar, { getDefaultShowSidebarState } from './NavigationNext';
import { RendererAppearance } from '../../src/ui/Renderer/types';

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

const extensionHandlers: ExtensionHandlers = {
  'com.atlassian.fabric': (ext, doc) => {
    const { extensionKey } = ext;

    switch (extensionKey) {
      case 'clock':
        return (
          <Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} />
        );
      case 'mention':
        return [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text:
                  'Hi, my name is... My name is... My name is... My name is ',
              },
              {
                type: 'mention',
                attrs: {
                  id: '1',
                  text: '@Oscar Wallhult',
                },
              },
            ],
          },
        ];
      case 'inline':
        return [
          {
            type: 'text',
            text: 'Hi, my name is... My name is... My name is... My name is ',
          },
          {
            type: 'mention',
            attrs: {
              id: '1',
              text: '@Oscar Wallhult',
            },
          },
        ];
      default:
        return null;
    }
  },
};

const eventHandlers: EventHandlers = {
  mention: {
    onClick: () => console.log('onMentionClick'),
    onMouseEnter: () => console.log('onMentionMouseEnter'),
    onMouseLeave: () => console.log('onMentionMouseLeave'),
  },
  media: {
    onClick: (
      result: CardEvent,
      surroundings?: CardSurroundings,
      analyticsEvent?: any,
    ) => {
      // json-safe-stringify does not handle cyclic references in the react mouse click event
      return console.log(
        'onMediaClick',
        '[react.MouseEvent]',
        result.mediaItemDetails,
        surroundings,
        analyticsEvent,
      );
    },
  },
  action: {
    onClick: (event: ActionMarkAction) =>
      console.log('onClick', '[react.MouseEvent]', event),
  },
};

export interface DemoRendererProps {
  withPortal?: boolean;
  withProviders?: boolean;
  withExtension?: boolean;
  serializer: 'react' | 'text' | 'email';
  document?: object;
  appearance?: RendererAppearance;
  maxHeight?: number;
  truncationEnabled?: boolean;
  allowDynamicTextSizing?: boolean;
}

export interface DemoRendererState {
  input: string;
  portal?: HTMLElement;
  truncated: boolean;
  showSidebar: boolean;
  shouldUseEventHandlers: boolean;
}

export default class RendererDemo extends React.Component<
  DemoRendererProps,
  DemoRendererState
> {
  textSerializer = new TextSerializer(defaultSchema);
  emailSerializer = new EmailSerializer();
  emailRef?: HTMLIFrameElement;
  inputBox: HTMLTextAreaElement | null;
  emailTextareaRef?: any;

  constructor(props: DemoRendererProps) {
    super(props);

    const doc = !!this.props.document ? this.props.document : storyDataDocument;

    this.state = {
      input: JSON.stringify(doc, null, 2),
      truncated: true,
      showSidebar: getDefaultShowSidebarState(false),
      shouldUseEventHandlers: false,
    };
  }

  private handlePortalRef = (portal: HTMLElement | null) => {
    this.setState({ portal: portal || undefined });
  };

  private onEmailRef = (ref: HTMLIFrameElement | null) => {
    this.emailRef = ref || undefined;

    if (ref && ref.contentDocument) {
      // reset padding/margin for empty iframe with about:src URL
      ref.contentDocument.body.style.padding = '0';
      ref.contentDocument.body.style.margin = '0';

      this.onComponentRendered();
    }
  };

  componentDidMount() {
    this.onComponentRendered();
  }

  componentDidUpdate() {
    this.onComponentRendered();
  }

  render() {
    return (
      <Sidebar showSidebar={this.state.showSidebar}>
        {(additionalRendererProps: object) => (
          <div ref="root" style={{ padding: 20 }}>
            <fieldset style={{ marginBottom: 20 }}>
              <legend>Input</legend>
              <textarea
                id="renderer-value-input"
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
                onChange={this.onDocumentChange}
                value={this.state.input}
              />
              <button onClick={this.toggleSidebar}>Toggle Sidebar</button>
              <button onClick={this.toggleEventHandlers}>
                Toggle Event handlers
              </button>
              {this.props.serializer === 'email' && (
                <span>
                  <button onClick={this.copyHTMLToClipboard}>
                    Copy HTML to clipboard
                  </button>
                  <textarea
                    style={{ width: '0px', height: '0px' }}
                    ref={ref => {
                      this.emailTextareaRef = ref;
                    }}
                  />
                </span>
              )}
            </fieldset>
            {this.renderRenderer(additionalRendererProps)}
            {this.renderText()}
            {this.renderEmail()}
          </div>
        )}
      </Sidebar>
    );
  }

  private onComponentRendered() {
    if (this.props.serializer !== 'email' || !this.emailRef) {
      return;
    }

    try {
      const doc = JSON.parse(this.state.input);
      const html = renderDocument<string>(doc, this.emailSerializer).result;

      if (this.emailRef && this.emailRef.contentDocument && html) {
        this.emailRef.contentDocument.body.innerHTML = html;
        this.emailTextareaRef.value = html;
      }
    } catch (ex) {
      console.error(ex);
      // pass
    }
  }

  private toggleTruncated(e: React.MouseEvent<HTMLElement>) {
    this.setState(prevState => ({
      truncated: !prevState.truncated,
    }));
  }

  private renderRenderer(additionalRendererProps: any) {
    const { shouldUseEventHandlers } = this.state;
    if (this.props.serializer !== 'react') {
      return null;
    }

    try {
      let props: RendererProps = {
        document: JSON.parse(this.state.input),
      };

      if (this.props.withProviders) {
        props.eventHandlers = shouldUseEventHandlers
          ? eventHandlers
          : undefined;
        props.dataProviders = providerFactory;
      }

      if (this.props.withExtension) {
        props.extensionHandlers = extensionHandlers;
      }

      if (this.props.withPortal) {
        props.portal = this.state.portal;
      }

      props.appearance = this.props.appearance;
      props.maxHeight = this.props.maxHeight;
      props.truncated = this.props.truncationEnabled && this.state.truncated;
      props.allowDynamicTextSizing = this.props.allowDynamicTextSizing;

      if (additionalRendererProps) {
        props = {
          ...props,
          ...additionalRendererProps,
        };
      }

      const expandButton = (
        <div>
          <Button
            appearance={'link'}
            spacing={'none'}
            onClick={(e: React.MouseEvent<HTMLElement>) =>
              this.toggleTruncated(e)
            }
          >
            {this.state.truncated ? 'Expand text' : 'Collapse text'}
          </Button>
          &nbsp;&middot;&nbsp;
          <Button appearance={'link'} spacing={'none'}>
            Do something else
          </Button>
        </div>
      );

      return (
        <div>
          <div style={{ color: '#ccc', marginBottom: '8px' }}>
            &lt;Renderer&gt;
          </div>
          <div id="RendererOutput">
            <Renderer {...props} />
          </div>
          {this.props.truncationEnabled ? expandButton : null}
          <div style={{ color: '#ccc', marginTop: '8px' }}>
            &lt;/Renderer&gt;
          </div>
          <div ref={this.handlePortalRef} />
        </div>
      );
    } catch (ex) {
      return <pre>Invalid document: {ex.stack}</pre>;
    }
  }

  private renderText() {
    if (this.props.serializer !== 'text') {
      return null;
    }

    try {
      const doc = JSON.parse(this.state.input);

      return (
        <div>
          <h1>Text output</h1>
          <pre>{renderDocument(doc, this.textSerializer).result}</pre>
        </div>
      );
    } catch (ex) {
      return null;
    }
  }

  private renderEmail() {
    if (this.props.serializer !== 'email') {
      return null;
    }

    try {
      JSON.parse(this.state.input);

      return (
        <div>
          <h1>E-mail HTML</h1>
          <iframe
            ref={this.onEmailRef}
            frameBorder="0"
            src="about:blank"
            style={{ width: '100%', height: '400px' }}
          />
        </div>
      );
    } catch (ex) {
      console.error(ex.stack);
      return null;
    }
  }

  private toggleSidebar = () => {
    this.setState(prevState => ({ showSidebar: !prevState.showSidebar }));
  };

  private toggleEventHandlers = () => {
    this.setState(prevState => ({
      shouldUseEventHandlers: !prevState.shouldUseEventHandlers,
    }));
  };

  private copyHTMLToClipboard = () => {
    if (!this.emailTextareaRef) return;
    this.emailTextareaRef.select();
    document.execCommand('copy');
  };

  private onDocumentChange = () => {
    if (this.inputBox) {
      this.setState({ input: this.inputBox.value });
    }
  };
}
