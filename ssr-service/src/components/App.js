// @flow
import React from 'react';
import Avatar from '@atlaskit/avatar';
import styled from '@emotion/styled';

function repeat(numTimes, cb) {
  return Array.from(new Array(numTimes), cb);
}

const AppWrapper = styled.div`
  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto;
  width: 100%;
  section {
    padding: 4em;
  }
`;

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

class App extends React.Component {
  handleClick = () => {
    this.forceUpdate();
  };
  renderAvatars = (numTimes = 20, componentName = 'default', renderMethod) =>
    repeat(numTimes, (_, i) => (
      <Avatar
        key={i}
        size="xlarge"
        src={`https://api.adorable.io/avatars/285/${componentName}_${i}_@adorable.png`}
        alternateSSRMethod={renderMethod}
      />
    ));
  renderMethod1 = () => (
    <section>
      <h1>Method 1: Pass `imgUrl` to server</h1>
      <AvatarWrapper>{this.renderAvatars()}</AvatarWrapper>
    </section>
  );
  renderMethod2 = () => (
    <section>
      <h1>Method 2: Don't pass `imgUrl` to server</h1>
      <AvatarWrapper>{this.renderAvatars(20, 'method2', true)}</AvatarWrapper>
    </section>
  );
  render() {
    return (
      <AppWrapper>
        <button style={{ padding: '10px' }} onClick={this.handleClick}>
          Force Update
        </button>
        {this.renderMethod2()}
      </AppWrapper>
    );
  }
}

export default App;
