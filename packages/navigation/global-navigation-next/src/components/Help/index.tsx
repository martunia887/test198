import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
import React from 'react';
import getStyles from '../GlobalNavigation/styles';
import Item from '../Item';
import { HelpProps } from './types';

// TODO theming
const styles = getStyles();

export const Help = (props: HelpProps) => (
  <Item
    appearance="secondary"
    text={
      <QuestionCircleIcon
        label={props.tooltip || 'Help'}
        secondaryColor={styles.outer.fill}
      />
    }
    {...props}
  />
);
