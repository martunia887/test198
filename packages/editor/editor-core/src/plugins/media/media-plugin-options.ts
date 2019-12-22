import { ProviderFactory, ErrorReporter } from '@atlaskit/editor-common';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';

import { getPosHandler } from '../../nodeviews';

import { MediaState, CustomMediaPicker } from './types';

export type MediaPluginOptions = {
  providerFactory: ProviderFactory;
  nodeViews: {
    [name: string]: (
      node: PMNode,
      view: EditorView,
      getPos: getPosHandler,
    ) => NodeView;
  };
  errorReporter?: ErrorReporter;
  uploadErrorHandler?: (state: MediaState) => void;
  waitForMediaUpload?: boolean;
  customDropzoneContainer?: HTMLElement;
  customMediaPicker?: CustomMediaPicker;
  allowResizing: boolean;
};
