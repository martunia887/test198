import * as React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { gridSize } from '@atlaskit/theme';

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
  createExample: (
    title: string,
    exampleFileName: string,
  ) => React.ComponentType<any>;
}

export default ({ title, description, createExample }: Props) => {
  const exampleFileName = title
    .replace(/\b\w/g, (l: string) => l.toUpperCase())
    .replace(/\s/g, '');

  return (
    <React.Fragment>
      <VariantTitle>{title}</VariantTitle>
      <VariantDescription>
        <ReactMarkdown source={description} />
      </VariantDescription>
      {createExample(title, exampleFileName)}
    </React.Fragment>
  );
};
