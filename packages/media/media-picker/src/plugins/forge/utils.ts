import { JsonLdData } from './types/types-json-ld';

export const getMetadata = (id: string, resource: JsonLdData) => {
  if (resource['@type'] === 'Image') {
    return {
      id,
      metadata: {
        type: 'image',
        src: resource.image.url,
        srcFull: resource.image.url,
      },
    };
  } else {
    return {
      id,
      metadata: {
        type: 'link',
        src: resource.url,
      },
    };
  }
};
