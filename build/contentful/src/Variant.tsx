import * as React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { gridSize } from '@atlaskit/theme';
import { Example } from '@atlaskit/docs';

const VariantTitle = styled.h2`
  padding-bottom: ${gridSize()}px;
`;

const VariantDescription = styled.div`
  white-space: pre-wrap;
  font: inherit;
`;

interface Props {
  title: string;
  description: string;
}

export default ({ title, description }: Props) => {
  const exampleFileName = title
    .replace(/\b\w/g, (l: string) => l.toUpperCase())
    .replace(/\s/g, '');

  return (
    <React.Fragment>
      <VariantTitle>{title}</VariantTitle>
      <VariantDescription>
        <ReactMarkdown source={description} />
      </VariantDescription>
      <Example
        packageName="@atlaskit/button"
        Component={
          require('../../../packages/core/button/examples/' + exampleFileName)
            .default
        }
        title={title}
        source={require('!!raw-loader!../../../packages/core/button/examples/' +
          exampleFileName)}
      />
    </React.Fragment>
  );
};
