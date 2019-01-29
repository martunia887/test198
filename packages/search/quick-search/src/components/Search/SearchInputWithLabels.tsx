import * as React from 'react';
import { CreatableSelect } from '@atlaskit/select';
import { colors } from '@atlaskit/theme';
import { SearchInput } from './styled';
import { FilterItem } from './types';

type Props = {
  placeholder?: string;
  value?: string;

  labels?: FilterItem[];

  onLabelsUpdated?: (newLabels: FilterItem[]) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const containerStyle = () => ({
  width: '100%',
});

const controlStyle = () => ({
  backgroundColor: colors.N0,
});

const OnUpdateContext = React.createContext({
  onChange: (e: React.FormEvent<HTMLInputElement>) => {},
});

const CustomInput = props => {
  return (
    <OnUpdateContext.Consumer>
      {({ onChange }) => (
        <SearchInput
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            onChange(e);
            props.onChange(e);
          }}
        />
      )}
    </OnUpdateContext.Consumer>
  );
};

export default class SearchInputWithLabels extends React.Component<Props, {}> {
  handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    // Pass
  };
  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {};

  render() {
    const {
      placeholder,
      value,
      labels,
      onKeyDown,
      onLabelsUpdated,
    } = this.props;

    const components = {
      DropdownIndicator: null,
      ClearIndicator: null,
      Input: CustomInput,
    };

    return (
      <OnUpdateContext.Provider
        value={{
          onChange: (e: React.FormEvent<HTMLInputElement>) =>
            this.props.onInput && this.props.onInput(e),
        }}
      >
        <CreatableSelect
          autoFocus
          placeholder={placeholder}
          isClearable
          isMulti
          components={components}
          styles={{
            container: containerStyle,
            control: controlStyle,
          }}
          onKeyDown={onKeyDown}
          onInputChange={this.handleInputChange}
          onChange={onLabelsUpdated}
          myProp={false}
          menuIsOpen={false}
          value={labels}
          inputValue={value}
        />
      </OnUpdateContext.Provider>
    );
  }
}
