import * as React from 'react';
import Button from '@atlaskit/button';

import {
  MacroCardType,
  MacroRendererProps,
  MacroRendererState,
  CreateMacro,
} from './types';
import Spinner from '@atlaskit/spinner';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import { colors } from '@atlaskit/theme';
import { macroIcon } from './MacroIcon';
import { createPromise } from '../../cross-platform-promise';
import {
  Card,
  Icon,
  Content,
  ContentWrapper,
  Error,
  Action,
  cardStyles,
  ErrorMessage,
  CardBody,
} from './styles';

const MacroCard = ({
  macroName,
  title,
  iconUrl,
  action,
  errorMessage,
}: MacroCardType) => (
  <Card>
    <Icon>{macroIcon(iconUrl, macroName, title)}</Icon>
    <CardBody>
      <ContentWrapper>
        <Content>{macroName}</Content>
        {action}
      </ContentWrapper>
      {errorMessage ? (
        <Error>
          <ErrorIcon
            primaryColor={colors.R300}
            size="medium"
            label={errorMessage}
          />
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </Error>
      ) : null}
    </CardBody>
  </Card>
);

export class MacroComponent extends React.Component<
  MacroRendererProps,
  MacroRendererState
> {
  constructor(props: MacroRendererProps) {
    super(props);

    this.state = {
      content: null,
      macroWhitelist: null,
      loading: false,
      loaded: false,
      retryCount: 0,
      errorMessage: '',
    };
  }

  getMacroId = () => {
    const { parameters } = this.props.extension;
    return (
      parameters &&
      parameters.macroMetadata &&
      parameters.macroMetadata.macroId &&
      parameters.macroMetadata.macroId.value
    );
  };

  // action can be view/retry/spinner/nothing
  createCard = ({ action, errorMessage, onClick, isDisabled }: CreateMacro) => {
    const { parameters, extensionKey } = this.props.extension;

    const macroName = extensionKey;
    // const title = macroMetadata.title;
    const iconUrl =
      parameters.macroMetadata &&
      parameters.macroMetadata.placeholder &&
      parameters.macroMetadata.placeholder[0] &&
      parameters.macroMetadata.placeholder[0].type === 'icon' &&
      parameters.macroMetadata.placeholder[0].data &&
      parameters.macroMetadata.placeholder[0].data.url;

    if (onClick) {
      return (
        <Button
          onClick={onClick}
          isDisabled={isDisabled}
          shouldFitContainer
          css={[cardStyles]}
        >
          <MacroCard
            macroName={macroName}
            title={macroName}
            iconUrl={iconUrl}
            action={action}
          />
        </Button>
      );
    } else {
      return (
        <Button isDisabled={isDisabled} shouldFitContainer css={[cardStyles]}>
          <MacroCard
            macroName={macroName}
            title={macroName}
            iconUrl={iconUrl}
            action={action}
          />
        </Button>
      );
    }
  };

  // isSuccessful is type string
  tapToLoad = () => {
    // on button click
    // set state to loading
    this.setState({ loading: true });
    createPromise(
      'customTapToLoadMacroButton',
      JSON.stringify({
        macroId: this.getMacroId(),
        retryCount: this.state.retryCount,
      }),
    )
      .submit()
      .then(isSuccessful => {
        if (isSuccessful === 'true') {
          this.setState({
            loaded: true,
            loading: false,
          });
        } else {
          this.setState({
            loaded: false,
            loading: false,
            errorMessage: 'Error loading macro',
          });
        }
      });
  };

  tapToView = () => {
    // on button click
    // do not set state to loading
    createPromise(
      'customTapToViewMacroButton',
      JSON.stringify({ macroId: this.getMacroId() }),
    ).submit();
  };

  tapToRetry = () => {
    this.setState((state, props) => {
      return {
        retryCount: state.retryCount + 1,
      };
    });
    createPromise(
      'customTapToLoadMacroButton',
      JSON.stringify({
        macroId: this.getMacroId(),
        retryCount: this.state.retryCount,
      }),
    )
      .submit()
      .then(isSuccessful => {
        if (isSuccessful === 'true') {
          this.setState({
            loaded: true,
            loading: false,
          });
        } else {
          this.setState({
            loaded: false,
            loading: false,
            errorMessage: 'Error loading macro',
          });
        }
      });
  };

  getTapToLoadCardProps = (cardProps: CreateMacro): CreateMacro => {
    const newProps = {
      action: <Action>Tap to load</Action>,
      isDisabled: false,
      onClick: this.tapToLoad,
    };

    return { ...cardProps, ...newProps };
  };

  getLoadingCardProps = (cardProps: CreateMacro): CreateMacro => {
    const newProps = {
      action: (
        <Action>
          <Spinner />
        </Action>
      ),
      isDisabled: true,
    };

    return { ...cardProps, ...newProps };
  };

  getTapToViewCardProps = (cardProps: CreateMacro): CreateMacro => {
    const newProps = {
      action: <Action callToAction>View</Action>,
      isDisabled: false,
      onClick: this.tapToView,
    };

    return { ...cardProps, ...newProps };
  };

  getTapToRetryCardProps = (cardProps: CreateMacro): CreateMacro => {
    const newProps = {
      action: <Action callToAction>Retry {this.state.retryCount}</Action>,
      isDisabled: false,
      onClick: this.tapToRetry,
      errorMessage: this.state.errorMessage,
    };

    return { ...cardProps, ...newProps };
  };

  render() {
    let cardProps: CreateMacro = {
      isDisabled: false,
      action: <></>,
      onClick: null,
    };

    if (true) {
      // if (this.props.macroWhitelist) {
      // check if macroWhitelist has been passed
      if (true) {
        // check if macroname is in macrowhitelist
        // if(this.props.macroWhitelist.includes("macroName")) {
        if (
          !this.state.loaded &&
          !this.state.loading &&
          !this.state.errorMessage
        ) {
          // show tap to load
          return this.createCard(this.getTapToLoadCardProps(cardProps));
        } else if (
          !this.state.loaded &&
          this.state.loading &&
          !this.state.errorMessage
        ) {
          // show loading state
          return this.createCard(this.getLoadingCardProps(cardProps));
        } else if (
          this.state.loaded &&
          !this.state.loading &&
          !this.state.errorMessage
        ) {
          // show tap to show button
          // promise to show button
          return this.createCard(this.getTapToViewCardProps(cardProps));
        } else {
          // loaded && loading should not be a possible state unless an error has occurred
          // check retry count state
          if (this.state.retryCount < 3) {
            // allow to retry
            return this.createCard(this.getTapToRetryCardProps(cardProps));
          } else {
            // show permanent error
            cardProps.action = <Action>Error</Action>;
            cardProps.isDisabled = true;
            cardProps.errorMessage = 'Error cannot load macro';
          }
        }
      } else {
        // macro is not on whitelist
      }
    } else {
      // what to show while getting the whitelist is pending
      // an unclickable card ?
      cardProps.isDisabled = true;
    }

    return this.createCard(cardProps);
  }
}
