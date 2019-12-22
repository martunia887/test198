import * as React from 'react';

import ArticleComponent from './Article';
import Header from './Header';
import { withHelp, HelpContextInterface } from './HelpContext';
import Search from './Search';
import {
  Container,
  HelpBody,
  HelpFooter,
  Section,
  DefaultContent,
} from './styled';

export interface Props {}

export const HelpContent = (props: Props & HelpContextInterface) => {
  const { help } = props;

  return (
    <>
      <Container>
        <Section>
          <Header />
          <HelpBody>
            {help.isSearchVisible() && <Search />}
            <ArticleComponent />
            <DefaultContent isArticleVisible={help.articleFullyVisible}>
              {help.defaultContent}
            </DefaultContent>
          </HelpBody>
          {help.isFooterDefined() ? (
            <HelpFooter>{help.footer}</HelpFooter>
          ) : null}
        </Section>
      </Container>
    </>
  );
};

export default withHelp(HelpContent);
