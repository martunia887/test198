import * as React from 'react';
import { ProviderFactory } from '@atlaskit/editor-common';
import { storyMediaProviderFactory } from '@atlaskit/editor-test-helpers';
import { traverse, tableRow, tableCell, p, mention } from '@atlaskit/adf-utils';

import { default as Renderer } from '../src/ui/Renderer';
import document from './helper/easy-forms.adf.json';

const mediaProvider = storyMediaProviderFactory();

const memdb = {};

const insertRowIntoTable = (
  doc,
  tableId,
  row: Array<{ cellType: string; value: any }>,
) =>
  traverse(doc, {
    table(node) {
      if (node.attrs!.localId === tableId) {
        const firstRow = node.content ? node.content[1].content! : [];
        const newRow = tableRow(
          row.map(({ cellType, value }, idx) => {
            let content;
            switch (cellType) {
              case 'mention': {
                content = value.id
                  ? p(
                      mention({
                        id: value.id,
                        text: value.name
                          ? `@${value.name}`
                          : `@${value.nickname}`,
                      }),
                    )
                  : p();
                break;
              }
              case 'single-select':
                // ;) ShipIt
                value = value.value;
              case 'radio-select': {
                content = value
                  ? ({
                      type: 'singleSelect',
                      attrs: { value },
                      content: firstRow[idx].content![0].content,
                    } as any)
                  : p();
                break;
              }
              default: {
                content = value ? p(value) : p();
              }
            }
            return tableCell({})(content);
          }),
        );
        if (node.content) {
          node.content.push(newRow);
        }
      }
      return node;
    },
  });

const providerFactory = ProviderFactory.create({ mediaProvider });

export default class Example extends React.Component<any, any> {
  constructor(props) {
    super(props);
    const savedDocument = localStorage
      ? localStorage.getItem('fabric.editor.example.full-page')
      : null;
    this.state = {
      document: savedDocument ? JSON.parse(savedDocument) : document,
    };
    const _this = this;

    const formProvider = {
      insertRow(tableId, row) {
        memdb[tableId] = true;
        const newDoc = insertRowIntoTable(_this.state.document, tableId, row);
        _this.setState({ document: newDoc });
      },
      formSubmitted(tableId) {
        return !!memdb[tableId];
      },
    };

    providerFactory.setProvider('formProvider', formProvider as any);
  }

  render() {
    return (
      <Renderer
        dataProviders={providerFactory}
        document={this.state.document}
        appearance="full-page"
      />
    );
  }
}
