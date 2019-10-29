import * as React from 'react';
import Button from '@atlaskit/button';

import {
  MacroCardType,
  MacroRendererProps,
  MacroRendererState,
  CreateMacro,
} from './types';
import { MacroCard } from './MacroCard';
import Spinner from '@atlaskit/spinner';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import { colors } from '@atlaskit/theme';
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

// create standard translated error messages here????

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

  getMacroName = () => {
    const { parameters, extensionKey } = this.props.extension;
    const macroTitle =
      parameters.macroMetadata && parameters.macroMetadata.title;

    // a title can be a long string eg com.atlassian.packages.label
    // or excerpt-include vs Excerpt include
    // or toc vs Table of contents
    if (
      macroTitle &&
      typeof macroTitle == 'string' &&
      !/(\w+\.\w+)+/.test(macroTitle) &&
      !/(\w+-\w+)+/.test(macroTitle) &&
      macroTitle.length >= extensionKey.length
    ) {
      return macroTitle;
    } else {
      return extensionKey;
    }
  };

  // action can be view/retry/spinner/nothing
  createCard = ({ action, errorMessage, onClick, isDisabled }: CreateMacro) => {
    const { parameters, extensionKey } = this.props.extension;
    console.log('======== error my mboi', errorMessage);
    // fallback to the extensionkey while the changes soak for the title to be f
    // title might not be a string??
    const macroName = this.getMacroName();

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
          css={cardStyles}
        >
          <MacroCard
            macroName={macroName}
            extensionKey={extensionKey}
            iconUrl={iconUrl}
            action={action}
            errorMessage={errorMessage}
            loading={this.state.loading}
          />
        </Button>
      );
    } else {
      return (
        <Button isDisabled={isDisabled} shouldFitContainer css={[cardStyles]}>
          <MacroCard
            extensionKey={extensionKey}
            macroName={macroName}
            iconUrl={iconUrl}
            action={action}
            errorMessage={errorMessage}
            loading={this.state.loading}
          />
        </Button>
      );
    }
  };

  setErrorLoadingState = () => {
    this.setState({
      loaded: false,
      loading: false,
      errorMessage: 'Error loading',
    });
  };

  setErrorUnableToLoadState = () => {
    this.setState({
      loaded: false,
      loading: false,
      errorMessage: 'Unable to load',
    });
  };

  setLoadingSuccessState = () => {
    this.setState({
      loaded: true,
      loading: false,
    });
  };

  // isSuccessful is type string
  tapToLoad = () => {
    // on button click
    // set state to loading
    console.log('tap ===== to ==== load');
    this.setState({ loading: true });
    console.log('=== loading state');
    createPromise(
      'customTapToLoadMacroButton',
      JSON.stringify({
        macroId: this.getMacroId(),
        retryCount: this.state.retryCount,
      }),
    )
      .submit()
      .then(isSuccessful => {
        if (isSuccessful) {
          this.setLoadingSuccessState();
        } else {
          this.setErrorLoadingState();
        }
      })
      .catch(() => {
        this.setErrorUnableToLoadState();
      });
  };

  tapToView = () => {
    // on button click
    // do not set state to loading
    createPromise(
      'customTapToViewMacroButton',
      JSON.stringify({ macroId: this.getMacroId() }),
    )
      .submit()
      .catch(() => {
        this.setErrorUnableToLoadState();
      });
  };

  tapToRetry = () => {
    this.setState((state, props) => {
      return {
        retryCount: state.retryCount + 1,
        loading: true,
        loaded: false,
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
        if (isSuccessful) {
          this.setLoadingSuccessState();
        } else if (this.state.retryCount >= 3) {
          this.setErrorUnableToLoadState();
        } else {
          this.setErrorLoadingState();
        }
      })
      .catch(() => {
        this.setErrorUnableToLoadState();
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
      errorMessage: this.state.errorMessage,
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
      action: <Action callToAction>Try again {this.state.retryCount}</Action>,
      isDisabled: false,
      onClick: this.tapToRetry,
      errorMessage: this.state.errorMessage,
    };

    return { ...cardProps, ...newProps };
  };

  getTapToRefreshPageCardProps = (cardProps: CreateMacro): CreateMacro => {
    // uncomment for https://product-fabric.atlassian.net/browse/CCEA-743
    // const newProps = {
    //   isDisabled: false,
    //   onClick: this.tapToRetry,
    //   errorMessage: this.state.errorMessage,
    //   secondaryAction:  <Action callToAction>Refresh page {this.state.retryCount}</Action>
    // };
    // right now refresh is disabled
    console.log(this.state.errorMessage, '======== error yallllllllll');
    const newProps = {
      isDisabled: true,
      errorMessage: this.state.errorMessage,
    };

    return { ...cardProps, ...newProps };
  };

  render() {
    let cardProps: CreateMacro = {
      isDisabled: false,
      action: <></>,
      onClick: null,
      secondaryAction: <></>,
    };

    if (true) {
      // if (this.props.macroWhitelist) {
      // check if macroWhitelist has been passed
      if (true) {
        // check if macroname is NOT in macrowhitelist
        // if(this.props.macroWhitelist.includes("macroName")) {
        if (
          !this.state.loaded &&
          !this.state.loading &&
          !this.state.errorMessage
        ) {
          // show tap to load
          return this.createCard(this.getTapToLoadCardProps(cardProps));
        } else if (!this.state.loaded && this.state.loading) {
          // show loading state, possible to have error message and loading
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
            // show tap to refresh page
            return this.createCard(
              this.getTapToRefreshPageCardProps(cardProps),
            );
          }
        }
      } else {
        // macro is on whitelist
      }
    } else {
      // what to show while getting the whitelist is pending
      // an unclickable card ?
      cardProps.isDisabled = true;
    }

    return this.createCard(cardProps);
  }
}
