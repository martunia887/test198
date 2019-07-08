import React from 'react';
import { mount } from 'enzyme';
import {
  default as ProviderFactory,
  WithProviders,
  Providers,
} from '../../../providerFactory';

describe('WithProviders', () => {
  it('should pass multiple providers to UI component', () => {
    const renderNode = () => <div />;
    const providerFactory = new ProviderFactory();
    providerFactory.setProvider('providerA', Promise.resolve());
    providerFactory.setProvider('providerB', Promise.resolve());

    const component = mount(
      <WithProviders
        providers={['providerA', 'providerB']}
        providerFactory={providerFactory}
        renderNode={renderNode}
      />,
    );
    const providers: Providers = component.state('providers');
    const nonEmptyProviders = Object.keys(providers).filter(
      providerName => providers[providerName],
    );

    expect(nonEmptyProviders.length).toBe(2);
    component.unmount();
  });
});
