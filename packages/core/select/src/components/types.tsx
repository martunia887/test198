import React from 'react';

export type fn = (...args: any) => any;
export interface InnerProps {
  'aria-selected': boolean;
  id: string;
  innerRef: React.RefObject<any>;
  key: string;
  onClick: fn;
  onMouseOver: fn;
  onMouseDown: fn;
  onMouseUp: fn;
  onMouseLeave: fn;
  role: 'option';
  tabIndex: number;
}

export type ValueType = OptionType | OptionsType | null | void;

export type OptionsType = Array<OptionType>;

export interface OptionType {
  [key: string]: any;
}

export type ClassNamesState = { [key: string]: boolean } | void;

export type ActionTypes =
  | 'select-option'
  | 'deselect-option'
  | 'remove-value'
  | 'pop-value'
  | 'set-value'
  | 'clear'
  | 'create-option';

export interface CommonProps {
  clearValue: () => void;
  cx: (
    opt: string | Array<string> | null,
    classNameState: ClassNamesState,
    ...args: any
  ) => string | void;
  /**
    Get the styles of a particular part of the select. Pass in the name of the
    property as the first argument, and the current props as the second argument.
    See the `styles` object for the properties available.
  */
  getStyles: (field: string, props: any) => {};
  getValue: () => ValueType;
  hasValue: boolean;
  isMulti: boolean;
  options: OptionsType;
  selectOption: (option: OptionType) => void;
  selectProps: any;
  setValue: (value: ValueType, action: ActionTypes) => void;
}
