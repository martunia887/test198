/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { DropdownMenuStateless } from '@atlaskit/dropdown-menu';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import { DropdownItemProps } from './types';
import getStyles from './styles';

type State = {
  isDropdownOpen: boolean;
};

export default class DropdownItem extends React.Component<
  DropdownItemProps,
  State
> {
  static defaultProps = {};

  state = {
    isDropdownOpen: false,
  };

  onOpenChange = ({
    isOpen,
    event,
  }: {
    isOpen: boolean;
    event: React.MouseEvent<HTMLElement>;
  }) => {
    if (isOpen) {
      this.setState({ isDropdownOpen: true });
      if (this.props.onClick) {
        this.props.onClick(event);
      }
    } else {
      this.setState({ isDropdownOpen: false });
      if (this.props.onClose) {
        this.props.onClose(event);
      }
    }
  };

  onCloseDropdown = () => {
    this.setState({ isDropdownOpen: false });
  };

  render() {
    const {
      appearance,
      children,
      className,
      component: CustomComponent,
      dropdownContent: DropdownContent,
      isOpen,
    } = this.props;

    const isDropdownOpen =
      isOpen === undefined ? this.state.isDropdownOpen : isOpen;

    const styles = getStyles();

    return (
      <DropdownMenuStateless
        isOpen={isDropdownOpen}
        onOpenChange={this.onOpenChange}
        position={appearance === 'primary' ? 'top left' : 'top right'}
        trigger={
          CustomComponent ? (
            <CustomComponent {...this.props} />
          ) : (
            <button className={className} css={styles.outer}>
              {children}
              {appearance === 'primary' && (
                <div css={styles.chevronWrapper}>
                  <ChevronDownIcon label="" />
                </div>
              )}
            </button>
          )
        }
      >
        <DropdownContent closeDropdown={this.onCloseDropdown} />
      </DropdownMenuStateless>
    );
  }
}
