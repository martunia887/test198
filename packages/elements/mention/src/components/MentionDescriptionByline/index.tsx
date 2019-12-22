import * as React from 'react';

import { UserType } from '../../types';

import TeamMentionDescriptionByline from './TeamMentionDescriptionByline';
import UserMentionDescriptionByline from './UserMentionDescriptionByline';
import { DescriptionBylineProps } from './types';

export default class MentionDescriptionByline extends React.PureComponent<
  DescriptionBylineProps,
  {}
> {
  render() {
    const { userType } = this.props.mention;

    switch (userType) {
      case UserType[UserType.TEAM]: {
        return <TeamMentionDescriptionByline mention={this.props.mention} />;
      }
      default: {
        return <UserMentionDescriptionByline mention={this.props.mention} />;
      }
    }
  }
}
