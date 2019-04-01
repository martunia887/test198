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

const renderAvatars = (
  numTimes = 20,
  componentName = 'default',
  renderMethod,
) =>
  repeat(numTimes, (_, i) => (
    <Avatar
      key={i}
      size="xlarge"
      src={`https://api.adorable.io/avatars/285/${componentName}_${i +
        2}_@adorable.png`}
      renderMethod={renderMethod}
    />
  ));

class App extends React.Component {
  handleClick = () => {
    this.forceUpdate();
  };
  render() {
    return (
      <AppWrapper>
        <button style={{ padding: '10px' }} onClick={this.handleClick}>
          Force Update
        </button>
        <section>
          <h1>Method 1</h1>
          <AvatarWrapper>{renderAvatars()}</AvatarWrapper>
        </section>
        <section>
          <h1>Method 2</h1>
          <AvatarWrapper>
            {renderAvatars(20, 'method2', 'src_to_server')}
          </AvatarWrapper>
        </section>
      </AppWrapper>
    );
  }
}

export default App;
