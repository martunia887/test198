import * as React from 'react';
import { css } from 'styled-components';
import { Plugin, PluginKey, EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { findParentNode } from 'prosemirror-utils';
import { Node as PMNode } from 'prosemirror-model';
import { breakout } from '@atlaskit/adf-schema';
import { calcBreakoutWidth } from '@atlaskit/editor-common';
import { EditorPlugin, PMPluginFactoryParams } from '../../types';
import WithPluginState from '../../ui/WithPluginState';
import { pluginKey as widthPluginKey } from '../width';
import LayoutButton from './ui/LayoutButton';
import { isSupportedNodeForBreakout } from './utils/is-supported-node';
import { BreakoutCssClassName } from './constants';
import { EventDispatcher } from '../../';

export const breakoutStyles = css`
  .ProseMirror > .${BreakoutCssClassName.BREAKOUT_MARK}[data-layout='full-width'],
  .ProseMirror > .${BreakoutCssClassName.BREAKOUT_MARK}[data-layout='wide'] {
    margin-left: 50%;
    transform: translateX(-50%);
  }
`;

export const pluginKey = new PluginKey('breakoutPlugin');
export const getPluginState = (state: EditorState) => pluginKey.getState(state);

class BreakoutView {
  dom: HTMLElement;
  contentDOM: HTMLElement;
  view: EditorView;
  node: PMNode;
  eventDispatcher: EventDispatcher;

  constructor(
    node: PMNode,
    view: EditorView,
    eventDispatcher: EventDispatcher,
  ) {
    const contentDOM = document.createElement('div');
    contentDOM.className = BreakoutCssClassName.BREAKOUT_MARK_DOM;

    const dom = document.createElement('div');
    dom.className = BreakoutCssClassName.BREAKOUT_MARK;
    dom.setAttribute('data-layout', node.attrs.mode);
    dom.appendChild(contentDOM);

    this.dom = dom;
    this.node = node;
    this.view = view;
    this.contentDOM = contentDOM;
    this.eventDispatcher = eventDispatcher;

    this.updateWidth();

    eventDispatcher.on((widthPluginKey as any).key, this.updateWidth);
  }

  private updateWidth = () => {
    const widthState = widthPluginKey.getState(this.view.state);
    const width = calcBreakoutWidth(this.node.attrs.mode, widthState.width);
    this.dom.style.width = width;
  };

  destroy() {
    this.eventDispatcher.off((widthPluginKey as any).key, this.updateWidth);
  }

  update(node: PMNode) {
    if (this.node.type === node.type) {
      this.node = node;
      return node.attrs.mode !== this.node.attrs.mode;
    }
    return false;
  }
}

function createPlugin({ dispatch, eventDispatcher }: PMPluginFactoryParams) {
  return new Plugin({
    state: {
      init() {
        return {
          breakoutNode: null,
        };
      },
      apply(tr, pluginState) {
        const breakoutNode = findParentNode(isSupportedNodeForBreakout)(
          tr.selection,
        );

        const node = breakoutNode ? breakoutNode.node : null;
        if (node !== pluginState.breakoutNode) {
          const nextPluginState = {
            ...pluginState,
            breakoutNode: node,
          };
          dispatch(pluginKey, nextPluginState);
          return nextPluginState;
        }

        return pluginState;
      },
    },
    key: pluginKey,
    props: {
      nodeViews: {
        breakout: (node, view) => {
          return new BreakoutView(node, view, eventDispatcher);
        },
      },
    },
  });
}

interface BreakoutPluginOptions {
  allowBreakoutButton?: boolean;
}

const breakoutPlugin = (options?: BreakoutPluginOptions): EditorPlugin => ({
  name: 'breakout',

  pmPlugins() {
    return [{ name: 'breakout', plugin: createPlugin }];
  },
  marks() {
    return [{ name: 'breakout', mark: breakout }];
  },

  contentComponent({
    editorView,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
  }) {
    // This is a bit crappy, but should be resolved once we move to a static schema.
    if (options && !options.allowBreakoutButton) {
      return null;
    }

    return (
      <WithPluginState
        plugins={{
          pluginState: pluginKey,
        }}
        render={({ pluginState }) => {
          return (
            <LayoutButton
              editorView={editorView}
              mountPoint={popupsMountPoint}
              boundariesElement={popupsBoundariesElement}
              scrollableElement={popupsScrollableElement}
              node={pluginState.breakoutNode}
            />
          );
        }}
      />
    );
  },
});

export default breakoutPlugin;
