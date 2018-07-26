import * as React from 'react';

import { MentionPickerStyle, MentionPickerInfoStyle } from './styles';
import { OnMentionEvent } from '../../types';
import { MentionProvider, MentionStats } from '../../api/MentionResource';
import { PresenceProvider } from '../../api/PresenceResource';
import ResourcedMentionList from '../ResourcedMentionList';
import Popup from '../Popup';
import debug from '../../util/logger';
import uniqueId from '../../util/id';
import { withAnalyticsEvents } from '@atlaskit/analytics-next';

import { WithAnalyticsEventProps } from '@atlaskit/analytics-next-types';

import * as UtilAnalytics from '../../util/analytics';

export interface OnOpen {
  (): void;
}

export interface OnClose {
  (): void;
}

export type Position = 'above' | 'below' | 'auto';

export interface Props {
  resourceProvider: MentionProvider;
  presenceProvider?: PresenceProvider;
  query?: string;

  onSelection?: OnMentionEvent;
  onOpen?: OnOpen;
  onClose?: OnClose;

  target?: string;
  position?: Position;
  zIndex?: number | string;
  offsetX?: number;
  offsetY?: number;
}

export interface State {
  visible: boolean;
  info?: string;
}

/**
 * @class MentionPicker
 */
export class MentionPicker extends React.PureComponent<
  Props & WithAnalyticsEventProps,
  State
> {
  private subscriberKey: string;
  private mentionListRef: ResourcedMentionList;

  static defaultProps = {
    onSelection: () => {},
    onOpen: () => {},
    onClose: () => {},
  };

  constructor(props) {
    super(props);
    this.subscriberKey = uniqueId('ak-mention-picker');
    this.state = {
      visible: false,
    };
    this.applyPropChanges({} as Props, props);
  }

  componentDidMount() {
    this.subscribeResourceProvider(this.props.resourceProvider);
  }

  componentWillReceiveProps(nextProps) {
    this.applyPropChanges(this.props, nextProps);
  }

  componentWillUnmount() {
    this.unsubscribeResourceProvider(this.props.resourceProvider);
  }

  selectNext = () => {
    if (this.mentionListRef) {
      this.mentionListRef.selectNext();
    }
  };

  selectPrevious = () => {
    if (this.mentionListRef) {
      this.mentionListRef.selectPrevious();
    }
  };

  selectIndex = (index: number, callback?: () => any): void => {
    if (this.mentionListRef) {
      this.mentionListRef.selectIndex(index, callback);
    }
  };

  selectId = (id: string, callback?: () => any): void => {
    if (this.mentionListRef) {
      this.mentionListRef.selectId(id, callback);
    }
  };

  chooseCurrentSelection = () => {
    if (this.mentionListRef) {
      this.mentionListRef.chooseCurrentSelection();
    }
  };

  mentionsCount = (): number => {
    if (this.mentionListRef) {
      return this.mentionListRef.mentionsCount();
    }

    return 0;
  };

  // Internal
  private applyPropChanges(prevProps: Props, nextProps: Props) {
    const oldResourceProvider = prevProps.resourceProvider;
    const newResourceProvider = nextProps.resourceProvider;

    const resourceProviderChanged = oldResourceProvider !== newResourceProvider;

    // resource provider
    if (resourceProviderChanged) {
      this.unsubscribeResourceProvider(oldResourceProvider);
      this.subscribeResourceProvider(newResourceProvider);
    }
  }

  private subscribeResourceProvider(resourceProvider) {
    if (resourceProvider) {
      resourceProvider.subscribe(
        this.subscriberKey,
        this.filterChange,
        this.filterError,
        this.filterInfo,
      );
    }
  }

  private unsubscribeResourceProvider(resourceProvider) {
    if (resourceProvider) {
      resourceProvider.unsubscribe(this.subscriberKey);
    }
  }

  /**
   * Called after the 'visible' state is changed to decide whether the onOpen or onClose
   * handlers should be called.
   *
   * It should be noted that the visible state of the component is not considered in
   * this function. Instead the old state and new state should be passed as parameters.
   */
  private onFilterVisibilityChange = (oldVisibility, newVisibility) => {
    if (oldVisibility !== newVisibility) {
      if (newVisibility) {
        if (this.props.onOpen) {
          this.props.onOpen();
        }
      } else {
        if (this.props.onClose) {
          this.props.onClose();
        }
      }
    }
  };

  // internal, used for callbacks
  private filterChange = (mentions, query: string, stats?: MentionStats) => {
    debug('ak-mention-picker.filterChange', mentions.length);
    const wasVisible = this.state.visible;
    const visible = mentions.length > 0;
    this.setState({
      visible,
    });

    this.onFilterVisibilityChange(wasVisible, visible);

    if (stats && stats.remoteSearch) {
      UtilAnalytics.fireAnalyticsMentionTypeaheadEvent(this.props)(
        'rendered',
        stats.duration,
        query,
      );
    }
  };

  private filterError = error => {
    debug('ak-mention-picker.filterError', error);
    const wasVisible = this.state.visible;
    this.setState({
      visible: true,
      info: undefined,
    });

    this.onFilterVisibilityChange(wasVisible, true);
  };

  private filterInfo = info => {
    debug('ak-mention-picker.filterInfo', info);
    this.setState({
      info,
    } as State);
  };

  private handleMentionListRef = ref => {
    this.mentionListRef = ref;
  };

  render() {
    const {
      resourceProvider,
      presenceProvider,
      onSelection,
      query,
      target,
      position,
      zIndex,
      offsetX,
      offsetY,
    } = this.props;
    const { visible, info } = this.state;

    const resourceMentionList = (
      <ResourcedMentionList
        resourceProvider={resourceProvider}
        presenceProvider={presenceProvider}
        onSelection={onSelection}
        query={query}
        ref={this.handleMentionListRef}
      />
    );

    const infoContent =
      info && !visible ? (
        <MentionPickerInfoStyle>
          <p>{info}</p>
        </MentionPickerInfoStyle>
      ) : null;

    let content;

    if (position) {
      debug('target, position', target, position);
      if (target) {
        content = (
          <Popup
            target={target}
            relativePosition={position}
            zIndex={zIndex}
            offsetX={offsetX}
            offsetY={offsetY}
          >
            <div>
              {resourceMentionList}
              {infoContent}
            </div>
          </Popup>
        );
      } else {
        // don't show if we have a position, but no target yet
        content = null;
      }
    } else {
      content = (
        <div>
          {resourceMentionList}
          {infoContent}
        </div>
      );
    }

    return (
      /* old classnames are essential for Confluence tests */
      <MentionPickerStyle
        className="ak-mention-picker"
        visible={visible || info}
      >
        {content}
      </MentionPickerStyle>
    );
  }
}

// tslint:disable-next-line:variable-name
export const MentionPickerWithAnalytics: React.ComponentClass<
  Props
> = withAnalyticsEvents({})(MentionPicker) as React.ComponentClass<Props>;

type MentionPickerWithAnalytics = MentionPicker;

export default MentionPickerWithAnalytics;
