import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { colors } from '@atlaskit/theme';
import Avatar from '@atlaskit/avatar';
import Button from '@atlaskit/button';
import Lozenge from '@atlaskit/lozenge';
import Spinner from '@atlaskit/spinner';

import IconLabel from './IconLabel';
import ErrorMessage from './ErrorMessage';
import MessagesIntlProvider from './MessagesIntlProvider';
import relativeDate from '../internal/relative-date';
import messages from '../messages';

import { ProfilecardProps } from '../types';

import {
  ActionButtonGroup,
  ActionsFlexSpacer,
  AppTitleLabel,
  CardContainer,
  CardContent,
  DisabledInfo,
  DetailsGroup,
  FullNameLabel,
  JobTitleLabel,
  ProfileImage,
  CardElevationWrapper,
  LozengeWrapper,
  SpinnerContainer,
} from '../styled/Card';

export default class Profilecard extends React.PureComponent<ProfilecardProps> {
  static defaultProps: ProfilecardProps = {
    isLoading: false,
    hasError: false,
    errorType: null,
    status: 'active',
    isBot: false,
    isNotMentionable: false,
    actions: [],
    hasDisabledAccountLozenge: true,
    customElevation: 'e200',
    analytics: () => null,
    clientFetchProfile: () => null,
  };

  private timeOpen: number | null;
  clientFetchProfile: () => void;

  constructor(props: ProfilecardProps) {
    super(props);

    this.timeOpen = null;

    this.clientFetchProfile = (...args: any) => {
      this.callAnalytics('profile-card.reload', {});
      this.callClientFetchProfile(...args);
    };
  }

  private durationSince = (from: number | null) => {
    const fromParsed = from || 0;
    return fromParsed > 0 ? Date.now() - fromParsed : null;
  };

  callClientFetchProfile = (...args: any) => {
    if (this.props.clientFetchProfile) {
      this.props.clientFetchProfile(...args);
    }
  };

  callAnalytics = (id: string, options: any) => {
    if (this.props.analytics) {
      this.props.analytics(id, options);
    }
  };

  componentDidMount() {
    this.timeOpen = Date.now();
    this.callAnalytics('profile-card.view', {});
  }

  renderErrorMessage() {
    return (
      <ErrorMessage
        reload={this.props.clientFetchProfile && this.clientFetchProfile}
        errorType={this.props.errorType}
      />
    );
  }

  renderActionsButtons() {
    if (this.props.actions && this.props.actions.length === 0) {
      return null;
    }

    return (
      <ActionButtonGroup>
        {this.props.actions &&
          this.props.actions.map((action, idx) => (
            <Button
              appearance={idx === 0 ? 'default' : 'subtle'}
              key={action.label}
              onClick={(...args: any) => {
                this.callAnalytics('profile-card.click', {
                  id: action.id || null,
                  duration: this.durationSince(this.timeOpen),
                });
                if (action.callback) {
                  action.callback(...args);
                }
              }}
            >
              {action.label}
            </Button>
          ))}
      </ActionButtonGroup>
    );
  }

  renderCardDetailsDefault() {
    const {
      meta,
      nickname,
      fullName,
      location,
      email,
      timestring,
      companyName,
    } = this.props;

    return (
      <DetailsGroup>
        <FullNameLabel noMeta={!meta}>{fullName}</FullNameLabel>
        {meta && <JobTitleLabel>{meta}</JobTitleLabel>}
        <IconLabel icon="email">{email}</IconLabel>
        <IconLabel icon="mention">{nickname && `@${nickname}`}</IconLabel>
        <IconLabel icon="time">{timestring}</IconLabel>
        <IconLabel icon="companyName">{companyName}</IconLabel>
        <IconLabel icon="location">{location}</IconLabel>
      </DetailsGroup>
    );
  }

  renderCardDetailsForDisabledAccount() {
    const {
      nickname,
      status,
      companyName,
      hasDisabledAccountLozenge,
    } = this.props;

    return (
      <DetailsGroup>
        <FullNameLabel noMeta isDisabledAccount>
          {this.getDisabledAccountName()}
        </FullNameLabel>

        {hasDisabledAccountLozenge && (
          <LozengeWrapper>
            <Lozenge appearance="default" isBold>
              {status === 'inactive' && (
                <FormattedMessage {...messages.inactiveAccountMsg} />
              )}
              {status === 'closed' && (
                <FormattedMessage {...messages.closedAccountMsg} />
              )}
            </Lozenge>
          </LozengeWrapper>
        )}

        <DisabledInfo>{this.getDisabledAccountDesc()}</DisabledInfo>

        {status === 'inactive' && (
          <>
            <IconLabel icon="mention">{nickname && `@${nickname}`}</IconLabel>
            <IconLabel icon="companyName">{companyName}</IconLabel>
          </>
        )}
      </DetailsGroup>
    );
  }

  getDisabledAccountName() {
    const { nickname, fullName, status } = this.props;
    if (status === 'inactive') {
      return fullName || nickname;
    } else if (status === 'closed') {
      return (
        nickname || (
          <FormattedMessage {...messages.disabledAccountDefaultName} />
        )
      );
    }

    return null;
  }

  getDisabledAccountDesc() {
    const {
      status = 'closed',
      statusModifiedDate,
      disabledAccountMessage,
    } = this.props;
    const date = statusModifiedDate
      ? new Date(statusModifiedDate * 1000)
      : null;
    const relativeDateKey = relativeDate(date);

    // consumer does not want to use built-in message
    if (disabledAccountMessage) {
      return disabledAccountMessage;
    }

    let secondSentence: React.ReactNode = null;
    if (relativeDateKey) {
      secondSentence = (
        <FormattedMessage
          // @ts-ignore
          {...messages[`${status}AccountDescMsgHasDate${relativeDateKey}`]}
        />
      );
    } else {
      secondSentence = (
        // @ts-ignore
        <FormattedMessage {...messages[`${status}AccountDescMsgNoDate`]} />
      );
    }

    return (
      <p>
        <FormattedMessage {...messages.generalDescMsgForDisabledUser} />{' '}
        {secondSentence}
      </p>
    );
  }

  renderCardDetailsApp() {
    return (
      <DetailsGroup>
        <FullNameLabel>{this.props.fullName}</FullNameLabel>
        <AppTitleLabel>App</AppTitleLabel>
        <IconLabel icon="mention">
          {this.props.nickname && `@${this.props.nickname}`}
        </IconLabel>
      </DetailsGroup>
    );
  }

  renderCardDetails() {
    const { isBot, status } = this.props;

    if (isBot) {
      return this.renderCardDetailsApp();
    }

    if (status === 'inactive' || status === 'closed') {
      return this.renderCardDetailsForDisabledAccount();
    }

    return this.renderCardDetailsDefault();
  }

  render() {
    const { fullName, status, customElevation } = this.props;
    let cardContent: React.ReactNode = null;

    // @FIXME do closed users have empty fullName field?
    const canRender = fullName || status === 'closed';

    if (this.props.hasError) {
      this.callAnalytics('profile-card.error', {});

      cardContent = this.renderErrorMessage();
    } else if (this.props.isLoading) {
      cardContent = (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      );
    } else if (canRender) {
      const isDisabledUser = status === 'inactive' || status === 'closed';
      const actions = this.renderActionsButtons();

      this.callAnalytics('profile-card.loaded', {
        duration: this.durationSince(this.timeOpen),
      });

      cardContent = (
        <CardContainer isDisabledUser={isDisabledUser}>
          <ProfileImage>
            <Avatar
              size="xlarge"
              src={this.props.status !== 'closed' ? this.props.avatarUrl : null}
              borderColor={colors.N0}
            />
          </ProfileImage>
          <CardContent>
            {this.renderCardDetails()}
            {actions ? (
              <>
                <ActionsFlexSpacer />
                {actions}
              </>
            ) : null}
          </CardContent>
        </CardContainer>
      );
    }

    return (
      <MessagesIntlProvider>
        <CardElevationWrapper customElevation={customElevation}>
          {cardContent}
        </CardElevationWrapper>
      </MessagesIntlProvider>
    );
  }
}
