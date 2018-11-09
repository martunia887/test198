import React, { Component } from 'react';

// import AkButton from "@atlaskit/button";
import Modal, { ModalTitle } from '@atlaskit/modal-dialog';

import ShareMessageComponent from '../ShareMessage';
import ShareableLink from '../ShareableLink';
import ShareSelect from '../ShareSelect';
import {
  ShareModalContainerStyle,
  ShareModalDividerStyle,
  ShareModalFormColumnStyle,
  ShareModalHRStyle,
  ShareTypeStyle,
} from './styles';

import loadOptions from '../../api/loadOptions';

// import loadConfluenceRecipients from "../ShareSelect/loadConfluenceRecipients";
// import composeContacts from "../ShareSelect/composeContacts";

// export type Product = 'jira' | 'jira-core' | 'jira-servicedesk' | 'jira-software' | 'jira-incident-manager' | 'confluence' | 'bitbucket' | 'trello';

// export type Content = 'page' | 'space' | 'issue' | 'project' | 'comment' | 'content' | 'site' | 'team' | 'repository' | 'pullrequest' | 'app' | 'board' | 'card' | 'user';

export interface OnClose {
  (): void;
}

export interface OnShareClick {
  (
    recipients: Array<{ email: string; id: string; __isNew__: boolean }>,
    message: string,
  ): any;
}

// export interface OriginTracing {
//   id: string;
//   product: Product;
// }

export interface Props {
  cloudId: string;
  objectId: string;
  objectType: string;
  handleShareClick: OnShareClick;
  onClose: OnClose;
  originTracing: any;
  product: string;
  shareLink: string;
}

export default class ShareModalComponent extends Component<Props, {}> {
  state = {
    recipients: [],
    message: '',
  };

  handleShareClick = () => {
    const { recipients, message } = this.state;
    const { handleShareClick, onClose } = this.props;
    return handleShareClick(recipients, message)
      .then(response => {
        if (!response.ok) {
          console.log(response);
          throw new Error('Http Error');
        }

        return response.json();
      })
      .then(body => {
        console.log(body);
        onClose();
      })
      .catch(err => {
        console.log(err);
        onClose();
      });
  };

  handleMessageChange = e => this.setState({ message: e.target.value });

  handleSelectChange = (recipients: Array<{}>) => {
    this.setState({
      recipients,
    });
  };

  render() {
    // const { recipients } = this.state;
    const { cloudId, objectType, onClose, shareLink } = this.props;
    // const isShareSelectEmpty = !recipients.length;
    const actions = [
      { text: 'Share', onClick: this.handleShareClick },
      { text: 'Close', onClick: onClose },
    ];

    return (
      <Modal width={'small'} actions={actions}>
        <ShareModalContainerStyle>
          <ShareModalFormColumnStyle>
            <ModalTitle>
              Share<ShareTypeStyle>&nbsp;{objectType}</ShareTypeStyle>
            </ModalTitle>
            <ShareableLink link={shareLink} />
            <ShareModalHRStyle />
            <ShareModalDividerStyle>
              <span>OR</span>
            </ShareModalDividerStyle>
            <ShareSelect
              loadOptions={loadOptions(cloudId)}
              handleChange={this.handleSelectChange}
            />
            <ShareMessageComponent
              handleMessageChange={this.handleMessageChange}
            />
          </ShareModalFormColumnStyle>
        </ShareModalContainerStyle>
      </Modal>
    );
  }
}
