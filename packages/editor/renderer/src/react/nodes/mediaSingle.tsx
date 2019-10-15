import * as React from 'react';
import { Component, ReactElement } from 'react';
import styled from 'styled-components';
import { MediaSingleLayout } from '@atlaskit/adf-schema';
import {
  MediaSingle as UIMediaSingle,
  calcMediaSingleWitdh,
  WidthConsumer,
  akEditorFullPageMaxWidth,
  mapBreakpointToLayoutMaxWidth,
  ImageLoaderProps,
  akEditorFullWidthLayoutWidth,
} from '@atlaskit/editor-common';
import { FullPagePadding } from '../../ui/Renderer/style';
import { RendererAppearance } from '../../ui/Renderer/types';
import { MediaProps } from './media';

export interface Props {
  children: ReactElement<any>;
  layout: MediaSingleLayout;
  width?: number;
  allowDynamicTextSizing?: boolean;
  rendererAppearance: RendererAppearance;
}

export interface State {
  width?: number;
  height?: number;
}

const DEFAULT_WIDTH = 250;
const DEFAULT_HEIGHT = 200;

const ExtendedUIMediaSingle = styled(UIMediaSingle)`
  ${({ layout }) =>
    layout === 'full-width' || layout === 'wide'
      ? `
  margin-left: 50%;
  transform: translateX(-50%);
  `
      : ``} transition: all 0.1s linear;
`;

function calcCardDimensions(
  wrapperWidth: number,
  width: number,
  height: number,
) {
  const cardWidth = wrapperWidth;
  const cardHeight = (height / width) * cardWidth;
  return {
    width: `${cardWidth}px`,
    height: `${cardHeight}px`,
  };
}

export default class MediaSingle extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {}; // Need to initialize with empty state.
  }

  private onExternalImageLoaded = ({
    width,
    height,
  }: {
    width: number;
    height: number;
  }) => {
    this.setState({
      width,
      height,
    });
  };

  render() {
    const { width: pctWidth, layout } = this.props;

    const child = React.Children.only(
      React.Children.toArray<React.ReactElement>(this.props.children)[0],
    );

    let { width, height, type } = child.props;

    if (type === 'external') {
      const { width: stateWidth, height: stateHeight } = this.state;
      if (width === null) {
        width = stateWidth || DEFAULT_WIDTH;
      }
      if (height === null) {
        height = stateHeight || DEFAULT_HEIGHT;
      }
    }

    if (width === null) {
      width = DEFAULT_WIDTH;
      height = DEFAULT_HEIGHT;
    }

    // TODO: put appearance-based padding into theme instead
    const padding =
      this.props.rendererAppearance === 'full-page' ? FullPagePadding * 2 : 0;

    const isFullWidth = this.props.rendererAppearance === 'full-width';

    return (
      <WidthConsumer>
        {({ width: containerWidth, breakpoint }) => {
          const nonFullWidthSize =
            containerWidth - padding >= akEditorFullPageMaxWidth
              ? this.props.allowDynamicTextSizing
                ? mapBreakpointToLayoutMaxWidth(breakpoint)
                : akEditorFullPageMaxWidth
              : containerWidth - padding;

          const lineLength = isFullWidth
            ? Math.min(akEditorFullWidthLayoutWidth, containerWidth - padding)
            : nonFullWidthSize;

          const uiMediaSingleWidth = calcMediaSingleWitdh({
            width,
            height,
            layout,
            containerWidth,
            pctWidth,
            lineLength,
          });
          const cardDimensions = calcCardDimensions(
            uiMediaSingleWidth,
            // containerWidth,
            width,
            height,
          );

          console.log(
            `======== cardDimensions: ${JSON.stringify(
              cardDimensions,
            )} - uiMediaSingleWidth: ${uiMediaSingleWidth}`,
          );

          return (
            <ExtendedUIMediaSingle
              layout={layout}
              width={width}
              height={height}
              containerWidth={containerWidth}
              lineLength={lineLength}
              pctWidth={pctWidth}
              fullWidthMode={isFullWidth}
            >
              {React.cloneElement(child, {
                resizeMode: 'stretchy-fit',
                cardDimensions,
                onExternalImageLoaded: this.onExternalImageLoaded,
                disableOverlay: true,
              } as MediaProps & ImageLoaderProps)}
            </ExtendedUIMediaSingle>
          );
        }}
      </WidthConsumer>
    );
  }
}
