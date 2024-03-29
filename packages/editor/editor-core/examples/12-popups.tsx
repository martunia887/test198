// tslint:disable:no-console

import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import { mention, emoji } from '@atlaskit/util-data-test';
import { Editor } from '../src';
import { Content } from '../example-helpers/styles';
import imageUploadHandler from '../example-helpers/imageUpload';
import { colors } from '@atlaskit/theme';

const Boundary = styled.div`
  border: 2px solid ${colors.N40};
  padding: 130px 60px 10px 40px;
`;

class CustomBoundryExample extends PureComponent<any, any> {
  state = { boundary: undefined };

  handleBoundryRef = (boundary: HTMLElement) => {
    this.setState({ boundary });
  };

  render() {
    const props = this.props;

    return (
      <Boundary innerRef={this.handleBoundryRef}>
        <Editor
          appearance="comment"
          allowCodeBlocks
          analyticsHandler={props.analyticsHandler}
          onCancel={props.onCancel}
          onSave={props.onSave}
          mentionProvider={props.mentionProvider}
          emojiProvider={props.emojiProvider}
          popupsBoundariesElement={this.state.boundary}
          quickInsert={true}
        />
      </Boundary>
    );
  }
}

class PortalExample extends PureComponent<any, any> {
  state = {
    portal: undefined,
  };

  handleRef = (portal: HTMLDivElement) => {
    this.setState({ portal });
  };

  render() {
    const props = this.props;

    return (
      <div>
        <div style={{ overflow: 'hidden' }}>
          <Editor
            appearance="comment"
            allowCodeBlocks
            analyticsHandler={props.analyticsHandler}
            onCancel={props.onCancel}
            onSave={props.onSave}
            mentionProvider={props.mentionProvider}
            emojiProvider={props.emojiProvider}
            popupsMountPoint={this.state.portal}
            quickInsert={true}
          />
        </div>
        <div ref={this.handleRef} />
      </div>
    );
  }
}

class PortalWithCustomBoundaryExample extends PureComponent<any, any> {
  state = { portal: undefined, boundary: undefined };

  handlePortalRef = (portal: HTMLDivElement) => {
    this.setState({ portal });
  };

  handleBoundryRef = (boundary: HTMLDivElement) => {
    this.setState({ boundary });
  };

  render() {
    const props = this.props;

    return (
      <div>
        <Boundary innerRef={this.handleBoundryRef}>
          <div style={{ overflow: 'hidden' }}>
            <Editor
              appearance="comment"
              allowCodeBlocks
              analyticsHandler={props.analyticsHandler}
              onCancel={props.onCancel}
              onSave={props.onSave}
              mentionProvider={props.mentionProvider}
              emojiProvider={props.emojiProvider}
              popupsMountPoint={this.state.portal}
              popupsBoundariesElement={this.state.boundary}
              quickInsert={true}
            />
          </div>
        </Boundary>
        <div ref={this.handlePortalRef} />
      </div>
    );
  }
}

class PortalInScrollContainerExample extends PureComponent<any, any> {
  state = { portal: undefined, boundary: undefined };

  handlePortalRef = (portal: HTMLDivElement) => {
    this.setState({ portal });
  };

  handleBoundryRef = (boundary: HTMLDivElement) => {
    this.setState({ boundary });
  };

  render() {
    const props = this.props;

    return (
      <div
        style={{
          overflow: 'scroll',
          height: 200,
          position: 'relative',
          border: `1px solid ${colors.N40}`,
        }}
        ref={this.handleBoundryRef}
      >
        <div style={{ minHeight: 500, width: '120%' }}>
          <Editor
            appearance="comment"
            analyticsHandler={props.analyticsHandler}
            allowCodeBlocks
            onCancel={props.onCancel}
            onSave={props.onSave}
            mentionProvider={props.mentionProvider}
            emojiProvider={props.emojiProvider}
            popupsMountPoint={this.state.portal}
            popupsBoundariesElement={this.state.boundary}
            quickInsert={true}
          />
        </div>

        <div ref={this.handlePortalRef} />

        <Editor
          appearance="comment"
          analyticsHandler={props.analyticsHandler}
          allowCodeBlocks
          onCancel={props.onCancel}
          onSave={props.onSave}
          mentionProvider={props.mentionProvider}
          emojiProvider={props.emojiProvider}
          popupsMountPoint={this.state.portal}
          popupsBoundariesElement={this.state.boundary}
          quickInsert={true}
        />
      </div>
    );
  }
}

class JiraSidebarEditor extends PureComponent<any, any> {
  state = { portal: undefined, boundary: undefined, scrollable: undefined };

  handlePortalRef = (portal: HTMLDivElement) => {
    this.setState({ portal });
  };

  handleBoundryRef = (boundary: HTMLDivElement) => {
    this.setState({ boundary });
  };

  handleScrollableRef = (scrollable: HTMLDivElement) => {
    this.setState({ scrollable });
  };

  render() {
    return (
      <div ref={this.handleBoundryRef}>
        <div style={{ display: 'table' }}>
          <div style={{ display: 'table-cell', width: 480 }}>JIRA</div>
          <div style={{ display: 'table-cell' }}>
            <div
              style={{ width: 300, overflowY: 'scroll', height: 200 }}
              ref={this.handleScrollableRef}
            >
              <div style={{ height: 500 }}>
                <Editor
                  analyticsHandler={analyticsHandler}
                  onCancel={CANCEL_ACTION}
                  onSave={SAVE_ACTION}
                  mentionProvider={mentionProvider}
                  emojiProvider={emojiProvider}
                  popupsMountPoint={this.state.portal}
                  popupsBoundariesElement={this.state.boundary}
                  popupsScrollableElement={this.state.scrollable}
                  quickInsert={true}
                />
              </div>
            </div>
          </div>
        </div>
        <div ref={this.handlePortalRef} />
      </div>
    );
  }
}

const CANCEL_ACTION = () => console.log('Cancel');
const SAVE_ACTION = () => console.log('Save');
const analyticsHandler = (actionName: string, props?: {}) =>
  console.log(actionName, props);

const mentionProvider = new Promise<any>(resolve =>
  resolve(mention.storyData.resourceProvider),
);
const emojiProvider = emoji.storyData.getEmojiResource() as any;

export default function Example() {
  return (
    <div>
      <Content>
        <h2>Intentionally Broken Example</h2>
        <p style={{ marginBottom: 14 }}>
          Boundries: document.body | Container: 300px, overflow: hidden.
        </p>
        <div style={{ width: 300, overflow: 'hidden' }}>
          <Editor
            appearance="comment"
            analyticsHandler={analyticsHandler}
            allowCodeBlocks
            onCancel={CANCEL_ACTION}
            onSave={SAVE_ACTION}
            mentionProvider={mentionProvider}
            emojiProvider={emojiProvider}
            quickInsert={true}
          />
        </div>
      </Content>

      <hr />

      <Content>
        <h2>Basic</h2>
        <p style={{ marginBottom: 14 }}>
          Boundries: document.body | Container: 300px, no overflow.
        </p>
        <div style={{ width: 300 }}>
          <Editor
            appearance="comment"
            analyticsHandler={analyticsHandler}
            allowCodeBlocks
            onCancel={CANCEL_ACTION}
            onSave={SAVE_ACTION}
            mentionProvider={mentionProvider}
            emojiProvider={emojiProvider}
            quickInsert={true}
          />
        </div>
      </Content>

      <Content>
        <h2>Basic with Custom Boundry</h2>
        <p style={{ marginBottom: 14 }}>
          Boundries: custom | Container: 500px, no overflow.
        </p>
        <div style={{ width: 500 }}>
          <CustomBoundryExample
            appearance="comment"
            imageUploadHandler={imageUploadHandler}
            analyticsHandler={analyticsHandler}
            onCancel={CANCEL_ACTION}
            onSave={SAVE_ACTION}
            mentionProvider={mentionProvider}
            emojiProvider={emojiProvider}
          />
        </div>
      </Content>

      <hr />

      <Content>
        <h2>Basic Portal</h2>
        <p style={{ marginBottom: 14 }}>
          Boundries: document.body | Container: 300px, overflow: hidden.
        </p>
        <div style={{ width: 300 }}>
          <PortalExample
            imageUploadHandler={imageUploadHandler}
            analyticsHandler={analyticsHandler}
            onCancel={CANCEL_ACTION}
            onSave={SAVE_ACTION}
            mentionProvider={mentionProvider}
            emojiProvider={emojiProvider}
            devTools={true}
          />
        </div>
      </Content>

      <Content>
        <h2>Portal with Custom Boundry</h2>
        <p style={{ marginBottom: 14 }}>
          Boundries: custom | Container: 500px, overflow: hidden.
        </p>
        <div style={{ width: 500 }}>
          <PortalWithCustomBoundaryExample
            imageUploadHandler={imageUploadHandler}
            analyticsHandler={analyticsHandler}
            onCancel={CANCEL_ACTION}
            onSave={SAVE_ACTION}
            mentionProvider={mentionProvider}
            emojiProvider={emojiProvider}
          />
        </div>
      </Content>

      <Content>
        <h2>Portal in Scroll Container</h2>
        <p style={{ marginBottom: 14 }}>
          Boundries: custom | Container: 700px, overflow: hidden.
        </p>
        <div style={{ maxWidth: 700 }}>
          <PortalInScrollContainerExample
            imageUploadHandler={imageUploadHandler}
            analyticsHandler={analyticsHandler}
            onCancel={CANCEL_ACTION}
            onSave={SAVE_ACTION}
            mentionProvider={mentionProvider}
            emojiProvider={emojiProvider}
          />
        </div>
      </Content>

      <hr />

      <Content>
        <h2>Portal with custom scroll container</h2>
        <JiraSidebarEditor />
      </Content>
    </div>
  );
}
