import * as React from 'react';
import { Deck, Slide } from 'spectacle';

class Presentation extends React.Component {
  render() {
    return (
      <Deck>
        <Slide>Spectacle Boilerplate</Slide>
        <Slide>Typography</Slide>
        <Slide>Standard List</Slide>
        <Slide>Example Quote</Slide>
      </Deck>
    );
  }
}

export default function Example() {
  return <Presentation />;
}
