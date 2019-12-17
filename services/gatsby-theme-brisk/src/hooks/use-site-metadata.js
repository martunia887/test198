// @flow
import { useStaticQuery, graphql } from 'gatsby';

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            siteName
            siteUrl
            description
          }
        }
      }
    `,
  );
  return site.siteMetadata;
};
