/** @jsx jsx */
import Button from '@atlaskit/button';
import Tooltip from '@atlaskit/tooltip';
import { jsx } from '@emotion/core';
import { chevronStyles, primaryButtonTheme } from './styles';
import { PrimaryButtonProps } from './types';
import { TriggerManager } from '../TriggerManager';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';

export const PrimaryButton = (props: PrimaryButtonProps) => {
  const {
    component,
    dropdownContent,
    href,
    target,
    testId,
    text,
    tooltip,
    ...triggerManagerProps
  } = props;

  return (
    <Tooltip content={tooltip}>
      <TriggerManager
        position="bottom left"
        dropdownContent={dropdownContent}
        {...triggerManagerProps}
      >
        {({ onTriggerClick }) => (
          <Button
            appearance="primary"
            component={component}
            data-test-id={testId}
            href={href}
            iconAfter={
              dropdownContent ? (
                <span className="chevron" css={chevronStyles}>
                  <ChevronDownIcon label="" />
                </span>
              ) : (
                undefined
              )
            }
            onClick={onTriggerClick}
            target={target}
            theme={primaryButtonTheme}
          >
            {text}
          </Button>
        )}
      </TriggerManager>
    </Tooltip>
  );
};

PrimaryButton.defaultProps = {
  isSelected: false,
  testId: 'NavigationItem',
};
