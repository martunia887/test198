import * as React from 'react';
import { Component, DragEvent } from 'react';
import Button from '@atlaskit/button';
import { hasWebCamCapabilities } from './captureWebcam';
import { UploadButton } from './uploadButton';
import { CloseButton } from './closeButton';
import { Slider } from './slider';
import { ImagePlacer, ImageActions } from '../image-placer';
import { errorIcon, dragDropIcon } from './icons';
import {
  ACCEPTED_FILE_TYPES,
  ERROR_MESSAGES,
  MAX_SIZE_MB,
  CONTAINER_SIZE,
  MARGIN_SIZE,
} from './common';
import {
  ImageViewWrapper,
  DragZone,
  ImageIcon,
  DragZoneText,
  ErrorZone,
  ErrorZoneText,
  ImageButtonsWrapper,
} from './styled';

export { ImageActions };

export interface ImageViewProps {
  src?: string | File;
  isCircular: boolean;
  onImageActions: (actions: ImageActions) => void;
  onImageLoad: () => void;
  onImageCleared: () => void;
  onTakePhotoClick: () => void;
}

export interface ImageViewState {
  src?: string | File;
  errorMessage?: string;
  isDragging: boolean;
  zoom: number;
}

export class ImageView extends Component<ImageViewProps, ImageViewState> {
  onTriggerUploadClick?: () => void;

  state: ImageViewState = {
    src: this.props.src,
    isDragging: false,
    zoom: 0,
  };

  validateFile(imageFile: File): string | null {
    /* i18n */
    if (ACCEPTED_FILE_TYPES.indexOf(imageFile.type) === -1) {
      return ERROR_MESSAGES.BAD_FORMAT;
    } else if (imageFile.size / 1024 / 1024 > MAX_SIZE_MB) {
      return ERROR_MESSAGES.SIZE_TOO_LARGE;
    }
    return null;
  }

  onDragEvent = (e: DragEvent) => {
    const { type } = e;
    if (type === 'dragenter' || type === 'dragover') {
      this.setState({ isDragging: true });
    } else {
      this.setState({ isDragging: false });
    }
    e.stopPropagation();
    e.preventDefault();
  };

  onDrop = (e: DragEvent) => {
    const dt = e.dataTransfer;
    const file = dt.files[0];

    this.onDragEvent(e);

    this.onFileSelected(file);
  };

  onFileSelected = (file: File | undefined) => {
    if (file) {
      const validationError = this.validateFile(file);
      if (validationError) {
        this.setState({
          errorMessage: validationError,
        });
      } else {
        this.setState({ src: file, errorMessage: undefined });
      }
    }
  };

  onImageLoad = () => {
    this.setState({ zoom: 0 });
    this.props.onImageLoad();
  };

  onImageError = (errorMessage: string) => {
    this.setState({ errorMessage });
  };

  onCloseButtonClick = () => {
    this.setState({ src: undefined });
    this.props.onImageCleared();
  };

  onSliderChange = (value: number) => {
    this.setState({ zoom: value / 100 });
  };

  onImagePlacerZoomChange = (value: number) => {
    this.setState({ zoom: value });
  };

  onUploadButtonTriggerClick = (onClick: () => void) => {
    this.onTriggerUploadClick = onClick;
  };

  onTryAgain = () => {
    const { onTriggerUploadClick } = this;
    if (onTriggerUploadClick) {
      onTriggerUploadClick();
    }
  };

  renderErrorMessage() {
    const { errorMessage } = this.state;
    return (
      <ErrorZone>
        <ImageIcon src={errorIcon} alt={errorMessage /* i18n */} />
        <ErrorZoneText>{errorMessage}</ErrorZoneText>
        <Button appearance="link" onClick={this.onTryAgain}>
          Try again
        </Button>
      </ErrorZone>
    );
  }

  renderImagePlacer() {
    const { isCircular, onImageActions } = this.props;
    const { src, zoom, isDragging } = this.state;
    return (
      <div style={{ pointerEvents: isDragging ? 'none' : 'all' }}>
        <ImagePlacer
          src={src}
          zoom={zoom}
          isCircular={isCircular}
          containerWidth={CONTAINER_SIZE}
          containerHeight={CONTAINER_SIZE}
          margin={MARGIN_SIZE}
          onImageActions={onImageActions}
          onImageLoad={this.onImageLoad}
          onImageError={this.onImageError}
          onZoomChange={this.onImagePlacerZoomChange}
        />
        <Slider value={Math.round(zoom * 100)} onChange={this.onSliderChange} />
        <CloseButton onClick={this.onCloseButtonClick} />
      </div>
    );
  }

  renderDropZone() {
    const { isCircular } = this.props;
    const { isDragging } = this.state;
    const dragText = 'Drag and drop your photo here'; /* i18n */

    return (
      <DragZone
        showBorder={true}
        borderRadius={isCircular ? 100 : 10}
        isDragging={isDragging}
        onDragEnter={this.onDragEvent}
        onDragLeave={this.onDragEvent}
        onDragOver={this.onDragEvent}
        onDrop={this.onDrop}
      >
        <ImageIcon src={dragDropIcon} alt={'Upload Image' /* i18n */} />
        <DragZoneText>{dragText}</DragZoneText>
      </DragZone>
    );
  }

  render() {
    const { src, errorMessage, isDragging } = this.state;
    const shouldShowButtons = !src || errorMessage !== undefined;
    const hasNoError = errorMessage === undefined;

    let content = null;

    if (isDragging) {
      content = this.renderDropZone();
    } else {
      if (errorMessage) {
        content = this.renderErrorMessage();
      } else if (src) {
        content = this.renderImagePlacer();
      } else {
        content = this.renderDropZone();
      }
    }

    return (
      <ImageViewWrapper
        onDragEnter={this.onDragEvent}
        onDragLeave={this.onDragEvent}
        onDragOver={this.onDragEvent}
        onDrop={this.onDrop}
      >
        {content}
        {shouldShowButtons ? (
          <ImageButtonsWrapper>
            {hasNoError ? <div>{'or' /* i18n */}</div> : null}
            <div>
              <UploadButton
                onTriggerClick={this.onUploadButtonTriggerClick}
                onFileSelected={this.onFileSelected}
              />
              {hasWebCamCapabilities ? (
                <Button onClick={this.props.onTakePhotoClick}>
                  {'Take a photo' /* i18n */}
                </Button>
              ) : null}
            </div>
          </ImageButtonsWrapper>
        ) : null}
      </ImageViewWrapper>
    );
  }
}
