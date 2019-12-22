import { Transformer } from '@atlaskit/editor-common';
import { Node as PMNode, Node } from 'prosemirror-model';
import { Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { Dispatch } from '../../../../../event-dispatcher';
import {
  analyticsEventKey,
  ACTION,
  ACTION_SUBJECT,
  EVENT_TYPE,
  getAnalyticsEventsFromTransaction,
  AnalyticsEventPayload,
} from '../../../../../plugins/analytics';
import { compose, toJSON } from '../../../../../utils';
import { getDocStructure } from '../../../../../utils/document-logger';
import { sanitizeNode } from '../../../../../utils/filter/node-filter';
import {
  findChangedNodesFromTransaction,
  validateNodes,
  validNode,
} from '../../../../../utils/nodes';
import { EditorSharedConfig } from '../../context/shared-config';

// Helper to assure correct payload when dispatch analytics
function dispatchAnalytics(dispatch: Dispatch, payload: AnalyticsEventPayload) {
  dispatch(analyticsEventKey, payload);
}

export function createDispatchTransaction(
  editorSharedConfig: EditorSharedConfig,
) {
  return function dispatchTransaction(transaction: Transaction) {
    const { editorView, onChange, transformer, dispatch } = editorSharedConfig;
    if (!editorView) {
      return;
    }

    const nodes: PMNode[] = findChangedNodesFromTransaction(transaction);
    if (validateNodes(nodes)) {
      // go ahead and update the state now we know the transaction is good
      const editorState = editorView.state.apply(transaction);
      editorView.updateState(editorState);

      if (onChange && transaction.docChanged) {
        onChange(getEditorValue(editorView, transformer));
      }
    } else {
      // If invalid document, send analytics event with the structure of the nodes
      if (dispatch) {
        const invalidNodes = nodes
          .filter(node => !validNode(node))
          .map(node => getDocStructure(node));

        dispatchAnalytics(dispatch, {
          action: ACTION.DISPATCHED_INVALID_TRANSACTION,
          actionSubject: ACTION_SUBJECT.EDITOR,
          eventType: EVENT_TYPE.OPERATIONAL,
          attributes: {
            analyticsEventPayloads: getAnalyticsEventsFromTransaction(
              transaction,
            ),
            invalidNodes,
          },
        });
      }
    }
  };
}

export function getEditorValue(
  editorView: EditorView,
  transformer?: Transformer<any>,
) {
  return compose(
    doc =>
      transformer && transformer.encode
        ? transformer.encode(Node.fromJSON(editorView.state.schema, doc))
        : doc,
    sanitizeNode,
    toJSON,
  )(editorView.state.doc);
}
