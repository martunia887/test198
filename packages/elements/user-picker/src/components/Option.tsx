import React, { FC } from 'react';
import { components } from '@atlaskit/select';

import { Option as OptionType } from '../types';

import { EmailOption } from './EmailOption';
import { GroupOption } from './GroupOption';
import { TeamOption } from './TeamOption';
import { UserOption } from './UserOption';
import { isValidEmail } from './emailValidation';
import { isEmail, isTeam, isUser, isGroup } from './utils';

export type OptionProps = {
  data: OptionType;
  isSelected: boolean;
  status?: string;
  selectProps: {
    emailLabel?: string;
  };
};

const dataOption = ({
  data: { data },
  isSelected,
  status,
  selectProps,
}: OptionProps) => {
  if (isUser(data)) {
    return <UserOption user={data} status={status} isSelected={isSelected} />;
  }

  if (isEmail(data)) {
    return (
      <EmailOption
        email={data}
        emailValidity={isValidEmail(data.id)}
        isSelected={isSelected}
        label={selectProps.emailLabel}
      />
    );
  }

  if (isTeam(data)) {
    return <TeamOption team={data} isSelected={isSelected} />;
  }

  if (isGroup(data)) {
    return <GroupOption group={data} isSelected={isSelected} />;
  }

  return null;
};

export const Option: FC<OptionProps> = props => (
  <components.Option {...(props as any)}>{dataOption(props)}</components.Option>
);
