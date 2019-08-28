import {
  MediaDefinition,
  MediaAttributes,
  ExternalMediaAttributes,
} from '@atlaskit/adf-schema';

export const media = (
  attrs: MediaAttributes | ExternalMediaAttributes,
): MediaDefinition => ({
  type: 'media',
  attrs,
});
