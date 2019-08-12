// @flow

import React, { Component } from 'react';
import { gridSize as gridSizeFn } from '@atlaskit/theme';
import { ClassNames } from '@emotion/core';
import Section from '../Section';
import type { MenuSectionProps } from './types';

const gridSize = gridSizeFn();

export default class MenuSection extends Component<MenuSectionProps> {
  static defaultProps = {
    alwaysShowScrollHint: false,
    backItem: null,
  };

  render() {
    const {
      alwaysShowScrollHint,
      id,
      children,
      parentId,
      backItem,
    } = this.props;
    return (
      <Section
        id={id}
        parentId={parentId}
        alwaysShowScrollHint={alwaysShowScrollHint}
        shouldGrow
        backItem={backItem}
      >
        {({ css }) => {
          const menuCss = {
            ...css,
            paddingBottom: gridSize * 1.5,
          };

          return (
            <ClassNames>
              {({ css: getClassName }) =>
                children({
                  css: menuCss,
                  className: getClassName(menuCss),
                })
              }
            </ClassNames>
          );
        }}
      </Section>
    );
  }
}
