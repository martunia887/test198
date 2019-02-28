import * as React from 'react';
import { ReactNodeView } from '../../../nodeviews';
import JiraCreate from './JiraCreate';

class InlineJiraView extends ReactNodeView {
  render(props) {
    return <JiraCreate />;
  }

  stopEvent(event) {
    return !!(this.dom && this.dom.contains(event.target));
  }

  ignoreMutation() {
    return true;
  }
}

export default InlineJiraView;
