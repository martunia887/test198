// @flow

import React, { Component } from 'react';
import Lozenge from '@atlaskit/lozenge';
import styled from 'styled-components';
import {
  type StatusCategory,
  UNDEFINED,
  TODO,
  IN_PROGRESS,
  DONE,
} from '../model';

const statusCategoryToAppearenceMap = {
  [UNDEFINED]: 'default',
  [TODO]: 'default',
  [DONE]: 'success',
  [IN_PROGRESS]: 'inprogress',
};

type Props = {
  isActive: boolean,
  category: StatusCategory,
  name: string,
};

export class StatusLozenge extends Component<Props> {
  static defaultProps = {
    isActive: false,
  };

  render() {
    return (
      <Lozenge
        isBold={this.props.isActive}
        appearance={statusCategoryToAppearenceMap[this.props.category]}
      >
        {this.props.name}
      </Lozenge>
    );
  }
}

export const ItemContainer = styled.div`
  display: inline;
`;
