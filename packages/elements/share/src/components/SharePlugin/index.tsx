import * as React from 'react';

import OriginTracing from '@atlassiansox/origin-tracing';

import ShareButton from '../ShareButton';
import ShareModal from '../ShareModal';
import share from '../../api/share';

export interface Props {
  cloudId: string;
  objectId: string;
  objectTitle: string;
  objectType: string;
  product: string;
  shareLink: string;
}

export default class SharePlugin extends React.Component<Props, any> {
  state = {
    isModalShown: false,
    formattedShareLink: '',
    originTracing: null,
  };

  // This should go into the Provider
  static getDerivedStateFromProps(props, state) {
    const {
      cloudId,
      objectId,
      objectTitle,
      objectType,
      product,
      shareLink,
    } = props;

    if (
      cloudId &&
      objectId &&
      objectTitle &&
      objectType &&
      product &&
      shareLink
    ) {
      const originTracing = new OriginTracing({ product });
      return {
        ...state,
        originTracing: new OriginTracing({ product }),
        formattedShareLink: originTracing.addToUrl(shareLink),
      };
    }
  }

  showModal = () => {
    this.setState({ isModalShown: true });
  };

  hideModal = () => {
    this.setState({ isModalShown: false });
  };

  formatAri = (product, cloudId, objectType, objectId) => {
    return `ari:cloud:${product}:${cloudId}:${objectType}/${objectId}`;
  };

  formatRecipients = recipients => {
    return recipients.map(recipient => {
      if (recipient.__isNew__) {
        return { email: recipient.email };
      }

      return { id: recipient.id };
    });
  };

  share: any = (
    recipients: Array<{ email: string; id: string; __isNew__: boolean }>,
    message: string,
  ) => {
    const { formattedShareLink } = this.state;
    const { cloudId, objectId, objectTitle, objectType, product } = this.props;
    const ari = this.formatAri(product, cloudId, objectType, objectId);
    const formattedRecipients = this.formatRecipients(recipients);
    // request to Share Service
    return share(
      formattedRecipients,
      {
        link: formattedShareLink,
        ari,
        title: objectTitle,
      },
      message,
    );
  };

  render() {
    const { isModalShown, formattedShareLink, originTracing } = this.state;
    const { cloudId, objectId, objectType, product } = this.props;
    return (
      <div>
        <ShareButton onClick={this.showModal} />
        {isModalShown && (
          <ShareModal
            cloudId={cloudId}
            objectId={objectId}
            objectType={objectType}
            handleShareClick={this.share}
            onClose={this.hideModal}
            originTracing={originTracing}
            product={product}
            shareLink={formattedShareLink}
          />
        )}
      </div>
    );
  }
}
