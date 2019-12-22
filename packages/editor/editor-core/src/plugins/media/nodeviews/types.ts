import {
  ContextIdentifierProvider,
  ProviderFactory,
  MediaProvider,
} from '@atlaskit/editor-common';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';

import { EventDispatcher } from '../../../event-dispatcher';
import { ProsemirrorGetPosHandler } from '../../../nodeviews';
import { EditorAppearance } from '../../../types';
import { DispatchAnalyticsEvent } from '../../analytics';
import { MediaPluginState } from '../pm-plugins/main';
import { MediaOptions, MediaPMPluginOptions } from '../index';

export interface MediaSingleNodeProps {
  view: EditorView;
  node: PMNode;
  getPos: ProsemirrorGetPosHandler;
  eventDispatcher: EventDispatcher;
  width: number;
  selected: Function;
  lineLength: number;
  mediaPluginOptions?: MediaPMPluginOptions;
  mediaOptions: MediaOptions;
  mediaProvider?: Promise<MediaProvider>;
  contextIdentifierProvider?: Promise<ContextIdentifierProvider>;
  fullWidthMode?: boolean;
  mediaPluginState: MediaPluginState;
  dispatchAnalyticsEvent: DispatchAnalyticsEvent;
  editorAppearance?: EditorAppearance;
}

export interface MediaSingleNodeViewProps {
  eventDispatcher: EventDispatcher;
  providerFactory: ProviderFactory;
  mediaOptions: MediaOptions;
  mediaPluginOptions?: MediaPMPluginOptions;
  fullWidthMode?: boolean;
  dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
  editorAppearance?: EditorAppearance;
}
