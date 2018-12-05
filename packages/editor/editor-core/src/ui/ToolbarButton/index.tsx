import Tooltip from '@atlaskit/tooltip';
import * as React from 'react';
import { ReactElement, ReactNode } from 'react';
import { AkButton } from './styles';

export interface Props {
  className?: string;
  disabled?: boolean;
  hideTooltip?: boolean;
  href?: string;
  iconAfter?: ReactElement<any>;
  iconBefore?: ReactElement<any>;
  onClick?: (event: Event) => void;
  selected?: boolean;
  spacing?: 'default' | 'compact' | 'none';
  target?: string;
  theme?: 'dark';
  title?: string;
  titlePosition?: string;
  ariaLabel?: string;
}

function handleClick(event: Event, props: Props) {
  const { disabled, onClick } = props;

  if (!disabled && onClick) {
    onClick(event);
  }
}

export default function ToolbarButton(props: Props & { children?: ReactNode }) {
  const button = (
    <AkButton
      appearance="subtle"
      ariaHaspopup={true}
      className={props.className || ''}
      href={props.href}
      ariaLabel={props.ariaLabel}
      iconAfter={props.iconAfter}
      iconBefore={props.iconBefore}
      isDisabled={props.disabled}
      isSelected={props.selected}
      onClick={(evt: Event) => handleClick(evt, props)}
      spacing={props.spacing || 'default'}
      target={props.target}
      theme={props.theme}
      shouldFitContainer={true}
    >
      {props.children}
    </AkButton>
  );

  const position = props.titlePosition || 'top';
  const tooltipContent = !props.hideTooltip ? props.title : null;

  return props.title ? (
    <Tooltip
      content={tooltipContent}
      hideTooltipOnClick={true}
      position={position}
    >
      {button}
    </Tooltip>
  ) : (
    button
  );
}
