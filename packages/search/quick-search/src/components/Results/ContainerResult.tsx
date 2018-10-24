import * as React from 'react';
import Avatar from '@atlaskit/avatar';

import ResultBase from './ResultBase';
import { CommonResultProps } from './types';

export type Props = CommonResultProps & {
  /** Name of the container. Provides the main text to be displayed as the item. */
  name: React.ReactNode;
  /** Text to appear to the right of the text. It has a lower font-weight. */
  caption?: string;
  /** Set whether to display a lock on the result's icon */
  isPrivate?: boolean;
  /** Text to be shown alongside the main `text`. */
  subText?: string;
};

/**
 * Generic result type for Atlassian containers.
 */
export default class ContainerResult extends React.PureComponent<Props> {
  getAvatar = () => {
    if (this.props.avatar) {
      return this.props.avatar;
    }

    return (
      <Avatar
        src={this.props.avatarUrl}
        appearance="square"
        size="small"
        status={this.props.isPrivate ? 'locked' : null}
      />
    );
  };

  render() {
    const { resultId, name, subText, caption } = this.props;
    return (
      <ResultBase
        type="container"
        resultId={resultId}
        text={name}
        subText={subText}
        caption={caption}
        icon={this.getAvatar()}
      />
    );
  }
}
