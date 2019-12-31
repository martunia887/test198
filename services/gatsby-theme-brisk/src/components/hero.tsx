/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { N10, N300 } from '@atlaskit/theme/src/colors';

const Container = styled.div`
  grid-area: hero;
  padding-left: 80px;
  min-height: 200px;
  background-color: ${N10};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

type Props = {
  headline: string;
  description?: string;
};

// todo add tabs
const Hero = ({ headline, description }: Props) => {
  return (
    <Container>
      <div>
        <h1 className="headline1">{headline}</h1>
        {description && (
          <p className="lg" css={{ color: N300 }}>
            {description}
          </p>
        )}
      </div>
    </Container>
  );
};

export default Hero;
