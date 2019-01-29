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

const creatableSelectStyles = {
  container: () => ({
    width: '100%',
  }),
  valueContainer: provided => ({
    ...provided,
    padding: '0px',
  }),
  control: () => ({
    backgroundColor: colors.N0,
  }),
};

interface OnUpdateContextInterface {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const OnUpdateContext = React.createContext<OnUpdateContextInterface>({
  onChange: () => {},
});

const ContextAwareInput = props => {
  return (
    <OnUpdateContext.Consumer>
      {({ onChange, placeholder }) => (
        <SearchInput
          autoFocus
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            onChange(e);
            props.onChange(e);
          }}
          placeholder={placeholder}
        />
      )}
    </OnUpdateContext.Consumer>
  );
};

export default class SearchInputWithLabels extends React.Component<Props, {}> {
  render() {
    const { placeholder, value, labels, onLabelsUpdated } = this.props;

    const components = {
      DropdownIndicator: null,
      ClearIndicator: null,
      Placeholder: () => <div />,
      Input: ContextAwareInput,
    };

    return (
      <OnUpdateContext.Provider
        value={{
          onChange: (e: React.FormEvent<HTMLInputElement>) =>
            this.props.onInput && this.props.onInput(e),
          placeholder,
        }}
      >
        <CreatableSelect
          isClearable
          isMulti
          components={components}
          styles={creatableSelectStyles}
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
