import * as React from 'react';
import { Component } from 'react';
import { BackButton } from './backButton';
import {
  StackedViewWrapper,
  StackedViewHeader,
  StackedViewTitle,
} from './styled';

export interface StackedViewProps {
  title: string;
  onBack: () => void;
}

export class StackedView extends Component<StackedViewProps, {}> {
  render() {
    const { title, onBack, children } = this.props;
    return (
      <StackedViewWrapper>
        <StackedViewHeader>
          <BackButton onClick={onBack} />
          <StackedViewTitle>{title /* i18n */}</StackedViewTitle>
        </StackedViewHeader>
        {children}
      </StackedViewWrapper>
    );
  }
}
