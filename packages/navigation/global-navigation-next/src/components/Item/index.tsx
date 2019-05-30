/** @jsx jsx */
import Tooltip from '@atlaskit/tooltip';
import { jsx } from '@emotion/core';
import React, { ElementType } from 'react';
import DropdownItem from '../DropdownItem';
import { ItemProps } from './types';
import { getStyles } from './styles';
import DrawerItem from '../DrawerItem';

export default class Item extends React.Component<ItemProps> {
  static defaultProps = {
    appearance: 'primary',
    dataset: {
      'data-test-id': 'NavigationItem',
    },
    isSelected: false,
    text: '',
  };

  render() {
    const {
      appearance,
      component: CustomComponent,
      dataset,
      drawerContent,
      dropdownContent,
      href,
      onClick,
      target,
      text,
      tooltip,
    } = this.props;
    const styles = getStyles(this.props);

    let ItemComponent: ElementType = 'div';
    let itemProps: Partial<ItemProps> = { dataset };

    if (drawerContent) {
      ItemComponent = DrawerItem;
      itemProps = this.props;
    } else if (dropdownContent) {
      ItemComponent = DropdownItem;
      itemProps = this.props;
    } else if (CustomComponent) {
      ItemComponent = CustomComponent;
      itemProps = this.props;
    } else if (href) {
      ItemComponent = 'a';
      itemProps = {
        dataset,
        href,
        onClick,
        target,
      };
    } else if (onClick) {
      ItemComponent = 'button';
      itemProps = { dataset, onClick };
    }

    return (
      <ItemComponent css={{ '&&': styles.itemBase[appearance] }} {...itemProps}>
        {tooltip ? <Tooltip content={tooltip}>{text}</Tooltip> : text}
      </ItemComponent>
    );
  }
}
