import * as React from 'react';
import styled from 'styled-components';
import { colors } from '@atlaskit/theme';

import EditorContext from './../src/ui/EditorContext';
import WithEditorActions from './../src/ui/WithEditorActions';
import { ExampleEditor } from './5-full-page';

import decisionAdf from '../example-helpers/templates/decision.adf.json';
import { EditorActions, ContextPanel } from '../src';

const isEmptyDoc = (adf: any) => adf.content.length === 0;

type TemplateDefinition = {
  title: string;
  desc: string;
  adf: any;
};

const templates: Array<TemplateDefinition> = [
  {
    title: 'Decision',
    desc:
      'Use this template to effectively guide your team in making a descision.',
    adf: decisionAdf,
  },
];

const TemplateCard = styled.div`
  border: 1px solid ${colors.N30};
  padding: 8px;
  border-radius: 5px;

  &:hover {
    background: ${colors.N10};
  }
`;

class TemplateDrawer extends React.Component<
  {
    actions: EditorActions;
  },
  {
    adf?: any;
    selectedTemplate?: TemplateDefinition;
  }
> {
  state = {
    selectedTemplate: undefined,
    adf: null,
  };

  showSidebar() {
    const noDoc = !this.state.adf;
    const emptyDoc = this.state.adf && isEmptyDoc(this.state.adf);
    const sameAsSelectedTemplate =
      this.state.adf &&
      this.state.selectedTemplate &&
      JSON.stringify(this.state.adf) ===
        JSON.stringify(this.state.selectedTemplate.adf);

    return noDoc || emptyDoc || sameAsSelectedTemplate;
  }

  selectTemplate(tmpl: TemplateDefinition, actions: EditorActions) {
    console.log('selecting', tmpl);

    this.setState({
      selectedTemplate: tmpl,
    });

    actions.replaceDocument(tmpl.adf);
  }

  renderTemplateDrawer(actions: EditorActions) {
    return (
      <div>
        {templates.map((tmpl, idx) => (
          <TemplateCard
            key={idx}
            onClick={() => this.selectTemplate(tmpl, actions)}
          >
            <h4>{tmpl.title}</h4>
            <p>{tmpl.desc}</p>
          </TemplateCard>
        ))}
      </div>
    );
  }

  render() {
    return (
      <ContextPanel visible={this.showSidebar()}>
        {this.renderTemplateDrawer(this.props.actions)}
      </ContextPanel>
    );
  }
}

// keeps track of the editor's document, and determines whether
// to show or hide the sidebar
class EditorWithSidebar extends React.Component<{
  actions: EditorActions;
}> {
  drawerRef = React.createRef<TemplateDrawer>();

  onChange = async () => {
    const actions = this.props.actions;
    const adf = await actions.getValue();

    // unfortunately we need to reach into the drawer
    // to update ADF, otherwise if we set state on this
    // component then we re-render the
    if (this.drawerRef.current) {
      this.drawerRef.current.setState({
        adf,
      });
    }
  };

  render() {
    return (
      <ExampleEditor
        onChange={this.onChange}
        contextPanel={
          <TemplateDrawer actions={this.props.actions} ref={this.drawerRef} />
        }
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
            return <EditorWithSidebar actions={actions} />;
          }}
        />
      </div>
    </EditorContext>
  );
}
