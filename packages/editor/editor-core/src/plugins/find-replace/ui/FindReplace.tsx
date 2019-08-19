import * as React from 'react';
import { defineMessages, InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';
import EditorSearchIcon from '@atlaskit/icon/glyph/editor/search';
import Textfield from '@atlaskit/textfield';
import { FindReplaceState } from '../plugin';
import ToolbarButton from '../../../ui/ToolbarButton';
import Dropdown from '../../../ui/Dropdown';
import { EditorView } from 'prosemirror-view';
import { cancelSearch, find } from '../commands';

const ToolbarButtonWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: flex-end;
  padding: 0 8px;
`;

const Wrapper = styled.div`
  padding: 12px 16px;
  display: flex;
  flex-direction: column;

  label ~ label {
    margin-top: 8px;
  }
`;

type Props = {
  findReplaceState: FindReplaceState;
  editorView: EditorView;
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

  private handleFindChange = ({ target }: { target: HTMLInputElement }) => {
    this.find(target.value);
  };

  private cancel = () => {
    const { state, dispatch } = this.props.editorView;
    cancelSearch()(state, dispatch);
  };

  private find = (keyword?: string) => {
    const { state, dispatch } = this.props.editorView;
    find(keyword)(state, dispatch);
  };

  render() {
    // todo: get these from i18n
    const title = 'Find & Replace';
    const find = 'Find';
    const replace = 'Replace';

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
          fitWidth={242}
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
            <label htmlFor="find">Find</label>
            <Textfield
              name="find"
              placeholder={find}
              defaultValue={searchWord}
              autoFocus
              autoComplete="off"
              onChange={this.handleFindChange}
            />
            <label htmlFor="replace">Replace</label>
            <Textfield
              name="replace"
              placeholder={replace}
              defaultValue={replaceWord}
              autoComplete="off"
            />
          </Wrapper>
        </Dropdown>
      </ToolbarButtonWrapper>
    );
  }
}

export default FindReplace;
