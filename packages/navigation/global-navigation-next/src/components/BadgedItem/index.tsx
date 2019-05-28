/** @jsx jsx */
import AkBadge from '@atlaskit/badge';
import { jsx } from '@emotion/core';
import React from 'react';
import Item from '../Item';
import { BadgedItemProps, Badge } from './types';
import { ItemRenderComponentProps } from '../Item/types';
import { getStyles } from './styles';

class ItemComponentWithBadge extends React.Component<
  ItemRenderComponentProps & { badge: Badge }
> {
  renderBadge(badge: Badge | undefined) {
    if (!badge) {
      return null;
    }
    switch (badge.type) {
      case 'component':
        const { component: Component } = badge;
        return <Component />;
      case 'provided':
        const { count, appearance = 'important', maxCount = 9 } = badge;
        if (badge.count === 0) {
          return null;
        }
        return (
          <AkBadge appearance={appearance} max={maxCount}>
            {count}
          </AkBadge>
        );
      default:
        // The inferred type of badge is `never`.
        throw new Error(`Unexpected badge.type: ${(badge as any).type}`);
    }
  }

  render() {
    const {
      badge,
      children,
      className,
      component,
      isSelected,
      drawerContent,
      ...props
    } = this.props;
    return (
      // Set z-index: 1 to let the badge (if any) overlap other items.
      <button className={className} style={{ zIndex: 1 }} {...props}>
        {children}
        <div css={getStyles().badgePositioner}>{this.renderBadge(badge)}</div>
      </button>
    );
  }
}

export default class BadgedItem extends React.Component<BadgedItemProps> {
  render() {
    const { ...itemProps } = this.props;

    // @ts-ignore ItemComponentWithBadge expects badge props that aren't on ItemProps.
    return <Item {...itemProps} component={ItemComponentWithBadge} />;
  }
}
