/**  @jsx jsx */
import { forwardRef } from 'react';
import { jsx } from '@emotion/core';

export interface HiddenCheckboxProps extends React.HTMLProps<HTMLInputElement> {
  disabled?: boolean;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler;
  onFocus?: React.FocusEventHandler;
  onKeyUp?: React.KeyboardEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  type: 'checkbox';
  value?: number | string;
  name?: string;
  required?: boolean;
  attributesFn: (
    props: { disabled?: boolean; checked?: boolean; required?: boolean },
  ) => Record<string, any>;
}
export default forwardRef((
  // @ts-ignore - createAnalyticsEvent is injected from WithAnalyticsEvents HOC
  { createAnalyticsEvent, attributesFn, ...props }: HiddenCheckboxProps,
  ref: React.Ref<HTMLInputElement>,
) => (
  <input
    ref={ref}
    css={{
      left: '50%',
      margin: 0,
      opacity: 0,
      padding: 0,
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      top: '50%',
    }}
    {...props}
    {...attributesFn({
      disabled: props.disabled,
      checked: props.checked,
      required: props.required,
    })}
  />
));
