import { Transformer } from '@atlaskit/editor-common';
import { EditorView } from 'prosemirror-view';

import { EventDispatcher } from '../event-dispatcher';
import { InsertMenuCustomItem } from '../types';

import { UIComponentFactory, ToolbarUIComponentFactory } from './editor-plugin';

export interface EditorInstance {
  editorView: EditorView;
  eventDispatcher: EventDispatcher;
  contentComponents: UIComponentFactory[];
  primaryToolbarComponents: ToolbarUIComponentFactory[];
  secondaryToolbarComponents: UIComponentFactory[];
  contentTransformer?: Transformer<string>;
  insertMenuItems?: InsertMenuCustomItem[];
}
