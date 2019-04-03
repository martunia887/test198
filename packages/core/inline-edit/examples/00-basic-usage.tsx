import * as React from 'react';
import styled from 'styled-components';
import TextField from '@atlaskit/textfield';
import { gridSize, fontSize } from '@atlaskit/theme';

import InlineEdit from '../src';

const ReadViewContainer = styled.div`
  display: flex;
  max-width: 100%;
  overflow: hidden;
  padding: 8px 6px;
  font-size: ${fontSize()}px;
  height: ${(gridSize() * 2.5) / fontSize()}em;
  line-height: ${(gridSize() * 2.5) / fontSize()};
`;

interface State {
  editValue: string;
}

export default class InlineEditExample extends React.Component<void, State> {
  state = {
    editValue: 'Field value',
  };

  render() {
    return (
      <div style={{ padding: '0 16px 60px' }}>
        <InlineEdit
          editValue={this.state.editValue}
          label="Inline edit"
          editView={editViewProps => <TextField {...editViewProps} />}
          readView={() => (
            <ReadViewContainer>
              {this.state.editValue || 'Click to enter value'}
            </ReadViewContainer>
          )}
          onConfirm={value => this.setState({ editValue: value })}
        />
      </div>
    );
  }
}
