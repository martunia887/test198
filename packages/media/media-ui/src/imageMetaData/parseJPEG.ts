import { SupportedImageMetaTag, ImageMetaDataTags } from './types';

const { XResolution, YResolution } = SupportedImageMetaTag;

let loadImage: any;

export async function readJPEGExifMetaData(
  file: File,
): Promise<ImageMetaDataTags> {
  if (!loadImage) {
    const module = await import('blueimp-load-image');
    loadImage = module.default || module;
  }
  return new Promise((resolve, reject) => {
    loadImage.parseMetaData(file, (data: any) => {
      try {
        const tags: ImageMetaDataTags =
          data && data.exif ? data.exif.getAll() : {};
        Object.keys(tags).forEach(key => {
          const value = tags[key];
          if (
            typeof value === 'object' &&
            (key === XResolution || key === YResolution) &&
            'numerator' in value
          ) {
            // some test images had this structure, so just take the numerator value to simplify returned value
            tags[key] = (value as any).numerator;
          }
          if (typeof tags[key] === 'number') {
            // in case numbers types were auto-converted, keep everything the same between jpeg & png we keep as strings
            tags[key] = `${tags[key]}`;
          }
        });
        resolve(tags);
      } catch (e) {
        reject(e);
      }
    });
  });
}
