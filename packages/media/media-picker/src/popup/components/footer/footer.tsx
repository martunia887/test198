import * as React from 'react';
import { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { messages } from '@atlaskit/media-ui';
import { Wrapper, InsertButton, CancelButton } from './styled';
import { startImport, hidePopup, resetView } from '../../actions';
import { SelectedItem, State } from '../../domain';

export interface FooterStateProps {
  readonly selectedItems: SelectedItem[];
  readonly canInsert: boolean;
  readonly canCancel: boolean;
}

export interface FooterDispatchProps {
  readonly onInsert: (selectedItems: SelectedItem[]) => void;
  readonly onCancel: () => void;
}

export type FooterProps = FooterStateProps & FooterDispatchProps;
export interface FooterState {
  isInsertingFiles: boolean;
}

export class Footer extends Component<FooterProps, FooterState> {
  state: FooterState = {
    isInsertingFiles: false,
  };

  renderCancelButton(): JSX.Element {
    const { canCancel, onCancel } = this.props;
    return (
      <CancelButton
        appearance="subtle"
        onClick={onCancel}
        isDisabled={!canCancel}
      >
        <FormattedMessage {...messages.cancel} />
      </CancelButton>
    );
  }

  onInserButtonClick = () => {
    // console.log('onInserButtonClick')
    const { selectedItems, onInsert } = this.props;
    // TODO: use state.view.isLoading ?
    // this.setState({isInsertingFiles: true}, () => setTimeout(() => onInsert(selectedItems), 500));
    this.setState({ isInsertingFiles: true }, () => {
      // console.log(selectedItems.length)
      onInsert(selectedItems);
    });
    // this.setState({isInsertingFiles: true});
  };

  renderInsertButton(): JSX.Element | null {
    const { selectedItems, canInsert } = this.props;
    const { isInsertingFiles } = this.state;
    const itemCount = selectedItems.length;

    if (itemCount === 0) {
      return null;
    }

    return (
      <InsertButton
        testId="media-picker-insert-button"
        appearance="primary"
        onClick={this.onInserButtonClick}
        isDisabled={!canInsert || isInsertingFiles}
        autoFocus
      >
        <FormattedMessage
          {...messages.insert_files}
          values={{
            0: itemCount,
          }}
        />
      </InsertButton>
    );
  }

  render(): JSX.Element {
    return (
      <Wrapper>
        {this.renderInsertButton()}
        {this.renderCancelButton()}
      </Wrapper>
    );
  }
}

const mapStateToProps = ({
  isUploading,
  isCancelling,
  selectedItems,
}: State): FooterStateProps => {
  const isUploadingOrCancelling = isUploading || isCancelling;
  return {
    selectedItems,
    canInsert: !isUploadingOrCancelling,
    canCancel: !isUploadingOrCancelling,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<State>,
): FooterDispatchProps => ({
  onInsert: () => dispatch(startImport()),
  onCancel: () => {
    dispatch(resetView());
    dispatch(hidePopup());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
