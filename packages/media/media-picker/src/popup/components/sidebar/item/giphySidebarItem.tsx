import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';

import { changeService } from '../../../actions/changeService';
import { searchGiphy } from '../../../actions/searchGiphy';
import { GiphyIcon } from '../icons';

import { StatelessSidebarItem } from './sidebarItem';

export interface SidebarItemOwnProps {
  readonly isActive: boolean;
}

export interface SidebarItemDispatchProps {
  readonly onChangeService: () => void;
}

export type SidebarItemProps = SidebarItemOwnProps & SidebarItemDispatchProps;

export class StatelessGiphySidebarItem extends Component<SidebarItemProps> {
  render() {
    const { isActive, onChangeService } = this.props;

    return (
      <StatelessSidebarItem
        serviceName="giphy"
        serviceFullName="GIPHY"
        isActive={isActive}
        onChangeService={onChangeService}
      >
        <GiphyIcon active={isActive} />
      </StatelessSidebarItem>
    );
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<any>,
): SidebarItemDispatchProps => ({
  onChangeService() {
    dispatch(changeService('giphy'));
    dispatch(searchGiphy('', false));
  },
});

export default connect<
  undefined,
  SidebarItemDispatchProps,
  SidebarItemOwnProps
>(
  null,
  mapDispatchToProps,
)(StatelessGiphySidebarItem);
