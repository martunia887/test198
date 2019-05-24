/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { ElementType } from 'react';
import { PrimaryItemProps } from './types';
import { getStyles } from './styles';

export default class PrimaryItem extends React.Component<PrimaryItemProps> {
  static defaultProps = {
    dataset: {
      'data-test-id': 'NavigationItem',
    },
    isSelected: false,
    text: '',
  };

  render() {
    const {
      component: CustomComponent,
      dataset,
      href,
      onClick,
      target,
      text,
    } = this.props;
    const styles = getStyles(this.props);

    let ItemComponent: ElementType = 'div';
    let itemProps: Partial<PrimaryItemProps> = { dataset };

    if (CustomComponent) {
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
      <ItemComponent css={{ '&&': styles.itemBase }} {...itemProps}>
        <div css={styles.contentWrapper}>{text}</div>
      </ItemComponent>
    );
  }
}
