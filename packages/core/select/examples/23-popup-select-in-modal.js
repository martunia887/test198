// @flow

import React from 'react';
import Modal from '@atlaskit/modal-dialog';
import { PopupSelect } from '../src';

const options = [
  { label: 'Adelaide', value: 'adelaide' },
  { label: 'Brisbane', value: 'brisbane' },
  { label: 'Canberra', value: 'canberra' },
  { label: 'Darwin', value: 'darwin' },
  { label: 'Hobart', value: 'hobart' },
  { label: 'Melbourne', value: 'melbourne' },
  { label: 'Perth', value: 'perth' },
  { label: 'Sydney', value: 'sydney' },
];

const onChange = console.log;
const defaults = { options, placeholder: 'Choose a City', onChange };

type State = {| showModal: boolean |};

class PopupSelectInModalExample extends React.Component<{}, State> {
  state = { showModal: false };

  render() {
    const { showModal } = this.state;

    return (
      <div css={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => this.setState({ showModal: !showModal })}>
          Show modal
        </button>
        {showModal && (
          <Modal>
            <div style={{ height: 400 }}>
              <PopupSelect
                {...defaults}
                popperProps={{ positionFixed: true }}
                target={<button>Target</button>}
              />
            </div>
            <button onClick={() => this.setState({ showModal: !showModal })}>
              Close
            </button>
          </Modal>
        )}
      </div>
    );
  }
}

export default PopupSelectInModalExample;
