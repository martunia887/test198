import * as React from 'react';
import styled from 'styled-components';

export const Wrapper: any = styled.div`
  position: relative;
  overflow: hidden;
  width: 80%;
  height: 50%;
  margin: 0 auto;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

export default () => {
  return (
    <Wrapper>
      <iframe
        src="/examples.html?groupId=editor&packageId=editor-core&exampleId=iframe-content"
        scrolling="no"
        frameBorder="0"
      />
    </Wrapper>
  );
};
