import * as React from 'react';
import { MediaSingleLayout } from '@atlaskit/adf-schema';
import Wrapper, {
  calcWidth as calcWrapperWidth,
  LEGACY_FIFTY_PERCENT,
} from './styled';
import classnames from 'classnames';
import { calcPxFromPct, layoutSupportsWidth } from './grid';

export const DEFAULT_IMAGE_WIDTH = 250;
export const DEFAULT_IMAGE_HEIGHT = 200;

export interface MediaSingleDimensionsProps {
  height: number;
  width: number;
  pctWidth?: number;
  layout: MediaSingleLayout;
  lineLength: number;
  containerWidth?: number;
}
export interface Props extends MediaSingleDimensionsProps {
  children: React.ReactElement<any>;
  isLoading?: boolean;
  className?: string;
  fullWidthMode?: boolean;
}

function calcDimensions({
  width,
  height,
  pctWidth,
  layout,
  lineLength,
  containerWidth = width,
}: MediaSingleDimensionsProps) {
  const usePctWidth = pctWidth && layoutSupportsWidth(layout);
  if (pctWidth && usePctWidth) {
    const pxWidth = Math.ceil(
      calcPxFromPct(pctWidth / 100, lineLength || containerWidth),
    );

    // scale, keeping aspect ratio
    return {
      height: (height / width) * pxWidth,
      width: pxWidth,
    };
  }
  return { height, width };
}

function calcWrapperWidthPx(containerWidth: number, wrapperWidth: string) {
  const isLegacyFiftyPercentBased = wrapperWidth.match('calc\\(50% - 12px\\)'); // Value coming from calcLegacyWidth
  const isPixelBased = wrapperWidth.match(/^\d+px$/i);
  const isPercentBased = wrapperWidth.match(/^\d+%$/i);
  if (isLegacyFiftyPercentBased) {
    return Math.ceil(containerWidth * 0.5 - 12);
  } else if (isPixelBased) {
    return parseInt(wrapperWidth.replace(/px$/i, ''), 10);
  } else if (isPercentBased) {
    const percent = parseFloat(wrapperWidth.replace(/%$/i, ''));
    return Math.ceil((containerWidth * percent) / 100);
  } else {
    return containerWidth;
  }
}

export function calcMediaSingleWitdh(props: MediaSingleDimensionsProps) {
  const newDimensions = calcDimensions(props);
  const wapperWidthCss = calcWrapperWidth({
    ...props,
    ...newDimensions,
  });
  const wrapperWidthPx = calcWrapperWidthPx(
    props.containerWidth || props.width,
    wapperWidthCss,
  );
  console.log(
    `:::::::::;; wapperWidthCss ${wapperWidthCss} - wrapperWidthPx: ${wrapperWidthPx} - props.containerWidth: ${
      props.containerWidth
    } - props.width: ${props.width}`,
  );
  return wrapperWidthPx;
}

export default function MediaSingle(props: Props) {
  const {
    children,
    layout,
    width,
    containerWidth = width,
    isLoading = false,
    pctWidth,
    className,
    fullWidthMode,
  } = props;
  const { width: wrapperWidth, height: wrapperHeight } = calcDimensions(props);

  return (
    <Wrapper
      layout={layout}
      width={wrapperWidth}
      height={wrapperHeight}
      containerWidth={containerWidth}
      pctWidth={pctWidth}
      fullWidthMode={fullWidthMode}
      data-node-type="mediaSingle"
      data-layout={layout}
      data-width={pctWidth}
      className={classnames('media-single', `image-${layout}`, className, {
        'is-loading': isLoading,
        'media-wrapped': layout === 'wrap-left' || layout === 'wrap-right',
      })}
    >
      {React.Children.only(children)}
    </Wrapper>
  );
}
