/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import Dropdown, { DropdownMenuStateless } from '@atlaskit/dropdown-menu';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import { DropdownItemProps } from './types';
import getStyles from './styles';

export default class DropdownItem extends React.Component<DropdownItemProps> {
  static defaultProps = {};

  onOpenChange = ({isOpen, event}: {isOpen: boolean; event: React.MouseEvent<HTMLElement>;}) => {
    if (isOpen) {
      if (this.props.onClick) {
        this.props.onClick(event);
      }
    } else {
      if (this.props.onClose) {
        this.props.onClose(event);
      }
    }
  }
  render() {
    const {
      appearance,
      children,
      className,
      dropdownContent: DropdownContent,
      isOpen,
    } = this.props;

    const DropdownComponent = isOpen === undefined ? Dropdown : DropdownMenuStateless;

    const styles = getStyles();
    return (
      <DropdownComponent
        isOpen={isOpen}
        onOpenChange={this.onOpenChange}
        trigger={
          <div className={className} css={styles.outer}>
            {children}
            {appearance === 'primary' && (
              <div css={styles.chevronWrapper}>
                <ChevronDownIcon label="" />
              </div>
            )}
          </div>
        }
      >
        <DropdownContent />
      </DropdownComponent>
    );
  }
}
