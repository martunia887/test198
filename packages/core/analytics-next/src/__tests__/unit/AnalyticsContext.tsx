import React from 'react';
import { mount } from 'enzyme';
import { AnalyticsContext as AnalyticsContextProvider } from '../..';
import { AnalyticsContext } from '../../AnalyticsContext';

interface Context {
  getAtlaskitAnalyticsContext: () => any;
}

const ContextConsumer = (props: { onClick: (context: any) => void }) => (
  <AnalyticsContext.Consumer>
    {({ getAtlaskitAnalyticsContext }) => {
      const onClick = () => {
        const analyticsContext = getAtlaskitAnalyticsContext();
        props.onClick(analyticsContext);
      };
      return <button onClick={onClick} />;
    }}
  </AnalyticsContext.Consumer>
);

it('should render', () => {
  const wrapper = mount(
    <AnalyticsContextProvider data={{}}>
      <div />
    </AnalyticsContextProvider>,
  );

  expect(wrapper.find('div')).toHaveLength(1);
});

it('should not create a component with multiple children', () => {
  expect(() => {
    mount(
      <AnalyticsContextProvider data={{}}>
        <div />
        <div />
      </AnalyticsContextProvider>,
    );
  }).toThrow();
});

it("should add analytics context data to child's getAnalyticsContext context callback", () => {
  let analyticsContext;
  const getContext = (context: Context) => {
    analyticsContext = context;
  };
  const wrapper = mount(
    <AnalyticsContextProvider data={{ a: 'b' }}>
      <ContextConsumer onClick={getContext} />
    </AnalyticsContextProvider>,
  );
  wrapper.find(ContextConsumer).simulate('click');

  expect(analyticsContext).toEqual([{ a: 'b' }]);
});

it("should prepend analytics context data from ancestors to child's getAnalyticsContext context callback", () => {
  let analyticsContext;
  const getContext = (context: Context) => {
    analyticsContext = context;
  };
  const wrapper = mount(
    <AnalyticsContextProvider data={{ a: 'e' }}>
      <AnalyticsContextProvider data={{ c: 'd' }}>
        <AnalyticsContextProvider data={{ a: 'b' }}>
          <ContextConsumer onClick={getContext} />
        </AnalyticsContextProvider>
      </AnalyticsContextProvider>
    </AnalyticsContextProvider>,
  );
  wrapper.find(ContextConsumer).simulate('click');

  expect(analyticsContext).toEqual([{ a: 'e' }, { c: 'd' }, { a: 'b' }]);
});
