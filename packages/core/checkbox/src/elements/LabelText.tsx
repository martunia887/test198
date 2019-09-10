/** @jsx jsx */
import { jsx, CSSObject } from '@emotion/core';
import { defaultAttributesFn } from '../utils';
import { ThemeTokens } from '../types';

export const labelTextCSS = ({
  tokens,
}: {
  tokens: ThemeTokens;
}): CSSObject => ({
  paddingTop: tokens.label.spacing.top,
  paddingRight: tokens.label.spacing.right,
  paddingBottom: tokens.label.spacing.bottom,
  paddingLeft: tokens.label.spacing.left,
});

export interface LabelTextProps extends React.HTMLProps<HTMLSpanElement> {
  attributesFn: (props: Record<string, any>) => Record<string, any>;
  cssFn: (props: { tokens: ThemeTokens }) => CSSObject;
  tokens: ThemeTokens;
  children: React.ReactNode;
}

export function LabelText({
  attributesFn,
  tokens,
  cssFn,
  ...rest
}: {
  attributesFn: (props: Record<string, any>) => Record<string, any>;
  cssFn: (props: { tokens: ThemeTokens }) => CSSObject;
  tokens: ThemeTokens;
  children: React.ReactNode;
}) {
  return <span {...attributesFn({})} css={cssFn({ tokens })} {...rest} />;
}

export default {
  component: LabelText,
  cssFn: labelTextCSS,
  attributesFn: defaultAttributesFn,
};
