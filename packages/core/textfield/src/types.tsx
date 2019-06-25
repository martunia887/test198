import { ThemeProp } from '@atlaskit/theme';
import { ReactNode, SyntheticEvent, MouseEvent } from 'react';
import { ThemeProps, ThemeTokens } from './theme';

export interface InputProps {
  /** Controls the appearance of the field.
   * `subtle` shows styling on hover.
   * `none` hides all field styling.
   */
  appearance?: 'standard' | 'none' | 'subtle';
  /** Element after input in textfield. */
  elemAfterInput?: ReactNode;
  /** Element before input in textfield. */
  elemBeforeInput?: ReactNode;
  /** Handler called when the input loses focus. */
  onBlur?: (e: SyntheticEvent<HTMLInputElement>) => void;
  /** Handler called when the input receives focus. */
  onFocus?: (e: SyntheticEvent<HTMLInputElement>) => void;
  /** Handler called when mouse is pressed down. */
  onMouseDown: (e: MouseEvent<HTMLElement>) => void;
  /** Handler called when mouse enters input. */
  onMouseEnter: () => void;
  /** Handler called when mouse leaves input. */
  onMouseLeave: () => void;
  /** Set whether the fields should expand to fill available horizontal space. */
  isCompact?: boolean;
  /** Sets the field as uneditable, with a changed hover state. */
  isDisabled?: boolean;
  /** Sets styling to indicate that the input is focused. */
  isFocused?: boolean;
  /** Sets styling to indicate that the input is hovered. */
  isHovered?: boolean;
  /** Sets styling to indicate that the input is invalid */
  isInvalid?: boolean;
  /** Sets content text value to monospace */
  isMonospaced?: boolean;
  /** If true, prevents the value of the input from being edited. */
  isReadOnly?: boolean;
  /** Add asterisk to label. Set required for form that the field is part of. */
  isRequired?: boolean;
  /** Forwarded ref */
  forwardedRef?: (ref: HTMLInputElement) => void;
  theme: ThemeTokens;
}

export interface TextFieldProps {
  /** Controls the appearance of the field.
   * `subtle` shows styling on hover.
   * `none` hides all field styling.
   */
  appearance: 'standard' | 'none' | 'subtle';
  /** This prop is injected by analytics-next and has no use within textfield */
  createAnalyticsEvent: (e: SyntheticEvent<HTMLElement>) => void;
  /** Sets a default value as input value */
  defaultValue?: string;
  /** Element after input in textfield. */
  elemAfterInput?: ReactNode;
  /** Element before input in textfield. */
  elemBeforeInput?: ReactNode;
  /** Applies compact styling, making the field smaller */
  isCompact: boolean;
  /** Sets the field as uneditable, with a changed hover state. */
  isDisabled: boolean;
  /** Sets styling to indicate that the input is focused. */
  isFocused: boolean;
  /** Sets styling to indicate that the input is invalid */
  isInvalid: boolean;
  /** Sets content text value to monospace */
  isMonospaced: boolean;
  /** If true, prevents the value of the input from being edited. */
  isReadOnly?: boolean;
  /** Set required for form that the field is part of. */
  isRequired?: boolean;
  /** Handler to be called when the input loses focus. */
  onBlur?: (e: SyntheticEvent<HTMLInputElement>) => void;
  /** Handler to be called when the input receives focus. */
  onFocus?: (e: SyntheticEvent<HTMLInputElement>) => void;
  /** Handler called when mouse is pressed down. */
  onMouseDown: (e: MouseEvent<HTMLElement>) => void;
  /** Sets maximum width of input */
  width?: string | number;
  /** The value of the input. */
  value?: string | number;
  /** This is an internal prop. Use "ref" prop to get a reference to input element. */
  forwardedRef: (ref?: HTMLInputElement) => void;
  /** The theme the component should use. */
  theme?: ThemeProp<ThemeTokens, ThemeProps>;
}
