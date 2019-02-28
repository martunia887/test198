import * as React from 'react';
import styled from 'styled-components';
import { ReactNodeView } from '../../../nodeviews';
import PanelTextInput from '../../../ui/PanelTextInput';
import { colors } from '@atlaskit/theme';
import { resolveJql, replaceWithJqlTable } from '../../card/pm-plugins/jql';

const Wrapper = styled.div`
  display: flex;
  flex: 1;

  > input {
    padding: 6px 8px;
    border-radius: 3px;
    border: 2px solid ${colors.N40};

    :focus {
      border-color: ${colors.B100};
    }
  }
`;

class JQLQueryView extends ReactNodeView {
  render(props) {
    return (
      <Wrapper>
        <PanelTextInput
          onSubmit={this.onSubmit}
          placeholder="project = ED"
          autoFocus={true}
        />
      </Wrapper>
    );
  }

  stopEvent(event) {
    return !!(this.dom && this.dom.contains(event.target));
  }

  ignoreMutation() {
    return true;
  }

  private onSubmit = jql => {
    resolveJql(jql).then(jqlQuery => {
      const { state, dispatch } = this.view;
      const { pos } = state.selection.$from;
      dispatch(
        replaceWithJqlTable(jqlQuery, pos, pos + this.node.nodeSize)(state.tr),
      );
    });
  };
}

export default JQLQueryView;
