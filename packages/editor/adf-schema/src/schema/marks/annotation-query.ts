import { MarkSpec } from 'prosemirror-model';
import { SEARCH_QUERY } from '../groups';
import { B400 } from '../../utils/colors';

export const annotationQuery: MarkSpec = {
  inclusive: false,
  excludes: 'searchQuery',
  parseDOM: [{ tag: 'span[data-annotation-query]' }],
  toDOM() {
    return [
      'span',
      {
        'data-annotation-query': 'true',
        style: `background-color: #ffd400fc`,
      },
    ];
  },
  attrs: {
    trigger: { default: '' },
  },
};
