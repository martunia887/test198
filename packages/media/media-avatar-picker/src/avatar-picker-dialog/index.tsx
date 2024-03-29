import * as React from 'react';
import { PureComponent } from 'react';
import ModalDialog, { ModalFooter } from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import { FormattedMessage, intlShape, IntlProvider } from 'react-intl';
import { fileToDataURI, dataURItoFile, messages } from '@atlaskit/media-ui';
import { Avatar } from '../avatar-list';
import ImageNavigator, { CropProperties } from '../image-navigator';
import { PredefinedAvatarList } from '../predefined-avatar-list';
import {
  AvatarPickerViewWrapper,
  ModalHeader,
  CroppingWrapper,
  ModalFooterButtons,
} from './styled';
import { PredefinedAvatarView } from '../predefined-avatar-view';
import { CONTAINER_SIZE } from '../image-navigator/index';
import { LoadParameters } from '../image-cropper';

import { DEFAULT_VISIBLE_PREDEFINED_AVATARS } from './layout-const';
import { AVATAR_DIALOG_WIDTH, AVATAR_DIALOG_HEIGHT } from './layout-const';
import {
  AvatarPickerDialogProps,
  AvatarPickerDialogState,
  Mode,
} from './types';

export const MAX_SIZE_MB = 10;

export const ERROR = {
  URL: messages.image_url_invalid_error,
  FORMAT: messages.image_format_invalid_error,
  SIZE: messages.image_size_too_large_error,
};

export const ACCEPT = ['image/gif', 'image/jpeg', 'image/png'];

export class AvatarPickerDialog extends PureComponent<
  AvatarPickerDialogProps,
  AvatarPickerDialogState
> {
  static defaultProps = {
    avatars: [],
  };

  state: AvatarPickerDialogState = {
    mode: Mode.Cropping,
    crop: {
      x: 0,
      y: 0,
      size: CONTAINER_SIZE,
    },
    selectedAvatar: this.props.defaultSelectedAvatar,
    selectedImageSource: this.props.errorMessage
      ? undefined
      : this.props.imageSource,
    selectedImage: undefined,
    errorMessage: this.props.errorMessage,
  };

  setSelectedImageState = async (selectedImage: File, crop: CropProperties) => {
    // this is the main method to update the image state,
    // it is bubbled from the ImageCropper component through ImageNavigator when the image is loaded
    try {
      this.setState({ selectedImage, crop });
      const dataURI = await fileToDataURI(selectedImage);
      this.setState({ selectedImageSource: dataURI });
    } catch (e) {}
  };

  setSelectedAvatarState = (avatar: Avatar) => {
    this.setState({
      selectedAvatar: avatar,
    });
  };

  /**
   * Updates the image position state. These numbers are always positive.
   *
   * @param x the number of pixels from the left edge of the image
   * @param y the number of pixels from the top edge of the image
   */
  setPositionState = (x: number, y: number) => {
    const { size } = this.state.crop;
    this.setState({ crop: { x, y, size } });
  };

  setSizeState = (size: number) => {
    const { x, y } = this.state.crop;
    this.setState({ crop: { x, y, size } });
  };

  onImageNavigatorLoad = (loadParams: LoadParameters) => {
    this.exportCroppedImage = loadParams.export;
  };

  /**
   * Initialised with no-op function.  Is assigned cropped image exporting
   * function when internal ImageCropper mounts via this.onImageNavigatorLoad
   */
  exportCroppedImage = () => '';

  onSaveClick = () => {
    const { onImagePicked, onImagePickedDataURI, onAvatarPicked } = this.props;
    const { selectedImage, crop, selectedAvatar } = this.state;

    if (selectedImage) {
      const exportedCroppedImageURI = this.exportCroppedImage();
      if (onImagePicked) {
        onImagePicked(dataURItoFile(exportedCroppedImageURI), {
          x: 0,
          y: 0,
          size: crop.size,
        });
      }
      if (onImagePickedDataURI) {
        onImagePickedDataURI(exportedCroppedImageURI);
      }
    } else if (selectedAvatar) {
      onAvatarPicked(selectedAvatar);
    }
  };

  onShowMore = () => {
    this.setState({ mode: Mode.PredefinedAvatars });
  };

  onGoBack = () => {
    this.clearErrorState();
  };

  onRemoveImage = () => {
    this.setState({
      selectedImageSource: undefined,
      selectedImage: undefined,
      mode: Mode.Cropping,
    });
  };

  clearErrorState = () => {
    this.setState({
      mode: Mode.Cropping,
      errorMessage: undefined,
    });
  };

  setErrorState = (errorMessage: string) => {
    this.setState({
      mode: Mode.Cropping,
      errorMessage,
    });
  };

  onImageUploaded = () => {
    this.clearErrorState();
  };

  onImageError = (errorMessage: string) => {
    this.setErrorState(errorMessage);
  };

  static contextTypes = {
    intl: intlShape,
  };

  render() {
    const content = (
      <ModalDialog
        height={`${AVATAR_DIALOG_HEIGHT}px`}
        width={`${AVATAR_DIALOG_WIDTH}px`}
        components={{
          Header: this.headerContent,
          Footer: this.footerContent,
        }}
        onClose={this.props.onCancel}
        isOpen={true}
      >
        <AvatarPickerViewWrapper>{this.renderBody()}</AvatarPickerViewWrapper>
      </ModalDialog>
    );

    return this.context.intl ? (
      content
    ) : (
      <IntlProvider locale="en">{content}</IntlProvider>
    );
  }

  headerContent = () => {
    const { title } = this.props;
    return (
      <ModalHeader>
        {title || <FormattedMessage {...messages.upload_an_avatar} />}
      </ModalHeader>
    );
  };

  footerContent = () => {
    const { primaryButtonText, onCancel } = this.props;
    const { onSaveClick, isDisabled } = this;
    return (
      <ModalFooter>
        <ModalFooterButtons>
          <Button
            appearance="primary"
            onClick={onSaveClick}
            isDisabled={isDisabled}
          >
            {primaryButtonText || <FormattedMessage {...messages.save} />}
          </Button>
          <Button appearance="default" onClick={onCancel}>
            <FormattedMessage {...messages.cancel} />
          </Button>
        </ModalFooterButtons>
      </ModalFooter>
    );
  };

  get isDisabled() {
    const { selectedImage, selectedAvatar } = this.state;
    const { imageSource, isLoading } = this.props;

    return isLoading || !(imageSource || selectedImage || selectedAvatar);
  }

  getPredefinedAvatars(): Avatar[] {
    const { avatars } = this.props;
    const { selectedAvatar } = this.state;
    const avatarsSubset = avatars.slice(0, DEFAULT_VISIBLE_PREDEFINED_AVATARS);
    if (
      selectedAvatar &&
      avatars.indexOf(selectedAvatar) >= DEFAULT_VISIBLE_PREDEFINED_AVATARS
    ) {
      avatarsSubset[avatarsSubset.length - 1] = selectedAvatar;
    }
    return avatarsSubset;
  }

  renderPredefinedAvatarList() {
    const { isLoading } = this.props;
    const { selectedAvatar, selectedImage, selectedImageSource } = this.state;
    const avatars = this.getPredefinedAvatars();

    if (
      isLoading ||
      selectedImage ||
      selectedImageSource ||
      avatars.length === 0
    ) {
      return null;
    }

    return (
      <PredefinedAvatarList
        selectedAvatar={selectedAvatar}
        avatars={avatars}
        onAvatarSelected={this.setSelectedAvatarState}
        onShowMore={this.onShowMore}
      />
    );
  }

  renderBody() {
    const { avatars, isLoading, predefinedAvatarsText } = this.props;
    const {
      mode,
      selectedImageSource,
      selectedAvatar,
      errorMessage,
    } = this.state;

    switch (mode) {
      case Mode.Cropping:
        return (
          <CroppingWrapper>
            <ImageNavigator
              imageSource={selectedImageSource}
              errorMessage={errorMessage}
              onImageLoaded={this.setSelectedImageState}
              onLoad={this.onImageNavigatorLoad}
              onPositionChanged={this.setPositionState}
              onSizeChanged={this.setSizeState}
              onRemoveImage={this.onRemoveImage}
              onImageUploaded={this.onImageUploaded}
              onImageError={this.onImageError}
              isLoading={isLoading}
            />
            {this.renderPredefinedAvatarList()}
          </CroppingWrapper>
        );
      case Mode.PredefinedAvatars:
        return (
          <div>
            <PredefinedAvatarView
              avatars={avatars}
              onAvatarSelected={this.setSelectedAvatarState}
              onGoBack={this.onGoBack}
              selectedAvatar={selectedAvatar}
              predefinedAvatarsText={predefinedAvatarsText}
            />
          </div>
        );
    }
  }
}
