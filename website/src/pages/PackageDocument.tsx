import React from 'react';
import { Helmet } from 'react-helmet';
import { match } from 'react-router';

import Loading from '../components/Loading';
import Page, { Title } from '../components/Page';
import Loadable from '../components/WrappedLoader';
import { packages } from '../site';
import { File } from '../types';
import * as fs from '../utils/fs';

import FourOhFour from './FourOhFour';

export type PackageDocumentProps = {
  match: match<Record<string, string>>;
};

export type ResolvedJSXElement = {
  default?: JSX.Element;
};

export default function PackageDocument({
  match: {
    params: { groupId, pkgId, docId },
  },
}: PackageDocumentProps) {
  const filePath = `packages/${groupId}/${pkgId}/docs/${docId}`;
  const found = fs.findNormalized(packages, filePath) as File;

  if (!found) {
    return <FourOhFour />;
  }

  const Content = Loadable<{}, ResolvedJSXElement>({
    loading: () => <Loading />,
    loader: async () => (fs.isFile(found) ? await found.exports() : {}),
    render: doc => (doc ? doc.default : <FourOhFour />),
  });

  return (
    <Page>
      <Helmet>
        <title>
          {`${fs.titleize(pkgId)} - ${fs.titleize(docId)} - ${BASE_TITLE}`}
        </title>
      </Helmet>
      <Title>
        {fs.titleize(pkgId)} - {fs.titleize(docId)}
      </Title>
      <Content />
    </Page>
  );
}
