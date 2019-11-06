import { AlignmentState } from '../pm-plugins/main';
import { toggleBlockMark, changeImageAlignment } from '../../../commands';
import { Command } from '../../../types/command';
import { cascadeCommands } from '../../../utils/action';
import { withScrollIntoView } from '../../../utils/commands';

export const isAlignable = (align?: AlignmentState): Command => (
  state,
  dispatch,
) => {
  const {
    nodes: { paragraph, heading },
    marks: { alignment },
  } = state.schema;
  return toggleBlockMark(
    alignment,
    () => (!align ? undefined : align === 'start' ? false : { align }),
    [paragraph, heading],
  )(state, dispatch);
};

export const changeAlignment = (align?: AlignmentState): Command =>
  withScrollIntoView((state, dispatch) => {
    const {
      nodes: { paragraph, heading },
      marks: { alignment },
    } = state.schema;

    return cascadeCommands([
      changeImageAlignment(align),
      toggleBlockMark(
        alignment,
        () => (!align ? undefined : align === 'start' ? false : { align }),
        [paragraph, heading],
      ),
    ])(state, dispatch);
  });
