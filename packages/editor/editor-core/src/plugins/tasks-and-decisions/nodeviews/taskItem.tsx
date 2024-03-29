import * as React from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView, NodeView, Decoration } from 'prosemirror-view';
import { ProviderFactory } from '@atlaskit/editor-common';
import {
  AnalyticsListener,
  UIAnalyticsEventInterface,
  AnalyticsEventPayload,
} from '@atlaskit/analytics-next';
import { ReactNodeView, ReactComponentProps } from '../../../nodeviews';
import TaskItem from '../ui/Task';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import WithPluginState from '../../../ui/WithPluginState';
import {
  stateKey as taskPluginKey,
  TaskDecisionPluginState,
} from '../pm-plugins/main';
import {
  pluginKey as editorDisabledPluginKey,
  EditorDisabledPluginState,
} from '../../editor-disabled';

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PMNode;
}

class Task extends ReactNodeView {
  private isContentEmpty() {
    return this.node.content.childCount === 0;
  }

  private handleOnChange = (taskId: string, isChecked: boolean) => {
    const { tr } = this.view.state;
    const nodePos = this.getPos();

    tr.setNodeMarkup(nodePos, undefined, {
      state: isChecked ? 'DONE' : 'TODO',
      localId: taskId,
    });

    this.view.dispatch(tr);
  };

  /**
   * Dynamically generates analytics data relating to the parent list.
   *
   * Required to be dynamic, as list (in prosemirror model) may have
   * changed (e.g. item movements, or additional items in list).
   * This node view will have not rerendered for those changes, so
   * cannot render the position and listSize into the
   * AnalyticsContext at initial render time.
   */
  private addListAnalyticsData = (event: UIAnalyticsEventInterface) => {
    try {
      const resolvedPos = this.view.state.doc.resolve(this.getPos());
      const position = resolvedPos.index();
      const listSize = resolvedPos.parent.childCount;
      const listLocalId = resolvedPos.parent.attrs.localId;

      event.update((payload: AnalyticsEventPayload) => {
        const { attributes = {}, actionSubject } = payload;
        if (actionSubject !== 'action') {
          // Not action related, ignore
          return payload;
        }
        return {
          ...payload,
          attributes: {
            ...attributes,
            position,
            listSize,
            listLocalId,
          },
        };
      });
    } catch (e) {
      // This can occur if pos is NaN (seen it in some test cases)
      // Act defensively here, and lose some analytics data rather than
      // cause any user facing error.
    }
  };

  createDomRef() {
    const domRef = document.createElement('li');
    domRef.style['list-style-type' as any] = 'none';
    return domRef;
  }

  getContentDOM() {
    return { dom: document.createElement('div') };
  }

  render(props: ReactComponentProps, forwardRef: any) {
    const { localId, state } = this.node.attrs;

    return (
      <AnalyticsListener
        channel="fabric-elements"
        onEvent={this.addListAnalyticsData}
      >
        <WithPluginState
          plugins={{
            editorDisabledPlugin: editorDisabledPluginKey,
            taskDecisionPlugin: taskPluginKey,
          }}
          render={({
            editorDisabledPlugin,
            taskDecisionPlugin,
          }: {
            editorDisabledPlugin: EditorDisabledPluginState;
            taskDecisionPlugin: TaskDecisionPluginState;
          }) => {
            let insideCurrentNode = false;
            if (
              taskDecisionPlugin &&
              taskDecisionPlugin.currentTaskDecisionItem
            ) {
              insideCurrentNode = this.node.eq(
                taskDecisionPlugin.currentTaskDecisionItem,
              );
            }

            return (
              <TaskItem
                taskId={localId}
                contentRef={forwardRef}
                isDone={state === 'DONE'}
                onChange={this.handleOnChange}
                showPlaceholder={!insideCurrentNode && this.isContentEmpty()}
                providers={props.providerFactory}
                disabled={(editorDisabledPlugin || {}).editorDisabled}
              />
            );
          }}
        />
      </AnalyticsListener>
    );
  }

  update(node: PMNode, decorations: Decoration[]) {
    /**
     * Returning false here when the previous content was empty fixes an error where the editor fails to set selection
     * inside the contentDOM after a transaction. See ED-2374.
     *
     * Returning false also when the task state has changed to force the checkbox to update. See ED-5107
     */

    return super.update(
      node,
      decorations,
      (currentNode, newNode) =>
        !this.isContentEmpty() &&
        !!(currentNode.attrs.state === newNode.attrs.state),
    );
  }
}

export function taskItemNodeViewFactory(
  portalProviderAPI: PortalProviderAPI,
  providerFactory: ProviderFactory,
) {
  return (node: any, view: any, getPos: () => number): NodeView => {
    return new Task(node, view, getPos, portalProviderAPI, {
      providerFactory,
    }).init();
  };
}
