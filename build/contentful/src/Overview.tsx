import * as React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

const OverviewComponent = styled.div`
  white-space: pre-wrap;
  font: inherit;
`;

interface Props {
  description: string;
}

export default ({ description }: Props) => {
  return (
    <OverviewComponent>
      <ReactMarkdown source={description} />
    </OverviewComponent>
  );
};
