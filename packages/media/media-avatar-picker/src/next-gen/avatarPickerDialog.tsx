import * as React from 'react';
import { Component } from 'react';
import ModalDialog, { ModalFooter } from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import { ModalTransition } from '@atlaskit/modal-dialog';
import Spinner from '@atlaskit/spinner';
import { AVATAR_DIALOG_WIDTH, AVATAR_DIALOG_HEIGHT } from './common';
import { ImageView, ImageActions } from './imageView';
import { AvatarProps, Avatar } from './avatar';
import { AvatarViewSmall } from './avatarViewSmall';
import { AvatarViewLarge } from './avatarViewLarge';
import { CaptureWebCam } from './captureWebcam';
import { StackedView } from './stackedView';
import { AvatarPickerWrapper, ModalHeader, ModalFooterButtons } from './styled';

export interface AvatarPickerDialogProps extends AvatarProps {
  isCircular: boolean;
  isOpen: boolean;
  isLoading: boolean;
  title: string;
  primaryButtonText: string;
  onImageSelected: (actions: ImageActions) => void;
  onAvatarSelected: (avatar: Avatar) => void;
  onCancel: () => void;
}

export const defaultProps = {
  isCircular: true,
  isOpen: true,
  isLoading: false,
  title: 'Upload a profile photo' /* i18n */,
  primaryButtonText: 'Save' /* i18n */,
};

export interface AvatarPickerDialogState {
  src?: string;
  viewMode: ViewMode;
  selectedAvatar?: Avatar;
  hasImage: boolean;
  isOpen: boolean;
}

export enum ViewMode {
  Image,
  PredefinedAvatars,
  WebCam,
}

export class AvatarPickerDialog extends Component<
  AvatarPickerDialogProps,
  AvatarPickerDialogState
> {
  static defaultProps = defaultProps;

  imageActions?: ImageActions;

  state: AvatarPickerDialogState = {
    viewMode: ViewMode.Image,
    selectedAvatar: this.selectDefaultAvatar(),
    hasImage: false,
    isOpen: this.props.isOpen,
  };

  UNSAFE_componentWillReceiveProps(nextProps: AvatarPickerDialogProps) {
    const { isOpen } = nextProps;
    if (isOpen !== undefined) {
      this.setState({ isOpen });
    }
  }

  selectDefaultAvatar(): Avatar | undefined {
    const { avatars, selectedAvatar } = this.props;
    if (selectedAvatar === undefined) {
      /* pick a random one */
      return avatars.length ? avatars[0] : undefined;
    } else {
      /* use given selected one */
      return selectedAvatar;
    }
  }

  header = () => {
    const { title } = this.props;
    return <ModalHeader>{title /* i18n */}</ModalHeader>;
  };

  footer = () => {
    const { primaryButtonText, isLoading } = this.props;
    return (
      <ModalFooter>
        <ModalFooterButtons>
          <Button appearance="subtle" onClick={this.onCancel}>
            {'Cancel' /* i18n */}
          </Button>
          <Button
            appearance="primary"
            onClick={this.onSave}
            isDisabled={isLoading}
          >
            {primaryButtonText /* i18n */}
          </Button>
        </ModalFooterButtons>
      </ModalFooter>
    );
  };

  onSave = () => {
    const { hasImage, selectedAvatar } = this.state;
    const { onImageSelected, onAvatarSelected } = this.props;

    if (hasImage) {
      onImageSelected(this.imageActions as ImageActions);
    } else {
      onAvatarSelected(selectedAvatar as Avatar);
    }
  };

  onAvatarSelected = (avatar: Avatar) => {
    this.setState({ selectedAvatar: avatar });
  };

  onCancel = () => {
    this.setState({ isOpen: false });
    this.props.onCancel();
  };

  onShowMoreAvatars = () => {
    this.setState({ viewMode: ViewMode.PredefinedAvatars });
  };

  onImageActions = (actions: ImageActions) => {
    this.imageActions = actions;
  };

  onImageLoad = () => {
    this.setState({ hasImage: true });
  };

  onImageCleared = () => {
    this.setState({ hasImage: false });
  };

  onStackedViewBack = () => {
    this.setState({ viewMode: ViewMode.Image });
  };

  onTakePhotoClick = () => {
    this.setState({ viewMode: ViewMode.WebCam });
  };

  onWebCamCapture = (dataURL: string) => {
    this.setState({
      viewMode: ViewMode.Image,
      src: dataURL,
    });
  };

  renderImageView() {
    const { isCircular, avatars } = this.props;
    const { selectedAvatar, hasImage, src } = this.state;

    return (
      <>
        <ImageView
          src={src}
          isCircular={isCircular}
          onImageActions={this.onImageActions}
          onImageLoad={this.onImageLoad}
          onImageCleared={this.onImageCleared}
          onTakePhotoClick={this.onTakePhotoClick}
        />
        <AvatarViewSmall
          avatars={avatars}
          selectedAvatar={hasImage ? undefined : selectedAvatar}
          isDisabled={hasImage}
          onAvatarSelected={this.onAvatarSelected}
          onShowMore={this.onShowMoreAvatars}
        />
      </>
    );
  }

  renderAvatarViewLarge() {
    const { avatars } = this.props;
    const { selectedAvatar } = this.state;

    return (
      <StackedView title="Default avatars" onBack={this.onStackedViewBack}>
        <AvatarViewLarge
          avatars={avatars}
          selectedAvatar={selectedAvatar}
          onAvatarSelected={this.onAvatarSelected}
        />
      </StackedView>
    );
  }

  renderWebCam() {
    return (
      <StackedView title="Camera" onBack={this.onStackedViewBack}>
        <CaptureWebCam onCapture={this.onWebCamCapture} />
      </StackedView>
    );
  }

  renderView() {
    const { viewMode } = this.state;
    const { isLoading } = this.props;
    if (isLoading) {
      return (
        <div className="spinner">
          <Spinner size="large" />
        </div>
      );
    }
    switch (viewMode) {
      case ViewMode.PredefinedAvatars:
        return this.renderAvatarViewLarge();
      case ViewMode.WebCam:
        return this.renderWebCam();
      default:
        return this.renderImageView();
    }
  }

  render() {
    const { isOpen } = this.state;

    return (
      <ModalTransition>
        {isOpen && (
          <ModalDialog
            width={`${AVATAR_DIALOG_WIDTH}px`}
            height={`${AVATAR_DIALOG_HEIGHT}px`}
            header={this.header}
            footer={this.footer}
            onClose={this.onCancel}
            isOpen={true}
          >
            <AvatarPickerWrapper>{this.renderView()}</AvatarPickerWrapper>
          </ModalDialog>
        )}
      </ModalTransition>
    );
  }
}
