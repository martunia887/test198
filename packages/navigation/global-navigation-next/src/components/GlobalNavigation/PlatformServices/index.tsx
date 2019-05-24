/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import AppSwitcherIcon from '@atlaskit/icon/glyph/app-switcher';
import NotificationIcon from '@atlaskit/icon/glyph/notification';
import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
import SettingsIcon from '@atlaskit/icon/glyph/settings';

import getStyles from './styles';

export interface PlatformServicesProps {
  // switcher always on
  notifications?: {};
  help?: {};
  settings?: {};
}

export default class PlatformServices extends React.Component<
  PlatformServicesProps
> {
  render() {
    const { notifications, help, settings } = this.props;
    return (
      <div css={getStyles()}>
        <AppSwitcherIcon label="Switch to..." />
        {notifications && <NotificationIcon label="Notifications" />}
        {settings && <SettingsIcon label="Settings" />}
        {help && (
          <QuestionCircleIcon label="Help" secondaryColor={getStyles().fill} />
        )}
      </div>
    );
  }
}
