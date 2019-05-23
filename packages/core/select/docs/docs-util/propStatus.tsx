import React, { Component, Fragment, ReactElement } from 'react';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';

const Cell = ({ children }: { children:  ReactElement<any> | Array<any> | string }) => (
  <td
    css={{
      fontSize: '90%',
      padding: '4px 8px 4px 0',
      borderBottom: '1px solid #eee',
      verticalAlign: 'top',
    }}
  >
    {children}
  </td>
);

interface Props {
  content: ReactElement<any> | undefined;
  status: string;
  prop: any;
}

interface State {
  modalIsOpen: boolean,
};

export default class PropStatus extends Component<Props, State> {
  state = {
    modalIsOpen: false,
  };

  onClick = (event: React.MouseEvent) => {
    event.preventDefault();
    this.setState({
      modalIsOpen: true,
    });
  };

  onClose = (event: React.SyntheticEvent<HTMLElement>) => {
    event.preventDefault();
    this.setState({
      modalIsOpen: false,
    });
  };

  renderContent() {
    const { content, status } = this.props;
    if (status === 'renamed') {
      return <Cell>{`use ${content}`}</Cell>;
    }
    return (
      <Cell>
        {content && <Button onClick={this.onClick}>See Note</Button>}
        {this.renderModal()}
      </Cell>
    );
  }

  renderModal() {
    const { content, prop } = this.props;
    const { modalIsOpen } = this.state;
    return (
      <Fragment>
        <ModalTransition>
          {modalIsOpen ? (
            <Modal
              heading={prop}
              actions={[{ text: 'Close', onClick: this.onClose }]}
              onClose={this.onClose}
            >
              {content}
            </Modal>
          ) : null}
        </ModalTransition>
      </Fragment>
    );
  }

  render() {
    const { prop, status } = this.props;
    return (
      <tr>
        <Cell>
          <code>{prop}</code>
        </Cell>
        <Cell>{status}</Cell>
        {this.renderContent()}
      </tr>
    );
  }
}
