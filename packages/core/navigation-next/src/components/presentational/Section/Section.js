// @flow

import React, { PureComponent, type Node } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';
import { ClassNames, css } from '@emotion/core';
import { NavigationAnalyticsContext } from '@atlaskit/analytics-namespaced-context';

import { transitionDurationMs } from '../../../common/constants';
import getAnimationStyles from './getAnimationStyles';
import type { SectionProps, SectionState, BackItemType } from './types';
import BackItem from '../../connected/BackItem';

type StickyBackItemProps = {
  backItem: BackItemType,
};

const StickyBackItem = (props: StickyBackItemProps) => {
  const { backItem } = props;
  if (backItem && backItem.type === 'BackItem') {
    return <BackItem {...backItem} />;
  }
  return null;
};
/** The below components are exported for testing purposes only. */
type StyledComponentProps = { children: Node };
export const StaticTransitionGroup = (props: StyledComponentProps) => (
  <div css={{ position: 'relative' }} {...props} />
);
export const ScrollableTransitionGroup = (props: StyledComponentProps) => (
  <div
    css={{
      position: 'relative',
      flex: '1 1 100%',
      overflowY: 'hidden',
    }}
    {...props}
  />
);
export const ScrollableWrapper = (props: StyledComponentProps) => (
  <div {...props} />
);
export const ScrollableInner = (props: StyledComponentProps) => (
  <div {...props} />
);
export const StaticWrapper = (props: StyledComponentProps) => (
  <div {...props} />
);

export default class Section extends PureComponent<SectionProps, SectionState> {
  state = {
    traversalDirection: null,
  };

  isMounted = false;

  componentDidMount() {
    this.isMounted = true;
  }

  componentWillReceiveProps(nextProps: SectionProps) {
    if (nextProps.parentId && nextProps.parentId === this.props.id) {
      this.setState({ traversalDirection: 'down' });
    }
    if (this.props.parentId && this.props.parentId === nextProps.id) {
      this.setState({ traversalDirection: 'up' });
    }
  }

  render() {
    const {
      id,
      children,
      shouldGrow,
      styles: styleReducer,
      theme,
      backItem,
      alwaysShowScrollHint,
    } = this.props;

    const { mode, context } = theme;
    const styles = styleReducer(
      mode.section({ alwaysShowScrollHint })[context],
    );

    return (
      <TransitionGroup
        component={
          shouldGrow ? ScrollableTransitionGroup : StaticTransitionGroup
        }
        appear
      >
        <Transition
          key={id}
          timeout={this.isMounted ? transitionDurationMs : 0}
        >
          {state => {
            const { traversalDirection } = this.state;
            const animationStyles = getAnimationStyles({
              state,
              traversalDirection,
            });

            // We provide both the styles object and the computed className.
            // This allows consumers to patch the styles if they want to, or
            // simply apply the className if they're not using a JSS parser like
            // emotion.
            return (
              <NavigationAnalyticsContext
                data={{
                  attributes: { viewSection: id },
                  componentName: 'Section',
                }}
              >
                <ClassNames>
                  {({ css: getClassName }) => {
                    return (
                      <>
                        {' '}
                        {shouldGrow ? (
                          <ScrollableWrapper
                            css={css`
                              ${styles.wrapper}
                          ${animationStyles}
                            `}
                          >
                            <>
                              <StickyBackItem backItem={backItem} />
                              <ScrollableInner css={styles.inner}>
                                {children({
                                  className: getClassName(styles.children),
                                  css: styles.children,
                                })}
                              </ScrollableInner>
                            </>
                          </ScrollableWrapper>
                        ) : (
                          <StaticWrapper css={animationStyles}>
                            {children({
                              className: getClassName(styles.children),
                              css: styles.children,
                            })}
                          </StaticWrapper>
                        )}
                      </>
                    );
                  }}
                </ClassNames>
              </NavigationAnalyticsContext>
            );
          }}
        </Transition>
      </TransitionGroup>
    );
  }
}
