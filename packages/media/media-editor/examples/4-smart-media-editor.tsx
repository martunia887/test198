import * as React from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import { Card } from '@atlaskit/media-card';
import {
  imageFileId,
  createUploadContext,
  I18NWrapper,
} from '@atlaskit/media-test-helpers';
import { FileIdentifier } from '@atlaskit/media-core';
import { SmartMediaEditor } from '../src';

interface State {
  showEditorVersion?: 'with-i18n' | 'without-i18n';
  showWithError: boolean;
  newFileIdentifier?: FileIdentifier;
  isEmptySketch: boolean;
}

const context = createUploadContext();

class SmartMediaEditorExample extends React.Component<{}, State> {
  state: State = {
    showWithError: false,
    isEmptySketch: false,
  };

  openEmptySmartEditor = () => () => {
    this.setState({
      showEditorVersion: 'without-i18n',
      showWithError: false,
      isEmptySketch: true,
    });
  };

  openSmartEditor = (editorVersion: State['showEditorVersion']) => () => {
    this.setState({
      showEditorVersion: editorVersion,
      showWithError: false,
      isEmptySketch: false,
    });
  };

  openSmartEditorWithError = (
    editorVersion: State['showEditorVersion'],
  ) => () => {
    this.setState({
      showEditorVersion: editorVersion,
      showWithError: true,
      isEmptySketch: false,
    });
  };

  onFinish = () => {
    this.setState({ showEditorVersion: undefined });
  };

  onUploadStart = (identifier: FileIdentifier) => {
    this.setState({
      newFileIdentifier: identifier,
      showEditorVersion: undefined,
    });
  };

  private renderEditor = () => {
    const { isEmptySketch, showWithError } = this.state;
    let id = imageFileId.id;
    if (showWithError) {
      id = '🥳';
    } else if (isEmptySketch) {
      id = '';
    }

    return (
      <SmartMediaEditor
        identifier={{
          ...imageFileId,
          id,
        }}
        context={context}
        onFinish={this.onFinish}
        onUploadStart={this.onUploadStart}
      />
    );
  };

  private renderContent = (editorVersion: State['showEditorVersion']) => {
    const { showEditorVersion } = this.state;
    return (
      <div>
        <ButtonGroup>
          <Button onClick={this.openSmartEditor(editorVersion)}>
            Open Smart Editor
          </Button>
          <Button onClick={this.openSmartEditorWithError(editorVersion)}>
            Open Smart Editor (with an error)
          </Button>
        </ButtonGroup>

        {editorVersion && showEditorVersion === editorVersion
          ? this.renderEditor()
          : null}
      </div>
    );
  };

  render() {
    const { newFileIdentifier } = this.state;
    return (
      <div>
        <h3>Sketch</h3>
        <Button onClick={this.openEmptySmartEditor()}>Open Empty sketch</Button>

        <h3>With i18n</h3>
        <I18NWrapper>{this.renderContent('with-i18n')}</I18NWrapper>

        <h3>Without i18n</h3>
        {this.renderContent('without-i18n')}

        {newFileIdentifier ? (
          <Card identifier={newFileIdentifier} context={context} />
        ) : null}
      </div>
    );
  }
}

export default () => <SmartMediaEditorExample />;
