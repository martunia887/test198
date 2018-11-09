// @flow

import React from 'react';
import { mount } from 'enzyme';
import { AnalyticsContext } from '../..';
import { AnalyticsContextConsumer } from '../../AnalyticsContext';

it('should render', () => {
  const wrapper = mount(
    <AnalyticsContext data={{}}>
      <div />
    </AnalyticsContext>,
  );

  expect(wrapper.find('div')).toHaveLength(1);
});

it("should add analytics context data to child's getAnalyticsContext context callback", () => {
  let getAnalyticsContext = () => [];
  mount(
    <AnalyticsContext data={{ a: 'b' }}>
      <AnalyticsContextConsumer>
        {getter => {
          getAnalyticsContext = getter;
          return null;
        }}
      </AnalyticsContextConsumer>
    </AnalyticsContext>,
  );

  expect(getAnalyticsContext()).toEqual([{ a: 'b' }]);
});

it("should prepend analytics context data from ancestors to child's getAnalyticsContext context callback", () => {
  let getAnalyticsContext = () => [];
  mount(
    <AnalyticsContext data={{ a: 'e' }}>
      <AnalyticsContext data={{ c: 'd' }}>
        <AnalyticsContext data={{ a: 'b' }}>
          <AnalyticsContextConsumer>
            {getter => {
              getAnalyticsContext = getter;
              return null;
            }}
          </AnalyticsContextConsumer>
        </AnalyticsContext>
      </AnalyticsContext>
    </AnalyticsContext>,
  );

  expect(getAnalyticsContext()).toEqual([{ a: 'e' }, { c: 'd' }, { a: 'b' }]);
});

it('should gracefully handle updates to context data', () => {
  const spy = jest.fn();
  class UseState extends React.Component<
    { children: Function, defaultState: {} },
    {},
  > {
    state = this.props.defaultState;
    render() {
      return this.props.children(this.state, s => this.setState(s));
    }
  }
  const wrapper = mount(
    <UseState defaultState={{ c: 'initial' }}>
      {(state, setState) => (
        <AnalyticsContext data={{ a: 'e' }}>
          <AnalyticsContext data={state}>
            <AnalyticsContext data={{ a: 'b' }}>
              <AnalyticsContextConsumer>
                {getContext => (
                  <button
                    onClick={() => {
                      spy(getContext());
                      setState({ c: 'updated' });
                    }}
                  />
                )}
              </AnalyticsContextConsumer>
            </AnalyticsContext>
          </AnalyticsContext>
        </AnalyticsContext>
      )}
    </UseState>,
  );

  wrapper.find('button').simulate('click');
  wrapper.find('button').simulate('click');
  expect(spy).nthCalledWith(1, [{ a: 'e' }, { c: 'initial' }, { a: 'b' }]);
  expect(spy).nthCalledWith(2, [{ a: 'e' }, { c: 'updated' }, { a: 'b' }]);
});
