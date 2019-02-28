import { EditorView } from 'prosemirror-view';
import { Node as PMNode } from 'prosemirror-model';
import { closeHistory } from 'prosemirror-history';
import { pluginKey } from './main';
import { CardPluginState, Request } from '../types';
import { jqlResponse } from '../../../../example-helpers/jql-doc';
import { Command } from '../../../types';
import { resolveCard } from './actions';

/**
 * test url: https://product-fabric.atlassian.net/browse/ED-6381?jql=project%20%3D%20ED%20AND%20issuetype%20%3D%20Bug%20AND%20status%20%3D%20Done%20AND%20text%20~%20%22table%22%20AND%20assignee%20in%20(nflew)
 * jql: project = ED AND issuetype = Bug AND status = Done AND text ~ "table" AND assignee in (nflew)
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
    const query = (url.match(/\?jql=(.*)/) || [, null])[1];
    const jqlUrl = `https://product-fabric.atlassian.net/rest/api/3/search?fields=summary,status,assignee,title,description&jql=${encodeURIComponent(
      query!,
    )}`;

    if (jqlUrl) {
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

function createCell(schema, width, content) {
  const { tableCell, paragraph } = schema.nodes;
  return tableCell.createChecked(
    { colwidth: [width] },
    paragraph.createChecked({}, content),
  );
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
    tableHeader,
    paragraph,
    mention,
    status,
    jiraIssue,
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

    const titles = ['Key', 'Status', 'Summary', 'Assignee', 'Reporter'];
    const headerCells = titles.map(title =>
      tableHeader.createChecked(
        {},
        paragraph.createChecked({}, schema.text(title)),
      ),
    );
    const rows: PMNode[] = [tableRow.createChecked({}, headerCells)];

    jqlQuery.issues
      .map(issue => {
        const cells: PMNode[] = [];

        // Jira issue node (💥custom)
        cells.push(
          createCell(
            schema,
            135,
            jiraIssue.createChecked({
              data: {
                key: issue.key,
                url: `${issue.fields.status.iconUrl}browse/${issue.key}`,
                priority: issue.fields.priority,
                type: issue.fields.issuetype,
              },
            }),
          ),
        );

        // Status
        cells.push(
          createCell(
            schema,
            80,
            status.createChecked({
              text: issue.fields.status.name,
              color: issue.fields.status.statusCategory.colorName,
            }),
          ),
        );

        // Summary
        cells.push(createCell(schema, 405, schema.text(issue.fields.summary)));

        // Assignee
        if (issue.fields.assignee) {
          const { displayName, accountId } = issue.fields.assignee;
          cells.push(
            createCell(
              schema,
              150,
              mention.createChecked({
                text: `@${displayName}`,
                id: accountId,
                accessLevel: 'CONTAINER',
                userType: 'DEFAULT',
              }),
            ),
          );
        }

        // Reporter
        if (issue.fields.reporter) {
          const { displayName, accountId } = issue.fields.reporter;
          cells.push(
            createCell(
              schema,
              150,
              mention.createChecked({
                text: `@${displayName}`,
                id: accountId,
                accessLevel: 'CONTAINER',
                userType: 'DEFAULT',
              }),
            ),
          );
        }

        return cells;
      })
      .forEach(cells => {
        rows.push(tableRow.createChecked({}, cells));
      });

    tr.replaceWith(
      pos,
      pos + (node.text || '').length,
      table.createChecked({ layout: 'wide' }, rows),
    );
  });

  if (dispatch) {
    dispatch(resolveCard(url)(closeHistory(tr)));
  }

  return true;
};
