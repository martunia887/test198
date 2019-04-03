import { ButtonAppearances } from '@atlaskit/button';
import { LoadOptions } from '@atlaskit/user-picker';
import memoizeOne from 'memoize-one';
import * as React from 'react';
import {
  ConfigResponse,
  ShareClient,
  ShareServiceClient,
} from '../clients/ShareServiceClient';
import {
  Content,
  DialogContentState,
  Flag,
  MetaData,
  OriginTracing,
  OriginTracingFactory,
  ShareButtonStyle,
  ShareResponse,
} from '../types';
import MessagesIntlProvider from './MessagesIntlProvider';
import { ShareDialogWithTrigger } from './ShareDialogWithTrigger';
import { optionDataToUsers } from './utils';

export type Props = {
  buttonStyle?: ShareButtonStyle;
  client?: ShareClient;
  cloudId: string;
  dialogPlacement?: string;
  formatCopyLink: (origin: OriginTracing, link: string) => string;
  loadUserOptions: LoadOptions;
  originTracingFactory: OriginTracingFactory;
  productId: string;
  shareAri: string;
  shareContentType: string;
  shareLink: string;
  shareTitle: string;
  shareFormTitle?: React.ReactNode;
  shouldCloseOnEscapePress?: boolean;
  showFlags: (flags: Array<Flag>) => void;
  triggerButtonAppearance?: ButtonAppearances;
  triggerButtonStyle?: ShareButtonStyle;
};

export type State = {
  config?: ConfigResponse;
  copyLinkOrigin: OriginTracing | null;
  prevShareLink: string | null;
  shareActionCount: number;
  shareOrigin: OriginTracing | null;
};

const memoizedFormatCopyLink: (
  origin: OriginTracing,
  link: string,
) => string = memoizeOne(
  (origin: OriginTracing, link: string): string => origin.addToUrl(link),
);

/**
 * This component serves as a Provider to provide customizable implementations
 * to ShareDialogTrigger component
 */
export class ShareDialogContainer extends React.Component<Props, State> {
  private client: ShareClient;
  private _isMounted = false;

  static defaultProps = {
    shareLink: window && window.location!.href,
    formatCopyLink: memoizedFormatCopyLink,
  };

  constructor(props: Props) {
    super(props);

    if (props.client) {
      this.client = props.client;
    } else {
      this.client = new ShareServiceClient();
    }

    this.state = {
      copyLinkOrigin: null,
      prevShareLink: null,
      shareActionCount: 0,
      shareOrigin: null,
    };
  }

  static getDerivedStateFromProps(
    nextProps: Props,
    prevState: State,
  ): Partial<State> | null {
    // Whenever there is change in share link, new origins should be created
    // ***
    // memorization is recommended on React doc, but here the Origin Tracing does not reply on shareLink
    // in getDerivedStateFormProps it makes shareLink as determinant of renewal to stand out better
    // ***
    if (
      prevState.prevShareLink ||
      prevState.prevShareLink !== nextProps.shareLink
    ) {
      return {
        copyLinkOrigin: nextProps.originTracingFactory(),
        prevShareLink: nextProps.shareLink,
        shareOrigin: nextProps.originTracingFactory(),
      };
    }

    return null;
  }

  componentDidMount() {
    this._isMounted = true;

    this.fetchConfig();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchConfig = () => {
    this.client
      .getConfig(this.props.productId, this.props.cloudId)
      .then((config: ConfigResponse) => {
        if (this._isMounted) {
          // TODO: Send analytics event
          this.setState({ config });
        }
      })
      .catch(() => {
        // TODO: Send analytics event
      });
  };

  handleSubmitShare = ({
    users,
    comment,
  }: DialogContentState): Promise<ShareResponse> => {
    const {
      originTracingFactory,
      productId,
      shareAri,
      shareContentType,
      shareLink,
      shareTitle,
    } = this.props;
    const content: Content = {
      ari: shareAri,
      // original share link is used here
      link: shareLink,
      title: shareTitle,
      type: shareContentType,
    };
    const metaData: MetaData = {
      productId,
      atlOriginId: this.state.shareOrigin!.id,
    };

    return this.client
      .share(content, optionDataToUsers(users), metaData, comment)
      .then((response: ShareResponse) => {
        const newShareCount = this.state.shareActionCount + 1;
        // renew Origin Tracing Id per share action succeeded
        this.setState({
          shareActionCount: newShareCount,
          shareOrigin: originTracingFactory(),
        });

        return response;
      })
      .catch((err: Error) => Promise.reject(err));
  };

  render() {
    const {
      dialogPlacement,
      formatCopyLink,
      loadUserOptions,
      shareContentType,
      shareFormTitle,
      shareLink,
      shouldCloseOnEscapePress,
      showFlags,
      triggerButtonAppearance,
      triggerButtonStyle,
    } = this.props;
    const { shareOrigin } = this.state;
    const copyLink = formatCopyLink(this.state.copyLinkOrigin!, shareLink);
    return (
      <MessagesIntlProvider>
        <ShareDialogWithTrigger
          config={this.state.config}
          copyLink={copyLink}
          dialogPlacement={dialogPlacement}
          loadUserOptions={loadUserOptions}
          onShareSubmit={this.handleSubmitShare}
          shareContentType={shareContentType}
          shareFormTitle={shareFormTitle}
          shareOrigin={shareOrigin}
          shouldCloseOnEscapePress={shouldCloseOnEscapePress}
          showFlags={showFlags}
          triggerButtonAppearance={triggerButtonAppearance}
          triggerButtonStyle={triggerButtonStyle}
        />
      </MessagesIntlProvider>
    );
  }
}
