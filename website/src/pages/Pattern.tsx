import React from 'react';
import { match } from 'react-router';

import Loading from '../components/Loading';
import Page from '../components/Page';
import Loadable from '../components/WrappedLoader';
import { patterns } from '../site';
import { File } from '../types';
import * as fs from '../utils/fs';

import FourOhFour from './FourOhFour';

export type Props = {
  match: match<Record<string, string>>;
};

export default function Pattern({
  match: {
    params: { patternId },
  },
}: Props) {
  const filePath = `patterns/${patternId}`;
  const found = fs.findNormalized(patterns, filePath) as File;

  if (!found) {
    return <FourOhFour />;
  }

  const Content = Loadable<{}, { default?: string }>({
    loader: async () =>
      found && fs.isFile(found) ? await found.exports() : {},
    loading: () => <Loading />,
    render(mod) {
      if (mod && mod.default) {
        return React.createElement(mod.default);
      }
      return <FourOhFour />;
    },
  });

  return (
    <Page>
      <Content />
    </Page>
  );
}
