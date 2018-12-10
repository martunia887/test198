// @flow

export type ExperimentKey = string;

export type EnrollmentDetails = {
  cohort: string,
  isEligible: boolean,
  ineligibilityReasons?: string[],
};

export type ExperimentEnrollmentResolver = () => Promise<EnrollmentDetails>;

export type EnrollmentOptions = {
  [string]: any,
};

export type ExperimentDetails = {
  isEnrollmentDecided: boolean,
  enrollmentResolver: ExperimentEnrollmentResolver,
  enrollmentDetails?: EnrollmentDetails,
  enrollmentOptions?: EnrollmentOptions,
};

export type Experiments = {
  [ExperimentKey]: ExperimentDetails,
};

export type ExperimentEnrollmentConfig = {
  enrollmentResolver: ExperimentEnrollmentResolver,
  enrollmentOptions?: EnrollmentOptions,
};

export type ExperimentsConfig = {
  [ExperimentKey]: ExperimentEnrollmentResolver | ExperimentEnrollmentConfig,
};

export type ExposureDetails = EnrollmentDetails & {
  experimentKey: ExperimentKey,
};

export type ResolverPromises = {
  [ExperimentKey]: Promise<EnrollmentDetails>,
};
