import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
import React from 'react';
import getStyles from '../GlobalNavigation/styles';
import { IconButton } from '../IconButton';
import { HelpProps } from './types';
import { TriggerManager } from '../TriggerManager';

const styles = getStyles();

export const Help = (props: HelpProps) => {
  const { tooltip, ...triggerManagerProps } = props;

  return (
    <TriggerManager {...triggerManagerProps}>
      {({ onTriggerClick }) => (
        <IconButton
          icon={
            <QuestionCircleIcon
              label={tooltip}
              secondaryColor={styles.outer.fill}
            />
          }
          onClick={onTriggerClick}
          tooltip={tooltip}
        />
      )}
    </TriggerManager>
  );
};
