import { Rectangle, Bounds, FileInfo } from '@atlaskit/media-ui';
import { getCanvas } from '../util';

export function radians(deg: number) {
  return deg * (Math.PI / 180);
}

export function setSmoothingQuality(
  context: CanvasRenderingContext2D,
  quality: 'low' | 'medium' | 'high',
) {
  // TODO: vendor prefixes
  context.imageSmoothingQuality = quality;
}

export interface ViewInfo {
  containerRect: Rectangle;
  imageBounds: Bounds;
  sourceBounds: Bounds;
  visibleBounds: Bounds;
}

export interface TransformedImage {
  image: HTMLImageElement;
  width: number;
  height: number;
}

export function transformImage(
  img: HTMLImageElement,
  orientation: number = 1,
  resizeWidth?: number,
  resizeHeight?: number,
): Promise<TransformedImage> {
  return new Promise((resolve, reject) => {
    const { naturalWidth: imgWidth, naturalHeight: imgHeight } = img;
    let canvasWidth = imgWidth;
    let canvasHeight = imgHeight;

    if (resizeWidth !== undefined && resizeHeight !== undefined) {
      canvasWidth = resizeWidth;
      canvasHeight = resizeHeight;
    }

    const originalCanvasWidth = canvasWidth;
    const originalCanvasHeight = canvasHeight;

    if (orientation >= 5) {
      const temp = canvasWidth;
      canvasWidth = canvasHeight;
      canvasHeight = temp;
    }

    const { canvas, context } = getCanvas(canvasWidth, canvasHeight);

    if (context) {
      setSmoothingQuality(context, 'high');
      switch (orientation) {
        case 2:
          context.translate(originalCanvasWidth, 0);
          context.scale(-1, 1);
          break;
        case 3:
          context.translate(originalCanvasWidth, originalCanvasHeight);
          context.scale(-1, -1);
          break;
        case 4:
          context.translate(0, originalCanvasHeight);
          context.scale(1, -1);
          break;
        case 5:
          context.translate(originalCanvasHeight, 0);
          context.rotate(radians(90));
          context.translate(0, originalCanvasHeight);
          context.scale(1, -1);
          break;
        case 6:
          context.translate(originalCanvasHeight, 0);
          context.rotate(radians(90));
          break;
        case 7:
          context.translate(originalCanvasHeight, 0);
          context.rotate(radians(90));
          context.translate(originalCanvasWidth, 0);
          context.scale(-1, 1);
          break;
        case 8:
          context.translate(originalCanvasHeight, 0);
          context.rotate(radians(90));
          context.translate(originalCanvasWidth, originalCanvasHeight);
          context.scale(-1, -1);
          break;
      }

      context.drawImage(
        img,
        0,
        0,
        imgWidth,
        imgHeight,
        0,
        0,
        originalCanvasWidth,
        originalCanvasHeight,
      );

      context.strokeStyle = '#00ee00';
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(imgWidth, imgHeight);
      context.stroke();
      context.closePath();
    }

    const transformedImage = new Image(canvasWidth, canvasHeight);
    transformedImage.src = canvas.toDataURL();
    transformedImage.onload = () =>
      resolve({
        image: transformedImage,
        width: canvasWidth,
        height: canvasHeight,
      });
    transformedImage.onerror = reject;
  });
}

export interface PreviewInfo {
  fileInfo: FileInfo;
  width: number;
  height: number;
  originalImage: HTMLImageElement;
  dataURI: string;
}

export function renderImageAtCurrentView(
  imageElement: HTMLImageElement | undefined,
  viewInfo: ViewInfo,
  useConstraints: boolean,
  useCircularClipWithActions: boolean,
  constrainCircularClip: boolean,
  backgroundColor: string,
): HTMLCanvasElement {
  const { containerRect, imageBounds, sourceBounds, visibleBounds } = viewInfo;
  const { width: containerWidth, height: containerHeight } = containerRect;
  const { canvas, context } = getCanvas(containerWidth, containerHeight);

  if (context) {
    setSmoothingQuality(context, 'high');
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, containerWidth, containerHeight);

    if (imageElement) {
      if (useCircularClipWithActions) {
        const containerMidX = containerWidth * 0.5;
        const containerMidY = containerHeight * 0.5;
        const radius = constrainCircularClip
          ? Math.min(containerMidX, containerMidY)
          : Math.max(containerMidX, containerMidY);
        const scaleX = constrainCircularClip
          ? 1
          : containerHeight > containerWidth
          ? containerWidth / containerHeight
          : 1;
        const scaleY = constrainCircularClip
          ? 1
          : containerWidth > containerHeight
          ? containerHeight / containerWidth
          : 1;

        context.save();
        context.beginPath();
        context.translate(containerMidX, containerMidY);
        context.scale(scaleX, scaleY);
        context.translate(-containerMidX, -containerMidY);
        context.arc(
          containerMidX,
          containerMidY,
          radius,
          0,
          2 * Math.PI,
          false,
        );
        context.restore();
        context.fill();
        context.clip();
      }

      if (useConstraints) {
        /* draw sourceRect mapped to container size */
        context.drawImage(
          imageElement,
          sourceBounds.left,
          sourceBounds.top,
          sourceBounds.width,
          sourceBounds.height,
          0,
          0,
          containerWidth,
          containerHeight,
        );
      } else {
        /* draw imageBounds as is inside container size */
        const { naturalWidth, naturalHeight } = imageElement;
        const { left, top, width, height } = imageBounds.relativeTo(
          visibleBounds,
        );

        context.drawImage(
          imageElement,
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
  }

  return canvas;
}
