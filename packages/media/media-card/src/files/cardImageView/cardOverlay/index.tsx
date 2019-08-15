import * as React from 'react';
import { MouseEvent, Component, ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';
import { MediaType } from '@atlaskit/media-client';
import TickIcon from '@atlaskit/icon/glyph/check';
import { Ellipsify } from '@atlaskit/media-ui';
import { messages } from '@atlaskit/media-ui';
// We dont require things directly from "utils" to avoid circular dependencies
import { FileIcon } from '../../../utils/fileIcon';
import { ErrorIcon } from '../../../utils/errorIcon';
import CardActions from '../../../utils/cardActions';
import { CardAction, CardEventHandler } from '../../../actions';

import {
  TickBox,
  Overlay,
  ErrorLine,
  LeftColumn,
  TopRow,
  BottomRow,
  RightColumn,
  ErrorMessage,
  Retry,
  TitleWrapper,
  Subtitle,
  Metadata,
  ErrorWrapper,
} from './styled';
import {
  WithAnalyticsEventProps,
  withAnalyticsEvents,
} from '@atlaskit/analytics-next';
import { FabricChannel } from '@atlaskit/analytics-listeners';

export interface CardOverlayProps {
  mediaType?: MediaType;
  mediaName?: string;
  subtitle?: string;

  selectable?: boolean;
  selected?: boolean;
  persistent: boolean;

  error?: ReactNode;
  noHover?: boolean;
  onRetry?: () => void;

  actions?: Array<CardAction>;
  icon?: string;
  onMenuToggle?: (attrs: { isOpen: boolean }) => void;
}

export interface CardOverlayState {
  isMenuExpanded: boolean;
}

type CardOverlayBaseProps = CardOverlayProps & WithAnalyticsEventProps;

export class CardOverlayBase extends Component<
  CardOverlayBaseProps,
  CardOverlayState
> {
  static defaultProps = {
    actions: [],
    mediaName: '',
  };

  constructor(props: CardOverlayProps) {
    super(props);

    this.state = {
      isMenuExpanded: false,
    };
  }

  private get wrapperClassNames() {
    const {
      error,
      noHover,
      selectable,
      selected,
      mediaType,
      persistent,
    } = this.props;
    const { isMenuExpanded } = this.state;

    return error
      ? cx('overlay', { error, active: isMenuExpanded })
      : cx('overlay', mediaType, {
          active: isMenuExpanded,
          selectable,
          selected,
          // Yes, you right. We put "persistent" class when it is NOT persistent. 🤦
          persistent: !persistent,
          noHover,
        });
  }

  render() {
    const { error, noHover, mediaName, persistent, actions } = this.props;
    const titleText = error || !mediaName ? '' : mediaName;
    const menuTriggerColor = !persistent ? 'white' : undefined;

    return (
      <Overlay
        hasError={!!error}
        noHover={noHover}
        className={this.wrapperClassNames}
      >
        <TopRow className={'top-row'}>
          {this.errorLine()}
          <TitleWrapper className={'title'}>
            <Ellipsify text={titleText} lines={2} />
          </TitleWrapper>
          {this.tickBox()}
        </TopRow>
        <BottomRow className={'bottom-row'}>
          <LeftColumn>{this.bottomLeftColumn()}</LeftColumn>
          <RightColumn>
            {actions ? (
              <CardActions
                actions={actions}
                onToggle={this.onMenuToggle}
                triggerColor={menuTriggerColor}
              />
            ) : null}
          </RightColumn>
        </BottomRow>
      </Overlay>
    );
  }

  errorLine() {
    const error = this.props.error;
    return (
      error && (
        <ErrorLine>
          <ErrorMessage>{this.props.error}</ErrorMessage>
        </ErrorLine>
      )
    );
  }

  tickBox() {
    const { selected, selectable } = this.props;
    const tick = <TickIcon label="tick" />;
    const className = cx('tickbox', { selected });

    return selectable && <TickBox className={className}> {tick} </TickBox>;
  }

  bottomLeftColumn() {
    const { error, onRetry } = this.props;

    if (error) {
      if (!onRetry) {
        return <ErrorIcon />;
      }

      return (
        <ErrorWrapper>
          <ErrorIcon />
          <Retry onClick={onRetry}>
            <FormattedMessage {...messages.retry} />
          </Retry>
        </ErrorWrapper>
      );
    } else {
      const { mediaType, subtitle, icon } = this.props;
      const classNames = cx('metadata');

      const fileIcon =
        mediaType || icon ? (
          <FileIcon mediaType={mediaType} iconUrl={icon} />
        ) : null;

      const subtitleEl = subtitle ? (
        <Subtitle className="file-size">{subtitle}</Subtitle>
      ) : null;

      return (
        <div>
          <Metadata className={classNames}>
            {fileIcon}
            {subtitleEl}
          </Metadata>
        </div>
      );
    }
  }

  onMenuToggle = (attrs: { isOpen: boolean }) => {
    const { createAnalyticsEvent } = this.props;
    this.setState({ isMenuExpanded: attrs.isOpen });
    if (createAnalyticsEvent && attrs.isOpen) {
      const eventType = 'ui';
      const action = 'clicked';
      const actionSubject = 'button';
      const actionSubjectId = 'mediaCardDropDownMenu';
      const event = createAnalyticsEvent({
        eventType,
        action,
        actionSubject,
        actionSubjectId,
        attributes: {
          payloadPartOfAttributes: {},
        },
      });
      event.fire(FabricChannel.media);
    }
  };

  removeBtnClick(handler: CardEventHandler) {
    return (e: MouseEvent<HTMLDivElement, any>) => {
      e.preventDefault();
      e.stopPropagation();
      handler();
    };
  }
}

export const CardOverlay = withAnalyticsEvents<CardOverlayBaseProps>()(
  CardOverlayBase,
);
