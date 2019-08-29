import * as React from 'react';
import { HeadingLevel } from '@atlaskit/renderer';
import { Heading as RawHeading } from 'spectacle';

interface Props {
  level?: HeadingLevel;
  content: string;
}

export function Heading({ level, content }: Props): JSX.Element {
  return <RawHeading size={level}>{content}</RawHeading>;
}
