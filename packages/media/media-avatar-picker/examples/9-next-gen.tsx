import * as React from 'react';
import { Component } from 'react';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import Button from '@atlaskit/button';
import styled from 'styled-components';
import { AvatarPickerDialog, ImageActions, Avatar } from '../src/next-gen';
import { generateAvatars } from '../example-helpers';

const avatars: Array<Avatar> = generateAvatars(30);

const Layout: React.ComponentClass<React.HTMLAttributes<{}>> = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 80vh;

  > * {
    max-width: 200px;
  }
`;

interface ExampleState {
  isOpen: boolean;
}

class Example extends Component<{}, ExampleState> {
  state: ExampleState = {
    isOpen: true,
  };

  onOpen = () => {
    this.setState({ isOpen: true });
  };

  onImageSelected = (actions: ImageActions) => {
    console.log(actions.toDataURL());
    this.onClose();
  };

  onAvatarSelected = (avatar: Avatar) => {
    console.log(avatar.dataURI);
    this.onClose();
  };

  onClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen } = this.state;

    return (
      <div>
        <Page>
          <Grid>
            <GridColumn medium={2} />
            <GridColumn medium={8}>
              <Layout>
                <Button appearance="primary" onClick={this.onOpen}>
                  Open sesame!
                </Button>
              </Layout>
              <AvatarPickerDialog
                avatars={avatars}
                isCircular={true}
                isOpen={isOpen}
                isLoading={false}
                onImageSelected={this.onImageSelected}
                onAvatarSelected={this.onAvatarSelected}
                onCancel={this.onClose}
              />
            </GridColumn>
            <GridColumn medium={2} />
          </Grid>
        </Page>
      </div>
    );
  }
}

export default () => <Example />;
