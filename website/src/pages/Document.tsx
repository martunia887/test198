import * as React from 'react';
import { Redirect } from 'react-router-dom';
import Loadable from '../components/WrappedLoader';
import { RouterMatch } from '../types';
import * as fs from '../utils/fs';
import Page from '../components/Page';
import Markdown from '../components/Markdown';
import FourOhFour from './FourOhFour';
import Loading from '../components/Loading';
import { docs } from '../site';

type DocProps = {
  match: RouterMatch;
};

type ResolvedMD = {
  default?: {
    content?: string;
    data?: object;
  };
};

export default function Document({
  match: {
    params: { docId },
  },
}: DocProps) {
  if (!docId) {
    const found = fs.getFiles(docs.children)[0];
    if (!found) return <FourOhFour />;
    return <Redirect to={`/docs/${fs.normalize(found.id)}`} />;
  }

  const filePath = `docs/${docId}`;
  const found = fs.findNormalized(docs, filePath);

  const Content = Loadable<{}, ResolvedMD>({
    loader: async () => (found ? await found.exports() : {}),
    loading: () => <Loading />,
    render(md) {
      const docDetails = md.default || {};
      const { content, data = {} } = docDetails;
      if (content) {
        return <Markdown {...data}>{content}</Markdown>;
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
