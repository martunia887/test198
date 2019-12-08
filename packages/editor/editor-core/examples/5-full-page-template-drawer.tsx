import * as React from 'react';
import styled from 'styled-components';
import { colors } from '@atlaskit/theme';

import EditorContext from './../src/ui/EditorContext';
import WithEditorActions from './../src/ui/WithEditorActions';
import { ExampleEditor } from './5-full-page';

import decisionAdf from '../example-helpers/templates/decision.adf.json';
import { EditorActions } from '../src';

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

class EditorWithSidebar extends React.Component<
  any,
  {
    adf?: any;
    selectedTemplate?: TemplateDefinition;
  }
> {
  state = {
    adf: undefined,
    selectedTemplate: undefined,
  };

  showSidebar() {
    const noDoc = !this.state.adf;
    const emptyDoc = this.state.adf && isEmptyDoc(this.state.adf);
    const sameAsSelectedTemplate =
      this.state.adf &&
      this.state.selectedTemplate &&
      JSON.stringify(this.state.adf) ===
        JSON.stringify(this.state.selectedTemplate.adf);

    // console.log({ noDoc, emptyDoc, sameAsSelectedTemplate, state: this.state });
    // if (this.state.adf && this.state.selectedTemplate) {
    //   console.log({
    //     adf: JSON.stringify(this.state.adf), template: JSON.stringify(this.state.selectedTemplate)
    //   });
    // }

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

  onChange = async (actions: EditorActions) => {
    const adf = await actions.getValue();
    this.setState({
      adf,
    });
  };

  render() {
    return (
      <WithEditorActions
        render={actions => {
          return (
            <ExampleEditor
              onChange={() => this.onChange(actions)}
              sidebar={
                this.showSidebar()
                  ? this.renderTemplateDrawer(actions)
                  : undefined
              }
            />
          );
        }}
      />
    );
  }
}

export default function Example() {
  return (
    <EditorContext>
      <div style={{ height: '100%' }}>
        <EditorWithSidebar />
      </div>
    </EditorContext>
  );
}
