/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import AppSwitcherIcon from '@atlaskit/icon/glyph/app-switcher';
import NotificationIcon from '@atlaskit/icon/glyph/notification';
import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
import SettingsIcon from '@atlaskit/icon/glyph/settings';

import getStyles from './styles';
import Item from '../../Item';

interface SecondaryItemProps {
  /**
   * Is the dropdown/drawer open? This is set in controlled mode.
   * Leave it unset to have state controlled by the Item.
   */
  isOpen?: boolean;
  onClick?: () => void;
  onClose?: () => void;
  drawerContent?: React.ComponentType<{}>;
  dropdownContent?: React.ComponentType<{}>;
}
export interface PlatformServicesProps {
  // switcher always on
  notifications?: {};
  help?: SecondaryItemProps;
  settings?: SecondaryItemProps;
}

export default class PlatformServices extends React.Component<
  PlatformServicesProps
> {
  render() {
    const { notifications, help, settings } = this.props;
    const wrapperStyles = getStyles();
    return (
      <div css={wrapperStyles}>
        <AppSwitcherIcon label="Switch to..." />
        {notifications && <NotificationIcon label="Notifications" />}
        {settings && (
          <Item
            appearance="secondary"
            {...settings}
            text={<SettingsIcon label="Settings" />}
          />
        )}
        {help && (
          <Item
            appearance="secondary"
            {...help}
            text={
              <QuestionCircleIcon
                label="Help"
                secondaryColor={wrapperStyles.fill}
              />
            }
          />
        )}
      </div>
    );
  }
}
