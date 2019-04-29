import * as React from 'react';
import { Query } from 'react-contentful';
import Overview from './Overview';
import Variant from './Variant';

interface Props {
  slug: string;
}

export default ({ slug }: Props) => {
  return (
    <Query contentType="componentPage" query={{ 'fields.slug[in]': slug }}>
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

        const page = data.items[0].fields;
        console.log(page);

        return (
          <React.Fragment>
            <Overview description={page.overview.fields.description} />
            {page.variants &&
              page.variants.map(variant => (
                <Variant
                  key={variant.sys.id}
                  title={variant.fields.title}
                  description={variant.fields.description}
                />
              ))}
          </React.Fragment>
        );
      }}
    </Query>
  );
};
