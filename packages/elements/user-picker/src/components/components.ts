import memoizeOne from 'memoize-one';

import { ClearIndicator } from './ClearIndicator';
import { Input } from './Input';
import { MultiValue } from './MultiValue';
import { MultiValueContainer } from './MultiValueContainer';
import { Option } from './Option';
import { PopupControl } from './PopupControl';
import { PopupInput } from './PopupInput';
import { SingleValue } from './SingleValue';
import { SingleValueContainer } from './SingleValueContainer';

/**
 * Memoize getComponents to avoid rerenders.
 */
export const getComponents = memoizeOne(
  (multi?: boolean, anchor?: React.ComponentType<any>) => {
    if (anchor) {
      return {
        Control: anchor,
        Option,
      };
    } else {
      return {
        MultiValue,
        DropdownIndicator: null,
        SingleValue,
        ClearIndicator: multi ? null : ClearIndicator,
        Option,
        ValueContainer: multi ? MultiValueContainer : SingleValueContainer,
        Input,
      };
    }
  },
);

export const getPopupComponents = memoizeOne((hasPopupTitle: boolean) => {
  const baseProps = {
    DropdownIndicator: null,
    SingleValue,
    ClearIndicator,
    Option,
    ValueContainer: SingleValueContainer,
    Input: PopupInput,
  };
  if (hasPopupTitle) {
    return {
      ...baseProps,
      Control: PopupControl,
    };
  }
  return baseProps;
});
