import * as React from 'react';
import { JiraIcon as AkJiraIcon } from '@atlaskit/logo';
import { JiraIcon as AkJiraIcon } from '@atlaskit/logo';
import AkOverviewIcon from '@atlaskit/icon/glyph/overview';
import AkEditorAddonIcon from '@atlaskit/icon/glyph/editor/addon';
import { getContextAwareFullPath } from '@atlassian/confluence-urls';

export const macroIcon = (icon, macroName, title) => {
  //const { icon, macroName, title } = macro;

  switch (macroName) {
    case 'toc':
      return <AkOverviewIcon label={title} />;

    case 'jira':
      return <AkJiraIcon label={title} />;
  }

  if (!icon) {
    return <AkEditorAddonIcon label={title} />;
  }

  // connect macros will have absolute urls while others
  // will have relative
  const src = getContextAwareFullPath(icon.location, true);
  return <img src={src} width="18" height="18" alt={title} />;
};
