/** @jsx jsx */
<<<<<<< HEAD
<<<<<<< HEAD
import { jsx, CSSObject } from '@emotion/core';
import { defaultAttributesFn } from '../utils';
import { LabelTextProps, LabelTextCSSProps } from '../types';

export const labelTextCSS = ({ tokens }: LabelTextCSSProps): CSSObject => ({
  paddingTop: tokens.label.spacing.top,
  paddingRight: tokens.label.spacing.right,
  paddingBottom: tokens.label.spacing.bottom,
  paddingLeft: tokens.label.spacing.left,
});

export function LabelText({
  attributesFn,
  tokens,
  cssFn,
  ...rest
}: LabelTextProps) {
  return <span {...attributesFn({})} css={cssFn({ tokens })} {...rest} />;
}

export default {
  component: LabelText,
  cssFn: labelTextCSS,
  attributesFn: defaultAttributesFn,
};
=======
import { jsx } from '@emotion/core';
=======
import { jsx, InterpolationWithTheme } from '@emotion/core';
>>>>>>> 9f4f583f11... implement styles prop and getStyles fns
import { ThemeTokens } from '../types';

export const labelTextCSS = ({
  tokens,
}: {
  tokens: ThemeTokens;
}): InterpolationWithTheme<any> => ({
  paddingTop: tokens.label.spacing.top,
  paddingRight: tokens.label.spacing.right,
  paddingBottom: tokens.label.spacing.bottom,
  paddingLeft: tokens.label.spacing.left,
});

export default ({
  tokens,
  getStyles,
  ...rest
}: {
  getStyles: (
    key: 'labelText',
    props: { tokens: ThemeTokens },
  ) => InterpolationWithTheme<any>;
  tokens: ThemeTokens;
  children: React.ReactNode;
<<<<<<< HEAD
}) => (
  <span
    css={{
      paddingTop: tokens.label.spacing.top,
      paddingRight: tokens.label.spacing.right,
      paddingBottom: tokens.label.spacing.bottom,
      paddingLeft: tokens.label.spacing.left,
    }}
    {...rest}
  />
);
>>>>>>> a01ca0307a... separate out checkbox.tsx file into smaller component files in an elements folder
=======
}) => <span css={getStyles('labelText', { tokens })} {...rest} />;
>>>>>>> 9f4f583f11... implement styles prop and getStyles fns
