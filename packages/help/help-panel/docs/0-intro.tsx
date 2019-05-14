import * as React from 'react';
import { md, code, Props } from '@atlaskit/docs';
import SectionMessage from '@atlaskit/section-message';
import Button from '@atlaskit/button';
import { gridSize } from '@atlaskit/theme/constants';

export default md`

${(
  <SectionMessage appearance="warning">
    <p>
      <strong>
        Note: @atlaskit/help-panel is currently a developer preview.
      </strong>
    </p>
    <p>
      Please experiment with and test this package, but be aware that the API
      may change at any time. Use at your own risk, preferrably not in
      production.
    </p>
  </SectionMessage>
)}

  ## Usage

  ${code`
  import * as React from 'react';
  import Button, { ButtonGroup } from '@atlaskit/button';
  import { AnalyticsListener } from '@atlaskit/analytics-next';
  import Page from '@atlaskit/page';
  
  import LocaleIntlProvider from '../example-helpers/LocaleIntlProvider';
  import { Article, ArticleItem } from '../src/model/Article';
  import { getArticle, searchArticle } from './utils/mockData';
  import { ExampleWrapper, ButtonsWrapper } from './utils/styled';
  
  import { HelpPanel } from '../src';
  
  const handleEvent = (analyticsEvent: { payload: any; context: any }) => {
    const { payload, context } = analyticsEvent;
    console.log('Received event:', { payload, context });
  };
  
  export default class extends React.Component {
    state = {
      isOpen: false,
      searchText: 'test',
    };
  
    openDrawer = () => {
      this.setState({
        isOpen: true,
      });
    };
  
    closeDrawer = () =>
      this.setState({
        isOpen: false,
      });
  
    onWasHelpfulSubmit = (value: string): Promise<boolean> => {
      return new Promise(resolve => setTimeout(() => resolve(true), 1000));
    };
  
    onSearchArticlesSubmit = (searchValue: any) => {
      this.setState({ searchText: searchValue });
    };
  
    onGetArticle = (articleId: string): Promise<Article> => {
      return new Promise(resolve =>
        setTimeout(() => resolve(getArticle(articleId)), 100),
      );
    };
  
    onSearch = (value: string): Promise<ArticleItem[]> => {
      return new Promise(resolve =>
        setTimeout(() => resolve(searchArticle(value)), 1000),
      );
    };
  
    render() {
      const { isOpen } = this.state;
      return (
        <ExampleWrapper id="helpPanelExample">
          <Page>
            <AnalyticsListener channel="atlaskit" onEvent={handleEvent}>
              <LocaleIntlProvider locale={'en'}>
                <HelpPanel
                  onWasHelpfulSubmit={this.onWasHelpfulSubmit}
                  isOpen={isOpen}
                  onBtnCloseClick={this.closeDrawer}
                  articleId="00"
                  onGetArticle={this.onGetArticle}
                  onSearch={this.onSearch}
                  attachPanelTo="helpPanelExample"
                >
                  <h1>Default content</h1>
                </HelpPanel>
              </LocaleIntlProvider>
  
              <ButtonsWrapper>
                <ButtonGroup>
                  <Button type="button" onClick={this.openDrawer}>
                    Open drawer
                  </Button>
  
                  <Button type="button" onClick={this.closeDrawer}>
                    Close drawer
                  </Button>
                </ButtonGroup>
              </ButtonsWrapper>
            </AnalyticsListener>
          </Page>
        </ExampleWrapper>
      );
    }
  }  
  `}

  ${(
    <div style={{ paddingTop: `${gridSize() * 2}px` }}>
      <Button
        onClick={() =>
          window.open(
            '/examples/help/help-panel/Help-Panel-mockup-api',
            '_self',
          )
        }
      >
        Open Example
      </Button>
    </div>
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/components/HelpPanel')}
    />
  )}
`;
