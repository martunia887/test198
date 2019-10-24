import React from 'react';
import { Helmet } from 'react-helmet';
import * as CommonMark from 'commonmark';
import * as ReactRenderer from 'commonmark-react-renderer';
import { AkCodeBlock, AkCode } from '@atlaskit/code';
import Heading from './Markdown/Heading';

export type Props = {
  literal: string;
  language: string;
};

const parser = new CommonMark.Parser();
const markdown = 'markdown';
const renderer = new ReactRenderer({
  renderers: {
    CodeBlock: (props: Props) => (
      <p>
        <AkCodeBlock
          text={props.literal}
          language={props.language || markdown}
        />
      </p>
    ),
    Code: (props: Props) => (
      <AkCode text={props.literal} language={props.language || markdown} />
    ),
    Heading,
  },
});

export default function Markdown({
  children,
  description,
}: {
  children: React.ReactChild;
  description?: string;
}) {
  return (
    <div>
      <Helmet>
        <meta
          name="description"
          // DEFAULT_META_DESCRIPTION is set by webpack config.
          /* eslint-disable no-undef */
          content={description || DEFAULT_META_DESCRIPTION}
        />
      </Helmet>
      {renderer.render(parser.parse(children as string))}
    </div>
  );
}
