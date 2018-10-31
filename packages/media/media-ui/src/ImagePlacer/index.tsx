import * as React from 'react';
import { Rectangle, Vector2, Bounds } from '../camera';
import { Container } from './container';
import { Image } from './image';
import { Margin } from './margin';
import { ImagePlacerWrapper, ImagePlacerErrorWrapper } from './styled';
import { dataURItoFile, fileToDataURI, loadImage } from '../util';
import { getOrientation } from '../imageMetaData';

/* TS gaurds */
const isNum = (value: any): boolean => typeof value === 'number';
const isBool = (value: any): boolean => typeof value === 'boolean';
const isStr = (value: any): boolean => typeof value === 'string';
const isFile = (value: any): boolean => value instanceof File;

/*
"container(Width|Height)" is the outputed size of the final image plus "margin"s.
"visibleBounds" is the exact output size of the final image
"imageBounds" is the scaled size of the image

+------------------------+
| container(Width/Height)|<---------- this is the size of the final image
|  (0,0) -------------+  |
|  | visibleBounds <----------------- this is the visible inner area (minus margin)
|  |  +------------+  |  |
|  |  | \        / |  |  |
|  |  | imageBounds| <--------------- this is the current scaled size of the image
|  |  | /        \ |  |  |
|  |  +------------+  |  |
|  +------------------+  |
+------------------------+
*/

/* pass onExport prop function to receive an object with this API to render/return image */
export interface ImagePlacerAPI {
  toCanvas: () => HTMLCanvasElement;
  toDataURL: () => string;
  toFile: () => File;
}

/* props for main component */
export interface ImagePlacerProps {
  containerWidth: number;
  containerHeight: number;
  imageWidth?: number;
  imageHeight?: number;
  src?: string;
  file?: File;
  margin: number;
  zoom: number;
  maxZoom: number;
  useConstraints: boolean;
  circular: boolean;
  useCircularMask: boolean;
  orientation: number;
  backgroundColor: string;
  onZoomChange?: (zoom: number) => void;
  onExport?: (api: ImagePlacerAPI) => void;
  errorRenderer?: () => JSX.Element;
}

/* state for main component */
export interface ImagePlacerState {
  imageWidth: number;
  imageHeight: number;
  originX: number;
  originY: number;
  zoom: number;
  error: boolean;
  dragOrigin?: Vector2;
  orientation: number;
  src?: string;
}

/* main component */
export class ImagePlacer extends React.Component<
  ImagePlacerProps,
  ImagePlacerState
> {
  imageSourceRect = new Rectangle(
    0,
    0,
  ); /* original size of image (un-scaled) */
  imageElementRef?: HTMLImageElement; /* ref to image element */
  lastFile?: File; /* used to detect file change, but not necessary for state */

  static defaultProps = {
    containerWidth: 200,
    containerHeight: 200,
    margin: 28,
    maxZoom: 2,
    zoom: 0,
    useConstraints: false,
    circular: false,
    useCircularMask: false,
    orientation: 1,
    imageWidth: 0,
    imageHeight: 0,
    backgroundColor: 'transparent',
  };

  state: ImagePlacerState = {
    originX: 0,
    originY: 0,
    imageWidth: 0,
    imageHeight: 0,
    zoom: this.props.zoom,
    orientation: this.props.orientation,
    src: this.props.src,
    error: false,
  };

  /* the bounds of the scaled/panned image, relative to container */
  private get imageBounds(): Bounds {
    const { margin, maxZoom } = this.props;
    const { originX, originY, imageWidth, imageHeight, zoom } = this.state;
    const x = margin + originX;
    const y = margin + originY;
    const maxWidthDiff = imageWidth * maxZoom - imageWidth;
    const maxHeightDiff = imageHeight * maxZoom - imageHeight;
    const width = imageWidth + maxWidthDiff * zoom;
    const height = imageHeight + maxHeightDiff * zoom;
    return new Bounds(x, y, width, height);
  }

  /* the bounds of the visible area (container - margins), relative to container */
  private get visibleBounds(): Bounds {
    const { containerWidth, containerHeight, margin } = this.props;
    return new Bounds(margin, margin, containerWidth, containerHeight);
  }

  /* a coordinate mapping from visibleBounds to local rect of image */
  private get sourceRect(): Bounds {
    const { containerWidth, containerHeight } = this.props;
    const { x: originX, y: originY } = this.mapCoords(0, 0);
    const { x: cornerX, y: cornerY } = this.mapCoords(
      containerWidth,
      containerHeight,
    );
    return new Bounds(originX, originY, cornerX - originX, cornerY - originY);
  }

  /* respond to prop changes */
  async UNSAFE_componentWillReceiveProps(nextProps: ImagePlacerProps) {
    const { imageSourceRect, state, props, lastFile } = this;
    const { zoom } = state;
    const {
      useConstraints,
      containerWidth,
      containerHeight,
      margin,
      src,
    } = props;
    const {
      zoom: nextZoom,
      useConstraints: nextUseConstraints,
      containerWidth: nextContainerWidth,
      containerHeight: nextContainerHeight,
      margin: nextMargin,
      src: nextSrc,
      file: nextFile,
    } = nextProps;

    if (isNum(nextZoom) && nextZoom !== zoom) {
      this.setZoom(nextZoom);
    }
    if (isBool(nextUseConstraints) && nextUseConstraints !== useConstraints) {
      this.setState(
        {
          zoom: 0,
          imageWidth: imageSourceRect.width,
          imageHeight: imageSourceRect.height,
        },
        () => this.zoomToFit(),
      );
    }
    if (isNum(nextContainerWidth) && nextContainerWidth != containerWidth) {
      this.setState({ zoom: 0 }, () => this.zoomToFit());
    }
    if (isNum(nextContainerHeight) && nextContainerHeight != containerHeight) {
      this.setState({ zoom: 0 }, () => this.zoomToFit());
    }
    if (isNum(nextMargin) && nextMargin != margin) {
      this.setState({ zoom: 0 }, () => this.zoomToFit());
      this.updateZoomProp();
    }
    if (isStr(nextSrc) && nextSrc != src) {
      const processingInfo = await this.preprocessImageSrc(nextSrc as string);
      if (processingInfo) {
        const { orientation } = processingInfo;
        this.setState({ src: nextSrc, orientation, zoom: 0 }, () =>
          this.reset(),
        );
        this.updateZoomProp();
      } else {
        this.setState({ error: true });
      }
    }
    if (isFile(nextFile) && nextFile != lastFile) {
      const file = nextFile as File;
      const processingInfo = await this.preprocessImageFile(file);
      if (processingInfo) {
        const { src, orientation, width, height } = processingInfo;
        this.imageSourceRect = new Rectangle(width, height);
        this.setState({ src, orientation, zoom: 0 }, () => this.reset());
        this.lastFile = file;
        this.updateZoomProp();
      } else {
        this.setState({ error: true });
      }
    }
  }

  /* tell consumer that zoom has changed */
  private updateZoomProp(value: number = 0) {
    const { onZoomChange } = this.props;
    if (onZoomChange) {
      onZoomChange(value);
    }
  }

  /* reset view  */
  reset() {
    const {
      imageSourceRect: { width: imageWidth, height: imageHeight },
    } = this;
    this.setState({
      imageWidth,
      imageHeight,
      zoom: 0,
      originX: 0,
      originY: 0,
    });
  }

  /* zoom image up or down to fit visibleBounds */
  private zoomToFit() {
    const { useConstraints } = this.props;
    const { imageWidth, imageHeight } = this.state;
    if (!useConstraints || imageWidth === 0 || imageHeight === 0) {
      /* don't apply unless using constraints or image size is non-zero */
      return;
    }
    const itemRect = new Rectangle(imageWidth, imageHeight);
    const { visibleBounds } = this;
    const scaleFactor = itemRect.scaleToFitSmallestSide(visibleBounds);
    const {
      width: newItemRectWidth,
      height: newItemRectHeight,
    } = itemRect.scaled(scaleFactor);
    this.setState(
      {
        imageWidth: newItemRectWidth,
        imageHeight: newItemRectHeight,
        originX: 0,
        originY: 0,
        zoom: 0,
      },
      () => this.applyConstraints(),
    );
    this.updateZoomProp();
  }

  /* assuming zoom level is correct, move origin to ensure imageBounds edges stay within visibleBounds */
  private applyConstraints() {
    const { useConstraints } = this.props;
    const { originX: currentOriginX, originY: currentOriginY } = this.state;
    const { visibleBounds, imageBounds } = this;

    let originX = currentOriginX;
    let originY = currentOriginY;

    if (useConstraints) {
      const deltaLeft = visibleBounds.left - imageBounds.left;
      const deltaTop = visibleBounds.top - imageBounds.top;
      const deltaBottom = visibleBounds.bottom - imageBounds.bottom;
      const deltaRight = visibleBounds.right - imageBounds.right;

      if (
        imageBounds.right > visibleBounds.right &&
        imageBounds.left > visibleBounds.left
      ) {
        originX += deltaLeft;
      }
      if (
        imageBounds.bottom > visibleBounds.bottom &&
        imageBounds.top > visibleBounds.top
      ) {
        originY += deltaTop;
      }
      if (
        imageBounds.top < visibleBounds.top &&
        imageBounds.bottom < visibleBounds.bottom
      ) {
        originY += deltaBottom;
      }
      if (
        imageBounds.left < visibleBounds.left &&
        imageBounds.right < visibleBounds.right
      ) {
        originX += deltaRight;
      }
    } else {
      const deltaTop = visibleBounds.top - imageBounds.bottom;
      const deltaBottom = visibleBounds.bottom - imageBounds.top;
      const deltaLeft = visibleBounds.left - imageBounds.right;
      const deltaRight = visibleBounds.right - imageBounds.left;

      if (imageBounds.bottom < visibleBounds.top) {
        originY += deltaTop;
      }
      if (imageBounds.top > visibleBounds.bottom) {
        originY += deltaBottom;
      }
      if (imageBounds.right < visibleBounds.left) {
        originX += deltaLeft;
      }
      if (imageBounds.left > visibleBounds.right) {
        originX += deltaRight;
      }
    }

    this.setState({
      originX,
      originY,
    });
  }

  /* set zoom but apply constraints */
  setZoom(newZoom: number) {
    const { originX, originY } = this.state;
    /* itemBounds is a getter, so get it before and after changing zoom */
    const lastItemBounds = this.imageBounds;
    /* temporarily change zoom, which next call to imageBounds will read */
    this.state.zoom = newZoom;
    const imageBounds = this.imageBounds;
    const { x: deltaX, y: deltaY } = lastItemBounds.center.sub(
      imageBounds.center,
    );
    const origin = new Vector2(originX + deltaX, originY + deltaY);
    /* adjust zoom and origin to apply constraints */
    this.setState(
      {
        zoom: newZoom,
        originX: origin.x,
        originY: origin.y,
      },
      () => this.applyConstraints(),
    );
  }

  /* transformation between visibleBounds local coords to image source rect (factoring in zoom and pan) */
  mapCoords(visibleBoundsX: number, visibleBoundsY: number): Vector2 {
    const { imageSourceRect, visibleBounds, imageBounds } = this;
    const offset = visibleBounds.origin.sub(imageBounds.origin);
    const rect = imageBounds.rect;
    const x = (offset.x + visibleBoundsX) / rect.width;
    const y = (offset.y + visibleBoundsY) / rect.height;
    return new Vector2(
      imageSourceRect.width * x,
      imageSourceRect.height * y,
    ).rounded();
  }

  /* pre-process the incoming file via props
      - resample image to min size required to fit zoomed view
      - apply exif orientation (rotate image if needed) so that coords don't need transforming when zooming, panning, or exporting
      - return size info about image to reset state with
  */
  private async preprocessImageFile(
    file: File,
  ): Promise<{
    src: string;
    orientation: number;
    width: number;
    height: number;
  } | null> {
    const orientation = await getOrientation(file);
    const dataURL = await fileToDataURI(file);
    const imageInfo = await this.preprocessImageSrc(dataURL, orientation);
    if (!imageInfo) {
      return null;
    }
    return {
      ...imageInfo,
      src: dataURL,
    };
  }

  /* pre-process the incoming src via props
      - resample image to min size required to fit zoomed view
      - apply exif orientation (rotate image if needed) so that coords don't need transforming when zooming, panning, or exporting
      - return size info about image to reset state with
  */
  private async preprocessImageSrc(
    dataURL: string,
    orientation: number = 1,
  ): Promise<{
    orientation: number;
    width: number;
    height: number;
  } | null> {
    try {
      const img = await loadImage(dataURL);
      let width = 0;
      let height = 0;

      if (img) {
        const { containerWidth, containerHeight, maxZoom } = this.props;
        const { naturalWidth, naturalHeight } = img;
        const srcRect = new Rectangle(naturalWidth, naturalHeight);
        const maxRect = new Rectangle(
          containerWidth * maxZoom,
          containerHeight * maxZoom,
        );
        const scaleFactor = srcRect.scaleToFitLargestSide(maxRect);
        const rect = scaleFactor < 1 ? srcRect.scaled(scaleFactor) : srcRect;
        width = rect.width;
        height = rect.height;

        if (orientation === 6) {
          let temp = width;
          width = height;
          height = temp;
        }

        this.getCanvas(width, height, (context, canvas) => {
          if (orientation === 6) {
            context.translate(width, 0);
            context.rotate(1.5708); // 90deg
          }

          context.drawImage(
            img,
            0,
            0,
            naturalWidth,
            naturalHeight,
            0,
            0,
            height,
            width,
          );

          dataURL = canvas.toDataURL();
          this.imageSourceRect = new Rectangle(width, height);
          this.setState({ src: dataURL, zoom: 0, originX: 0, originY: 0 });
        });

        return { orientation, width, height };
      }
    } catch (e) {
      // just return null below
    }
    return null;
  }

  /* helper method to return new sized canvas for drawing */
  private getCanvas(
    width: number,
    height: number,
    fn: (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void,
  ) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');

    if (context) {
      fn(context, canvas);
    }

    return canvas;
  }

  /* convert the current visible region (zoomed / panned) to a correctly sized canvas with that view drawn */
  toCanvas(): HTMLCanvasElement {
    const {
      containerWidth,
      containerHeight,
      backgroundColor,
      useConstraints,
      circular,
      useCircularMask,
    } = this.props;

    return this.getCanvas(containerWidth, containerHeight, context => {
      const { imageElementRef } = this;

      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, containerWidth, containerHeight);

      if (imageElementRef) {
        if (circular && useCircularMask) {
          const cx = containerWidth * 0.5;
          const cy = containerHeight * 0.5;
          const rx = cx;
          const ry = cy;

          context.save();
          context.beginPath();
          context.translate(cx - rx, cy - ry);
          context.scale(rx, ry);
          context.arc(1, 1, 1, 0, 2 * Math.PI, false);
          context.restore();
          context.fill();
          context.clip();
        }

        if (useConstraints) {
          const { sourceRect } = this;

          context.drawImage(
            imageElementRef,
            sourceRect.left,
            sourceRect.top,
            sourceRect.width,
            sourceRect.height,
            0,
            0,
            containerWidth,
            containerHeight,
          );
        } else {
          const { visibleBounds, imageBounds } = this;
          const { naturalWidth, naturalHeight } = imageElementRef;
          const { left, top, width, height } = imageBounds.relativeTo(
            visibleBounds,
          );

          context.drawImage(
            imageElementRef,
            0,
            0,
            naturalWidth,
            naturalHeight,
            left,
            top,
            width,
            height,
          );
        }
      }
    });
  }

  /* convert current visible view to dataURL for image */
  toDataURL(): string {
    return this.toCanvas().toDataURL();
  }

  /* convert current visible view to File */
  toFile(): File {
    return dataURItoFile(this.toDataURL());
  }

  /* drag within container has started */
  onDragStart = () => {
    const { originX, originY } = this.state;
    this.setState({
      dragOrigin: new Vector2(originX, originY),
    });
  };

  /* image has loaded */
  onImageLoad = (
    imageElement: HTMLImageElement,
    width: number,
    height: number,
  ) => {
    const { onExport } = this.props;
    this.imageSourceRect = new Rectangle(width, height);
    this.imageElementRef = imageElement;
    this.setState({ imageWidth: width, imageHeight: height }, () =>
      this.zoomToFit(),
    );

    /* update consumer with current export methods */
    if (onExport) {
      onExport({
        toCanvas: () => this.toCanvas(),
        toDataURL: () => this.toDataURL(),
        toFile: () => this.toFile(),
      });
    }
  };

  /* image had an error */
  onImageError = () => {
    this.setState({ error: true });
  };

  /* drag within container has started */
  onDragMove = (delta: Vector2) => {
    const { dragOrigin } = this.state;
    if (dragOrigin) {
      let newOriginX = dragOrigin.x + delta.x;
      let newOriginY = dragOrigin.y + delta.y;
      this.setState(
        {
          originX: newOriginX,
          originY: newOriginY,
        },
        () => this.applyConstraints(),
      );
    }
  };

  /* wheel event was passed from container */
  onWheel = (delta: number) => {
    const { zoom } = this.state;
    const clampedZoom = Math.min(Math.max(0, zoom + delta / 100), 1);
    this.setZoom(clampedZoom);
    this.updateZoomProp(clampedZoom);
  };

  /* make it so */
  render() {
    const {
      backgroundColor,
      containerWidth,
      containerHeight,
      margin,
      circular,
      errorRenderer,
    } = this.props;
    const { error, src, orientation } = this.state;
    const { imageBounds } = this;

    return (
      <ImagePlacerWrapper backgroundColor={backgroundColor}>
        {error ? (
          errorRenderer ? (
            errorRenderer()
          ) : (
            <ImagePlacerErrorWrapper>
              "An error has occurred"
            </ImagePlacerErrorWrapper>
          )
        ) : (
          <Container
            width={containerWidth}
            height={containerHeight}
            margin={margin}
            onDragStart={this.onDragStart}
            onDragMove={this.onDragMove}
            onWheel={this.onWheel}
          >
            <Image
              src={src}
              orientation={orientation}
              x={imageBounds.x}
              y={imageBounds.y}
              width={imageBounds.width}
              height={imageBounds.height}
              onLoad={this.onImageLoad}
              onError={this.onImageError}
            />
            <Margin
              width={containerWidth}
              height={containerHeight}
              circular={circular}
              size={margin}
            />
          </Container>
        )}
      </ImagePlacerWrapper>
    );
  }
}
