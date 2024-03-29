import * as React from 'react';
import {
  NAVIGATION_CHANNEL,
  OPERATIONAL_EVENT_TYPE,
  withAnalyticsEvents,
} from '../utils/analytics';
import {
  AnalyticsEventPayload,
  WithAnalyticsEventProps,
} from '@atlaskit/analytics-next';

const DATA_PROVIDER_SUBJECT = 'atlassianSwitcherDataProvider';

export enum Status {
  LOADING = 'loading',
  COMPLETE = 'complete',
  ERROR = 'error',
}

export interface ResultComplete<T> {
  status: Status.COMPLETE;
  data: T;
}

export interface ResultLoading {
  status: Status.LOADING;
  data: null;
}

export interface ResultError {
  status: Status.ERROR;
  error: any;
  data: null;
}

export const isComplete = <T>(
  result: ProviderResult<T>,
): result is ResultComplete<T> => result.status === Status.COMPLETE;

export const isError = <T>(result: ProviderResult<T>): result is ResultError =>
  result.status === Status.ERROR;

export const isLoading = <T>(
  result: ProviderResult<T>,
): result is ResultLoading => result.status === Status.LOADING;

export type ProviderResult<T> = ResultComplete<T> | ResultLoading | ResultError;

interface PropsToPromiseMapper<P, D> extends Function {
  (props: P): Promise<D>;
}

interface PropsToValueMapper<P, D> {
  (props: P): D;
}

export interface DataProviderProps<D> {
  children: (props: ProviderResult<D>) => React.ReactNode;
}

export default function<P, D>(
  name: string,
  mapPropsToPromise: PropsToPromiseMapper<Readonly<P>, D>,
  mapPropsToInitialValue?: PropsToValueMapper<Readonly<P>, D | void>,
) {
  const getInitialState = (props: Readonly<P>): ProviderResult<D> => {
    if (mapPropsToInitialValue) {
      const initialValue = mapPropsToInitialValue(props);
      if (initialValue !== undefined) {
        return {
          status: Status.COMPLETE,
          data: initialValue,
        };
      }
    }

    return {
      status: Status.LOADING,
      data: null,
    };
  };

  const DataProvider = class extends React.Component<
    P & DataProviderProps<D> & WithAnalyticsEventProps
  > {
    acceptResults = true;
    state = getInitialState(this.props);

    static displayName = `DataProvider(${name})`;

    componentWillUnmount() {
      /**
       * Promise resolved after component is unmounted to be ignored
       */
      this.acceptResults = false;
    }

    componentDidMount() {
      mapPropsToPromise(this.props)
        .then(result => {
          this.onResult(result);
        })
        .catch(error => {
          this.onError(error);
        });
    }

    private fireOperationalEvent = (payload: AnalyticsEventPayload) => {
      if (this.props.createAnalyticsEvent) {
        this.props
          .createAnalyticsEvent({
            eventType: OPERATIONAL_EVENT_TYPE,
            actionSubject: DATA_PROVIDER_SUBJECT,
            ...payload,
            attributes: {
              ...payload.attributes,
              outdated: !this.acceptResults,
            },
          })
          .fire(NAVIGATION_CHANNEL);
      }
    };

    onResult(value: D) {
      if (this.acceptResults) {
        this.setState({
          data: value,
          status: Status.COMPLETE,
        });
      }

      this.fireOperationalEvent({
        action: 'receivedResult',
        actionSubjectId: name,
      });
    }

    onError(error: any) {
      /**
       * Do not transition from "complete" state to "error"
       */
      if (this.acceptResults && !isComplete(this.state)) {
        this.setState({
          error,
          status: Status.ERROR,
        });
      }

      this.fireOperationalEvent({
        action: 'failed',
        actionSubjectId: name,
      });
    }

    render() {
      return this.props.children(this.state);
    }
  };

  return withAnalyticsEvents()(DataProvider);
}
