import * as React from 'react';
import Button from '@atlaskit/button';
import LocationPicker from '../src/picker';

interface State {
  isOpen: boolean;
}
export default class ExampleBasic extends React.PureComponent<{}, State> {
  state: State = { isOpen: true };

  open = () => this.setState({ isOpen: true });

  close = () => {
    this.setState({ isOpen: false });
  };

  secondaryAction = ({ target }: any) => console.log(target.innerText);

  render() {
    const { isOpen } = this.state;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Button onClick={this.open} appearance={'primary'}>
          Open Picker
        </Button>
        <LocationPicker isOpen={isOpen} onClose={this.close} />
      </div>
    );
  }
}
