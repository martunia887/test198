import * as React from 'react';
import CommitIcon from '@atlaskit/icon-object/glyph/commit/16';
import { InlineCardResolvedViewProps } from '@atlaskit/media-ui';

import { extractInlineViewPropsFromObject } from './extractPropsFromObject';
import { buildName } from './extractPropsFromSourceCodeCommon';
import { BuildInlineProps } from './types';

type BuildInlinePropsSourceCodeCommit = BuildInlineProps<
  InlineCardResolvedViewProps
>;

export const buildIcon: BuildInlinePropsSourceCodeCommit = json => {
  const name = json.name;
  return { icon: <CommitIcon label={name} /> };
};

export const extractInlineViewPropsFromSourceCodeCommit = (
  json: any,
): InlineCardResolvedViewProps => {
  const props = extractInlineViewPropsFromObject(json);
  return {
    ...props,
    ...buildIcon(json),
    ...buildName(props, json),
  };
};
