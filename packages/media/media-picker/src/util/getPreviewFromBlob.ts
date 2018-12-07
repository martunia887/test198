import { MediaType } from '@atlaskit/media-core';
import VideoSnapshot from 'video-snapshot';
import { Preview } from '../domain/preview';
import { ImagePreview } from '../index';

export const getPreviewFromBlob = (
  file: Blob,
  mediaType: MediaType,
): Promise<Preview> =>
  new Promise(async (resolve, reject) => {
    console.log('getPreviewFromBlob for', file);
    const src = URL.createObjectURL(file);

    if (mediaType === 'image') {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        const dimensions = { width: img.width, height: img.height };
        const preview: ImagePreview = {
          file,
          dimensions,
          scaleFactor: 1,
        };

        URL.revokeObjectURL(src);
        resolve(preview);
      };
      img.onerror = reject;
    } else if (mediaType === 'video') {
      const snapshoter = new VideoSnapshot(file);
      const dimensions = await snapshoter.getDimensions();
      const preview: ImagePreview = {
        file,
        dimensions,
        scaleFactor: 1,
      };

      snapshoter.end();
      resolve(preview);
    } else if (mediaType === 'audio') {
      const preview: ImagePreview = {
        file,
        dimensions: {
          height: 360,
          width: 480,
        },
        scaleFactor: 1,
      };
      console.log('is audio', preview);
      resolve(preview);
    } else {
      resolve({ file });
    }
  });
