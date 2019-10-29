import * as React from 'react';
import { JiraIcon as AkJiraIcon } from '@atlaskit/logo';
import AkOverviewIcon from '@atlaskit/icon/glyph/overview';
import AkEditorAddonIcon from '@atlaskit/icon/glyph/editor/addon';
import { getContextAwareFullPath } from '@atlassian/confluence-urls';

export const macroIcon = (
  iconUrl: string,
  extensionKey: string,
  title: string,
) => {
  switch (extensionKey) {
    case 'toc':
      return <AkOverviewIcon label={title} size="small" />;

    case 'jira':
      return <AkJiraIcon label={title} size="small" />;
  }

  if (!iconUrl) {
    return <AkEditorAddonIcon label={title} size="medium" />;
  }

  // connect macros will have absolute urls while others
  // will have relative
  const src = getContextAwareFullPath(iconUrl, true);
  return <img src={src} width="16" height="16" alt={title} />; // test this, idk how but do it
};
