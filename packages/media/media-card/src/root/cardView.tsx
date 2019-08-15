import * as React from 'react';
import { MouseEvent } from 'react';
import {
  MediaItemType,
  FileDetails,
  ImageResizeMode,
  FileItem,
} from '@atlaskit/media-client';
import {
  withAnalyticsEvents,
  createAndFireEvent,
  WithAnalyticsEventProps,
} from '@atlaskit/analytics-next';

import {
  SharedCardProps,
  CardStatus,
  CardEvent,
  OnSelectChangeFuncResult,
  CardDimensionValue,
  CardOnClickCallback,
  CardAction,
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

import { WithCardViewAnalyticsContext } from './withCardViewAnalyticsContext';

import { FabricChannel } from '@atlaskit/analytics-listeners';
import { AnalyticsEventPayolad } from '../utils/analyticsUtils';
import { EventType } from '@atlaskit/analytics-gas-types';

export const formatAnalyticsEventActionLabel = (word?: string) =>
  word
    ? 'mediaCard' +
      word
        .split(/\s/)
        .map(
          (substr: string) =>
            substr.charAt(0).toUpperCase() + substr.slice(1).toLowerCase(),
        )
        .join('')
    : 'mediaCardUnlabelledAction';

export interface CardViewOwnProps extends SharedCardProps {
  readonly status: CardStatus;
  readonly mediaItemType?: MediaItemType;
  readonly metadata?: FileDetails;
  readonly resizeMode?: ImageResizeMode;

  readonly onRetry?: () => void;
  readonly onClick?: CardOnClickCallback;
  readonly onMouseEnter?: (result: CardEvent) => void;
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
  state: CardViewState = {};

  componentDidMount() {
    this.saveElementWidth();
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
    const { onClick, onMouseEnter } = this;
    const { dimensions, appearance, mediaItemType } = this.props;
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
        actions={this.getActions()}
        selectable={selectable}
        selected={selected}
        disableOverlay={disableOverlay}
        mediaItemType={mediaItemType}
        previewOrientation={previewOrientation}
        onMenuToggle={this.onMenuToggle}
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

  private triggerAnalyticsEvent(
    eventType: EventType,
    action: string,
    actionSubject: string,
    actionSubjectId: string,
    label?: string,
  ) {
    const { metadata: mediaItemDetails, createAnalyticsEvent } = this.props;
    const payload: AnalyticsEventPayolad = {
      eventType,
      action,
      actionSubject,
      actionSubjectId,
      attributes: {
        fileAttributes: {
          fileSource: 'mediaCard',
          fileMediatype: mediaItemDetails && mediaItemDetails.mediaType,
          fileId: mediaItemDetails && mediaItemDetails.id,
          fileSize: mediaItemDetails && mediaItemDetails.size,
        },
        ...(label ? { label } : {}),
      },
    };
    createAnalyticsEvent &&
      createAnalyticsEvent(payload).fire(FabricChannel.media);
  }

  private onMenuToggle = (attrs: { isOpen: boolean }) => {
    // Will catch any event that opens the menu, not just click
    if (attrs.isOpen) {
      this.triggerAnalyticsEvent(
        'ui',
        'clicked',
        'button',
        'mediaCardDropDownMenu',
      );
    }
  };

  private getActions(): Array<CardAction> {
    const { actions = [] } = this.props;

    return actions.map((action: CardAction) => ({
      ...action,
      handler: (item?: FileItem, event?: Event) => {
        this.triggerAnalyticsEvent(
          'ui',
          'clicked',
          'button',
          formatAnalyticsEventActionLabel(action.label),
          action.label,
        );
        action.handler(item, event);
      },
    }));
  }
}

const createAndFireEventOnMedia = createAndFireEvent(FabricChannel.media);
/**
 * With this CardView class constructor version `createAnalyticsEvent` props is supplied for you, so
 * when creating instance of that class you don't need to worry about it.
 */
export const CardViewWithAnalyticsEvents = withAnalyticsEvents<
  CardViewBaseProps
>({
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
    return 'file';
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
