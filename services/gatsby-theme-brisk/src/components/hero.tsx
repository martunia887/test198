/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { N10, N300 } from '@atlaskit/theme/src/colors';

const Container = styled.div`
  padding-left: 80px;
  min-height: 200px;
  background-color: ${N10};
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

type Props = {
  headline: string;
  description?: string;
  imageUrl?: string;
};

// todo add tabs
const Hero = ({ headline, description, imageUrl, ...rest }: Props) => {
  return (
    <Container {...rest}>
      <div css={{ maxWidth: '66%' }}>
        <h1 className="headline1">{headline}</h1>
        {description && (
          <p className="lg" css={{ color: N300 }}>
            {description}
          </p>
        )}
      </div>

      {imageUrl && (
        // image is decorative, hence hidden
        <img src={imageUrl} aria-hidden="true" />
      )}
    </Container>
  );
};

export default Hero;
