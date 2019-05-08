import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@atlaskit/button';
import { gridSize } from '@atlaskit/theme';
import styled from 'styled-components';
import { CancelableEvent } from '@atlaskit/quick-search';
import { messages } from '../../messages';
import {
  getJiraAdvancedSearchUrl,
  JiraEntityTypes,
} from '../SearchResultsUtil';
import { JiraApplicationPermission } from '../GlobalQuickSearchWrapper';

type onAdvancedSearchClick = (
  e: CancelableEvent,
  entity: JiraEntityTypes,
) => void;
export interface Props {
  query: string;
  analyticsData?: object;
  onClick?: onAdvancedSearchClick;
  appPermission?: JiraApplicationPermission;
}

interface State {
  entity: JiraEntityTypes;
}

const TextContainer = styled.div`
  margin-right: ${gridSize()}px;
  height: ${3 * gridSize()}px;
  line-height: ${3 * gridSize()}px;
  white-space: nowrap;
`;

const Container = styled.div`
  margin: ${1.5 * gridSize()}px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
`;

const ButtonWrapper = styled.div`
  margin-right: ${0.5 * gridSize()}px;
`;
const itemI18nKeySuffix = [
  JiraEntityTypes.Issues,
  JiraEntityTypes.Boards,
  JiraEntityTypes.Projects,
  JiraEntityTypes.Filters,
  JiraEntityTypes.People,
];

const getI18nItemName = (i18nKeySuffix: string) => {
  const id = `jira_advanced_search_${i18nKeySuffix}` as keyof typeof messages;
  return <FormattedMessage {...messages[id]} />;
};

export default class JiraAdvancedSearch extends React.Component<Props, State> {
  state = {
    entity: JiraEntityTypes.Issues,
  };

  renderLinks = () =>
    itemI18nKeySuffix
      .filter(
        key =>
          !this.props.appPermission ||
          key !== JiraEntityTypes.Boards ||
          (this.props.appPermission &&
            this.props.appPermission.hasSoftwareAccess),
      )
      .map(item => (
        <ButtonWrapper key={`btnwrapper_${item}`}>
          <Button
            key={`btn_${item}`}
            spacing="compact"
            onMouseEnter={e => e.stopPropagation()}
            onClick={e => this.props.onClick && this.props.onClick(e, item)}
            href={getJiraAdvancedSearchUrl(item, this.props.query)}
          >
            {getI18nItemName(item)}
          </Button>
        </ButtonWrapper>
      ));

  render() {
    return (
      <Container>
        <TextContainer>
          <FormattedMessage {...messages.jira_advanced_search} />
        </TextContainer>
        {this.renderLinks()}
      </Container>
    );
  }
}
