import * as React from 'react';
import ProjectDefaultIcon from '@atlaskit/icon/glyph/people-group';
import { InlineCardResolvedViewProps } from '@atlaskit/media-ui';

import { extractInlineViewPropsFromDocument } from './extractPropsFromDocument';
import { BuildInlineProps } from './types';

export const buildProjectIcon: BuildInlineProps<InlineCardResolvedViewProps> = json => {
  if (json.icon && json.icon.url) {
    return { icon: json.icon.url };
  }
  return {
    icon: <ProjectDefaultIcon size="small" label={json.name || 'Project'} />,
  };
};

export function extractInlineViewPropsFromProject(
  json: any,
): InlineCardResolvedViewProps {
  const props = extractInlineViewPropsFromDocument(json);
  return {
    ...props,
    ...buildProjectIcon(json),
  };
}
