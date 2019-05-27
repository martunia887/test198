// @flow

import React, { Component, type ElementRef, Fragment } from 'react';
import { NavigationAnalyticsContext } from '@atlaskit/analytics-namespaced-context';

import {
  name as packageName,
  version as packageVersion,
} from '../../../version.json';
import PageContent from '../PageContent';
import ResizeTransition from '../ResizeTransition';
import ResizeControl from './ResizeControl';
import { LayoutContainer, NavigationContainer } from './primitives';
import type { LayoutManagerProps } from './types';
import { ContainerNavigationMask } from '../ContentNavigation/primitives';
import {
  ComposedGlobalNavigation,
  ComposedContainerNavigation,
} from './nav-components';

import {
  CONTENT_NAV_WIDTH_COLLAPSED,
  CONTENT_NAV_WIDTH_FLYOUT,
  FLYOUT_DELAY,
  ALTERNATE_FLYOUT_DELAY,
} from '../../../common/constants';
import RenderBlocker from '../../common/RenderBlocker';
import { LayoutEventListener } from './LayoutEvent';

type State = {
  flyoutIsOpen: boolean,
  mouseIsOverNavigation: boolean,
  itemIsDragging: boolean,
};

function defaultTooltipContent(isCollapsed: boolean) {
  return isCollapsed
    ? { text: 'Expand', char: '[' }
    : { text: 'Collapse', char: '[' };
}

/* NOTE: experimental props use an underscore */

export default class LayoutManager extends Component<
  LayoutManagerProps,
  State,
> {
  state = {
    flyoutIsOpen: false,
    mouseIsOverNavigation: false,
    itemIsDragging: false,
  };

  productNavRef: HTMLElement;

  pageRef: HTMLElement;

  containerRef: HTMLElement;

  flyoutMouseOverTimeout: TimeoutID;

  static defaultProps = {
    collapseToggleTooltipContent: defaultTooltipContent,
    datasets: {
      contextualNavigation: {
        'data-test-id': 'ContextualNavigation',
      },
      globalNavigation: {
        'data-test-id': 'GlobalNavigation',
      },
      navigation: {
        'data-test-id': 'Navigation',
      },
    },
    topOffset: 0,
    // eslint-disable-next-line camelcase
    experimental_flyoutOnHover: false,
    experimental_alternateFlyoutBehaviour: false,
    experimental_fullWidthFlyout: false,
    experimental_horizontalGlobalNav: false,
  };

  static getDerivedStateFromProps(props: LayoutManagerProps, state: State) {
    // kill the flyout when the user commits to expanding navigation
    if (!props.navigationUIController.state.isCollapsed && state.flyoutIsOpen) {
      return { flyoutIsOpen: false };
    }

    return null;
  }

  nodeRefs = {
    expandCollapseAffordance: React.createRef(),
  };

  componentDidMount() {
    this.publishRefs();
  }

  componentDidUpdate() {
    this.publishRefs();
  }

  publishRefs() {
    const { getRefs } = this.props;
    if (typeof getRefs === 'function') {
      getRefs(this.nodeRefs);
    }
  }

  getContainerRef = (ref: ElementRef<*>) => {
    this.containerRef = ref;
  };

  getNavRef = (ref: ElementRef<*>) => {
    this.productNavRef = ref;
  };

  getPageRef = (ref: ElementRef<*>) => {
    this.pageRef = ref;
  };

  getTopOffset = () => {
    /* eslint-disable camelcase */
    const { topOffset, experimental_horizontalGlobalNav } = this.props;

    if (experimental_horizontalGlobalNav && topOffset === 0) {
      // Internally override this to 60px if using horizontal global nav and not specifying a top offset
      return 60;
    }
    return topOffset;
    /* eslint-enable camelcase */
  };

  mouseOutFlyoutArea = ({ currentTarget, relatedTarget }: *) => {
    if (currentTarget.contains(relatedTarget)) return;
    clearTimeout(this.flyoutMouseOverTimeout);
    this.setState({ flyoutIsOpen: false });
  };

  mouseOverFlyoutArea = ({ currentTarget, target }: *) => {
    if (!currentTarget.contains(target)) return;

    const {
      // eslint-disable-next-line camelcase
      experimental_alternateFlyoutBehaviour: EXPERIMENTAL_ALTERNATE_FLYOUT_BEHAVIOUR,
    } = this.props;
    const delay = EXPERIMENTAL_ALTERNATE_FLYOUT_BEHAVIOUR
      ? ALTERNATE_FLYOUT_DELAY
      : FLYOUT_DELAY;

    clearTimeout(this.flyoutMouseOverTimeout);

    this.flyoutMouseOverTimeout = setTimeout(() => {
      this.setState({ flyoutIsOpen: true });
    }, delay);
  };

  closeFlyout = (e: any) => {
    e.stopPropagation();
    clearTimeout(this.flyoutMouseOverTimeout);
    if (this.state.flyoutIsOpen) {
      this.setState({ flyoutIsOpen: false });
    }
  };

  mouseEnter = () => {
    this.setState({ mouseIsOverNavigation: true });
  };

  mouseLeave = () => {
    clearTimeout(this.flyoutMouseOverTimeout);
    this.setState({ mouseIsOverNavigation: false });
  };

  onItemDragStart = () => {
    this.setState({ itemIsDragging: true });
  };

  onItemDragEnd = () => {
    this.setState({ itemIsDragging: false });
  };

  renderNavigation = ({ renderContentNav }: { renderContentNav: boolean }) => {
    const {
      datasets,
      navigationUIController,
      // eslint-disable-next-line camelcase
      experimental_flyoutOnHover: EXPERIMENTAL_FLYOUT_ON_HOVER,
      // eslint-disable-next-line camelcase
      experimental_alternateFlyoutBehaviour: EXPERIMENTAL_ALTERNATE_FLYOUT_BEHAVIOUR,
      // eslint-disable-next-line camelcase
      experimental_fullWidthFlyout: EXPERIMENTAL_FULL_WIDTH_FLYOUT,
      experimental_horizontalGlobalNav: EXPERIMENTAL_HORIZONTAL_GLOBAL_NAV,
      collapseToggleTooltipContent,
      globalNavigation,
      containerNavigation,
      productNavigation,
      view,
    } = this.props;
    const { flyoutIsOpen, mouseIsOverNavigation, itemIsDragging } = this.state;
    const {
      isCollapsed,
      isResizeDisabled,
      isResizing,
      productNavWidth,
    } = navigationUIController.state;

    const flyoutWidth = EXPERIMENTAL_FULL_WIDTH_FLYOUT
      ? productNavWidth
      : CONTENT_NAV_WIDTH_FLYOUT;

    const dataset = datasets ? datasets.navigation : {};

    const GlobalNavigation = globalNavigation;
    const topOffset = this.getTopOffset();

    return (
      <LayoutEventListener
        onItemDragStart={this.onItemDragStart}
        onItemDragEnd={this.onItemDragEnd}
      >
        <NavigationAnalyticsContext
          data={{
            attributes: {
              isExpanded: !isCollapsed,
              flyoutOnHoverEnabled: EXPERIMENTAL_FLYOUT_ON_HOVER,
              alternateFlyoutBehaviourEnabled: EXPERIMENTAL_ALTERNATE_FLYOUT_BEHAVIOUR,
              fullWidthFlyoutEnabled: EXPERIMENTAL_FULL_WIDTH_FLYOUT,
            },
            componentName: 'navigation',
            packageName,
            packageVersion,
          }}
        >
          <Fragment>
            {EXPERIMENTAL_HORIZONTAL_GLOBAL_NAV && (
              <GlobalNavigation
                datasets={datasets ? datasets.globalNavigation : {}}
              />
            )}
            {renderContentNav && (
              <ResizeTransition
                from={[CONTENT_NAV_WIDTH_COLLAPSED]}
                in={!isCollapsed || flyoutIsOpen}
                properties={['width']}
                to={[flyoutIsOpen ? flyoutWidth : productNavWidth]}
                userIsDragging={isResizing}
                // only apply listeners to the NAV resize transition
                productNavWidth={productNavWidth}
              >
                {({ transitionStyle, transitionState }) => {
                  const onMouseOut =
                    isCollapsed && EXPERIMENTAL_FLYOUT_ON_HOVER && flyoutIsOpen
                      ? this.mouseOutFlyoutArea
                      : null;
                  const onMouseOver =
                    isCollapsed && EXPERIMENTAL_FLYOUT_ON_HOVER && !flyoutIsOpen
                      ? this.mouseOverFlyoutArea
                      : null;
                  return (
                    <NavigationContainer
                      {...dataset}
                      topOffset={topOffset}
                      innerRef={this.getContainerRef}
                      onMouseEnter={this.mouseEnter}
                      onMouseOver={
                        EXPERIMENTAL_ALTERNATE_FLYOUT_BEHAVIOUR
                          ? onMouseOver
                          : null
                      }
                      onMouseOut={onMouseOut}
                      onMouseLeave={this.mouseLeave}
                    >
                      <ResizeControl
                        collapseToggleTooltipContent={
                          collapseToggleTooltipContent
                        }
                        expandCollapseAffordanceRef={
                          this.nodeRefs.expandCollapseAffordance
                        }
                        // eslint-disable-next-line camelcase
                        experimental_flyoutOnHover={
                          EXPERIMENTAL_FLYOUT_ON_HOVER
                        }
                        isDisabled={isResizeDisabled}
                        flyoutIsOpen={flyoutIsOpen}
                        isGrabAreaDisabled={itemIsDragging}
                        mouseIsOverNavigation={mouseIsOverNavigation}
                        onMouseOverButtonBuffer={
                          EXPERIMENTAL_ALTERNATE_FLYOUT_BEHAVIOUR
                            ? this.closeFlyout
                            : null
                        }
                        mutationRefs={[
                          { ref: this.pageRef, property: 'padding-left' },
                          { ref: this.productNavRef, property: 'width' },
                        ]}
                        navigation={navigationUIController}
                      >
                        {({ width }) => {
                          return (
                            <ContainerNavigationMask
                              disableInteraction={itemIsDragging}
                              onMouseOver={
                                EXPERIMENTAL_ALTERNATE_FLYOUT_BEHAVIOUR
                                  ? null
                                  : onMouseOver
                              }
                            >
                              <RenderBlocker
                                blockOnChange
                                itemIsDragging={itemIsDragging}
                              >
                                {!EXPERIMENTAL_HORIZONTAL_GLOBAL_NAV && (
                                  <ComposedGlobalNavigation
                                    containerNavigation={containerNavigation}
                                    datasets={datasets}
                                    globalNavigation={globalNavigation}
                                    topOffset={topOffset}
                                    experimental_alternateFlyoutBehaviour={
                                      EXPERIMENTAL_ALTERNATE_FLYOUT_BEHAVIOUR
                                    }
                                    closeFlyout={this.closeFlyout}
                                    view={view}
                                  />
                                )}

                                <ComposedContainerNavigation
                                  containerNavigation={containerNavigation}
                                  datasets={datasets}
                                  experimental_flyoutOnHover={
                                    EXPERIMENTAL_FLYOUT_ON_HOVER
                                  }
                                  expand={navigationUIController.expand}
                                  productNavigation={productNavigation}
                                  transitionState={transitionState}
                                  transitionStyle={transitionStyle}
                                  isCollapsed={isCollapsed}
                                  isResizing={isResizing}
                                  getNavRef={this.getNavRef}
                                  width={width}
                                  view={view}
                                />
                              </RenderBlocker>
                            </ContainerNavigationMask>
                          );
                        }}
                      </ResizeControl>
                    </NavigationContainer>
                  );
                }}
              </ResizeTransition>
            )}
          </Fragment>
        </NavigationAnalyticsContext>
      </LayoutEventListener>
    );
  };

  renderPageContent = ({ renderContentNav }: { renderContentNav: boolean }) => {
    const {
      // eslint-disable-next-line camelcase
      experimental_horizontalGlobalNav: EXPERIMENTAL_HORIZONTAL_GLOBAL_NAV,
      navigationUIController,
      onExpandStart,
      onExpandEnd,
      onCollapseStart,
      onCollapseEnd,
      children,
    } = this.props;
    const { flyoutIsOpen } = this.state;
    const {
      isResizing,
      isCollapsed,
      productNavWidth,
    } = navigationUIController.state;

    const leftOffset = EXPERIMENTAL_HORIZONTAL_GLOBAL_NAV ? 0 : undefined;

    return (
      <PageContent
        flyoutIsOpen={flyoutIsOpen}
        innerRef={this.getPageRef}
        isResizing={isResizing}
        isCollapsed={isCollapsed}
        productNavWidth={productNavWidth}
        onExpandStart={onExpandStart}
        onExpandEnd={onExpandEnd}
        onCollapseStart={onCollapseStart}
        onCollapseEnd={onCollapseEnd}
        topOffset={this.getTopOffset()}
        leftOffset={leftOffset}
        noContentNav={!renderContentNav}
      >
        {children}
      </PageContent>
    );
  };

  render() {
    const topOffset = this.getTopOffset();
    const renderContentNav = this.props.experimental_horizontalGlobalNav
      ? Boolean(this.props.containerNavigation)
      : true;
    return (
      <LayoutContainer topOffset={topOffset}>
        {this.renderNavigation({ renderContentNav })}
        {this.renderPageContent({ renderContentNav })}
      </LayoutContainer>
    );
  }
}
