import * as React from 'react';
import FieldBase from '@atlaskit/field-base';
import debounce from 'lodash/debounce';
import Button from '@atlaskit/button';
import {
  SearchBox,
  SearchFieldBaseInner,
  SearchInner,
  SearchInput,
  SearchInputTypeAhead,
  Guidance,
} from './styled';

const controlKeys = ['ArrowUp', 'ArrowDown', 'Enter', 'Tab'];

const suggestionURL =
  'https://schebykin-connie-nlp.us-west-2.dev.public.atl-paas.net/api/autocomplete?autofix=1&term=';

type Props = {
  /** The elements to render as options to search from. */
  children?: React.ReactNode;
  /** Set whether the loading state should be shown. */
  isLoading?: boolean;
  /** Function to be called when the search input loses focus. */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Function to be called when a input action occurs (native `oninput` event). */
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  /** Function to be called when the user hits the escape key.  */
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  /** Placeholder text for search field. */
  placeholder?: string;
  /** Current value of search field. */
  value?: string;
};

type State = {
  /** Current value of search field. */
  value?: string;
  suggestions: string[];
};

export default class Search extends React.PureComponent<Props, State> {
  static defaultProps: Partial<Props> = {
    isLoading: false,
    onBlur: () => {},
    placeholder: 'Search',
  };

  state = {
    value: this.props.value || '',
    suggestions: [],
  };

  onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { onKeyDown } = this.props;
    if (controlKeys.indexOf(event.key) === -1) {
      return;
    }
    if (event.key == 'Tab') {
      this.onTab(event);
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
    event.stopPropagation();
  };

  onInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { onInput } = this.props;
    this.setState({
      value: event.currentTarget.value,
    });
    this.fetchSuggestion(event.currentTarget.value);
    if (onInput) {
      onInput(event);
    }
  };

  onClick = (event: React.FormEvent<HTMLInputElement>) => {
    // HACK to simulate an event coming from input
    const { onInput } = this.props;
    if (onInput) {
      onInput(event);
    }
  };

  onTab = (event: React.FormEvent<HTMLInputElement>) => {
    const originalSuggestion = this.getOriginalSuggestion();
    const inputValue = event.currentTarget.value;
    const newValue =
      originalSuggestion.length > 0
        ? `${originalSuggestion} `
        : `${inputValue} `;
    this.setState({
      value: newValue,
    });
    if (this.inputRef) {
      // We need to directly change the value so onInput will pick up the latest value
      // @ts-ignore unchecked
      this.inputRef.value = newValue;
    }
    this.onInput(event);
    event.preventDefault();
  };

  fetchSuggestion = debounce((query: string) => {
    fetch(`${suggestionURL}${query}`)
      .then(response => response.json())
      .then(suggestions => this.onSuggestionReceived(suggestions));
  }, 100);

  renderGuidance = () => {
    const guidance = this.getGuidance();
    return guidance.map((g, idx) => (
      <Button key={idx} onClick={() => this.onGuidanceClick(g)}>
        {g}
      </Button>
    ));
  };

  onSuggestionReceived = (suggestions: string[]) => {
    this.setState({
      suggestions,
    });
  };

  onGuidanceClick = (text: string) => {
    this.setState({
      value: text,
    });
    // @ts-ignore unchecked
    this.inputRef.value = text;
    // @ts-ignore unchecked
    this.inputRef.click();
    this.fetchSuggestion(text);
  };

  getOriginalSuggestion = () => {
    const { value, suggestions } = this.state;
    const newSuggestions = suggestions.filter(
      (suggestion: string) =>
        suggestion.toLowerCase().indexOf(value.toLowerCase()) === 0,
    );
    return newSuggestions.length > 0 ? newSuggestions[0] : '';
  };

  getSuggestion = () => {
    const { value } = this.state;
    if (value.length == 0) {
      return '';
    }
    const originalSuggestion = this.getOriginalSuggestion();
    return `${value}${originalSuggestion.substring(value.length)}`;
  };

  getGuidance = () => {
    const { value, suggestions } = this.state;
    const suggestion = this.getSuggestion();
    const guidance = suggestions
      .filter(s => s !== suggestion && s !== value.trim())
      .slice(0, 6);
    return guidance;
  };

  setInputRef = (ref: React.Ref<any>) => {
    this.inputRef = ref;
  };

  inputRef: React.Ref<any>;

  render() {
    const { children, onBlur, placeholder, isLoading } = this.props;
    const { value } = this.state;

    const suggestion = this.getSuggestion();

    return (
      <SearchInner>
        <SearchBox>
          <FieldBase
            appearance="none"
            isFitContainerWidthEnabled
            isPaddingDisabled
            isLoading={isLoading}
          >
            <SearchFieldBaseInner>
              <SearchInputTypeAhead
                spellCheck={false}
                type="text"
                value={`${suggestion}`}
              />
              <SearchInput
                autoFocus
                innerRef={this.setInputRef}
                onBlur={onBlur}
                onInput={this.onInput}
                onClick={this.onClick}
                placeholder={placeholder}
                spellCheck={false}
                type="text"
                value={value}
                onKeyDown={this.onInputKeyDown}
              />
            </SearchFieldBaseInner>
          </FieldBase>
        </SearchBox>
        <Guidance>{this.renderGuidance()}</Guidance>
        {children}
      </SearchInner>
    );
  }
}
