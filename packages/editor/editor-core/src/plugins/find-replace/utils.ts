import { Fragment, Node as PmNode } from 'prosemirror-model';
import { EditorView, Decoration } from 'prosemirror-view';
import { TextSelection } from 'prosemirror-state';
import { colors } from '@atlaskit/theme';
import { Match } from './types';
import { getFindReplacePluginState } from './plugin';
import { addDecorations, find, removeDecorations } from './commands';
import { batchRequests } from '../../utils/batch';

// update decorations in batches of this size - for performance reasons
export const batchIncrement = 100;

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

function addDecorationsBetween(
  editorView: EditorView,
  startPos: number,
  endPos?: number,
) {
  const { matches, selectionPos } = getFindReplacePluginState(editorView.state);
  const matchesBetween = matches.filter(
    m => m.start >= startPos && (endPos === undefined || m.start < endPos),
  );
  const selectionMatch = matches.find(match => match.start >= selectionPos);
  const selectionIndex = matchesBetween.findIndex(
    match => match === selectionMatch,
  );

  return batchRequests(
    counter => {
      const matchesToDecorate = matchesBetween.slice(
        counter,
        counter + batchIncrement,
      );
      if (matchesToDecorate.length > 0) {
        const useSelectionIndex =
          selectionIndex >= counter &&
          selectionIndex < counter + batchIncrement;
        addDecorations(
          createDecorations(
            useSelectionIndex ? selectionIndex % batchIncrement : -1,
            matchesToDecorate,
          ),
        )(editorView.state, editorView.dispatch);
      }
    },
    { increment: batchIncrement, until: matchesBetween.length },
  );
}

function removeDecorationsBetween(
  editorView: EditorView,
  startPos: number,
  endPos?: number,
) {
  const { decorationSet } = getFindReplacePluginState(editorView.state);
  const decorations = decorationSet.find(startPos, endPos);

  if (decorations.length === 0) {
    return;
  }

  return batchRequests(
    counter => {
      removeDecorations(decorations.slice(counter, counter + batchIncrement))(
        editorView.state,
        editorView.dispatch,
      );
    },
    {
      increment: batchIncrement,
      until: decorations.length,
    },
  );
}

async function updateDecorationsBetween(
  editorView: EditorView,
  startPos: number,
  endPos?: number,
) {
  await removeDecorationsBetween(editorView, startPos, endPos);
  await addDecorationsBetween(editorView, startPos, endPos);
}

/**
 * Finds search results in page and batches adding decorations (and removing any old ones)
 * We need to add decorations in batches for performance reasons, 100 decorations at once
 * seems like the optimum amount
 */
export async function findAll(
  editorView: EditorView,
  keyword?: string,
  containerElement?: HTMLElement,
) {
  // First, we find the matches using the new search query
  find(keyword)(editorView.state, editorView.dispatch);

  // todo: cancel any batching currently in progress

  if (!containerElement) {
    return;
  }

  const pmElement = containerElement.querySelector('.ProseMirror');
  if (!pmElement) {
    return;
  }

  // Now we find the document positions within the user's current view, so we can start
  // applying the decorations from here and then move out until the whole page has them

  const containerRect = containerElement.getBoundingClientRect();
  const pmRect = pmElement.getBoundingClientRect();
  const maxPos = editorView.state.doc.nodeSize;

  const startPos = editorView.posAtCoords({
    top: Math.max(pmRect.top, 0),
    left: pmRect.left,
  });
  const endPos = editorView.posAtCoords({
    top: containerRect.top + containerRect.height,
    left: pmRect.right,
  });
  const start = startPos ? startPos.pos : 1;
  const end = endPos ? endPos.pos : maxPos;

  // Apply decorations in batches, starting with user's view, then alternating above and below
  const diff = end - start;
  let dir = 0;
  let before = start;
  let after = start + diff;
  await updateDecorationsBetween(editorView, start, end);
  while (before > 0 || after < maxPos) {
    if ((dir++ % 2 === 0 && before > 0) || after >= maxPos) {
      before = Math.max(before - diff, 0);
      await updateDecorationsBetween(editorView, before, before + diff);
    } else {
      after = Math.min(after + diff, maxPos);
      await updateDecorationsBetween(editorView, after, after + diff);
    }
  }
}
