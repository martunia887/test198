import * as React from 'react';
import styled from 'styled-components';
import { EditorView } from 'prosemirror-view';
import { Node as PMNode } from 'prosemirror-model';
import Spinner from '@atlaskit/spinner';
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

export interface JQLQueryProps {
  view: EditorView;
  node: PMNode;
}

class JQLQuery extends React.Component<JQLQueryProps> {
  loading: boolean = false;

  render() {
    return (
      <Wrapper>
        {this.loading ? (
          <Spinner size="medium" />
        ) : (
          <PanelTextInput
            onSubmit={this.onSubmit}
            placeholder="project = ED"
            autoFocus={true}
          />
        )}
      </Wrapper>
    );
  }

  private onSubmit = jql => {
    this.loading = true;
    this.forceUpdate();

    resolveJql(jql).then(jqlQuery => {
      this.loading = false;
      this.forceUpdate();

      const { state, dispatch } = this.props.view;
      const { pos } = state.selection.$from;

      dispatch(
        replaceWithJqlTable(jqlQuery, pos, pos + this.props.node.nodeSize)(
          state.tr,
        ),
      );
    });
  };
}

export default class JQLQueryView extends ReactNodeView {
  render(props) {
    return <JQLQuery view={this.view} node={this.node} />;
  }

  stopEvent(event) {
    return !!(this.dom && this.dom.contains(event.target));
  }

  ignoreMutation() {
    return true;
  }
}
