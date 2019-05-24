/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { ElementType } from 'react';
import PrimaryDropdownItem from '../PrimaryDropdownItem';
import { ItemProps } from './types';
import { getStyles } from './styles';

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
      dropdownContent,
      href,
      onClick,
      target,
      text,
    } = this.props;
    const styles = getStyles(this.props);

    let ItemComponent: ElementType = 'div';
    let itemProps: Partial<ItemProps> = { dataset };

    if (CustomComponent) {
      ItemComponent = CustomComponent;
      itemProps = this.props;
    } else if (dropdownContent) {
      ItemComponent = PrimaryDropdownItem;
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
        {text}
      </ItemComponent>
    );
  }
}
