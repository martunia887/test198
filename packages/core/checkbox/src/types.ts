import React from 'react';
import { WithAnalyticsEventsProps } from '@atlaskit/analytics-next';
import { CSSObject } from '@emotion/core';

export type ChildrenType = React.ReactChild;
export type ComponentType = React.Component<{}, {}>;
export type ElementType = React.ReactChild;

export type DefaultsType = {
  Label: {
    component: React.ComponentType<LabelProps>;
    cssFn: (state: LabelCSSProps) => CSSObject;
    attributesFn: (props: Record<string, any>) => Record<string, any>;
  };
  LabelText: {
    component: React.ComponentType<LabelTextProps>;
    cssFn: (state: { tokens: ThemeTokens }) => CSSObject;
    attributesFn: (props: { [key: string]: any }) => any;
  };
  IconWrapper: {
    component: React.ComponentType<IconWrapperProps>;
    cssFn: (props: IconWrapperProps) => CSSObject;
    attributesFn: (props: Record<string, any>) => Record<string, any>;
  };
  Icon: {
    component: React.ComponentType<any>;
  };
  IconIndeterminate: {
    component: React.ComponentType<any>;
  };
};

export type OverridesType = {
  Label?: {
    component?: React.ComponentType<LabelProps>;
    cssFn?: (defaultStyles: CSSObject, state: LabelCSSProps) => CSSObject;
    attributesFn?: (props: Record<string, any>) => Record<string, any>;
  };
  LabelText?: {
    component?: React.ComponentType<LabelTextProps>;
    cssFn?: (
      defaultStyles: CSSObject,
      state: { tokens: ThemeTokens },
    ) => CSSObject;
    attributesFn?: (props: Record<string, any>) => Record<string, any>;
  };
  IconWrapper?: {
    component?: React.ComponentType<IconWrapperProps>;
    cssFn?: (defaultStyles: CSSObject, props: IconWrapperProps) => CSSObject;
    attributesFn?: (props: Record<string, any>) => Record<string, any>;
  };
  Icon?: {
    component?: React.ComponentType<any>;
  };
  IconIndeterminate?: {
    component?: React.ComponentType<any>;
  };
};

export type CheckboxDefaults = Pick<DefaultsType, 'Label' | 'LabelText'>;
export type CheckboxOverrides = Pick<OverridesType, 'Label' | 'LabelText'>;

export type CheckboxIconDefaults = Pick<
  DefaultsType,
  'Icon' | 'IconWrapper' | 'IconIndeterminate'
>;
export type CheckboxIconOverrides = Pick<
  OverridesType,
  'Icon' | 'IconWrapper' | 'IconIndeterminate'
>;

export interface CheckboxIconProps {
  /** Sets the checkbox icon active state. */
  isActive?: boolean;
  /** Sets whether the checkbox is checked or unchecked. */
  isChecked?: boolean;
  /** Sets whether the checkbox is disabled. */
  isDisabled?: boolean;
  /** Sets the checkbox focus */
  isFocused?: boolean;
  /**
   * Sets whether the checkbox is indeterminate. This only affects the
   * style and does not modify the isChecked property.
   */
  isIndeterminate?: boolean;
  /** Sets the checkbox as invalid */
  isInvalid?: boolean;
  /** Sets the checkbox icon hovered state */
  isHovered?: boolean;
  /** Primary color */
  primaryColor?: any;
  /** Secondary color */
  secondaryColor?: any;
  /** The label for icon to be displayed */
  label: any;
  overrides?: CheckboxIconOverrides;
  theme?: (
    current: (props: ThemeProps) => ThemeTokens,
    props: ThemeProps,
  ) => ThemeTokens;
}

export interface CheckboxProps extends WithAnalyticsEventsProps {
  overrides?: OverridesType;
  /** Sets whether the checkbox begins checked. */
  defaultChecked?: boolean;
  /** id assigned to input */
  id?: string;
  /** Callback to receive a reference.  */
  inputRef?: (input: HTMLInputElement | null | undefined) => any;
  /** Sets whether the checkbox is checked or unchecked. */
  isChecked?: boolean;
  /** Sets whether the checkbox is disabled. */
  isDisabled?: boolean;
  /** Sets whether the checkbox should take up the full width of the parent. */
  isFullWidth?: boolean;
  /**
   * Sets whether the checkbox is indeterminate. This only affects the
   * style and does not modify the isChecked property.
   */
  isIndeterminate?: boolean;
  /** Marks the field as invalid. Changes style of unchecked component. */
  isInvalid?: boolean;
  /** Marks the field as required & changes the label style. */
  isRequired?: boolean;
  /**
   * The label to be displayed to the right of the checkbox. The label is part
   * of the clickable element to select the checkbox.
   */
  label?: React.ReactChild;
  /** The name of the submitted field in a checkbox. */
  name?: string;
  /**
   * Function that is called whenever the state of the checkbox changes. It will
   * be called with an object containing the react synthetic event. Use currentTarget to get value, name and checked
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any;
  theme?: (
    current: (props: ThemeProps) => ThemeTokens,
    props: ThemeProps,
  ) => ThemeTokens;
  /** The value to be used in the checkbox input. This is the value that will be returned on form submission. */
  value?: number | string;
}

interface ModeValue {
  light: string;
  dark: string;
}

type TokenValue = ModeValue | string;

export interface ComponentTokens {
  label?: {
    textColor?: {
      rest: TokenValue;
      disabled: TokenValue;
    };
    spacing?: {
      bottom?: TokenValue;
      right?: TokenValue;
      left?: TokenValue;
      top?: TokenValue;
    };
  };
  icon?: {
    borderWidth?: string;
    borderColor?: {
      rest?: TokenValue;
      disabled?: TokenValue;
      checked?: TokenValue;
      active?: TokenValue;
      invalid?: TokenValue;
      focused?: TokenValue;
      hovered?: TokenValue;
    };
    boxColor?: {
      rest?: TokenValue;
      disabled?: TokenValue;
      active?: TokenValue;
      hoveredAndChecked?: TokenValue;
      hovered?: TokenValue;
      checked?: TokenValue;
    };
    tickColor?: {
      rest?: TokenValue;
      disabledAndChecked?: TokenValue;
      activeAndChecked?: TokenValue;
      checked?: TokenValue;
    };
    size?: 'small' | 'medium' | 'large' | 'xlarge';
  };
  requiredIndicator?: {
    textColor?: {
      rest?: TokenValue;
    };
  };
}

export interface ThemeIconTokens {
  borderWidth: string;
  borderColor: {
    rest: string;
    disabled: string;
    checked: string;
    active: string;
    invalid: string;
    focused: string;
    hovered: string;
  };
  boxColor: {
    rest: string;
    disabled: string;
    active: string;
    hoveredAndChecked: string;
    hovered: string;
    checked: string;
  };
  tickColor: {
    rest: string;
    disabledAndChecked: string;
    activeAndChecked: string;
    checked: string;
  };
  size: 'small' | 'medium' | 'large' | 'xlarge';
}

export interface ThemeLabelTokens {
  textColor: {
    rest: string;
    disabled: string;
  };
  spacing: {
    bottom: string;
    right: string;
    left: string;
    top: string;
  };
}

export interface ThemeTokens {
  label: ThemeLabelTokens;
  icon: ThemeIconTokens;
  requiredIndicator: {
    textColor: {
      rest: string;
    };
  };
}

export interface ThemeProps {
  tokens: ComponentTokens;
  mode: string;
}

export interface ThemeLabelTokens {
  textColor: {
    rest: string;
    disabled: string;
  };
  spacing: {
    bottom: string;
    right: string;
    left: string;
    top: string;
  };
}

export interface ThemeTokens {
  label: ThemeLabelTokens;
  icon: ThemeIconTokens;
}

export interface ThemeProps {
  tokens: ComponentTokens;
  mode: string;
}

export interface LabelTextProps extends React.HTMLProps<HTMLSpanElement> {
  attributesFn: (props: Record<string, any>) => Record<string, any>;
  cssFn: (props: { tokens: ThemeTokens }) => CSSObject;
  tokens: ThemeTokens;
  children: React.ReactNode;
}

export interface LabelTextCSSProps {
  tokens: ThemeTokens;
}

export interface LabelProps extends React.HTMLProps<HTMLInputElement> {
  onMouseUp: React.MouseEventHandler;
  onMouseDown: React.MouseEventHandler;
  onMouseEnter: React.MouseEventHandler;
  onMouseLeave: React.MouseEventHandler;
  attributesFn: (props: Record<string, any>) => Record<string, any>;
  cssFn: (props: LabelCSSProps) => CSSObject;
  isDisabled?: boolean;
  tokens: ThemeTokens;
}

export interface IconWrapperProps extends React.HTMLProps<HTMLLabelElement> {
  attributesFn: (props: Record<string, any>) => any;
  cssFn: (
    props: Pick<IconWrapperProps, Exclude<keyof IconWrapperCSSProps, 'cssFn'>>,
  ) => CSSObject;
  tokens: ThemeTokens;
  isChecked?: boolean;
  isDisabled?: boolean;
  isActive?: boolean;
  isHovered?: boolean;
  isFocused?: boolean;
  isInvalid?: boolean;
}

export type IconWrapperCSSProps = Omit<
  IconWrapperProps,
  'attributesFn' | 'cssFn'
>;

export type LabelCSSProps = Pick<LabelProps, 'isDisabled' | 'tokens'>;

export interface RequiredIndicatorProps
  extends React.HTMLProps<HTMLSpanElement> {
  tokens: ThemeTokens;
}
