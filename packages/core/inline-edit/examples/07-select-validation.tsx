import * as React from 'react';
import styled from 'styled-components';
import isEqual from 'lodash.isequal';
import Select from '@atlaskit/select';
import { gridSize, fontSize } from '@atlaskit/theme';
import Group from '@atlaskit/tag-group';
import Tag from '@atlaskit/tag';

import InlineEdit from '../src';

const ReadViewContainer = styled.div`
  display: flex;
  max-width: 100%;
  overflow: hidden;
  padding: ${gridSize()}px ${gridSize() - 2}px;
  font-size: ${fontSize()}px;
  height: ${(gridSize() * 2.5) / fontSize()}em;
  line-height: ${(gridSize() * 2.5) / fontSize()};
`;

/**
 * The z-index set here allows the menu to open above the buttons and validation message.
 * This will be necessary until React Select allows alteration of the z-index of the menu.
 */
const EditViewContainer = styled.div`
  z-index: 400;
  position: relative;
`;

interface Option {
  label: string;
  value: string;
}

const selectOptions: Option[] = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Banana', value: 'Banana' },
  { label: 'Cherry', value: 'Cherry' },
  { label: 'Mango', value: 'Mango' },
  { label: 'Orange', value: 'Orange' },
  { label: 'Strawberry', value: 'Strawberry' },
  { label: 'Watermelon', value: 'Watermelon' },
];

interface State {
  editValue: Option[];
}

export default class InlineEditExample extends React.Component<void, State> {
  state = {
    editValue: [],
  };

  validateValue: Option[] = [];

  validate = (value: Option[]) => {
    console.log('validate', value);
    this.validateValue = value;
    return new Promise<{ value: Option[]; error: string } | undefined>(
      resolve => {
        setTimeout(() => {
          console.log('error?');
          if (value.length <= 2) {
            console.log('yes');
            resolve({
              value,
              error: 'Choose three or more options.',
            });
          }
          resolve(undefined);
        }, 300);
      },
    ).then(validateObject => {
      if (validateObject && isEqual(validateObject.value, this.validateValue)) {
        return validateObject.error;
      }
      return undefined;
    });
  };

  onConfirm = (value: Option[]) => {
    console.log('onConfirm', value);
    this.setState({
      editValue: value,
    });
  };

  render() {
    return (
      <div
        style={{
          padding: `${gridSize()}px ${gridSize()}px ${gridSize() * 6}px`,
        }}
      >
        <InlineEdit
          name="example"
          defaultValue={this.state.editValue}
          label="Inline edit select"
          editView={fieldProps => (
            <Select
              {...fieldProps}
              options={selectOptions}
              isMulti
              autoFocus
              openMenuOnFocus
              styles={{
                menu: (base: Record<any, any>) => ({
                  ...base,
                  zIndex: 400,
                }),
              }}
            />
          )}
          readView={() =>
            this.state.editValue.length === 0 ? (
              <ReadViewContainer>Click to choose options</ReadViewContainer>
            ) : (
              <div style={{ padding: `${gridSize() / 2}px` }}>
                <Group>
                  {this.state.editValue.map((option: Option) => (
                    <Tag text={option.label} key={option.label} />
                  ))}
                </Group>
              </div>
            )
          }
          onConfirm={this.onConfirm}
          validate={this.validate}
        />
      </div>
    );
  }
}
