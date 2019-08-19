import * as React from 'react';
import { defineMessages, InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';
import EditorSearchIcon from '@atlaskit/icon/glyph/editor/search';
import Textfield from '@atlaskit/textfield';
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
  padding: 12px 16px;
  display: flex;
  flex-direction: column;

  label ~ label {
    margin-top: 8px;
  }
`;

type Props = {
  findReplaceState: FindReplaceState;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;
  isReducedSpacing?: boolean;
};

type State = {
  isOpen: boolean;
};

class FindReplace extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: props.findReplaceState.active,
    };
  }

  private toggleOpen = () => {
    this.handleOpenChange({ isOpen: !this.state.isOpen });
  };

  private handleOpenChange = ({ isOpen }: { isOpen: boolean }) => {
    this.setState({ isOpen });
  };

  private hide = () => {
    if (this.state.isOpen === true) {
      this.setState({ isOpen: false });
    }
  };

  private cancel = () => {
    // todo: this
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
    const { searchWord, replaceWord } = findReplaceState;
    const { isOpen } = this.state;

    // todo: set open according to state
    // todo: update state when close/cancel

    return (
      <ToolbarButtonWrapper>
        <Dropdown
          mountTo={popupsMountPoint}
          boundariesElement={popupsBoundariesElement}
          scrollableElement={popupsScrollableElement}
          isOpen={this.state.isOpen}
          handleEscapeKeydown={this.cancel}
          fitWidth={242}
          fitHeight={80}
          trigger={
            <ToolbarButton
              spacing={isReducedSpacing ? 'none' : 'default'}
              selected={isOpen}
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
            />
            <label htmlFor="replace">Replace</label>
            <Textfield
              name="replace"
              placeholder={replace}
              defaultValue={replaceWord}
            />
          </Wrapper>
        </Dropdown>
      </ToolbarButtonWrapper>
    );
  }
}

export default FindReplace;
