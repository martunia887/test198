import React from 'react';
import Tooltip from '@atlaskit/tooltip';
import { components } from '../src';
import { SelectWithoutAnalytics as Select } from '../src/Select';

const Option = (props: { data: any }) => {
  const { data } = props; // eslint-disable-line react/prop-types
  const { tooltipDescription, tooltipPosition } = data;
  const OptionComponent = components.Option as React.ComponentType<any>;

  return (
    <Tooltip content={tooltipDescription} position={tooltipPosition}>
      <OptionComponent data={data} {...props} />
    </Tooltip>
  );
};

const ElementBeforeExample = () => (
  <Select
    components={{
      Option,
    }}
    options={[
      {
        label: 'Adelaide',
        value: 'adelaide',
        tooltipDescription: 'Adelaide is a good city',
        tooltipPosition: 'left',
      },
      {
        label: 'Brisbane',
        value: 'brisbane',
        tooltipDescription: 'Brisbane is a fine city',
        tooltipPosition: 'right ',
      },
      {
        label: 'Canberra',
        value: 'canberra',
        tooltipDescription: 'Canberra is a city',
        tooltipPosition: 'bottom',
      },
      {
        label: 'Darwin',
        value: 'darwin',
        tooltipDescription: 'Darwin is a fine city',
        tooltipPosition: 'top',
      },
      {
        label: 'Hobart',
        value: 'hobart',
        tooltipDescription: 'Hobart is a beautiful city',
        tooltipPosition: 'mouse',
      },
      {
        label: 'Melbourne',
        value: 'melbourne',
        tooltipDescription: 'Melbourne is a cultured city',
        tooltipPosition: 'top',
      },
      {
        label: 'Perth',
        value: 'perth',
        tooltipDescription: 'Perth is a serene town',
        tooltipPosition: 'bottom',
      },
      {
        label: 'Sydney',
        value: 'sydney',
        tooltipDescription: 'Sydney is the shadow of Atlantis',
        tooltipPosition: 'left',
      },
    ]}
  />
);

export default ElementBeforeExample;
