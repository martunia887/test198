import * as React from 'react';
import { Component, createRef } from 'react';
import Button from '@atlaskit/button';
import { akColorN30, akColorN900 } from '@atlaskit/util-shared-styles';
import CameraFilledIcon from '@atlaskit/icon/glyph/camera-filled';
import { getCanvas } from '../image-placer/util';
import { VideoWrapper, CountdownWrapper } from './styled';

export const GET_MEDIA_REQUEST_TIMEOUT_MS = 5000; // how many MS to wait after requesting camera
const FLASH_MS = 250; // how many MS to flash/pause before capturing on final countdown

export const hasWebCamCapabilities = () =>
  !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

export const CameraMode: { [key: string]: number } = {
  Idle: -1,
  Three: 3,
  Two: 2,
  One: 1,
  Capture: 0,
};

export interface CaptureWebCamProps {
  onCapture: (dataURL: string) => void;
}

export interface CaptureWebCamState {
  stream?: MediaStream;
  hasError: boolean;
  cameraMode: number;
}

export class CaptureWebCam extends Component<
  CaptureWebCamProps,
  CaptureWebCamState
> {
  videoElement = createRef<HTMLVideoElement>();
  getUserMediaTimeout?: NodeJS.Timer;
  hasUnmounted: boolean = false;

  static defaultProps = {};

  state: CaptureWebCamState = {
    cameraMode: CameraMode.Idle,
    hasError: false,
  };

  async componentDidMount() {
    try {
      this.getUserMediaTimeout = setTimeout(() => {
        if (this.hasUnmounted) {
          return;
        }
        this.setState({ hasError: true });
      }, GET_MEDIA_REQUEST_TIMEOUT_MS);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = this.videoElement.current;
      if (videoElement) {
        videoElement.srcObject = stream;
        clearTimeout(this.getUserMediaTimeout);
        delete this.getUserMediaTimeout;
        this.setState({ stream });
      }
    } catch (e) {}
  }

  componentWillUnmount() {
    // use to abort timeouts when component is unmounted
    this.hasUnmounted = true;
  }

  setCountdown(cameraMode: number) {
    this.setState({ cameraMode });
    const asyncCapture = () => {
      if (this.hasUnmounted) {
        return;
      }
      if (cameraMode === CameraMode.Three) {
        this.setCountdown(CameraMode.Two);
      } else if (cameraMode === CameraMode.Two) {
        this.setCountdown(CameraMode.One);
      } else if (cameraMode === CameraMode.One) {
        this.capture();
      }
    };
    setTimeout(asyncCapture, 1000);
  }

  capture() {
    this.setState({ cameraMode: CameraMode.Capture });
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
        const asyncCapture = () => {
          if (this.hasUnmounted) {
            return;
          }
          this.props.onCapture(dataURL);
        };
        setTimeout(asyncCapture, FLASH_MS);
      }
    }
  }

  onTakePhotoClick = () => {
    this.setCountdown(CameraMode.Three);
  };

  renderMode() {
    const { cameraMode: mode } = this.state;
    switch (mode) {
      case CameraMode.Idle:
        return <Button onClick={this.onTakePhotoClick}>{'Take photo'}</Button>;
      default:
        return this.renderCountdown();
    }
  }

  getColor(mode: number) {
    return mode === this.state.cameraMode ? akColorN900 : akColorN30;
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
        {!stream && !hasError && (
          <div className="message">Requesting camera permissions...</div>
        ) /* i18n */}
        {!stream && hasError && (
          <div className="message">
            There were no permissions granted accessing your camera
          </div>
        ) /* i18n */}
        {!hasError && !!stream && this.renderMode()}
      </VideoWrapper>
    );
  }
}
