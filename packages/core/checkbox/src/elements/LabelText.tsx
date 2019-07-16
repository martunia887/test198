/** @jsx jsx */
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
import { ThemeTokens } from '../types';

export default ({
  tokens,
  ...rest
}: {
  tokens: ThemeTokens;
  children: React.ReactNode;
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
