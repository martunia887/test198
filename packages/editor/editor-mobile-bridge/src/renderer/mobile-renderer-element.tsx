// tslint:disable:no-console
import * as React from 'react';
import { ProviderFactory } from '@atlaskit/editor-common';
import { MediaProvider as MediaProviderType } from '@atlaskit/editor-core';
import RendererBridgeImpl from './native-to-web/implementation';
import { toNativeBridge } from './web-to-native/implementation';
import { ReactRenderer } from '@atlaskit/renderer';
import {
  MediaProvider,
  MentionProvider,
  TaskDecisionProvider,
  EmojiProvider,
} from '../providers';

import { eventDispatcher } from './dispatcher';
import { ObjectKey, TaskState } from '@atlaskit/task-decision';

export interface MobileRendererState {
  /** as defined in the renderer */
  document: any;
}

const rendererBridge = ((window as any).rendererBridge = new RendererBridgeImpl());

export default class MobileRenderer extends React.Component<
  { mediaProvider?: Promise<MediaProviderType> },
  MobileRendererState
> {
  private providerFactory;
  // TODO get these from native;
  private objectAri;
  private containerAri;

  constructor(props) {
    super(props);

    this.state = {
      document: null,
    };

    const taskDecisionProvider = TaskDecisionProvider(this.handleToggleTask);

    this.providerFactory = ProviderFactory.create({
      mediaProvider: props.mediaProvider || MediaProvider,
      mentionProvider: Promise.resolve(MentionProvider),
      taskDecisionProvider: Promise.resolve(taskDecisionProvider),
      emojiProvider: Promise.resolve(EmojiProvider),
    });

    this.containerAri = 'MOCK-containerAri';
    this.objectAri = 'MOCK-objectAri';

    rendererBridge.containerAri = this.containerAri;
    rendererBridge.objectAri = this.objectAri;
    rendererBridge.taskDecisionProvider = taskDecisionProvider;
  }

  private handleToggleTask = (key: ObjectKey, state: TaskState) => {
    toNativeBridge.call('taskDecisionBridge', 'updateTask', {
      taskId: key.localId,
      state,
    });
  };

  private onLinkClick(url) {
    if (!url) {
      return;
    }

    toNativeBridge.call('linkBridge', 'onLinkClick', { url });
  }

  componentDidMount() {
    eventDispatcher.on('setRendererContent', ({ content }) => {
      this.setState({
        document: content,
      });
    });
  }

  render() {
    try {
      // If we haven't received a document yet, don't pass null.
      // We'll get a flash of 'unsupported content'.
      // Could add a loader here if needed.
      if (!this.state.document) {
        return null;
      }

      return (
        <ReactRenderer
          dataProviders={this.providerFactory}
          appearance="mobile"
          document={this.state.document}
          rendererContext={{
            // These will need to come from the native side.
            objectAri: this.objectAri,
            containerAri: this.containerAri,
          }}
          eventHandlers={{
            link: {
              onClick: (event, url) => {
                event.preventDefault();
                this.onLinkClick(url);
              },
            },
            media: {
              onClick: (result: any, analyticsEvent?: any) => {
                const { mediaItemDetails } = result;
                // Media details only exist once resolved. Not available during loading/pending state.
                if (mediaItemDetails) {
                  const mediaId = mediaItemDetails.id;
                  // We don't have access to the occurrence key at this point so native will default to the first instance for now.
                  // https://product-fabric.atlassian.net/browse/FM-1984
                  const occurrenceKey: string | null = null;
                  toNativeBridge.call('mediaBridge', 'onMediaClick', {
                    mediaId,
                    occurrenceKey,
                  });
                }
              },
            },
            smartCard: {
              onClick: this.onLinkClick,
            },
          }}
        />
      );
    } catch (ex) {
      return <pre>Invalid document</pre>;
    }
  }
}
