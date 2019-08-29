import * as React from 'react';
import { Heading as RawHeading } from 'spectacle';

export enum Levels {
  H1 = 1,
  H2 = 2,
  H3 = 3,
  H4 = 4,
  H5 = 5,
  H6 = 6,
}

interface Props {
  level: Levels;
  content: string;
}

export function Heading({ level, content }: Props): JSX.Element {
  return <RawHeading size={level}>{content}</RawHeading>;
}
