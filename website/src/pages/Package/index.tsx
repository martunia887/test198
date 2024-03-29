import * as React from 'react';
import { match, RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import Loadable from '../../components/WrappedLoader';
import { Helmet } from 'react-helmet';
import { gridSize, colors, math } from '@atlaskit/theme';
import Button from '@atlaskit/button';
import ExamplesIcon from '@atlaskit/icon/glyph/screen';
import { AtlassianIcon } from '@atlaskit/logo';

import Loading from '../../components/Loading';
import Page from '../../components/Page';
import FourOhFour from '../FourOhFour';

import MetaData from './MetaData';
import LatestChangelog from './LatestChangelog';

import * as fs from '../../utils/fs';
import { File, Directory } from '../../types';

import { Log } from '../../components/ChangeLog';
import fetchPackageData, {
  PackageData,
  PackageJson,
} from './utils/fsOperations';
import LinkButton from '../../components/LinkButton';

export const Title = styled.div`
  display: flex;

  h1 {
    flex-grow: 1;
  }
`;

export const Intro = styled.p`
  color: ${colors.heading};
  font-size: ${math.multiply(gridSize, 2)}px;
  font-weight: 300;
  line-height: 1.4em;
`;
export const ButtonGroup = styled.div`
  display: inline-flex;
  margin: 0 -2px;

  > * {
    flex: 1 0 auto;
    margin: 0 2px !important;
  }
`;

export const Sep = styled.hr`
  border: none;
  border-top: 2px solid #ebecf0;
  margin-bottom: ${math.multiply(gridSize, 1.5)}px;
  margin-top: ${math.multiply(gridSize, 1.5)}px;

  @media (min-width: 780px) {
    margin-bottom: ${math.multiply(gridSize, 3)}px;
    margin-top: ${math.multiply(gridSize, 3)}px;
  }
`;

export const NoDocs = (props: { name: string }) => {
  return <div>Component "{props.name}" doesn't have any documentation.</div>;
};

export type PackageProps = {
  match: match<Record<string, string>>;
};

type Examples = (File | Directory)[] | null | undefined;

export type Props = {
  description?: string;
  urlIsExactMatch: boolean;
  groupId: string;
  pkgId: string;
  pkg: PackageJson;
  doc?: string;
  changelog: Array<Log>;
  examples?: Examples;
};

function getExamplesPaths(groupId: string, pkgId: string, examples: Examples) {
  if (!examples || !examples.length) return {};

  const regex = /^[a-zA-Z0-9]/; // begins with letter or number, avoid "special" files
  const filtered = examples.map(a => a.id).filter(id => id.match(regex));
  const res = filtered[0];

  if (!res) return {};

  return {
    examplePath: `/examples/${groupId}/${pkgId}/${fs.normalize(res)}`,
    exampleModalPath: `/packages/${groupId}/${pkgId}/example/${fs.normalize(
      res,
    )}`,
  };
}

export default function LoadData({
  match,
}: RouteComponentProps<{ groupId: string; pkgId: string }>) {
  const { groupId, pkgId } = match.params;

  const Content = Loadable({
    loading: () => (
      <Page>
        <Loading />
      </Page>
    ),
    loader: () =>
      fetchPackageData(groupId, pkgId).catch((error: Error) => {
        console.error(error);
        return { error };
      }),
    render: props =>
      props.error ? (
        <FourOhFour />
      ) : (
        <Package
          {...props as PackageData}
          pkgId={pkgId}
          groupId={groupId}
          urlIsExactMatch={match.isExact}
        />
      ),
  });

  return <Content />;
}

class Package extends React.Component<Props> {
  render() {
    const {
      urlIsExactMatch,
      groupId,
      pkgId,
      pkg,
      doc,
      changelog,
      examples,
    } = this.props;
    const { examplePath, exampleModalPath } = getExamplesPaths(
      groupId,
      pkgId,
      examples,
    );

    const title = fs.titleize(pkgId);

    return (
      <Page>
        {urlIsExactMatch && (
          <Helmet>
            <title>{`${title} package - ${BASE_TITLE}`}</title>
          </Helmet>
        )}
        <Title>
          <h1>{title}</h1>
          {examplePath && exampleModalPath && (
            <ButtonGroup>
              <LinkButton
                iconBefore={<ExamplesIcon label="Examples Icon" />}
                to={examplePath}
              />
              <LinkButton to={exampleModalPath}>Examples</LinkButton>
              {pkg && pkg['atlaskit:designLink'] && (
                <Button
                  iconBefore={<AtlassianIcon size="small" />}
                  href={pkg['atlaskit:designLink'] as string}
                >
                  Design docs
                </Button>
              )}
            </ButtonGroup>
          )}
        </Title>
        <Intro>{pkg.description}</Intro>
        <MetaData
          packageName={pkg.name as string}
          packageSrc={`https://bitbucket.org/atlassian/atlaskit-mk-2/src/master/packages/${groupId}/${pkgId}`}
        />
        <LatestChangelog
          changelog={changelog}
          pkgId={pkgId}
          groupId={groupId}
        />
        <Sep />
        {doc || <NoDocs name={pkgId} />}
      </Page>
    );
  }
}
