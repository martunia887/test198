import * as React from 'react';
import { defineMessages, InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
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
  onFindChange: (findText?: string) => void;
  onFindNext: () => void;
  onFindPrev: () => void;
  onReplace: (replaceWith: string) => void;
  onReplaceAll: (replaceWith: string) => void;
}

export type FindReplaceComponentState = 'empty' | 'find' | 'replace';

export interface FindReplaceState {
  componentState: FindReplaceComponentState;
  replaceText: string;
}

class FindReplace extends React.Component<FindReplaceProps, FindReplaceState> {
  constructor(props: FindReplaceProps) {
    super(props);

    this.state = {
      componentState: props.findText ? 'find' : 'empty',
      replaceText: props.replaceText || '',
    };
  }

  componentWillReceiveProps(newProps: FindReplaceProps) {
    if (newProps.findText && this.state.componentState === 'empty') {
      this.setState({ componentState: 'find' });
    } else if (!newProps.findText) {
      this.setState({ componentState: 'empty', replaceText: '' });
    }

    if (newProps.replaceText) {
      this.setState({ replaceText: newProps.replaceText });
    }
  }

  clearSearch = () => {
    this.props.onFindChange();
  };

  handleReplaceClick = () => {
    this.setState({ componentState: 'replace' });
  };

  handleFindChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onFindChange(event.target.value);
  };

  handleFindKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.props.onFindNext();
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

  renderFindSection = (
    match?: { index: number; total: number },
    showReplaceBtn?: boolean,
  ) => {
    // todo: get these from i18n
    const find = 'Find in document';
    const clear = 'Clear search';
    const replace = 'Replace';
    const noResultsFound = 'No results found';

    const { findText } = this.props;

    return (
      <SectionWrapper>
        <Textfield
          name="find"
          appearance="none"
          placeholder={find}
          defaultValue={findText}
          autoFocus
          autoComplete="off"
          onChange={this.handleFindChange}
          onKeyDown={this.handleFindKeyDown}
        />
        {match && (
          <Count>
            {match.total === 0
              ? noResultsFound
              : `${match.index + 1} of ${match.total}`}
          </Count>
        )}
        {showReplaceBtn && (
          <FindReplaceButton onClick={this.handleReplaceClick}>
            {replace}
          </FindReplaceButton>
        )}
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
        <FindReplaceButton onClick={this.handleReplaceAllClick}>
          {replaceAll}
        </FindReplaceButton>
      </SectionWrapper>
    );
  };

  render() {
    const { componentState: state } = this.state;
    const { count } = this.props;

    // todo: align to right as per design

    if (state === 'empty') {
      return this.renderFindSection();
    }
    if (state === 'find') {
      return this.renderFindSection(count, true);
    }
    if (state === 'replace') {
      return (
        <Wrapper>
          {this.renderFindSection(count)}
          <Rule />
          {this.renderReplaceSection()}
        </Wrapper>
      );
    }

    return null;
  }
}

export default FindReplace;
