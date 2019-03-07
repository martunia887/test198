import * as React from 'react';
import { exampleOptions } from '../example-helpers';
import { UserPicker } from '../components/UserPicker';

export default class Example extends React.Component<{}> {
  render() {
    return (
      <UserPicker
        options={exampleOptions}
        isDisabled={true}
        value={exampleOptions[0]}
      />
    );
  }
}
