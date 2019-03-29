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

const renderAvatars = numTimes =>
  repeat(numTimes, (_, i) => (
    <Avatar
      key={i}
      size="xlarge"
      src={`https://api.adorable.io/avatars/285/${i}@adorable.png`}
    />
  ));

const App = () => {
  return (
    <AppWrapper>
      <section>
        <h1>Method 1</h1>
        <AvatarWrapper>{renderAvatars(50)}</AvatarWrapper>
      </section>
      <section>
        <h1>Method 2</h1>
        <AvatarWrapper>{renderAvatars(50)}</AvatarWrapper>
      </section>
    </AppWrapper>
  );
};

export default App;
