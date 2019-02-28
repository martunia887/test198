import { EditorView } from 'prosemirror-view';
import { Node as PMNode } from 'prosemirror-model';
import { closeHistory } from 'prosemirror-history';
import { pluginKey } from './main';
import { CardPluginState, Request } from '../types';
import { jqlResponse } from '../../../../example-helpers/jql-doc';
import { Command } from '../../../types';
import { resolveCard } from './actions';
import * as format from 'date-fns/format';

/**
 * test url: https://product-fabric.atlassian.net/browse/ED-6381?jql=project%20%3D%20ED%20AND%20issuetype%20%3D%20Bug%20AND%20status%20%3D%20Done%20AND%20text%20~%20%22table%22%20AND%20assignee%20in%20(nflew)
 */

export const handleResolvedJql = (
  view: EditorView,
  request: Request,
) => resolvedJql => {
  replaceQueuedUrlWithTable(request.url, resolvedJql)(
    view.state,
    view.dispatch,
  );
  return resolvedJql;
};

export function resolveJql(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const jqlQuery = (url.match(/\?jql=(.*)/) || [, null])[1];
    if (jqlQuery) {
      // const requestUrl = `https://product-fabric.atlassian.net/rest/api/3/search?fields=summary,status,assignee,title,description&jql=${encodeURIComponent(
      //   jqlQuery,
      // )}`;

      // fetch(requestUrl, {
      //   method: 'GET',
      //   mode: 'cors',
      //   headers: {
      //     'Access-Control-Allow-Origin': '*',
      //     Accept: 'application/json, */*',
      //     'Content-Type': 'application/json',
      //   },
      // })
      //   .then(resolve)
      //   .catch(reject);

      resolve(jqlResponse);
    } else {
      resolve(url);
    }
  });
}

export const replaceQueuedUrlWithTable = (
  url: string,
  jqlQuery: any,
): Command => (editorState, dispatch) => {
  const state = pluginKey.getState(editorState) as CardPluginState | undefined;
  if (!jqlQuery || !state) {
    return false;
  }

  // find the requests for this URL
  const requests = state.requests.filter(req => req.url === url);

  // try to transform response to ADF
  const { schema } = editorState;
  const {
    table,
    tableRow,
    tableCell,
    tableHeader,
    paragraph,
    mention,
    status,
  } = schema.nodes;

  let tr = editorState.tr;
  requests.forEach(request => {
    // replace all the outstanding links with their cards
    const pos = tr.mapping.map(request.pos);
    const node = tr.doc.nodeAt(pos);
    if (!node || !node.type.isText) {
      return;
    }

    // not a link anymore
    const linkMark = node.marks.find(mark => mark.type.name === 'link');
    if (!linkMark || linkMark.attrs.href !== url) {
      return;
    }

    const titles = [
      'Key',
      'Summary',
      'Type',
      'Assignee',
      'Reporter',
      'P',
      'Status',
    ];
    const headerCells = titles.map(title =>
      tableHeader.createChecked(
        {},
        paragraph.createChecked({}, schema.text(title)),
      ),
    );
    const rows: PMNode[] = [tableRow.createChecked({}, headerCells)];

    jqlQuery.issues
      .map(issue => {
        const contentNodes: PMNode[] = [];

        // Key
        contentNodes.push(schema.text(issue.key));

        // Summary
        contentNodes.push(schema.text(issue.fields.summary));

        // Type
        contentNodes.push(schema.text(issue.fields.issuetype.name));

        // Assignee
        if (issue.fields.assignee) {
          const { displayName, accountId } = issue.fields.assignee;
          contentNodes.push(
            mention.createChecked({
              text: `@${displayName}`,
              id: accountId,
              // hardcoded :)
              accessLevel: 'CONTAINER',
              userType: 'DEFAULT',
            }),
          );
        }

        // Reporter
        if (issue.fields.reporter) {
          const { displayName, accountId } = issue.fields.reporter;
          contentNodes.push(
            mention.createChecked({
              text: `@${displayName}`,
              id: accountId,
              // hardcoded :)
              accessLevel: 'CONTAINER',
              userType: 'DEFAULT',
            }),
          );
        }

        // P
        contentNodes.push(schema.text(issue.fields.priority.name));

        // Status
        contentNodes.push(
          status.createChecked({
            text: issue.fields.status.name,
            color: issue.fields.status.statusCategory.colorName,
          }),
        );

        return contentNodes.map(content =>
          tableCell.createChecked({}, paragraph.createChecked({}, content)),
        );
      })
      .forEach(cells => {
        rows.push(tableRow.createChecked({}, cells));
      });

    tr.replaceWith(
      pos,
      pos + (node.text || '').length,
      table.createChecked({ layout: 'full-width' }, rows),
    );
  });

  if (dispatch) {
    dispatch(resolveCard(url)(closeHistory(tr)));
  }

  return true;
};
