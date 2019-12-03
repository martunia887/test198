import React from 'react';
import { shallow } from 'enzyme';

import CohortTracker from '../CohortTracker';

describe('CohortTracker', () => {
  let mockExposureDetails: any;
  let mockEnrollmentOptions: any;
  let mockOnExposure: any;

  beforeEach(() => {
    mockExposureDetails = {
      cohort: 'control',
      experimentKey: 'myExperimentKey',
      isEligible: true,
    };
    mockEnrollmentOptions = {
      example: 'value',
    };

    mockOnExposure = jest.fn();
  });

  it('should call onExposure when mounted', () => {
    shallow(
      <CohortTracker
        exposureDetails={mockExposureDetails}
        options={mockEnrollmentOptions}
        onExposure={mockOnExposure}
      />,
    );

    expect(mockOnExposure).toBeCalledWith(
      mockExposureDetails,
      mockEnrollmentOptions,
    );
  });

  it('should not have a presence in the dom', () => {
    const wrapper = shallow(
      <CohortTracker
        exposureDetails={mockExposureDetails}
        onExposure={mockOnExposure}
      />,
    );

    expect(wrapper.isEmptyRender()).toBeTruthy();
  });
});
