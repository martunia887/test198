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
  searchWord?: string;
  replaceWord?: string;
  onFindChange: (searchWord?: string) => void;
  onReplace: (replaceWith: string) => void;
  onReplaceAll: (replaceWith: string) => void;
}

export type FindReplaceComponentState = 'empty' | 'find' | 'replace';

export interface FindReplaceState {
  componentState: FindReplaceComponentState;
  replaceWord: string;
}

class FindReplace extends React.Component<FindReplaceProps, FindReplaceState> {
  constructor(props: FindReplaceProps) {
    super(props);

    this.state = {
      componentState: props.searchWord ? 'find' : 'empty',
      replaceWord: props.replaceWord || '',
    };
  }

  componentWillReceiveProps(newProps: FindReplaceProps) {
    if (newProps.searchWord && this.state.componentState === 'empty') {
      this.setState({ componentState: 'find' });
    } else if (!newProps.searchWord) {
      this.setState({ componentState: 'empty', replaceWord: '' });
    }

    if (newProps.replaceWord) {
      this.setState({ replaceWord: newProps.replaceWord });
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
      this.props.onFindChange(this.props.searchWord);
    }
  };

  handleReplaceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ replaceWord: event.target.value });
  };

  handleReplaceKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.props.onReplace(this.state.replaceWord);
    }
  };

  handleReplaceAllClick = () => {
    this.props.onReplaceAll(this.state.replaceWord);
  };

  renderFindSection = (
    match?: { idx: number; total: number },
    showReplaceBtn?: boolean,
  ) => {
    // todo: get these from i18n
    const find = 'Find in document';
    const clear = 'Clear search';
    const replace = 'Replace';

    const { searchWord } = this.props;

    return (
      <SectionWrapper>
        <Textfield
          name="find"
          appearance="none"
          placeholder={find}
          value={searchWord}
          autoFocus
          autoComplete="off"
          onChange={this.handleFindChange}
          onKeyDown={this.handleFindKeyDown}
        />
        {match && (
          <Count>
            {match.idx} of {match.total}
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

    const { replaceWord } = this.state;

    return (
      <SectionWrapper>
        <Textfield
          name="replace"
          appearance="none"
          placeholder={replaceWith}
          value={replaceWord}
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

    // todo: count for real
    // todo: align to right as per design

    if (state === 'empty') {
      return this.renderFindSection();
    }
    if (state === 'find') {
      return this.renderFindSection({ idx: 1, total: 4 }, true);
    }
    if (state === 'replace') {
      return (
        <Wrapper>
          {this.renderFindSection({ idx: 1, total: 4 })}
          <Rule />
          {this.renderReplaceSection()}
        </Wrapper>
      );
    }

    return null;
  }
}

export default FindReplace;
