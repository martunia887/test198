import * as React from 'react';

import ProfileCard from './ProfileCard';
import LoadingState from './LoadingState';
import ErrorMessage from './ErrorMessage';
import filterActions from '../internal/filterActions';

import { CardElevationWrapper } from '../styled/Card';

import {
  ProfileCardResourcedProps,
  ProfileCardResourcedState,
  ProfileCardAction,
} from '../types';

export default class ProfilecardResourced extends React.Component<
  ProfileCardResourcedProps,
  ProfileCardResourcedState
> {
  static defaultProps: Partial<ProfileCardResourcedProps> = {
    actions: [],
    customElevation: 'e200',
  };

  _isMounted: boolean;

  constructor(props: ProfileCardResourcedProps) {
    super(props);
    this._isMounted = false;
  }

  state: ProfileCardResourcedState = {
    visible: false,
    isLoading: false,
    hasError: false,
    error: null,
    data: null,
  };

  componentDidMount() {
    this._isMounted = true;
    this.clientFetchProfile();
  }

  componentDidUpdate(prevProps: ProfileCardResourcedProps) {
    const { userId, cloudId } = this.props;
    if (userId !== prevProps.userId || cloudId !== prevProps.cloudId) {
      this.clientFetchProfile();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  clientFetchProfile = () => {
    const { cloudId, userId } = this.props;

    this.setState({
      isLoading: true,
      hasError: false,
      data: null,
    });

    this.props.resourceClient
      .getProfile(cloudId, userId)
      .then(
        res => this.handleClientSuccess(res),
        err => this.handleClientError(err),
      )
      .catch(err => this.handleClientError(err));
  };

  handleClientSuccess(res: any) {
    if (!this._isMounted) {
      return;
    }

    this.setState({
      isLoading: false,
      hasError: false,
      data: res,
    });
  }

  handleClientError(err: any) {
    if (!this._isMounted) {
      return;
    }
    this.setState({
      isLoading: false,
      hasError: true,
      error: err,
    });
  }

  filterActions = (): ProfileCardAction[] =>
    filterActions(this.props.actions, this.state.data);

  render(): React.ReactNode {
    const { isLoading, hasError, error, data } = this.state;
    const { analytics, customElevation } = this.props;

    if (isLoading) {
      return (
        <CardElevationWrapper customElevation={customElevation}>
          <LoadingState />
        </CardElevationWrapper>
      );
    } else if (hasError) {
      return (
        <CardElevationWrapper customElevation={customElevation}>
          <ErrorMessage errorType={error} reload={this.clientFetchProfile} />
        </CardElevationWrapper>
      );
    }

    const newProps = {
      hasError: hasError,
      errorType: error,
      clientFetchProfile: this.clientFetchProfile,
      analytics: analytics,
      ...data,
    };

    return (
      <CardElevationWrapper customElevation={customElevation}>
        <ProfileCard
          {...newProps}
          actions={this.filterActions()}
          customElevation="none"
        />
      </CardElevationWrapper>
    );
  }
}
