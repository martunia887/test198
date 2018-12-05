import * as React from 'react';
import { Component, createRef } from 'react';
import Button from '@atlaskit/button';
import { akColorN30, akColorN900 } from '@atlaskit/util-shared-styles';
import CameraFilledIcon from '@atlaskit/icon/glyph/camera-filled';
import { getCanvas } from '../image-placer/util';
import { VideoWrapper, CountdownWrapper } from './styled';

export const hasWebCamCapabilities = () =>
  !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

export enum CameraMode {
  Idle,
  Three,
  Two,
  One,
  Capture,
}

export interface CaptureWebCamProps {
  onCapture: (dataURL: string) => void;
}

export interface CaptureWebCamState {
  stream?: MediaStream;
  hasError: boolean;
  mode: CameraMode;
}

export const defaultProps = {};

export class CaptureWebCam extends Component<
  CaptureWebCamProps,
  CaptureWebCamState
> {
  videoElement = createRef<HTMLVideoElement>();

  static defaultProps = defaultProps;

  state: CaptureWebCamState = {
    mode: CameraMode.Idle,
    hasError: false,
  };

  async componentDidMount() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = this.videoElement.current;
      if (videoElement) {
        videoElement.srcObject = stream;
        this.setState({ stream });
      }
    } catch (e) {}
  }

  setCountdown(number: CameraMode) {
    this.setState({ mode: number });
    setTimeout(() => {
      if (number === CameraMode.Three) {
        this.setCountdown(CameraMode.Two);
      } else if (number === CameraMode.Two) {
        this.setCountdown(CameraMode.One);
      } else if (number === CameraMode.One) {
        this.capture();
      }
    }, 1000);
  }

  capture() {
    this.setState({ mode: CameraMode.Capture });
    const videoElement = this.videoElement.current;
    if (videoElement) {
      const { canvas, context } = getCanvas(
        videoElement.videoWidth,
        videoElement.videoHeight,
      );
      if (context) {
        context.drawImage(videoElement, 0, 0);
        const dataURL = canvas.toDataURL('image/pmg');
        /* slight delay to allow capture icon to be visible before view changes */
        setTimeout(() => this.props.onCapture(dataURL), 250);
      }
    }
  }

  onTakePhotoClick = () => {
    this.setCountdown(CameraMode.Three);
  };

  renderMode() {
    const { mode } = this.state;
    switch (mode) {
      case CameraMode.Idle:
        return <Button onClick={this.onTakePhotoClick}>{'Take photo'}</Button>;
      default:
        return this.renderCountdown();
    }
  }

  getColor(mode: CameraMode) {
    return mode === this.state.mode ? akColorN900 : akColorN30;
  }

  renderCountdown() {
    return (
      <CountdownWrapper>
        <span style={{ color: this.getColor(CameraMode.Three) }}>3</span>
        <span style={{ color: this.getColor(CameraMode.Two) }}>2</span>
        <span style={{ color: this.getColor(CameraMode.One) }}>1</span>
        <CameraFilledIcon
          primaryColor={this.getColor(CameraMode.Capture)}
          size="medium"
          label=""
        />
      </CountdownWrapper>
    );
  }

  render() {
    const { stream, hasError } = this.state;
    return (
      <VideoWrapper>
        <video autoPlay={true} ref={this.videoElement} />
        {!stream && (
          <div className="message">Requesting camera permissions...</div>
        ) /* i18n */}
        {hasError && (
          <div className="message">
            There was an error accessing your camera
          </div>
        ) /* i18n */}
        {!hasError && !!stream && this.renderMode()}
      </VideoWrapper>
    );
  }
}
