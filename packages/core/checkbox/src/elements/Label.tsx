/** @jsx jsx */
<<<<<<< HEAD
<<<<<<< HEAD
import { jsx, CSSObject } from '@emotion/core';
import { defaultAttributesFn } from '../utils';
import { LabelProps, LabelCSSProps } from '../types';

export const labelCSS = ({ isDisabled, tokens }: LabelCSSProps): CSSObject => ({
  alignItems: 'flex-start',
  display: 'flex',
  color: isDisabled
    ? tokens.label.textColor.disabled
    : tokens.label.textColor.rest,
  ...(isDisabled && { cursor: 'not-allowed' }),
});

export function Label({
  children,
  onMouseUp,
  onMouseDown,
  onMouseLeave,
  onMouseEnter,
  attributesFn,
  isDisabled,
  tokens,
  cssFn,
}: LabelProps) {
  return (
    <label
      {...attributesFn({})}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      css={cssFn({ isDisabled, tokens })}
    >
      {children}
    </label>
  );
}

export default {
  component: Label,
  cssFn: labelCSS,
  attributesFn: defaultAttributesFn,
};
=======
import { jsx } from '@emotion/core';
=======
import { jsx, InterpolationWithTheme } from '@emotion/core';
>>>>>>> 9f4f583f11... implement styles prop and getStyles fns
import { ThemeTokens } from '../types';

export interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  getStyles: (
    key: 'label',
    props: LabelCSSProps,
  ) => InterpolationWithTheme<any>;
  isDisabled?: boolean;
  tokens: ThemeTokens;
}

export type LabelCSSProps = Pick<LabelProps, 'isDisabled' | 'tokens'>;

export const labelCSS = ({ isDisabled, tokens }: LabelCSSProps) => ({
  alignItems: 'flex-start;',
  display: 'flex',
  color: isDisabled
    ? tokens.label.textColor.disabled
    : tokens.label.textColor.rest,
  ...(isDisabled && { cursor: 'not-allowed' }),
});

export default ({ isDisabled, tokens, getStyles, ...rest }: LabelProps) => (
  <label css={getStyles('label', { isDisabled, tokens, ...rest })} {...rest} />
);
>>>>>>> a01ca0307a... separate out checkbox.tsx file into smaller component files in an elements folder
