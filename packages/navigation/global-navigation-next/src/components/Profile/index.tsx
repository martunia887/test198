/** @jsx jsx */
import SignInIcon from '@atlaskit/icon/glyph/sign-in';
import { jsx } from '@emotion/core';

import { IconButton } from '../IconButton';
import { TriggerManager } from '../TriggerManager';
import { profileButtonTheme } from './styles';
import { ProfileProps } from './types';

export const Profile = (props: ProfileProps) => {
  const { avatar, tooltip, ...triggerManagerProps } = props;
  // If the user is not signed in, there's nothing to show them.
  if (!props.dropdownContent && !props.drawerContent) {
    return (
      <IconButton
        icon={<SignInIcon label={props.tooltip} />}
        tooltip={tooltip}
      />
    );
  }

  return (
    <TriggerManager {...triggerManagerProps}>
      {({ onTriggerClick }) => (
        <IconButton
          icon={avatar}
          onClick={onTriggerClick}
          theme={profileButtonTheme}
          tooltip={tooltip}
        />
      )}
    </TriggerManager>
  );
};
