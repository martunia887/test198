import * as React from 'react';
import { PureComponent } from 'react';
import { MediaCard, MediaCardProps } from '../../ui/MediaCard';

export default class Media extends PureComponent<MediaCardProps, {}> {
  render() {
    return <MediaCard {...this.props} />;
  }
}
