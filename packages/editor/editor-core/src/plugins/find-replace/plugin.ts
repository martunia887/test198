import { PluginKey, Plugin, Transaction } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { colors } from '@atlaskit/theme';
import { pluginFactory } from '../../utils/plugin-state-factory';
import reducer from './reducer';
import { Dispatch } from '../../event-dispatcher';
import { FindReplaceAction } from './actions';
import { Match } from './types';
import { findMatches } from './utils';

export interface FindReplaceState {
  /** Whether find/replace is active, i.e. displayed */
  active: boolean;
  /** Whether we should set focus into and select all text of find textfield */
  shouldFocus: boolean;
  /** Search keyword */
  findText: string;
  /** Text to replace with */
  replaceText: string;
  /** Index of selected word in array of matches, this gets updated as user finds next/prev */
  index: number;
  /** Positions of find results */
  matches: Match[];
}

export interface FindReplaceInitialState {
  active: false;
  shouldFocus: false;
  findText: '';
  replaceText: '';
  index: 0;
  matches: [];
}

export const findReplacePluginKey = new PluginKey('findReplace');

export const getInitialState = (): FindReplaceInitialState => ({
  active: false,
  shouldFocus: false,
  findText: '',
  replaceText: '',
  index: 0,
  matches: [],
});

// Extracted so that source maps works there seems to be a bug with generic parameters of pluginFactory that treats the args as unbreakpointable
const onDocChangedFn = (
  tr: Transaction,
  pluginState: FindReplaceState,
): FindReplaceState => {
  if (pluginState.active && pluginState.findText) {
    const matches = findMatches(tr.doc, pluginState.findText);
    // const mappedMatches = pluginState.matches
    //   .map(match => ({
    //     start: tr.mapping.map(match.start),
    //     end: tr.mapping.map(match.end),
    //   }))
    //   // Deleted text is mapped to the same start and end node
    //   .filter(match => match.end > match.start);

    // let newMatches: Match[] = [];
    // const diffStart = tr.doc.content.findDiffStart(tr.before.content);
    // const diffEnd = tr.doc.content.findDiffEnd(tr.before);
    // if (diffStart && diffEnd) {
    //   const addSlice = tr.doc.slice(diffStart, diffEnd.a);

    //   // go through add slice - findMatches -> add
    //   newMatches = findMatches(
    //     addSlice.content,
    //     pluginState.findText,
    //     diffStart,
    //   );
    //   // TODO: Handle case where adding part of match adds a new match

    //   if (!Number.isNaN(diffEnd.b)) {
    //     const delSlice = tr.doc.slice(diffStart, diffEnd.b);
    //   }
    // }

    // // TODO: Replace sort with something less overkill
    // const matches = [...mappedMatches, ...newMatches].sort(
    //   (a, b) => a.start - b.start,
    // );

    // does any matches fall in delSlice range -> del

    return {
      ...pluginState,
      matches,
      shouldFocus: false,
    };
  }
  return pluginState;
};

export const {
  createCommand: createFindReplaceCommand,
  getPluginState: getFindReplacePluginState,
  createPluginState: createFindReplacePluginState,
} = pluginFactory<FindReplaceState, FindReplaceAction, FindReplaceInitialState>(
  findReplacePluginKey,
  reducer,
  {
    onDocChanged: onDocChangedFn,
  },
);

export const createPlugin = (dispatch: Dispatch) =>
  new Plugin({
    key: findReplacePluginKey,
    state: createFindReplacePluginState(dispatch, getInitialState()),
    props: {
      decorations(state) {
        const pluginState = getFindReplacePluginState(state);
        if (pluginState.active && pluginState.findText) {
          const selectedIndex = pluginState.index;
          return DecorationSet.create(
            state.doc,
            pluginState.matches.map(({ start, end }, index) =>
              Decoration.inline(start, end, {
                style: `background-color: ${
                  index === selectedIndex ? colors.B100 : colors.B75
                };`,
              }),
            ),
          );
        }
      },
    },
  });
