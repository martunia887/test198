import * as React from 'react';
import Button from '@atlaskit/button';

import { MacroRendererProps, MacroRendererState, CreateMacro } from './types';
import { MacroCard } from './MacroCard';
import Spinner from '@atlaskit/spinner';

import { createPromise } from '../../cross-platform-promise';
import { Action, cardStyles } from './styles';
import {
  TAP_TO_LOAD_TEXT,
  TAP_TO_RETRY_TEXT,
  TAP_TO_VIEW_TEXT,
  TAP_TO_REFRESH_PAGE_TEXT,
  ERROR_LOADING_TEXT,
  FINAL_ERROR_LOADING_TEXT,
  TAP_TO_VIEW_PROMISE,
  TAP_TO_REFRESH_PAGE_PROMISE,
  TAP_TO_RFRESH_EVENT,
  TAP_TO_LOAD_PROMISE,
} from './constants';

import { eventDispatcher } from '../dispatcher';

// create standard translated error messages here????

export class MacroComponent extends React.Component<
  MacroRendererProps,
  MacroRendererState
> {
  constructor(props: MacroRendererProps) {
    super(props);

    this.state = this.getInitialState();
  }

  getInitialState = () => {
    return {
      content: null,
      macroWhitelist: null,
      loading: false,
      loaded: false,
      retryCount: 0,
      errorMessage: '',
    };
  };

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
  createCard = ({
    action,
    errorMessage,
    onClick,
    isDisabled,
    secondaryAction,
  }: CreateMacro) => {
    const { parameters, extensionKey } = this.props.extension;
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
            secondaryAction={secondaryAction}
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
            secondaryAction={secondaryAction}
          />
        </Button>
      );
    }
  };

  setLoadingErrorState = () => {
    this.setState({
      loaded: false,
      loading: false,
      errorMessage: ERROR_LOADING_TEXT,
    });
  };

  setErrorUnableToLoadState = () => {
    this.setState({
      loaded: false,
      loading: false,
      errorMessage: FINAL_ERROR_LOADING_TEXT,
    });
  };

  setLoadingSuccessState = () => {
    this.setState({
      loaded: true,
      loading: false,
      errorMessage: '',
    });
  };

  // isSuccessful is type string
  tapToLoad = () => {
    // on button click
    // set state to loading
    this.setState({ loading: true });
    createPromise(
      TAP_TO_LOAD_PROMISE.name,
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
          this.setLoadingErrorState();
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
      TAP_TO_VIEW_PROMISE.name,
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
        errorMessage: '',
      };
    });
    createPromise(
      TAP_TO_LOAD_PROMISE.name,
      JSON.stringify({
        macroId: this.getMacroId(),
        retryCount: this.state.retryCount,
      }),
    )
      .submit()
      .then(isSuccessful => {
        if (isSuccessful) {
          this.setLoadingSuccessState();
        } else if (this.state.retryCount > 2) {
          this.setErrorUnableToLoadState();
        } else {
          this.setLoadingErrorState();
        }
      })
      .catch(() => {
        this.setErrorUnableToLoadState();
      });
  };

  tapToRefreshPage = () => {
    // Emit a refresh event with no data
    eventDispatcher.emit(TAP_TO_RFRESH_EVENT, null);
    // on button click
    // do not set state to loading
    createPromise(TAP_TO_REFRESH_PAGE_PROMISE.name)
      .submit()
      .then(() => {
        // re-invoking the load method of the macro
        this.tapToLoad();
      })
      .catch(() => {
        this.setErrorUnableToLoadState();
      });
  };

  getTapToLoadCardProps = (cardProps: CreateMacro): CreateMacro => {
    const newProps = {
      action: <Action>{TAP_TO_LOAD_TEXT}</Action>,
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
      action: <Action callToAction>{TAP_TO_VIEW_TEXT}</Action>,
      isDisabled: false,
      onClick: this.tapToView,
    };

    return { ...cardProps, ...newProps };
  };

  getTapToRetryCardProps = (cardProps: CreateMacro): CreateMacro => {
    const newProps = {
      action: <Action callToAction>{TAP_TO_RETRY_TEXT}</Action>,
      isDisabled: false,
      onClick: this.tapToRetry,
      errorMessage: this.state.errorMessage,
    };

    return { ...cardProps, ...newProps };
  };

  getTapToRefreshPageCardProps = (cardProps: CreateMacro): CreateMacro => {
    const newProps = {
      isDisabled: false,
      onClick: this.tapToRefreshPage,
      errorMessage: this.state.errorMessage,
      secondaryAction: <Action callToAction>{TAP_TO_REFRESH_PAGE_TEXT}</Action>,
    };

    return { ...cardProps, ...newProps };
  };

  onTapToRefresh = () => {
    this.setState(this.getInitialState());
  };

  componentDidMount() {
    // Attach a listener to the tapToRefresh event emitted during refresh.
    eventDispatcher.on(TAP_TO_RFRESH_EVENT, this.onTapToRefresh);
  }

  componentWillUnmount() {
    // Removing the listener to the event before the component is unMounted.
    eventDispatcher.off(TAP_TO_RFRESH_EVENT, this.onTapToRefresh);
  }

  render() {
    let cardProps: CreateMacro = {
      isDisabled: false,
      action: <></>,
      onClick: null,
      secondaryAction: <></>,
    };
    const { macroWhitelist, extension } = this.props;
    const { extensionKey } = extension;

    if (macroWhitelist) {
      // check if macroWhitelist has been passed
      if (!macroWhitelist.includes(extensionKey)) {
        // check if macroname is NOT in macrowhitelist
        if (
          !this.state.loaded &&
          !this.state.loading &&
          !this.state.errorMessage
        ) {
          // show tap to load
          return this.createCard(this.getTapToLoadCardProps(cardProps));
        } else if (
          this.state.loaded &&
          !this.state.loading &&
          !this.state.errorMessage
        ) {
          // show tap to show button
          // promise to show button
          return this.createCard(this.getTapToViewCardProps(cardProps));
        } else if (!this.state.loaded && this.state.loading) {
          // show loading state, possible to have error message and loading
          return this.createCard(this.getLoadingCardProps(cardProps));
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
        return null; // we don't have any actual component yet to return
      }
    } else {
      // what to show while getting the whitelist is pending
      // an unclickable card ?
      cardProps.isDisabled = true;
    }

    return this.createCard(cardProps);
  }
}
