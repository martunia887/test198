import { Fragment, Node as PmNode } from 'prosemirror-model';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { TextSelection, EditorState } from 'prosemirror-state';
import { colors } from '@atlaskit/theme';
import { Match } from '../types';
import { getPluginState } from '../plugin';
import { findUniqueItemsIn } from '../../../utils/array';

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
    createDecoration(start, end, i === selectedIndex),
  );

export const createDecoration = (
  start: number,
  end: number,
  isSelected?: boolean,
) =>
  Decoration.inline(start, end, {
    style: `background-color: ${isSelected ? colors.B100 : colors.B75};`,
  });

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

export const nextIndex = (currentIndex: number, total: number) =>
  (currentIndex + 1) % total;

export const prevIndex = (currentIndex: number, total: number) =>
  (currentIndex - 1 + total) % total;

export const findDecorationFromMatch = (
  decorationSet: DecorationSet,
  match: Match,
): Decoration | undefined => {
  const decorations = decorationSet.find(match.start, match.end);
  return decorations.length ? decorations[0] : undefined;
};

export const removeDecorationsFromSet = (
  decorationSet: DecorationSet,
  decorationsToRemove: Decoration[],
  doc: PmNode,
): DecorationSet => {
  const decorations = decorationSet.find();
  // it is essential that we copy the decorations otherwise in some rare cases
  // prosemirror-view will update our decorationsToRemove array to contain nulls
  // instead of Decorations which ruins our check for lost decorations below
  decorationSet = decorationSet.remove(
    decorationsToRemove.map(decoration =>
      decoration.copy(decoration.from, decoration.to),
    ),
  );

  // there is a bug in prosemirror-view where it can't cope with deleting inline
  // decorations from a set in some cases (where there are multiple levels of nested
  // children arrays), and it deletes more decorations than it should
  // todo: ticket link
  if (
    decorationSet.find().length <
    decorations.length - decorationsToRemove.length
  ) {
    const lostDecorations = findUniqueItemsIn<Decoration>(
      decorations,
      decorationSet.find(),
      (firstItem, secondItem) => firstItem.from === secondItem.from,
    ).filter(
      decoration =>
        !decorationsToRemove.find(
          decorationToRemove => decoration.from === decorationToRemove.from,
        ),
    );
    decorationSet = decorationSet.add(doc, lostDecorations);
  }

  return decorationSet;
};
