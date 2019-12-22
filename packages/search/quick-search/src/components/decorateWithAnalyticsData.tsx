import * as React from 'react';
import { AnalyticsDecorator } from '@atlaskit/analytics';

import { Props } from './QuickSearch';
import { QS_ANALYTICS_EV_SUBMIT } from './constants';
import isReactElement from './isReactElement';

export default function decorateWithAnalyticsData(
  WrappedQuickSearch: React.ComponentClass<Props>,
): React.ComponentClass<Props> {
  return class DecorateWithAnalyticsData extends React.Component<Props> {
    static defaultProps = {
      children: [],
      value: '',
    };

    countChildren = () => {
      return React.Children.toArray(this.props.children).reduce<number>(
        (total, group) =>
          isReactElement(group)
            ? total +
              React.Children.count(
                (group as React.ReactElement<any>).props.children,
              )
            : total,
        0,
      );
    };

    render() {
      return (
        <AnalyticsDecorator
          matchPrivate
          match={QS_ANALYTICS_EV_SUBMIT}
          data={{
            resultCount: this.countChildren(),
            queryLength: this.props.value!.length,
          }}
        >
          <WrappedQuickSearch {...this.props} />
        </AnalyticsDecorator>
      );
    }
  };
}
