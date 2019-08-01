import React, { RefObject } from 'react';

import Button from '@atlaskit/button';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import Tooltip from '@atlaskit/tooltip';
import MentionSpotlightController from './MentionSpotlightController';

import {
  SpotlightTitle,
  SpotlightCloseTooltip,
  SpotlightDescription,
  SpotlightDescriptionLink,
} from '../../util/i18n';
import * as Styled from './styles';

export interface Props {
  createTeamLink: string;
  /** Callback to track the event where user click on x icon */
  onClose: () => void;
}

export interface State {
  isSpotlightHidden: boolean;
}

const ICON_URL =
  'https://ptc-directory-sited-static.us-east-1.prod.public.atl-paas.net/teams/avatars/2.svg';

export default class MentionSpotlight extends React.Component<Props, State> {
  // Wrap whole dialog so we can catch events, see preventClickOnCard
  elWrapper: RefObject<HTMLDivElement>;
  // Wrap the close button, so we can still manually invoke onClose()
  elCloseWrapper: RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.elWrapper = React.createRef();
    this.elCloseWrapper = React.createRef();
    this.state = {
      isSpotlightHidden: false,
    };
  }
  componentDidMount() {
    this.addEventHandler();
    // Spotlight hiding logic was moved to Mount method because if Spotlight is re-rendered after updating the
    // counts at MentionSpotlightController, spotlight will appear for sometime and then disappear. As of the time
    // of writing this code, this was only happening in Fabric Editor ( See TEAMS-623 )
    if (!MentionSpotlightController.isSpotlightEnabled()) {
      this.setState({ isSpotlightHidden: true });
    } else {
      MentionSpotlightController.registerRender();
    }
  }

  componentWillUnmount() {
    this.removeEventHandler();
  }

  onClick = () => {
    MentionSpotlightController.registerCreateLinkClick();
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
    this.setState({ isSpotlightHidden: true });
    this.props.onClose();
  };

  render() {
    const { createTeamLink } = this.props;
    const { isSpotlightHidden } = this.state;

    if (isSpotlightHidden) {
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
                  <SpotlightTitle />
                </Styled.Title>
              </Styled.Heading>
              <Styled.Body>
                <SpotlightDescription>
                  {description => (
                    <p>
                      {description}
                      <SpotlightDescriptionLink>
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
                      </SpotlightDescriptionLink>
                    </p>
                  )}
                </SpotlightDescription>
              </Styled.Body>
            </Styled.Section>
            <Styled.Actions>
              <div ref={this.elCloseWrapper}>
                <SpotlightCloseTooltip>
                  {tooltip => (
                    <Tooltip content={tooltip} position="bottom">
                      <Button
                        appearance="subtle"
                        iconBefore={
                          <EditorCloseIcon label="Close" size="medium" />
                        }
                        onClick={this.onCloseClick}
                        spacing="none"
                      />
                    </Tooltip>
                  )}
                </SpotlightCloseTooltip>
              </div>
            </Styled.Actions>
          </Styled.Content>
        </Styled.Card>
      </div>
    );
  }
}
