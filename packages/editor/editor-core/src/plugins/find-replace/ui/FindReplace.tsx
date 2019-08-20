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
  onReplace: (replaceWith?: string) => void;
  onReplaceAll: (replaceWith?: string) => void;
}

export interface FindReplaceState {
  componentState: 'empty' | 'find' | 'replace';
}

class FindReplace extends React.Component<FindReplaceProps, FindReplaceState> {
  state: FindReplaceState = {
    componentState: 'empty',
  };

  constructor(props: FindReplaceProps) {
    super(props);
    if (props.searchWord) {
      this.state = {
        componentState: 'find',
      };
    }
  }

  componentWillReceiveProps(newProps: FindReplaceProps) {
    if (newProps.searchWord && this.state.componentState === 'empty') {
      this.setState({ componentState: 'find' });
    } else if (!newProps.searchWord) {
      this.setState({ componentState: 'empty' });
    }
  }

  clearSearch = () => {
    this.props.onFindChange();
  };

  handleFindChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onFindChange(event.target.value);
  };

  handleReplaceClick = () => {
    this.setState({ componentState: 'replace' });
    this.props.onReplace();
  };

  handleReplaceAllClick = () => {
    this.props.onReplaceAll();
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

    const { replaceWord } = this.props;

    return (
      <SectionWrapper>
        <Textfield
          name="replace"
          appearance="none"
          placeholder={replaceWith}
          defaultValue={replaceWord}
          autoComplete="off"
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
