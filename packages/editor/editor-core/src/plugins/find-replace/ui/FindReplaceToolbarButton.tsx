import * as React from 'react';
import { defineMessages, InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';
import EditorSearchIcon from '@atlaskit/icon/glyph/editor/search';
import { FindReplaceState } from '../plugin';
import ToolbarButton from '../../../ui/ToolbarButton';
import Dropdown from '../../../ui/Dropdown';
import FindReplace from './FindReplace';

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

export interface FindReplaceToolbarButtonProps {
  findReplaceState: FindReplaceState;
  onCancel: () => void;
  onFind: (keyword?: string) => void;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;
  isReducedSpacing?: boolean;
}

class FindReplaceToolbarButton extends React.PureComponent<
  FindReplaceToolbarButtonProps
> {
  toggleOpen = () => {
    if (this.props.findReplaceState.active) {
      this.cancel();
    } else {
      this.find();
    }
  };

  cancel = () => {
    this.props.onCancel();
  };

  find = (keyword?: string) => {
    this.props.onFind(keyword);
  };

  handleReplace = (replaceWith?: string) => {};

  handleReplaceAll = (replaceWith?: string) => {};

  render() {
    // todo: get these from i18n
    const title = 'Find and replace';

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
            <FindReplace
              searchWord={searchWord}
              replaceWord={replaceWord}
              onFindChange={this.find}
              onReplace={this.handleReplace}
              onReplaceAll={this.handleReplaceAll}
            />
          </Wrapper>
        </Dropdown>
      </ToolbarButtonWrapper>
    );
  }
}
export default FindReplaceToolbarButton;
