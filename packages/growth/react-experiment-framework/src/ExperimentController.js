// @flow

import React, { Component, type Element } from 'react';
import { ExperimentProvider } from './ExperimentContext';
import type {
  ExperimentKey,
  EnrollmentDetails,
  Experiments,
  ExperimentsConfig,
  ResolverPromises,
} from './types';

type Props = {
  experimentsConfig: ExperimentsConfig,
  children?: Element<any>,
};

type State = {
  experiments: Experiments,
};

class ExperimentController extends Component<Props, State> {
  static displayName = 'ExperimentController';

  resolverPromises: ResolverPromises = {};

  constructor(props: Props) {
    super(props);

    const { experimentsConfig } = this.props;

    const intialExperiments = Object.keys(experimentsConfig).reduce(
      (cumulative: any, experimentKey: ExperimentKey) => ({
        ...cumulative,
        [experimentKey]: {
          isEnrollmentDecided: false,
          enrollmentResolver: () =>
            this.resolverPromises[experimentKey] ||
            this.resolveEnrollmentForExperiment(experimentKey),
          enrollmentOptions: experimentsConfig[experimentKey].enrollmentOptions,
        },
      }),
      {},
    );

    this.state = {
      experiments: intialExperiments,
    };
  }

  resolveEnrollmentForExperiment(experimentKey: ExperimentKey) {
    const { experimentsConfig } = this.props;
    let enrollmentResolver;
    let enrollmentOptions;

    if (
      experimentsConfig[experimentKey] &&
      experimentsConfig[experimentKey].enrollmentResolver
    ) {
      enrollmentResolver = experimentsConfig[experimentKey].enrollmentResolver;
      enrollmentOptions = experimentsConfig[experimentKey].enrollmentOptions;
    } else {
      enrollmentResolver = experimentsConfig[experimentKey];
    }

    // updates context after resolving
    const enrollmentPromise = enrollmentResolver(enrollmentOptions);

    enrollmentPromise.then((enrollmentDetails: EnrollmentDetails) => {
      this.setState({
        experiments: {
          [experimentKey]: {
            isEnrollmentDecided: true,
            enrollmentDetails,
            enrollmentOptions,
          },
        },
      });
    });

    // cache the resolver promise to avoid resolving enrollment multiple times
    this.resolverPromises[experimentKey] = enrollmentPromise;

    return enrollmentPromise;
  }

  render() {
    const { experiments } = this.state;
    const { children } = this.props;

    return (
      <ExperimentProvider value={experiments}>{children}</ExperimentProvider>
    );
  }
}

export default ExperimentController;
