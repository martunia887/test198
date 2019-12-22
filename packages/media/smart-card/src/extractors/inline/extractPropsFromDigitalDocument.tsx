import * as React from 'react';
import FileIcon from '@atlaskit/icon-file-type/glyph/generic/16';
import { InlineCardResolvedViewProps } from '@atlaskit/media-ui';

import { getIconForFileType } from '../../utils';

import { extractInlineViewPropsFromDocument } from './extractPropsFromDocument';
import { BuildInlineProps } from './types';

type BuildInlinePropsDigitalDocument = BuildInlineProps<
  InlineCardResolvedViewProps
>;

export const buildIcon: BuildInlinePropsDigitalDocument = json => {
  if (json.fileFormat) {
    return { icon: getIconForFileType(json.fileFormat) };
  }
  return { icon: <FileIcon label={json.name} /> };
};

export const extractInlineViewPropsFromDigitalDocument = (
  json: any,
): InlineCardResolvedViewProps => {
  const props = extractInlineViewPropsFromDocument(json);
  return {
    ...props,
    ...buildIcon(json),
  };
};
