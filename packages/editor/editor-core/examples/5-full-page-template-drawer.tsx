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

class EditorWithSidebar extends React.Component<{
  actions: EditorActions;
}> {
  state = {
    sidebarVisible: true,
    selectedTemplate: null,
  };

  onChange = async () => {
    // TODO: re-order to reduce per-keystroke impact of getValue
    const actions = this.props.actions;
    const adf = await actions.getValue();

    if (isEmptyDoc(adf)) {
      this.setState({
        sidebarVisible: true,
      });
    } else if (!this.state.selectedTemplate && this.state.sidebarVisible) {
      this.setState({
        sidebarVisible: false,
      });
    }
  };

  // handle typing to dismiss right after selecting a template
  onInput = () => {
    if (this.state.selectedTemplate && this.state.sidebarVisible) {
      this.setState({
        selectedTemplate: null,
        sidebarVisible: false,
      });
    }
  };

  selectTemplate(tmpl: TemplateDefinition) {
    this.setState({
      selectedTemplate: tmpl,
      sidebarVisible: true,
    });

    this.props.actions.replaceDocument(tmpl.adf);
  }

  render() {
    return (
      <div
        style={{
          height: '100%',
        }}
        onInput={this.onInput}
      >
        <ExampleEditor
          onChange={this.onChange}
          contextPanel={
            <ContextPanel visible={this.state.sidebarVisible}>
              <div>
                {templates.map((tmpl, idx) => (
                  <TemplateCard
                    key={idx}
                    onClick={() => this.selectTemplate(tmpl)}
                  >
                    <h4>{tmpl.title}</h4>
                    <p>{tmpl.desc}</p>
                  </TemplateCard>
                ))}
              </div>
            </ContextPanel>
          }
        />
      </div>
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
