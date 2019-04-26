import * as React from 'react';
import { Query } from 'react-contentful';
import styled from 'styled-components';

const OverviewComponent = styled.pre`
  white-space: pre-wrap;
  font: inherit;
`;

interface Props {
  entryId: string;
}

export default ({ entryId }: Props) => {
  return (
    <Query id={entryId}>
      {({ data, error, loading }) => {
        if ((!data && !error) || loading) {
          return null;
        }
        if (error) {
          console.error(error);
          return null;
        }
        if (!data) {
          console.log(data);
          console.error('Content not found');
          return null;
        }

        console.log('data', data);

        return <OverviewComponent>{data.fields.description}</OverviewComponent>;
      }}
    </Query>
  );
};
