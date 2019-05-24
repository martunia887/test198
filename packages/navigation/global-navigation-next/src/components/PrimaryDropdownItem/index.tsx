/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import Dropdown from '@atlaskit/dropdown-menu';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import { PrimaryDropdownItemProps } from './types';
import getStyles from './styles';

export default class PrimaryDropdownItem extends React.Component<
  PrimaryDropdownItemProps
> {
  static defaultProps = {};

  render() {
    const {
      children,
      className,
      dropdownContent: DropdownContent,
    } = this.props;

    const styles = getStyles();
    return (
      <Dropdown
        trigger={
          <div className={className} css={styles.outer}>
            {children}
            <div css={styles.chevronWrapper}>
              <ChevronDownIcon label="" />
            </div>
          </div>
        }
      >
        <DropdownContent />
      </Dropdown>
    );
  }
}
