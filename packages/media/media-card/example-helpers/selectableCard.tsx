import * as React from 'react';
import { Component } from 'react';
import { Card, Identifier, OnSelectChangeFunc } from '../src';

export interface SelectableCardProps {
  identifier: Identifier;
  onSelectChange: OnSelectChangeFunc;
}

export class SelectableCard extends Component<
  SelectableCardProps,
  { selected: boolean }
> {
  constructor(props: SelectableCardProps) {
    super(props);
    this.state = { selected: false };
  }

  render() {
    const { identifier, onSelectChange } = this.props;
    const { selected } = this.state;

    return (
      <Card
        identifier={identifier}
        appearance="image"
        selectable={true}
        selected={selected}
        onClick={this.onClick}
        onSelectChange={onSelectChange}
        actions={[{ label: 'add', handler: () => {} }]}
      />
    );
  }

  private onClick = (): void => {
    this.setState(prevState => {
      return {
        selected: !prevState.selected,
      };
    });
  };
}
