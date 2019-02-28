import { EditorView } from 'prosemirror-view';
import { Node as PMNode, Schema } from 'prosemirror-model';
import { closeHistory } from 'prosemirror-history';
import { pluginKey } from './main';
import { CardPluginState, Request } from '../types';
import { default as json } from '../../inline-jira/nodeviews/data/jql.json';
import { Command } from '../../../types';
import { resolveCard } from './actions';
import { issueTypes } from '../../inline-jira/nodeviews';

/**
 * test url: https://product-fabric.atlassian.net/browse/ED-6380?jql=project%20%3D%20ED%20AND%20issuetype%20%3D%20Bug%20AND%20status%20in%20(Backlog%2C%20Duplicate%2C%20%22In%20Review%22%2C%20%22In%20progress%22)%20AND%20text%20~%20%22table%22
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

      resolve(json);
    } else {
      resolve(url);
    }
  });
}

function createCell(
  schema: Schema,
  {
    width,
    content,
    inline = false,
  }: { width: number; content: PMNode; inline?: boolean },
) {
  const { tableCell, paragraph } = schema.nodes;
  const cell = tableCell.createChecked(
    { colwidth: [width] },
    inline ? paragraph.createChecked({}, content) : content,
  );

  return cell;
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
    jiraIssueSelect,
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

      'Status',
      'Priority',
      'Summary',
      'Assignee',
      'Reporter',
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
        const cells: PMNode[] = [];

        // Key
        cells.push(
          createCell(schema, {
            width: 125,
            inline: true,
            content: jiraIssue.createChecked({
              data: {
                key: issue.key,
                url: `${issue.fields.status.iconUrl}browse/${issue.key}`,
                type: issue.fields.issuetype,
              },
            }),
          }),
        );

        // Status
        cells.push(
          createCell(schema, {
            width: 125,
            inline: true,
            content: status.createChecked({
              text: issue.fields.status.name,
              color: issue.fields.status.statusCategory.colorName,
            }),
          }),
        );

        // Priority
        cells.push(
          createCell(schema, {
            width: 125,
            content: jiraIssueSelect.createChecked({
              data: {
                ...issue.fields.priority,
                options: issueTypes,
              },
            }),
          }),
        );

        // Summary
        cells.push(
          createCell(schema, {
            width: 300,
            inline: true,
            content: schema.text(issue.fields.summary),
          }),
        );

        // Assignee
        cells.push(
          createCell(schema, {
            width: 140,
            inline: true,
            content: issue.fields.assignee
              ? mention.createChecked({
                  text: `@${issue.fields.assignee.displayName}`,
                  id: issue.fields.assignee.accountId,
                  accessLevel: 'CONTAINER',
                  userType: 'DEFAULT',
                })
              : schema.text(' '),
          }),
        );

        // Reporter
        cells.push(
          createCell(schema, {
            width: 140,
            inline: true,
            content: issue.fields.reporter
              ? mention.createChecked({
                  text: `@${issue.fields.reporter.displayName}`,
                  id: issue.fields.reporter.accountId,
                  accessLevel: 'CONTAINER',
                  userType: 'DEFAULT',
                })
              : schema.text(' '),
          }),
        );

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
