import * as React from 'react';
import styled from 'styled-components';
import Button, { ButtonGroup } from '@atlaskit/button';
import { ProviderFactory } from '@atlaskit/editor-common';
import { storyMediaProviderFactory } from '@atlaskit/editor-test-helpers';
import { mention } from '@atlaskit/util-data-test';

import { WithEditorActions, EditorActions, EditorContext } from '../src';
import { TitleArea } from '../example-helpers/PageElements';

/**
 * arch next imports
 */
import { ConfigProvider } from '../src/labs/next/internal/context/config-context';
import { EditorPresetCXHTML } from '../src/labs/next/presets/cxhtml';
import { Comment as CommentEditor } from '../src/labs/next/comment';

export const LOCALSTORAGE_defaultDocKey = 'fabric.editor.example.comment';

export const SaveAndCancelButtons = (props: {
  editorActions?: EditorActions;
}) => (
  <ButtonGroup>
    <Button
      tabIndex={-1}
      appearance="primary"
      onClick={() => {
        if (!props.editorActions) {
          return;
        }

        props.editorActions.getValue().then(value => {
          console.log(value);
        });
      }}
    >
      Publish
    </Button>
    <Button tabIndex={-1} appearance="subtle">
      Close
    </Button>
  </ButtonGroup>
);

export const Wrapper: any = styled.div`
  box-sizing: border-box;
  padding: 2px;
  height: calc(100vh - 32px);
`;
Wrapper.displayName = 'Wrapper';

export const Content: any = styled.div`
  padding: 0 20px;
  height: 100%;
  box-sizing: border-box;
`;
Content.displayName = 'Content';

const providerFactory = ProviderFactory.create({
  mentionProvider: Promise.resolve(
    mention.storyData.resourceProviderWithResolver,
  ),
  mediaProvider: storyMediaProviderFactory(),
});

export default function Example() {
  const [disabled, setDisabledState] = React.useState(false);
  const [mounted, setMountState] = React.useState(true);
  return (
    <ConfigProvider
      value={{
        featureFlags: {},
        providerFactory,
      }}
    >
      <EditorContext>
        <Wrapper>
          <Content>
            <button onClick={() => setDisabledState(!disabled)}>
              Toggle Disabled
            </button>
            <button onClick={() => setMountState(!mounted)}>
              Toggle Mount
            </button>
            {mounted ? (
              <>
                <EditorPresetCXHTML placeholder="Use markdown shortcuts to format your page as you type, like * for lists, # for headers, and *** for a horizontal rule.">
                  <CommentEditor
                    defaultValue={
                      (localStorage &&
                        localStorage.getItem(LOCALSTORAGE_defaultDocKey)) ||
                      undefined
                    }
                    onMount={() => {
                      console.log('on mount');
                    }}
                    disabled={disabled}
                  />
                </EditorPresetCXHTML>
              </>
            ) : null}
          </Content>
        </Wrapper>
      </EditorContext>
    </ConfigProvider>
  );
}
