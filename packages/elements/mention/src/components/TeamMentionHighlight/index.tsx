import React, { RefObject } from 'react';

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
  // Wrap whole dialog so we can catch events, see preventClickOnCard
  elWrapper: RefObject<HTMLDivElement>;
  // Wrap the close button, so we can still manually invoke onClose()
  elCloseWrapper: RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.elWrapper = React.createRef();
    this.elCloseWrapper = React.createRef();
    this.state = {
      isHighlightClosed: false,
    };
  }
  componentDidMount() {
    this.addEventHandler();
    TeamMentionHighlightController.registerRender();
  }

  componentWillUnmount() {
    this.removeEventHandler();
  }

  onClick = () => {
    TeamMentionHighlightController.registerCreateLinkClick();
  };

  // This is to stop overly aggressive behaviour where clicking anywhere in the spotlight would immediate close the entire
  // dropdown dialog
  private preventClickOnCard = (event: any) => {
    // We stop the event from propagating, so we need to manually close
    const isClickOnCloseButton =
      this.elCloseWrapper.current &&
      this.elCloseWrapper.current.contains(event.target);
    if (isClickOnCloseButton) {
      this.onCloseClick();
    }

    // Allow default so the link to create team still works, but prevent the rest
    event.stopPropagation();
    event.stopImmediatePropagation();
  };

  private addEventHandler(): void {
    this.elWrapper.current &&
      this.elWrapper.current.addEventListener('click', this.preventClickOnCard);
  }

  private removeEventHandler(): void {
    this.elWrapper.current &&
      this.elWrapper.current.removeEventListener(
        'click',
        this.preventClickOnCard,
      );
  }

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
      <div ref={this.elWrapper}>
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
              <div ref={this.elCloseWrapper}>
                <TeamMentionHighlightCloseTooltip>
                  {tooltip => (
                    <Tooltip content={tooltip} position="bottom">
                      <Button
                        appearance="subtle"
                        iconBefore={
                          <EditorCloseIcon label="Close" size="medium" />
                        }
                        onClick={this.onCloseClick}
                        spacing="none"
                        css=""
                      />
                    </Tooltip>
                  )}
                </TeamMentionHighlightCloseTooltip>
              </div>
            </Styled.Actions>
          </Styled.Content>
        </Styled.Card>
      </div>
    );
  }
}
