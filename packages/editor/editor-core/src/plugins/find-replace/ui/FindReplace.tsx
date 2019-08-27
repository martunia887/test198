import * as React from 'react';
import styled from 'styled-components';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import ChevronDownIcon from '@atlaskit/icon/glyph/hipchat/chevron-down';
import ChevronUpIcon from '@atlaskit/icon/glyph/hipchat/chevron-up';
import Textfield from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import { colors } from '@atlaskit/theme';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionWrapper = styled.div`
  display: flex;
  align-items: center;

  * + * {
    margin-left: 4px;
  }
`;

const Count = styled.span`
  color: ${colors.N60};
  font-size: 12px;
  flex: 0 0 auto;
`;

const Rule = styled.hr`
  width: calc(100% - 16px);
  border: none;
  background-color: ${colors.N30A};
  margin: 4px;
  height: 1px;
  border-radius: 1px;
`;

const FindReplaceButton = styled(Button)`
  flex: 0 0 auto;
`;

export interface FindReplaceProps {
  findText?: string;
  replaceText?: string;
  count: { index: number; total: number };
  shouldFocus: boolean;
  onFindBlur: () => void;
  onFindChange: (findText?: string) => void;
  onFindNext: () => void;
  onFindPrev: () => void;
  onReplace: (replaceWith: string) => void;
  onReplaceAll: (replaceWith: string) => void;
  onCancel: () => void;
}

export interface FindReplaceState {
  replaceText: string;
  findInputValue: string;
}

class FindReplace extends React.PureComponent<
  FindReplaceProps,
  FindReplaceState
> {
  private findTextfieldRef = React.createRef<HTMLInputElement>();

  constructor(props: FindReplaceProps) {
    super(props);

    this.state = {
      replaceText: props.replaceText || '',
      findInputValue: props.findText || '',
    };
  }

  componentDidMount() {
    this.focusFindTextfield();
  }

  componentWillReceiveProps(newProps: FindReplaceProps) {
    // findText could have been updated from outside this component, for example
    // if a user double clicks to highlight a word and then hits cmd+f
    if (newProps.findText && newProps.findText !== this.state.findInputValue) {
      this.updateFindTextfieldValue(newProps.findText);
    }

    if (newProps.replaceText) {
      this.setState({ replaceText: newProps.replaceText });
    }

    if (newProps.shouldFocus) {
      this.focusFindTextfield();
    }
  }

  updateFindTextfieldValue = (value: string) => {
    this.setState({ findInputValue: value });
    if (this.findTextfieldRef.current) {
      this.findTextfieldRef.current.value = value;
    }
  };

  focusFindTextfield = () => {
    if (this.findTextfieldRef.current) {
      this.findTextfieldRef.current.select();
    }
  };

  clearSearch = () => {
    this.props.onCancel();
  };

  handleReplaceClick = () => {
    this.props.onReplace(this.state.replaceText);
  };

  handleFindChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ findInputValue: event.target.value });
    this.props.onFindChange(event.target.value);
  };

  handleFindKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        this.props.onFindPrev();
      } else {
        this.props.onFindNext();
      }
    }
  };

  handleReplaceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ replaceText: event.target.value });
  };

  handleReplaceKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.props.onReplace(this.state.replaceText);
    }
  };

  handleReplaceAllClick = () => {
    this.props.onReplaceAll(this.state.replaceText);
  };

  renderFindSection = () => {
    // todo: get these from i18n
    const find = 'Find';
    const clear = 'Clear search';
    const noResultsFound = 'No results found';
    const findNext = 'Find next';
    const findPrev = 'Find previous';

    const { findText, count } = this.props;

    return (
      <SectionWrapper>
        <Textfield
          name="find"
          appearance="none"
          placeholder={find}
          defaultValue={findText}
          ref={this.findTextfieldRef}
          autoFocus
          autoComplete="off"
          onChange={this.handleFindChange}
          onKeyDown={this.handleFindKeyDown}
          onBlur={this.props.onFindBlur}
        />
        {findText && (
          <Count>
            {count.total === 0
              ? noResultsFound
              : `${count.index + 1} of ${count.total}`}
          </Count>
        )}
        <FindReplaceButton
          title={findNext}
          appearance="subtle"
          iconBefore={<ChevronDownIcon label={findNext} />}
          spacing="none"
          onClick={this.props.onFindNext}
        />
        <FindReplaceButton
          title={findPrev}
          appearance="subtle"
          iconBefore={<ChevronUpIcon label={findPrev} />}
          spacing="none"
          onClick={this.props.onFindPrev}
        />
        <FindReplaceButton
          appearance="subtle"
          iconBefore={<EditorCloseIcon label={clear} />}
          spacing="none"
          onClick={this.clearSearch}
        />
      </SectionWrapper>
    );
  };

  renderReplaceSection = () => {
    // todo: get these from i18n
    const replaceAll = 'Replace all';
    const replaceWith = 'Replace with';
    const replace = 'Replace';

    const { replaceText } = this.state;

    return (
      <SectionWrapper>
        <Textfield
          name="replace"
          appearance="none"
          placeholder={replaceWith}
          defaultValue={replaceText}
          autoComplete="off"
          onChange={this.handleReplaceChange}
          onKeyDown={this.handleReplaceKeyDown}
        />
        <FindReplaceButton onClick={this.handleReplaceClick}>
          {replace}
        </FindReplaceButton>
        <FindReplaceButton onClick={this.handleReplaceAllClick}>
          {replaceAll}
        </FindReplaceButton>
      </SectionWrapper>
    );
  };

  render() {
    // todo: align to right as per design
    return (
      <Wrapper>
        {this.renderFindSection()}
        <Rule />
        {this.renderReplaceSection()}
      </Wrapper>
    );
  }
}

export default FindReplace;
