import React from 'react';
import ReactDOM from 'react-dom';

import EditorContext from './../src/ui/EditorContext';
import WithEditorActions from './../src/ui/WithEditorActions';
import { ExampleEditor } from './5-full-page';

import { ContextPanel, AnnotationComponentProps } from '../src';
import { InlineComment } from '@atlaskit/editor-test-helpers';
import { exampleDocument } from '../example-helpers/example-doc-with-comments';

const sidebarAnnotationComponent = (
  portalRef: React.RefObject<HTMLDivElement>,
  contextPanel: React.RefObject<StatefulContextPanel>,
) =>
  class SidebarInlineCommentComponent extends React.Component<
    AnnotationComponentProps
  > {
    componentDidMount() {
      if (!contextPanel.current) {
        return;
      }

      contextPanel.current.setState({
        visible: true,
      });
    }

    componentWillUnmount() {
      if (!contextPanel.current) {
        return;
      }

      contextPanel.current.setState({
        visible: false,
      });
    }

    render() {
      // no where to render content
      if (!portalRef.current) {
        return null;
      }

      const comments = this.props.annotations
        .filter(ann => ann.type === 'inlineComment')
        .map(comment => (
          <InlineComment
            key={comment.id}
            comment={comment}
            onDelete={this.props.onDelete}
          />
        ));

      return ReactDOM.createPortal(comments, portalRef.current);
    }
  };

class StatefulContextPanel extends React.Component<{
  contentRef: React.Ref<HTMLDivElement>;
}> {
  state = {
    visible: false,
  };

  render() {
    return (
      <ContextPanel visible={this.state.visible}>
        <div ref={this.props.contentRef}></div>
      </ContextPanel>
    );
  }
}

class EditorWithSidebar extends React.Component {
  panel = React.createRef<StatefulContextPanel>();
  panelContent = React.createRef<HTMLDivElement>();

  render() {
    return (
      <ExampleEditor
        defaultValue={exampleDocument}
        contextPanel={
          <StatefulContextPanel
            ref={this.panel}
            contentRef={this.panelContent}
          />
        }
        annotationProvider={{
          component: sidebarAnnotationComponent(this.panelContent, this.panel),
        }}
      />
    );
  }
}

export default function Example() {
  return (
    <EditorContext>
      <div style={{ height: '100%' }}>
        <WithEditorActions
          render={actions => {
            return <EditorWithSidebar />;
          }}
        />
      </div>
    </EditorContext>
  );
}
