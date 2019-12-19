import React from 'react';
import { Helmet } from 'react-helmet';
import { useSiteMetadata } from '../utilities/use-site-metadata';

export type Props = {
  title?: string;
};

const PageTitle = ({ title }: Props) => {
  const { siteName } = useSiteMetadata();
  return (
    <Helmet>
      <title>{title ? `${title} - ${siteName}` : siteName}</title>
    </Helmet>
  );
};

export default PageTitle;
