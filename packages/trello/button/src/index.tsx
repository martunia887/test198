import AkButton from '@atlaskit/button';
import { ButtonProps, ThemeProps } from '@atlaskit/button/dist/es5/types';
import nachosTheme from './theme';
import * as React from 'react';
export { ButtonGroup } from '@atlaskit/button';

export interface NachosButtonProps
  extends ButtonProps,
    React.ClassAttributes<{}> {
  children: React.ReactNode;
}

export default (buttonProps: NachosButtonProps) => {
  let theme = nachosTheme;
  if (buttonProps.theme) {
    theme = (adgTheme, themeProps) =>
      buttonProps.theme!(
        (x: ThemeProps) => nachosTheme(adgTheme, x),
        themeProps,
      );
  }

  // WTF is going on with the types here?!?!
  // It won't compile if I exclude any of these, but the ref is especially
  // problematic as it throws a runtime error
  return (
    <AkButton
      appearance={buttonProps.appearance}
      autoFocus={buttonProps.autoFocus}
      className={buttonProps.className}
      component={buttonProps.component}
      form={buttonProps.form}
      href={buttonProps.href}
      iconAfter={buttonProps.iconAfter}
      iconBefore={buttonProps.iconBefore}
      innerRef={buttonProps.innerRef}
      id={buttonProps.id}
      isDisabled={buttonProps.isDisabled}
      isLoading={buttonProps.isLoading}
      isSelected={buttonProps.isSelected}
      onBlur={buttonProps.onBlur}
      onClick={buttonProps.onClick}
      onMouseDown={buttonProps.onMouseDown}
      onMouseEnter={buttonProps.onMouseEnter}
      onMouseLeave={buttonProps.onMouseLeave}
      onMouseUp={buttonProps.onMouseUp}
      onFocus={buttonProps.onFocus}
      spacing={buttonProps.spacing}
      tabIndex={buttonProps.tabIndex}
      target={buttonProps.target}
      type={buttonProps.type}
      shouldFitContainer={buttonProps.shouldFitContainer}
      theme={theme}
      ariaControls={buttonProps.ariaControls}
      ariaExpanded={buttonProps.ariaExpanded}
      ariaLabel={buttonProps.ariaLabel}
      ariaHaspopup={buttonProps.ariaHaspopup}
      children={buttonProps.children}
      ref=""
      key=""
    />
  );
};
