import React, { PureComponent } from 'react';
import * as styled from './styled';

export interface MediaViewerSidebarState {}
export interface MediaViewerSidebarProps {}

export default class MediaViewerSidebar extends PureComponent<
  MediaViewerSidebarProps,
  MediaViewerSidebarState
> {
  render() {
    return <styled.Sidebar>{this.props.children}</styled.Sidebar>;
  }
}
