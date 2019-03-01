import * as React from 'react';
import { ReactNodeView } from '../../../nodeviews';
import JiraCreate from './JiraCreate';

class InlineJiraView extends ReactNodeView {
  render() {
    return <JiraCreate getPos={this.getPos} view={this.view} />;
  }

  selectNode() {
    if (this.dom) {
      this.dom.classList.add('ProseMirror-selectednode');
      const input = this.dom.querySelector(
        'div > div + div + input',
      ) as HTMLInputElement;
      if (input) {
        input.focus();
      }
    }
  }

  stopEvent(event) {
    return !!(this.dom && this.dom.contains(event.target));
  }

  ignoreMutation() {
    return true;
  }
}

export default InlineJiraView;
