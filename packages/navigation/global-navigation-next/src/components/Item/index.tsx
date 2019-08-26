/** @jsx jsx */
import Button from '@atlaskit/button';
import Tooltip from '@atlaskit/tooltip';
import { jsx } from '@emotion/core';
import { ElementType } from 'react';
import DropdownItem from '../DropdownItem';
import { ItemProps } from './types';
import { getStyles } from './styles';

export const Item = (props: ItemProps) => {
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
  } = props;
  const styles = getStyles(props);

  let ItemComponent: ElementType = 'div';
  let itemProps: Partial<ItemProps> = { dataset };

  if (drawerContent) {
    // ItemComponent = DrawerItem;
    // itemProps = props;
  } else if (dropdownContent) {
    ItemComponent = DropdownItem;
    itemProps = props;
  } else if (CustomComponent) {
    ItemComponent = CustomComponent;
    itemProps = props;
  } else if (href) {
    ItemComponent = 'a';
    itemProps = {
      dataset,
      href,
      onClick,
      target,
    };
  } else if (onClick) {
    ItemComponent = Button;
    itemProps = { ...dataset, onClick };
  }

  const itemComponent = (
    <ItemComponent css={{ '&&': styles.itemBase[appearance] }} {...itemProps}>
      {text}
    </ItemComponent>
  );

  return tooltip ? (
    <Tooltip content={tooltip} hideTooltipOnClick>
      {itemComponent}
    </Tooltip>
  ) : (
    itemComponent
  );
};

Item.defaultProps = {
  appearance: 'primary',
  dataset: {
    'data-test-id': 'NavigationItem',
  },
  isSelected: false,
  text: '',
};

export default Item;
