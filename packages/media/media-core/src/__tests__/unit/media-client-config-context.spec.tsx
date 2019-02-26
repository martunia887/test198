import * as React from 'react';
import { mount } from 'enzyme';
import { MediaClientConfigContext } from '../..';

class DummyClass extends React.Component {
  render() {
    return (
      <div>
        <MediaClientConfigContext.Consumer>
          {mediaClientConfig => (
            <div id="some-div">
              {mediaClientConfig
                ? 'config transported ' + mediaClientConfig.authProvider()
                : 'no config'}
            </div>
          )}
        </MediaClientConfigContext.Consumer>
      </div>
    );
  }
}

describe('MediaClientConfigContext', () => {
  it('should transport given media config', () => {
    const authProvider = jest.fn().mockReturnValue(42);
    const component = mount(
      <MediaClientConfigContext.Provider
        value={{
          authProvider,
        }}
      >
        <DummyClass />
      </MediaClientConfigContext.Provider>,
    );
    expect(component.find("div[id='some-div']").text()).toBe(
      'config transported 42',
    );
  });

  it('should user default provider', () => {
    const component = mount(<DummyClass />);
    expect(component.find("div[id='some-div']").text()).toBe('no config');
  });
});
