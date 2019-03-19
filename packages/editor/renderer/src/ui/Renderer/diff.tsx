import * as React from 'react';
import { Component } from 'react';
import diffDocs from '../../diff';
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
    // console.log(JSON.stringify(oldDocument, null, 2));
    const doc = diffDocs(oldDocument, newDocument, { diffOnly });
    // console.log(JSON.stringify(doc, null, 2));
    return <ReactRenderer document={doc} isDiff={true} schema={diffSchema} />;
  }
}
