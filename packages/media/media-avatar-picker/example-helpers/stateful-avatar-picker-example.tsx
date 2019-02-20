import * as React from 'react';
import { Component } from 'react';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import Button from '@atlaskit/button';
import styled from 'styled-components';
import { AvatarPickerDialog, ImageActions, Avatar } from '../src/next-gen';

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

const SelectedImage: React.ComponentClass<
  React.ImgHTMLAttributes<{}>
> = styled.img`
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  border: 1px solid #000;
`;

interface ExampleProps {
  containerWidth: number;
  containerHeight: number;
  mode: 'user' | 'container';
  avatars?: Array<Avatar>;
  selectedAvatar?: Avatar;
}

interface ExampleState {
  selectedImg?: string;
  isOpen: boolean;
}

export class AvatarPickerExample extends Component<ExampleProps, ExampleState> {
  state: ExampleState = {
    isOpen: true,
  };

  onOpen = () => {
    this.setState({ isOpen: true });
  };

  onImageSelected = (actions: ImageActions) => {
    this.setState({ selectedImg: actions.toDataURL() });
    this.onClose();
  };

  onAvatarSelected = (avatar: Avatar) => {
    console.log('Avatar Selected:', avatar.dataURI);
    this.onClose();
  };

  onClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { mode, avatars, selectedAvatar } = this.props;
    const { isOpen, selectedImg } = this.state;

    return (
      <div>
        <Page>
          <Grid>
            <GridColumn medium={2} />
            <GridColumn medium={8}>
              <Layout>
                {selectedImg ? <SelectedImage src={selectedImg} /> : null}
                <Button appearance="primary" onClick={this.onOpen}>
                  Open sesame!
                </Button>
              </Layout>
              <AvatarPickerDialog
                mode={mode}
                avatars={avatars}
                selectedAvatar={selectedAvatar}
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
