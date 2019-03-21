import * as React from 'react';
import { Component } from 'react';
import { diffDocs } from '@atlaskit/adf-utils/documentDiffer';
import { diffSchema } from '@atlaskit/adf-schema';

import ReactRenderer from './';

export interface Props {
  oldDocument: any;
  newDocument: any;
  diffOnly?: boolean;
}

export default class DiffRenderer extends Component<Props, any> {
  render() {
    const { oldDocument, newDocument, diffOnly } = this.props;

    const doc = diffDocs(oldDocument, newDocument, { diffOnly });

    return <ReactRenderer document={doc} isDiff={true} schema={diffSchema} />;
  }
}
