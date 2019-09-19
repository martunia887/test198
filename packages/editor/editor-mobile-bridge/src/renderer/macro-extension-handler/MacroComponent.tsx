import * as React from 'react';
import Button from '@atlaskit/button';
import styled from 'styled-components';
import * as colors from '@atlaskit/theme/colors';

// import {createMetadataLoader} from "../extensions-common/macro-loader";
// import { MacroMetadata } from "../extensions-common/types";
import Spinner from '@atlaskit/spinner';
import { ExtensionParams } from '@atlaskit/editor-common';
import { extensionToADF } from '../helpers';
import { macroIcon } from './MacroIcon';
import { createPromise } from '../../cross-platform-promise';

export interface MacroRendererProps {
  extension: ExtensionParams<any>;
}

export interface MacroRendererState {
  content?: string | null;
  contentId?: number | null;
  loading: boolean;
  loaded: boolean;
  errorMessage: string;
  macroWhitelist: object | null;
  retryCount: number;
}

type MacroCard = {
  macroName: string;
  title: string;
  icon?: any;
} & CreateMacro;

type CreateMacro = {
  isDisabled: boolean;
  action: any;
  onClick?: ((...args: any[]) => void) | null;
  errorMessage?: string;
};

const Card = styled.span`
  border: ${colors.N30} 2px solid;
  background: ${colors.N0};
  display: flex;
`;
const Content = styled.span``;
const Icon = styled.span`
  height: 18px;
  width: 18px;
  padding: 0 4px 0 10px;
`;
const Action = styled.span`
  padding-right: 16px;
  color: ${colors.B300};
`;
const Error = styled.span``;

// content can be title or loading state
// action is the button object
const MacroCard = ({
  macroName,
  title,
  icon,
  action,
  errorMessage,
  onClick,
  isDisabled,
}: MacroCard) => {
  if (onClick) {
    return (
      <Button
        onClick={onClick}
        iconBefore={macroIcon(icon, macroName, title)}
        isDisabled={isDisabled}
      >
        <Content>{macroName}</Content>
        <Action>{action}</Action>
        {errorMessage ? <Error>{errorMessage}</Error> : null}
      </Button>
    );
  }
  return (
    <Button
      iconBefore={macroIcon(icon, macroName, title)}
      isDisabled={isDisabled}
    >
      <Content>{macroName}</Content>
      <Action>{action}</Action>
      {errorMessage ? <Error>{errorMessage}</Error> : null}
    </Button>
  );
};

// const loadMacroMetadata = createMetadataLoader();

// export const getMacroMetaData = (extensionKey:string): Promise<MacroMetadata[]> =>
//   loadMacroMetadata().then(macros => macros.filter(macro => macro.macroName === extensionKey));

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

  componentDidMount() {
    const ext = this.props.extension;
    const adf = JSON.stringify(extensionToADF(ext));
    const contentId = '960561171'; // https://product-fabric.atlassian.net/wiki/spaces/~speachey/pages/960561171/Single+macro

    const dataToSend = {
      contentId,
      adf,
    };

    // createPromise('customLegacyMacro', JSON.stringify(dataToSend))
    //   .submit()
    //   .then(result => {
    //     console.log('=== result of promise');
    //     console.log(result);
    //     this.setState(result);
    //   });
  }

  // all optional props?
  // action can be view/retry/spinner/nothing
  createCard = ({ action, errorMessage, onClick, isDisabled }: CreateMacro) => {
    const { parameters, extensionKey } = this.props.extension;

    // const macroMetadata = await getMacroMetaData(extensionKey);
    // const macroName = macroMetadata.macroName;
    // const title = macroMetadata.title;
    const macroId = parameters.macroMetadata.macroId.value;
    // const icon = macroMetadata.icon ;
    // console.log("==== macrometttta",macroMetadata, JSON.stringify(macroMetadata));
    // return <MacroCard macroName={macroName} title={title} icon={icon}/>;

    // 3 possible actions
    // retry load of webview
    // tap to load promise
    // tap to view promise
    return (
      <MacroCard
        macroName={macroId}
        title={'temp'}
        action={action}
        onClick={onClick}
        isDisabled={isDisabled}
      />
    );
  };

  tapToLoad = () => {
    // on button click
    // set state to loading
    this.setState({ loading: true });
    // promise returns set state to loaded
    createPromise('customConfigurationMacro')
      .submit()
      .then(result => {
        const timer = setTimeout(() => {
          console.log('=== result of promise for this one macrooooo');
          var resultObj = JSON.parse(JSON.stringify(result));
          console.log(resultObj.contentId as number);
          this.setState({
            loaded: true,
            loading: false,
          });
          clearTimeout(timer);
        }, 4000);
      });
  };

  tapToView = () => {
    // on button click
    // do not set state to loading
    const { parameters } = this.props.extension;
    const macroId = parameters.macroMetadata.macroId.value;
    console.log('==== clicked on tap to view');
    createPromise('showGivenMacroOnly', macroId)
      .submit()
      .then(result => {
        console.log('=== result of promise taptoview', macroId);
      });
  };

  tapToRetry = () => {
    // on button click
    // reset everything except counter?????????
    this.setState((state, props) => {
      return {
        retryCount: state.retryCount + 1,
      };
    });
    createPromise('customConfigurationMacro')
      .submit()
      .then(result => {
        console.log('=== result of promise taptoretry');
      });
  };

  getTapToLoadCardProps = (cardProps: CreateMacro): CreateMacro => {
    const newProps = {
      action: <Action>Tap to Load</Action>,
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
      action: <Action>View</Action>,
      isDisabled: false,
      onClick: this.tapToView,
    };

    return { ...cardProps, ...newProps };
  };

  getTapToRetryCardProps = (cardProps: CreateMacro): CreateMacro => {
    const newProps = {
      action: <Action>Retry {this.state.retryCount}</Action>,
      isDisabled: false,
      onClick: this.tapToRetry,
    };

    return { ...cardProps, ...newProps };
  };

  render() {
    let cardProps: CreateMacro = {
      isDisabled: false,
      action: <></>,
      onClick: null,
    };

    // check if macroname is in macrowhitelist
    if (true) {
      // if (this.props.macroWhitelist) {
      if (true) {
        // if(this.props.macroWhitelist.includes("macroName")) {
        // if the macro is in the whitelist
        if (!this.state.loaded && !this.state.loading) {
          // console.log("====== tap to load");
          // show tap to load
          return this.createCard(this.getTapToLoadCardProps(cardProps));
        } else if (!this.state.loaded && this.state.loading) {
          // show loading state
          // console.log("====== loading");
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
          console.log('====== else');

          // loaded && loading should not be a possible state unless an error has occurred
          // check retry count state
          if (this.state.retryCount < 3) {
            // allow to retry
            return this.createCard(this.getTapToRetryCardProps(cardProps));
          } else {
            // show permanent error
            cardProps.action = <Action>Welp get Help</Action>;
            cardProps.isDisabled = true;
          }
        }
      } else {
        // macro is not on whitelist
      }
    } else {
      // what to show while getting the whitelist is pending
      // an unclickable card
      cardProps.isDisabled = true;
    }

    return this.createCard(cardProps);
  }
}
