import * as React from 'react';
import { Component } from 'react';
import debounce from 'lodash.debounce';
import { InfiniteScrollWrapper } from './styled';

export type ThresholdReachedEventHandler = () => void;

export interface InfiniteScrollProps {
  readonly delay?: number;
  readonly threshold?: number;

  readonly onThresholdReached?: ThresholdReachedEventHandler;
}

export interface InfiniteScrollState {}

export class InfiniteScroll extends Component<
  InfiniteScrollProps,
  InfiniteScrollState
> {
  private readonly div: React.RefObject<any>;

  constructor(props: InfiniteScrollProps) {
    super(props);
    this.div = React.createRef();
  }

  static defaultProps = {
    width: '100%',
    delay: 500,
    threshold: 100,
  };

  private scrollHeight: number = 0;

  componentDidMount() {
    this.checkThresholdDebounce();
  }

  componentDidUpdate() {
    this.checkThresholdDebounce();
  }

  render(): JSX.Element {
    const { children } = this.props;
    return (
      <InfiniteScrollWrapper
        innerRef={this.div}
        className="infinite-scroll"
        onScroll={this.checkThresholdDebounce}
      >
        {children}
      </InfiniteScrollWrapper>
    );
  }

  private checkThreshold = () => {
    const div = this.div.current;
    if (div === null) {
      return;
    }
    const threshold = this.props.threshold || 0;
    const position = div.scrollTop + div.offsetHeight;
    const thresholdModifier = 0.1;
    const adjustedThreshold = Math.min(
      threshold,
      div.scrollHeight * thresholdModifier,
    );

    const thresholdReached =
      position > this.scrollHeight &&
      position > div.scrollHeight - adjustedThreshold;

    if (thresholdReached) {
      this.scrollHeight = div.scrollHeight;

      if (this.props.onThresholdReached) {
        this.props.onThresholdReached();
      }
    }
  };

  private readonly checkThresholdDebounce = debounce(
    this.checkThreshold,
    this.props.delay,
    {
      leading: true,
      trailing: true,
    },
  );
}
