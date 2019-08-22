import * as React from 'react';
import styled from 'styled-components';
import EditorSearchIcon from '@atlaskit/icon/glyph/editor/search';
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
  findText: string;
  index: number;
  isActive: boolean;
  isReducedSpacing?: boolean;
  numMatches: number;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;
  replaceText: string;
  shouldFocus: boolean;
  onCancel: () => void;
  onFind: (keyword?: string) => void;
  onFindBlur: () => void;
  onFindNext: () => void;
  onFindPrev: () => void;
  onReplace: (replaceWith: string) => void;
  onReplaceAll: (replaceWith: string) => void;
}

class FindReplaceToolbarButton extends React.PureComponent<
  FindReplaceToolbarButtonProps
> {
  toggleOpen = () => {
    if (this.props.isActive) {
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

  render() {
    // todo: get these from i18n
    const title = 'Find and replace';

    const {
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      isReducedSpacing,
      findText,
      replaceText,
      isActive,
      index,
      numMatches,
      shouldFocus,
    } = this.props;

    return (
      <ToolbarButtonWrapper>
        <Dropdown
          mountTo={popupsMountPoint}
          boundariesElement={popupsBoundariesElement}
          scrollableElement={popupsScrollableElement}
          isOpen={isActive}
          handleEscapeKeydown={this.cancel}
          fitWidth={352}
          trigger={
            <ToolbarButton
              spacing={isReducedSpacing ? 'none' : 'default'}
              selected={isActive}
              title={title}
              iconBefore={<EditorSearchIcon label={title} />}
              onClick={this.toggleOpen}
            />
          }
        >
          <Wrapper>
            <FindReplace
              findText={findText}
              replaceText={replaceText}
              count={{ index, total: numMatches }}
              shouldFocus={shouldFocus}
              onFindBlur={this.props.onFindBlur}
              onFindChange={this.find}
              onFindNext={this.props.onFindNext}
              onFindPrev={this.props.onFindPrev}
              onReplace={this.props.onReplace}
              onReplaceAll={this.props.onReplaceAll}
              onCancel={this.props.onCancel}
            />
          </Wrapper>
        </Dropdown>
      </ToolbarButtonWrapper>
    );
  }
}
export default FindReplaceToolbarButton;
