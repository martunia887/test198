import { MarkSpec } from 'prosemirror-model';
import { SEARCH_QUERY } from '../groups';

export const jiraQuery: MarkSpec = {
  inclusive: true,
  group: SEARCH_QUERY,
};
