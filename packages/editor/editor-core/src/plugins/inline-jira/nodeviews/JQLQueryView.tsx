import * as React from 'react';
import styled from 'styled-components';
import { ReactNodeView } from '../../../nodeviews';

const Wrapper = styled.span`
  display: inline-flex;
  border: 1px solid #eeeeec;
  padding: 8px;
  min-width: 400px;
`;

class JQLQueryView extends ReactNodeView {
  getContentDOM() {
    const dom = document.createElement('span');
    dom.className = 'jqlQueryView-content-wrap';
    return { dom };
  }

  createDomRef(): HTMLElement {
    return document.createElement('span');
  }

  render(props, forwardRef) {
    return <Wrapper ref={forwardRef} />;
  }

  ignoreMutation() {
    return true;
  }
}

export default JQLQueryView;
