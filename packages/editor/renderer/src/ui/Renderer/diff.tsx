import * as React from 'react';
import { Component } from 'react';
import { diffDocs } from '@atlaskit/adf-utils/documentDiffer';
import { diffSchema } from '@atlaskit/adf-schema';

import ReactRenderer from './';

export interface Props {
  oldDocument: any;
  newDocument: any;
  diffOnly?: boolean;
  showAdf?: boolean;
}

export default class DiffRenderer extends Component<Props, any> {
  render() {
    const { oldDocument, newDocument, diffOnly, showAdf } = this.props;
    const doc = diffDocs(oldDocument, newDocument, { diffOnly });

    if (showAdf) {
      return <pre>{JSON.stringify(doc, null, 2)}</pre>;
    }
    return <ReactRenderer document={doc} isDiff={true} schema={diffSchema} />;
  }
}
