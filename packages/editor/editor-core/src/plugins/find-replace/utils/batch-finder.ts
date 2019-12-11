import { EditorView } from 'prosemirror-view';
import { find, addDecorations, removeDecorations } from '../commands';
import { getFindReplacePluginState } from '../plugin';
import { createDecorations } from './index';

const batchIncrement = 100;
const posIncrement = 2000;

/**
 * Provides support for applying search match highlight decorations in batches
 */
export class BatchFinder {
  private rafId: number | undefined;

  cancelInProgress() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }

  async findAll(
    editorView: EditorView,
    keyword?: string,
    containerElement?: HTMLElement,
  ) {
    this.cancelInProgress();

    // First, we find the matches using the new search query
    find(keyword)(editorView.state, editorView.dispatch);

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
    let dir = 0;
    let before = start;
    let after = end - posIncrement;
    await this.updateDecorationsBetween(editorView, start, end);
    while (before > 1 || after < maxPos) {
      if ((dir++ % 2 === 0 && before > 1) || after >= maxPos) {
        before = Math.max(before - posIncrement, 1);
        await this.updateDecorationsBetween(
          editorView,
          before,
          before + posIncrement,
        );
      } else {
        after = Math.min(after + posIncrement, maxPos);
        await this.updateDecorationsBetween(
          editorView,
          after,
          after + posIncrement,
        );
      }
    }
  }

  private batchRequests(
    fn: (counter: number) => void,
    opts: { increment: number; until: number },
  ): Promise<undefined> {
    let counter = 0;
    const { increment, until } = opts;

    return new Promise(resolve => {
      const batchedFn = () => {
        fn(counter);
        if (counter < until) {
          counter += increment;
          this.rafId = requestAnimationFrame(batchedFn);
        } else {
          this.rafId = undefined;
          resolve();
        }
      };

      this.rafId = requestAnimationFrame(batchedFn);
    });
  }

  private addDecorationsBetween(
    editorView: EditorView,
    startPos: number,
    endPos?: number,
  ) {
    const { matches, selectionPos } = getFindReplacePluginState(
      editorView.state,
    );
    if (matches.length === 0) {
      return;
    }

    const matchesBetween = matches.filter(
      m => m.start >= startPos && (endPos === undefined || m.start < endPos),
    );
    const selectionMatch = matches.find(match => match.start >= selectionPos);
    const selectionIndex = matchesBetween.findIndex(
      match => match === selectionMatch,
    );

    return this.batchRequests(
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

  private removeDecorationsBetween(
    editorView: EditorView,
    startPos: number,
    endPos?: number,
  ) {
    const { decorationSet } = getFindReplacePluginState(editorView.state);
    const decorations = decorationSet.find(startPos, endPos);

    if (decorations.length === 0) {
      return;
    }

    return this.batchRequests(
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

  private async updateDecorationsBetween(
    editorView: EditorView,
    startPos: number,
    endPos?: number,
  ) {
    await this.removeDecorationsBetween(editorView, startPos, endPos);
    await this.addDecorationsBetween(editorView, startPos, endPos);
  }
}
