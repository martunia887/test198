import * as React from 'react';
import { Slide as SlideADF } from '../utils/convertADFToSlides';
import { Slide } from 'spectacle';
import styled from 'styled-components';
import { Heading } from '../ui';

interface Props {
  slide: SlideADF;
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 700px; /* side of an slide by default, should store it in some place */
`;

const RendererContainer = styled.div`
  flex: 1 1 100%;
  display: flex;
  align-items: center;
`;

const LeftContainer = styled.div`
  text-align: left;
`;

class BaseLayout extends React.Component<Props> {
  render() {
    const { slide, children } = this.props;
    return (
      <Slide style={{ overflow: 'scroll' }} {...this.props}>
        <Content>
          {slide.title && (
            <LeftContainer>
              <Heading content={slide.title.content} level={6} />
            </LeftContainer>
          )}
          <RendererContainer>
            <div style={{ width: '100%' }}>{children}</div>
          </RendererContainer>
        </Content>
      </Slide>
    );
  }
}

export default BaseLayout;
