import React, { Component, Fragment, ComponentType } from 'react';

import CohortTracker from './CohortTracker';
import { ExperimentConsumer } from './ExperimentContext';
import {
  Experiments,
  ExposureDetails,
  ExperimentEnrollmentOptions,
  EnrollmentOptions,
} from './types';

type State = {
  forceFallback: boolean;
};

export type ExperimentComponentMap<BaseProps> = {
  fallback: ComponentType<BaseProps>;
  [key: string]: ComponentType<BaseProps>;
};

export default function asExperiment<BaseProps extends {}>(
  experimentComponentMap: ExperimentComponentMap<BaseProps>,
  experimentKey: string,
  callbacks: {
    onError: (error: Error, options?: ExperimentEnrollmentOptions) => void;
    onExposure: (
      exposureDetails: ExposureDetails,
      options?: ExperimentEnrollmentOptions,
    ) => void;
  },
  LoadingComponent?: ComponentType,
) {
  let contextOptions: EnrollmentOptions | undefined;
  return class ExperimentSwitch extends Component<BaseProps, State> {
    static displayName = 'ExperimentSwitch';

    state = {
      forceFallback: false,
      options: undefined,
    };

    onReceiveContext = (
      experiments: Experiments,
      options?: ExperimentEnrollmentOptions,
    ) => {
      const { forceFallback } = this.state;
      const { onExposure } = callbacks;

      contextOptions =
        options instanceof Function ? options(experimentKey) : options;

      if (forceFallback) {
        return this.renderFallback();
      }

      if (!(experimentKey in experiments)) {
        throw new Error(
          `Experiment Key ${experimentKey} does not exist in configuration`,
        );
      }

      const experimentDetails = experiments[experimentKey];
      if (!experimentDetails.isEnrollmentDecided) {
        // kick off the async check of the resolver
        experimentDetails.enrollmentResolver(contextOptions);

        // still waiting on whether or not to show an experiment
        if (LoadingComponent) {
          return <LoadingComponent />;
        }
        return null;
      }

      const { enrollmentDetails } = experimentDetails;
      if (!enrollmentDetails) {
        throw new Error(
          `Experiment ${experimentKey} has missing enrollment details`,
        );
      }

      const { cohort, isEligible, ineligibilityReasons } = enrollmentDetails;

      if (!(cohort in experimentComponentMap)) {
        throw new Error(
          `Cohort ${cohort} does not exist for experiment ${experimentKey}`,
        );
      }

      const View = isEligible
        ? experimentComponentMap[cohort]
        : experimentComponentMap.fallback;

      const exposureDetails: ExposureDetails = {
        experimentKey,
        cohort,
        isEligible,
        ineligibilityReasons,
      };

      return (
        <Fragment>
          <View {...(this.props as BaseProps)} key="experimentView" />
          <CohortTracker
            exposureDetails={exposureDetails}
            options={contextOptions}
            onExposure={onExposure}
            key="cohortTracker"
          />
        </Fragment>
      );
    };

    componentDidCatch(err: Error) {
      const { onError } = callbacks;

      onError(err, contextOptions);

      this.setState({
        forceFallback: true,
      });
    }

    renderFallback = () => {
      const FallbackView = experimentComponentMap.fallback;
      return <FallbackView {...(this.props as BaseProps)} />;
    };

    render() {
      return (
        <ExperimentConsumer>
          {({ experiments, options }) =>
            this.onReceiveContext(experiments, options)
          }
        </ExperimentConsumer>
      );
    }
  };
}
