import { Fragment, Node as PmNode } from 'prosemirror-model';
import { Decoration } from 'prosemirror-view';
import { TextSelection } from 'prosemirror-state';
import { colors } from '@atlaskit/theme';
import { Match } from '../types';

export function getSelectedText(selection: TextSelection): string {
  let text = '';
  const selectedContent = selection.content().content;
  for (let i = 0; i < selectedContent.childCount; i++) {
    text += selectedContent.child(i).textContent;
  }
  return text;
}

export const createDecorations = (
  selectedIndex: number,
  matches: { start: number; end: number }[],
): Decoration[] =>
  matches.map(({ start, end }, i) =>
    Decoration.inline(start, end, {
      style: `background-color: ${
        i === selectedIndex ? colors.B100 : colors.B75
      };`,
    }),
  );

export function findMatches(
  content: PmNode | Fragment,
  searchText: string,
  contentIndex = 0,
): Match[] {
  let matches: Match[] = [];
  const searchTextLength = searchText.length;
  content.descendants((node, relativePos) => {
    // TODO: Optimisation get string representation of top-level nodes and only recurse if match
    if (node.isText) {
      const pos = contentIndex + relativePos;
      let index = node.textContent.indexOf(searchText);

      while (index !== -1) {
        // Find the next substring from the end of the first, so that they don't overlap
        const end = index + searchTextLength;
        // Add the substring index to the position of the node
        matches.push({ start: pos + index, end: pos + end });
        index = node.textContent.indexOf(searchText, end);
      }
    }
  });
  return matches;
}

/**
 * Finds index of first item in matches array that comes after user's cursor pos
 */
export function findSearchIndex(
  selectionPos: number,
  matches: Match[],
): number {
  return Math.max(
    matches.findIndex(match => match.start >= selectionPos),
    0,
  );
}
