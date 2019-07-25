import React from 'react';

import Button from '@atlaskit/button';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import Tooltip from '@atlaskit/tooltip';
import TeamMentionHighlightController from './TeamMentionHighlightController';

import {
  HighlightTitle,
  TeamMentionHighlightCloseTooltip,
  TeamMentionHighlightDescription,
  TeamMentionHighlightDescriptionLink,
} from '../../util/i18n';
import * as Styled from './styles';

export interface Props {
  createTeamLink: string;
  /** Callback to track the event where user click on x icon */
  onClose: () => void;
}

export interface State {
  isHighlightClosed: boolean;
}

const ICON_URL =
  'https://ptc-directory-sited-static.us-east-1.prod.public.atl-paas.net/teams/avatars/2.svg';

export default class TeamMentionHighlight extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isHighlightClosed: false,
    };
  }
  componentDidMount() {
    TeamMentionHighlightController.registerRender();
  }

  onClick = () => {
    TeamMentionHighlightController.registerCreateLinkClick();
  };

  onCloseClick = () => {
    this.setState({ isHighlightClosed: true });
    this.props.onClose();
  };

  render() {
    const { createTeamLink } = this.props;
    const { isHighlightClosed } = this.state;

    if (isHighlightClosed) {
      return null;
    }

    return (
      <Styled.Card>
        <Styled.Content>
          <Styled.Aside>
            <img src={ICON_URL} height={32} />
          </Styled.Aside>
          <Styled.Section>
            <Styled.Heading>
              <Styled.Title>
                <HighlightTitle />
              </Styled.Title>
            </Styled.Heading>
            <Styled.Body>
              <TeamMentionHighlightDescription>
                {description => (
                  <p>
                    {description}
                    <TeamMentionHighlightDescriptionLink>
                      {linkText => (
                        <a
                          href={createTeamLink}
                          target="_blank"
                          onClick={this.onClick}
                        >
                          {' '}
                          {linkText}
                        </a>
                      )}
                    </TeamMentionHighlightDescriptionLink>
                  </p>
                )}
              </TeamMentionHighlightDescription>
            </Styled.Body>
          </Styled.Section>
          <Styled.Actions>
            <TeamMentionHighlightCloseTooltip>
              {tooltip => (
                <Tooltip content={tooltip} position="bottom">
                  <Button
                    appearance="subtle"
                    iconBefore={<EditorCloseIcon label="Close" size="medium" />}
                    onClick={this.onCloseClick}
                    spacing="none"
                    css=""
                  />
                </Tooltip>
              )}
            </TeamMentionHighlightCloseTooltip>
          </Styled.Actions>
        </Styled.Content>
      </Styled.Card>
    );
  }
}
