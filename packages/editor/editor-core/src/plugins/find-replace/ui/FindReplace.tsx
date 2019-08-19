import * as React from 'react';
import { defineMessages, InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';
import EditorSearchIcon from '@atlaskit/icon/glyph/editor/search';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import Textfield from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import { colors } from '@atlaskit/theme';
import { FindReplaceState } from '../plugin';
import ToolbarButton from '../../../ui/ToolbarButton';
import Dropdown from '../../../ui/Dropdown';

const ToolbarButtonWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: flex-end;
  padding: 0 8px;
`;

const Wrapper = styled.div`
  padding: 0 4px;
  display: flex;
  flex-direction: column;
`;

type Props = {
  findReplaceState: FindReplaceState;
  onCancel: () => void;
  onFind: (keyword?: string) => void;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;
  isReducedSpacing?: boolean;
};

type State = {};

class FindReplace extends React.Component<Props, State> {
  private toggleOpen = () => {
    if (this.props.findReplaceState.active) {
      this.cancel();
    } else {
      this.find();
    }
  };

  private handleFindChange = (
    event: React.SyntheticEvent<HTMLInputElement>,
  ) => {
    this.find(event.target.value);
  };
  private handleReplaceChange = (
    event: React.SyntheticEvent<HTMLInputElement>,
  ) => {};

  private cancel = () => {
    this.props.onCancel();
  };

  private find = (keyword?: string) => {
    this.props.onFind(keyword);
  };

  render() {
    // todo: get these from i18n
    const title = 'Find & Replace';

    const {
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      isReducedSpacing,
      findReplaceState,
    } = this.props;
    const { searchWord, replaceWord, active } = findReplaceState;

    return (
      <ToolbarButtonWrapper>
        <Dropdown
          mountTo={popupsMountPoint}
          boundariesElement={popupsBoundariesElement}
          scrollableElement={popupsScrollableElement}
          isOpen={active}
          handleEscapeKeydown={this.cancel}
          fitWidth={352}
          trigger={
            <ToolbarButton
              spacing={isReducedSpacing ? 'none' : 'default'}
              selected={active}
              title={title}
              iconBefore={<EditorSearchIcon label={title} />}
              onClick={this.toggleOpen}
            />
          }
        >
          <Wrapper>
            <FindReplaceContent
              searchWord={searchWord}
              replaceWord={replaceWord}
              onFindChange={this.handleFindChange}
              onReplaceChange={this.handleReplaceChange}
            />
          </Wrapper>
        </Dropdown>
      </ToolbarButtonWrapper>
    );
  }
}

interface ContentState {
  state: 'empty' | 'find' | 'replace';
}

const DoubleContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
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

// todo: .ProseMirror hr styles - use these here?
const Rule = styled.hr`
  width: calc(100% - 16px);
  border: none;
  background-color: rgba(9, 30, 66, 0.08);
  margin: 4px;
  height: 1px;
  border-radius: 1px;
`;

const FindReplaceButton = styled(Button)`
  flex: 0 0 auto;
`;

interface ContentProps {
  searchWord?: string;
  replaceWord?: string;
  onFindChange: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  onReplaceChange: (event: React.SyntheticEvent<HTMLInputElement>) => void;
}

class FindReplaceContent extends React.Component<ContentProps, ContentState> {
  state: ContentState = {
    state: 'empty',
  };

  // todo: detect initial state properly

  componentWillReceiveProps(newProps: ContentProps) {
    if (newProps.searchWord) {
      this.setState({ state: 'find' });
    }
  }

  handleReplaceClick = () => {
    this.setState({ state: 'replace' });
  };

  handleReplaceAllClick = () => {
    // todo: something
  };

  render() {
    // todo: get these from i18n
    const find = 'Find in document';
    const replace = 'Replace';
    const replaceAll = 'Replace all';
    const replaceWith = 'Replace with';
    const clear = 'Clear search';

    const {
      searchWord,
      replaceWord,
      onFindChange,
      onReplaceChange,
    } = this.props;
    const { state } = this.state;
    // todo: count for real
    // todo: clear functionality

    if (state === 'empty') {
      return (
        <ContentWrapper>
          <Textfield
            name="find"
            appearance="none"
            placeholder={find}
            defaultValue={searchWord}
            autoFocus
            autoComplete="off"
            onChange={onFindChange}
          />
          <FindReplaceButton
            appearance="subtle"
            iconBefore={<EditorCloseIcon label={clear} />}
            spacing="none"
          />
        </ContentWrapper>
      );
    }
    if (state === 'find') {
      return (
        <ContentWrapper>
          <Textfield
            name="find"
            appearance="none"
            placeholder={find}
            defaultValue={searchWord}
            autoFocus
            autoComplete="off"
            onChange={onFindChange}
          />
          <Count>1 of 4</Count>
          <FindReplaceButton onClick={this.handleReplaceClick}>
            {replace}
          </FindReplaceButton>
          <FindReplaceButton
            appearance="subtle"
            spacing="none"
            iconBefore={<EditorCloseIcon label={clear} />}
          />
        </ContentWrapper>
      );
    }
    if (state === 'replace') {
      return (
        <DoubleContentWrapper>
          <ContentWrapper>
            <Textfield
              name="find"
              appearance="none"
              placeholder={find}
              defaultValue={searchWord}
              autoFocus
              autoComplete="off"
              onChange={onFindChange}
            />
            <Count>1 of 4</Count>
            <FindReplaceButton
              appearance="subtle"
              spacing="none"
              iconBefore={<EditorCloseIcon label={clear} />}
            />
          </ContentWrapper>
          <Rule />
          <ContentWrapper>
            <Textfield
              name="replace"
              appearance="none"
              placeholder={replaceWith}
              defaultValue={replaceWord}
              autoComplete="off"
              onChange={onReplaceChange}
            />
            <FindReplaceButton onClick={this.handleReplaceAllClick}>
              {replaceAll}
            </FindReplaceButton>
          </ContentWrapper>
        </DoubleContentWrapper>
      );
    }

    return null;
  }
}

export default FindReplace;
