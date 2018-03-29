import * as React from 'react';
import { MouseEvent } from 'react';
import {
  MediaItemType,
  MediaItemDetails,
  LinkDetails,
  FileDetails,
  UrlPreview,
  ImageResizeMode,
} from '@atlaskit/media-core';
import {
  withAnalyticsEvents,
  createAndFireEvent,
} from '@atlaskit/analytics-next';
import { WithAnalyticsEventProps } from '../analytics-next';
import * as deepEqual from 'fast-deep-equal';

import {
  SharedCardProps,
  CardStatus,
  CardEvent,
  OnSelectChangeFuncResult,
  CardDimensionValue,
  CardOnClickCallback,
} from '../index';
import { LinkCard } from '../links';
import { FileCard } from '../files';
import { isLinkDetails } from '../utils/isLinkDetails';
import { breakpointSize } from '../utils/breakpoint';
import {
  defaultImageCardDimensions,
  getDefaultCardDimensions,
} from '../utils/cardDimensions';
import { isValidPercentageUnit } from '../utils/isValidPercentageUnit';
import { getCSSUnitValue } from '../utils/getCSSUnitValue';
import { getElementDimension } from '../utils/getElementDimension';
import { Wrapper } from './styled';

import { WithCardViewAnalyticsContext } from './withCardViewAnalyticsContext';

export interface CardViewOwnProps extends SharedCardProps {
  readonly status: CardStatus;
  readonly mediaItemType?: MediaItemType;
  readonly metadata?: MediaItemDetails;
  readonly resizeMode?: ImageResizeMode;

  readonly onRetry?: () => void;
  readonly onClick?: CardOnClickCallback;
  readonly onMouseEnter?: (result: CardEvent) => void;
  readonly onSelectChange?: (result: OnSelectChangeFuncResult) => void;

  // FileCardProps
  readonly dataURI?: string;
  readonly progress?: number;
}

export interface CardViewState {
  elementWidth?: number;
}

export type CardViewBaseProps = CardViewOwnProps &
  WithAnalyticsEventProps & {
    readonly mediaItemType: MediaItemType;
  };

/**
 * This is classic vanilla CardView class. To create an instance of class one would need to supply
 * `createAnalyticsEvent` prop to satisfy it's Analytics Events needs.
 */
export class CardViewBase extends React.Component<
  CardViewBaseProps,
  CardViewState
> {
  private componentHasMountedAtTime: number;
  private hasBeenShown: boolean;

  constructor(props) {
    super(props);
    this.state = {};
    this.componentHasMountedAtTime = 0;
  }

  componentDidMount() {
    this.componentHasMountedAtTime = Date.now();
    this.saveElementWidth();
    this.fireShowedAnalyticsEvent(this.props);
  }

  private fireShowedAnalyticsEvent({ status }: CardViewBaseProps) {
    if (!this.hasBeenShown && (status === 'error' || status === 'complete')) {
      const loadTime = Date.now() - this.componentHasMountedAtTime;
      this.props
        .createAnalyticsEvent({ action: 'shown', loadTime })
        .fire('media');
      this.hasBeenShown = true;
    }
  }

  componentWillReceiveProps(nextProps: CardViewBaseProps) {
    const { selected: currSelected } = this.props;
    const { selectable: nextSelectable, selected: nextSelected } = nextProps;

    // need to coerce to booleans as both "undefined" and "false" are considered NOT selected
    const cs: boolean = !!currSelected;
    const ns: boolean = !!nextSelected;

    if (nextSelectable && cs !== ns) {
      this.fireOnSelectChangeToConsumer(ns);
    }

    this.fireShowedAnalyticsEvent(nextProps);
  }

  private fireOnSelectChangeToConsumer = (newSelectedState: boolean): void => {
    const { metadata, selectable, onSelectChange } = this.props;

    if (selectable && onSelectChange) {
      onSelectChange({
        selected: newSelectedState,
        mediaItemDetails: metadata,
      });
    }
  };

  // This width is only used to calculate breakpoints, dimensions are passed down as
  // integrator pass it to the root component
  private get width(): CardDimensionValue {
    const { elementWidth } = this.state;
    if (elementWidth) {
      return elementWidth;
    }

    const { width } = this.props.dimensions || { width: undefined };

    if (!width) {
      return defaultImageCardDimensions.width;
    }

    return getCSSUnitValue(width);
  }

  // If the dimensions.width is a percentage, we need to transform it
  // into a pixel value in order to get the right breakpoints applied.
  saveElementWidth() {
    const { dimensions } = this.props;
    if (!dimensions) {
      return;
    }

    const { width } = dimensions;

    if (width && isValidPercentageUnit(width)) {
      const elementWidth = getElementDimension(this, 'width');

      this.setState({ elementWidth });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const sameProps = deepEqual(this.props, nextProps);
    if (!sameProps) {
      // console.group(`id=${this.tmpIdHack} shouldComponentUpdate`);
      // console.log('should render props changed');
      // console.log(this.props, '->', nextProps);
      // console.groupEnd();
      return true;
    }
    const sameState = deepEqual(this.state, nextState);
    if (!sameState) {
      // console.group(`id=${this.tmpIdHack} shouldComponentUpdate`);
      // console.log('should render state changed');
      // console.log(this.state, '->', nextState);
      // console.groupEnd();
      return true;
    }

    // console.log('should not render');
    return false;
  }

  render() {
    // console.count(`id=${this.tmpIdHack} render cardView`);
    const { onClick, onMouseEnter } = this;
    const { dimensions, appearance, mediaItemType } = this.props;
    const wrapperDimensions = dimensions
      ? dimensions
      : mediaItemType === 'file'
        ? getDefaultCardDimensions(appearance)
        : undefined;
    let card;

    if (mediaItemType === 'link') {
      card = this.renderLink();
    } else if (mediaItemType === 'file') {
      card = this.renderFile();
    }

    return (
      <Wrapper
        mediaItemType={mediaItemType}
        breakpointSize={breakpointSize(this.width)}
        appearance={appearance}
        dimensions={wrapperDimensions}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
      >
        {card}
      </Wrapper>
    );
  }

  private renderLink = () => {
    const {
      status,
      metadata,
      resizeMode,
      onRetry,
      appearance,
      dimensions,
      actions,
      selectable,
      selected,
    } = this.props;

    return (
      <LinkCard
        status={status}
        details={metadata as LinkDetails | UrlPreview}
        resizeMode={resizeMode}
        onRetry={onRetry}
        appearance={appearance}
        dimensions={dimensions}
        actions={actions}
        selectable={selectable}
        selected={selected}
      />
    );
  };

  private renderFile = () => {
    const {
      status,
      metadata,
      dataURI,
      progress,
      onRetry,
      resizeMode,
      appearance,
      dimensions,
      actions,
      selectable,
      selected,
    } = this.props;

    return (
      <FileCard
        status={status}
        details={metadata as FileDetails}
        dataURI={dataURI}
        progress={progress}
        onRetry={onRetry}
        resizeMode={resizeMode}
        appearance={appearance}
        dimensions={dimensions}
        actions={actions}
        selectable={selectable}
        selected={selected}
      />
    );
  };

  private onClick = (event: MouseEvent<HTMLDivElement>) => {
    const { onClick, metadata: mediaItemDetails } = this.props;
    if (onClick) {
      onClick({ event, mediaItemDetails });
    }
  };

  private onMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    const { onMouseEnter, metadata: mediaItemDetails } = this.props;
    if (onMouseEnter) {
      onMouseEnter({ event, mediaItemDetails });
    }
  };
}

const createAndFireEventOnMedia = createAndFireEvent('media');
/**
 * With this CardView class constructor version `createAnalyticsEvent` props is supplied for you, so
 * when creating instance of that class you don't need to worry about it.
 */
export const CardViewWithAnalyticsEvents = withAnalyticsEvents({
  onClick: createAndFireEventOnMedia({ action: 'clicked' }),
})(CardViewBase);

/**
 * This if final version of CardView that is exported to the consumer. This version wraps everything
 * with Analytics Context information so that all the Analytics Events created anywhere inside CardView
 * will have it automatically.
 */
export class CardView extends React.Component<CardViewOwnProps, CardViewState> {
  static defaultProps: Partial<CardViewOwnProps> = {
    appearance: 'auto',
  };

  private get mediaItemType(): MediaItemType {
    const { mediaItemType, metadata } = this.props;
    if (mediaItemType) {
      return mediaItemType;
    }

    return isLinkDetails(metadata) ? 'link' : 'file';
  }

  render() {
    const mediaItemType = this.mediaItemType;

    return (
      <WithCardViewAnalyticsContext
        {...this.props}
        mediaItemType={mediaItemType}
      >
        <CardViewWithAnalyticsEvents
          {...this.props}
          mediaItemType={mediaItemType}
        />
      </WithCardViewAnalyticsContext>
    );
  }
}
