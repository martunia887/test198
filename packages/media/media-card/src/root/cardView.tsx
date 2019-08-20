import * as React from 'react';
import { MouseEvent } from 'react';
import {
  MediaItemType,
  FileDetails,
  ImageResizeMode,
} from '@atlaskit/media-client';
import {
  withAnalyticsEvents,
  UIAnalyticsEventInterface,
} from '@atlaskit/analytics-next';

import {
  SharedCardProps,
  CardStatus,
  OnSelectChangeFuncResult,
  CardDimensionValue,
} from '../index';
import { FileCard } from '../files';
import { breakpointSize } from '../utils/breakpoint';
import {
  defaultImageCardDimensions,
  getDefaultCardDimensions,
} from '../utils/cardDimensions';
import { isValidPercentageUnit } from '../utils/isValidPercentageUnit';
import { getCSSUnitValue } from '../utils/getCSSUnitValue';
import { getElementDimension } from '../utils/getElementDimension';
import { Wrapper } from './styled';

import { createAndFireEventOnMedia } from '../utils/analytics';

export interface CardViewProps extends SharedCardProps {
  readonly status: CardStatus;
  readonly mediaItemType?: MediaItemType;
  readonly metadata?: FileDetails;
  readonly resizeMode?: ImageResizeMode;

  readonly onRetry?: () => void;
  readonly onClick?: (
    event: React.MouseEvent<HTMLDivElement>,
    analyticsEvent?: UIAnalyticsEventInterface,
  ) => void;
  readonly onMouseEnter?: (event: MouseEvent<HTMLDivElement>) => void;
  readonly onSelectChange?: (result: OnSelectChangeFuncResult) => void;

  // FileCardProps
  readonly dataURI?: string;
  readonly progress?: number;
  readonly disableOverlay?: boolean;
  readonly previewOrientation?: number;
}

export interface CardViewState {
  elementWidth?: number;
}

/**
 * This is classic vanilla CardView class. To create an instance of class one would need to supply
 * `createAnalyticsEvent` prop to satisfy it's Analytics Events needs.
 */
export class CardViewBase extends React.Component<
  CardViewProps,
  CardViewState
> {
  static defaultProps: Partial<CardViewProps> = {
    appearance: 'auto',
  };

  state: CardViewState = {};

  componentDidMount() {
    this.saveElementWidth();
  }

  componentWillReceiveProps(nextProps: CardViewProps) {
    const { selected: currSelected } = this.props;
    const { selectable: nextSelectable, selected: nextSelected } = nextProps;

    // need to coerce to booleans as both "undefined" and "false" are considered NOT selected
    const cs: boolean = !!currSelected;
    const ns: boolean = !!nextSelected;

    if (nextSelectable && cs !== ns) {
      this.fireOnSelectChangeToConsumer(ns);
    }
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

  render() {
    const {
      dimensions,
      appearance,
      mediaItemType,
      onClick,
      onMouseEnter,
    } = this.props;
    const shouldUsePointerCursor = mediaItemType === 'file';
    const wrapperDimensions = dimensions
      ? dimensions
      : getDefaultCardDimensions(appearance);

    return (
      <Wrapper
        shouldUsePointerCursor={shouldUsePointerCursor}
        breakpointSize={breakpointSize(this.width)}
        appearance={appearance}
        dimensions={wrapperDimensions}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
      >
        {this.renderFile()}
      </Wrapper>
    );
  }

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
      disableOverlay,
      mediaItemType,
      previewOrientation,
    } = this.props;

    return (
      <FileCard
        status={status}
        details={metadata}
        dataURI={dataURI}
        progress={progress}
        onRetry={onRetry}
        resizeMode={resizeMode}
        appearance={appearance}
        dimensions={dimensions}
        actions={actions}
        selectable={selectable}
        selected={selected}
        disableOverlay={disableOverlay}
        mediaItemType={mediaItemType}
        previewOrientation={previewOrientation}
      />
    );
  };
}

export const CardView = withAnalyticsEvents<CardViewProps>({
  onClick: createAndFireEventOnMedia({
    eventType: 'ui',
    action: 'clicked',
    actionSubject: 'mediaCard',
    actionSubjectId: 'mediaCardCardView',
  }),
})(CardViewBase);
