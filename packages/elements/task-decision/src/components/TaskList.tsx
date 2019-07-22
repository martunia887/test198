import * as React from 'react';
import { PureComponent, ReactNode } from 'react';
import ListWrapper from '../styled/ListWrapper';
import { FabricElementsAnalyticsContext } from '@atlaskit/analytics-namespaced-context';

export interface Props {
  listId?: string;
  children?: ReactNode;
  tagName?: string;
}

export default class TaskList extends PureComponent<Props, {}> {
  defaultProps = {
    tagName: 'li',
  };
  render() {
    const { listId, children } = this.props;

    const listSize = React.Children.count(children);

    if (!children) {
      return null;
    }

    // Data attributes are required for copy and paste from rendered content
    // to preserve the task
    return (
      <ListWrapper data-task-list-local-id="">
        {React.Children.map(children, (child, idx) => (
          <FabricElementsAnalyticsContext
            data={{
              listLocalId: listId,
              listSize,
              position: idx,
            }}
          >
            <div key={idx} data-task-local-id="">
              {child}
            </div>
          </FabricElementsAnalyticsContext>
        ))}
      </ListWrapper>
    );
  }
}
