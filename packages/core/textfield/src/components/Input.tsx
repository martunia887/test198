/** @jsx jsx */
import { jsx, CSSObject } from '@emotion/core';
import { InputProps } from '../types';

export default ({
  appearance,
  elemAfterInput,
  elemBeforeInput,
  forwardedRef,
  isCompact,
  isDisabled,
  isFocused,
  isHovered,
  isInvalid,
  isMonospaced,
  isReadOnly,
  isRequired,
  onMouseDown,
  onMouseEnter,
  onMouseLeave,
  theme,
  ...rest
}: InputProps) => (
  <div
    css={theme.container as CSSObject}
    onMouseDown={onMouseDown}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {elemBeforeInput}
    <input
      ref={forwardedRef}
      disabled={isDisabled}
      readOnly={isReadOnly}
      required={isRequired}
      css={theme.input as CSSObject}
      {...rest}
    />
    {elemAfterInput}
  </div>
);
