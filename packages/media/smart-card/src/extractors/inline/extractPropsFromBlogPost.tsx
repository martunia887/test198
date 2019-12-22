import * as React from 'react';
import ConfluenceBlogIcon from '@atlaskit/icon-object/glyph/blog/16';
import { InlineCardResolvedViewProps } from '@atlaskit/media-ui';

import { CONFLUENCE_GENERATOR_ID } from './constants';
import { extractInlineViewPropsFromTextDocument } from './extractPropsFromTextDocument';
import { BuildInlineProps } from './types';

export const buildBlogPostIcon: BuildInlineProps<InlineCardResolvedViewProps> = json => {
  if (json.generator && json.generator['@id'] === CONFLUENCE_GENERATOR_ID) {
    return { icon: <ConfluenceBlogIcon label="Confluence" /> };
  }
  return {};
};

export function extractInlineViewPropsFromBlogPost(
  json: any,
): InlineCardResolvedViewProps {
  const props = extractInlineViewPropsFromTextDocument(json);
  return {
    ...props,
    ...buildBlogPostIcon(json),
  };
}
