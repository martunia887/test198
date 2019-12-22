import { ProviderFactory, ExtensionHandlers } from '@atlaskit/editor-common';
import { EditorView } from 'prosemirror-view';

import EditorActions from '../actions';
import { EventDispatcher } from '../event-dispatcher';
import { DispatchAnalyticsEvent } from '../plugins/analytics';
import { CollabEditOptions } from '../plugins/collab-edit';
import {
  UIComponentFactory,
  ToolbarUIComponentFactory,
  ReactComponents,
  InsertMenuCustomItem,
} from '../types';

import { EditorAppearance } from './editor-props';

export interface EditorAppearanceComponentProps {
  appearance?: EditorAppearance;
  onUiReady?: (ref: HTMLElement) => void;
  onSave?: (editorView: EditorView) => void;
  onCancel?: (editorView: EditorView) => void;

  providerFactory: ProviderFactory;
  editorActions?: EditorActions;
  editorDOMElement: JSX.Element;
  editorView?: EditorView;

  eventDispatcher?: EventDispatcher;
  dispatchAnalyticsEvent?: DispatchAnalyticsEvent;

  maxHeight?: number;

  contentComponents?: UIComponentFactory[];
  primaryToolbarComponents?: ToolbarUIComponentFactory[];
  secondaryToolbarComponents?: UIComponentFactory[];

  customContentComponents?: ReactComponents;
  customPrimaryToolbarComponents?: ReactComponents;
  customSecondaryToolbarComponents?: ReactComponents;
  insertMenuItems?: InsertMenuCustomItem[];

  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;

  extensionHandlers?: ExtensionHandlers;

  disabled?: boolean;

  collabEdit?: CollabEditOptions;

  allowDynamicTextSizing?: boolean;
  allowAnnotation?: boolean;
}
