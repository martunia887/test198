import * as React from 'react';
import styled from 'styled-components';
import { gridSize, fontSize } from '@atlaskit/theme/constants';
import { N80A } from '@atlaskit/theme/colors';
import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right';
import Tooltip from '@atlaskit/tooltip';
import {
  expandMessages,
  sharedExpandStyles,
  ExpandIconWrapper,
  ExpandLayoutWrapper,
} from '@atlaskit/editor-common';
import { AnalyticsEventPayload, PLATFORM, MODE } from '../analytics/events';
import { ACTION, ACTION_SUBJECT, EVENT_TYPE } from '../analytics/enums';
import { injectIntl, InjectedIntlProps, defineMessages } from 'react-intl';

const messages = defineMessages({
  ...expandMessages,
  expandDefaultTitle: {
    id: 'fabric.editor.expandDefaultTitle',
    defaultMessage: 'Click here to expand...',
    description: 'Placeholder text for an expand node',
  },
});

export interface StyleProps {
  expanded?: boolean;
  'data-node-type'?: 'expand' | 'nestedExpand';
  'data-title'?: string;
}

const Title = styled.span`
  outline: none;
  border: none;
  font-size: ${fontSize}px;
  line-height: 1.714;
  font-weight: normal;
  display: flex;
  flex: 1;
  margin: 0;
  padding: 0 0 0 ${gridSize() / 2}px;
  text-align: left;
`;

const Container = styled.div<StyleProps>`
  ${sharedExpandStyles.ContainerStyles}
  padding: 0;
  padding-bottom: ${props => (props.expanded ? gridSize() : 0)}px;
`;

const TitleContainer = styled.button<StyleProps>`
  ${sharedExpandStyles.TitleContainerStyles}
  padding: ${gridSize()}px;
  padding-bottom: ${props => (!props.expanded ? gridSize() : 0)}px;
`;

TitleContainer.displayName = 'TitleContainerButton';

const ContentContainer = styled.div<StyleProps>`
  ${sharedExpandStyles.ContentStyles};
  padding-right: ${gridSize() * 2}px;
  padding-left: ${gridSize() * 5 - gridSize() / 2}px;
`;

export interface ExpandProps {
  title: string;
  nodeType: 'expand' | 'nestedExpand';
  children: React.ReactNode;
  fireAnalyticsEvent?: (event: AnalyticsEventPayload) => void;
}

function fireExpandToggleAnalytics(
  nodeType: ExpandProps['nodeType'],
  expanded: boolean,
  fireAnalyticsEvent: ExpandProps['fireAnalyticsEvent'],
) {
  if (!fireAnalyticsEvent) {
    return;
  }

  fireAnalyticsEvent({
    action: ACTION.TOGGLE_EXPAND,
    actionSubject:
      nodeType === 'expand'
        ? ACTION_SUBJECT.EXPAND
        : ACTION_SUBJECT.NESTED_EXPAND,
    attributes: {
      platform: PLATFORM.WEB,
      mode: MODE.RENDERER,
      expanded: !expanded,
    },
    eventType: EVENT_TYPE.TRACK,
  });
}

function Expand({
  title,
  children,
  nodeType,
  intl,
  fireAnalyticsEvent,
}: ExpandProps & InjectedIntlProps) {
  const [expanded, setExpanded] = React.useState(false);
  const label = intl.formatMessage(
    expanded ? messages.collapseNode : expandMessages.expandNode,
  );

  return (
    <Container data-node-type={nodeType} data-title={title} expanded={expanded}>
      <TitleContainer
        onClick={(e: React.SyntheticEvent) => {
          e.stopPropagation();
          fireExpandToggleAnalytics(nodeType, expanded, fireAnalyticsEvent);
          setExpanded(!expanded);
        }}
        aria-label={label}
        contentEditable={false}
        expanded={expanded}
      >
        <Tooltip content={label} position="top" tag={ExpandLayoutWrapper}>
          <ExpandIconWrapper expanded={expanded}>
            <ChevronRightIcon label={label} primaryColor={N80A} />
          </ExpandIconWrapper>
        </Tooltip>
        <Title>
          {title || intl.formatMessage(messages.expandDefaultTitle)}
        </Title>
      </TitleContainer>
      <ContentContainer expanded={expanded}>
        <div className={`${nodeType}-content-wrapper`}>{children}</div>
      </ContentContainer>
    </Container>
  );
}

export default injectIntl(Expand);
