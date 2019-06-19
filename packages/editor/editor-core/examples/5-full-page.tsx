import styled from 'styled-components';

import * as React from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';

import Editor, { EditorProps, EditorAppearance } from './../src/editor';
import EditorContext from './../src/ui/EditorContext';
import WithEditorActions from './../src/ui/WithEditorActions';
import {
  cardProvider,
  storyMediaProviderFactory,
  storyContextIdentifierProviderFactory,
  macroProvider,
  autoformattingProvider,
} from '@atlaskit/editor-test-helpers';
import { mention, emoji, taskDecision } from '@atlaskit/util-data-test';
import { MockActivityResource } from '@atlaskit/activity/dist/es5/support';
import { EmojiProvider } from '@atlaskit/emoji/resource';
import { Provider as SmartCardProvider } from '@atlaskit/smart-card';

import {
  customInsertMenuItems,
  extensionHandlers,
} from '@atlaskit/editor-test-helpers';
import quickInsertProviderFactory from '../example-helpers/quick-insert-provider';
import { DevTools } from '../example-helpers/DevTools';
import { TitleInput } from '../example-helpers/PageElements';
import { EditorActions } from './../src';
import withSentry from '../example-helpers/withSentry';
import BreadcrumbsMiscActions from '../example-helpers/breadcrumbs-misc-actions';
import {
  DEFAULT_MODE,
  LOCALSTORAGE_defaultMode,
} from '../example-helpers/example-constants';
import { Popup } from '@atlaskit/editor-common';
import Avatar, { AvatarItem } from '@atlaskit/avatar';
import { FieldTextAreaStateless } from '@atlaskit/field-text-area';
import EditorRemoveIcon from '@atlaskit/icon/glyph/editor/remove';

/**
 * +-------------------------------+
 * + [Editor core v] [Full page v] +  48px height
 * +-------------------------------+
 * +                               +  16px padding-top
 * +            Content            +
 * +                               +  16px padding-bottom
 * +-------------------------------+  ----
 *                                    80px - 48px (Outside of iframe)
 */
export const Wrapper: any = styled.div`
  box-sizing: border-box;
  height: calc(100vh - 32px);
`;
Wrapper.displayName = 'Wrapper';

export const Content: any = styled.div`
  padding: 0;
  height: 100%;
  box-sizing: border-box;
`;
Content.displayName = 'Content';

// eslint-disable-next-line no-console
export const analyticsHandler = (actionName: string, props?: {}) =>
  console.log(actionName, props);
// eslint-disable-next-line no-console
const SAVE_ACTION = () => console.log('Save');

export const LOCALSTORAGE_defaultDocKey = 'fabric.editor.example.full-page';
export const LOCALSTORAGE_defaultTitleKey =
  'fabric.editor.example.full-page.title';

type AnnotationProps = {
  rect: DOMRect;
  selection: string;
  onSuccess: (id: string) => void;
  onDelete: (id: string) => void;
  onCancel: () => void;
  markerRef: string;
  element: HTMLElement;
};

type AnnotationState = {
  commentValue: string;
};

export class ShowAnnotation extends React.Component<
  AnnotationProps,
  AnnotationState
> {
  state = {
    commentValue: '',
  };

  constructor(props: AnnotationProps) {
    super(props);
  }

  setValue = (e: any) => this.setState({ commentValue: e.target.value });

  saveComment = () => {
    const id = `annotation-${Math.random()}`;
    window.localStorage.setItem(id, this.state.commentValue);
    this.setState({ commentValue: '' });
    this.props.onSuccess(id);
  };

  shouldComponentUpdate(
    nextProps: AnnotationProps,
    nextState: AnnotationState,
  ) {
    return (
      this.props.element !== nextProps.element ||
      this.state.commentValue !== nextState.commentValue
    );
  }

  componentWillMount() {
    this.setState({
      commentValue: '',
    });
  }

  componentDidUpdate(prevProps: AnnotationProps) {
    if (!this.props.element && prevProps.element) {
      this.props.onCancel();
    }
  }

  getCommentValue(id: string) {
    return (
      window.localStorage.getItem(id) ||
      'Easy! This is just a basic inline comments test!'
    );
  }

  renderInsertComment() {
    return (
      <div
        style={{
          padding: '10px',
        }}
      >
        <div style={{ paddingBottom: '10px' }}>
          <FieldTextAreaStateless
            onChange={this.setValue}
            value={this.state.commentValue}
            shouldFitContainer={true}
            isLabelHidden={true}
            autoFocus={true}
            ref={(input: HTMLTextAreaElement) => input && input.focus()}
          />
        </div>
        <Button appearance="primary" onClick={this.saveComment}>
          Save
        </Button>
      </div>
    );
  }

  renderShowComment(id: string) {
    return (
      <div
        style={{
          padding: '10px',
        }}
      >
        {this.getCommentValue(id)}
        <div style={{ padding: '5px 0' }}>
          <Button
            appearance="subtle"
            onClick={this.props.onDelete}
            spacing="none"
          >
            <EditorRemoveIcon label="remove comment" />
          </Button>
        </div>
      </div>
    );
  }

  renderContent(markerRef: string) {
    if (markerRef) {
      return this.renderShowComment(markerRef);
    }
    return this.renderInsertComment();
  }

  getStyles = () => {
    return this.props.markerRef || this.props.selection
      ? {
          backgroundColor: 'white',
          minHeight: '100px',
          width: '250px',
          overflow: 'hidden',
          padding: '5px',
          border: '1px solid #e2e2e2',
          transition: '200ms width ease-in',
        }
      : {
          width: 0,
          visibility: 'hidden',
          transition: '200ms width ease-in',
        };
  };

  render() {
    return (
      <Popup
        target={
          this.props.element || document.querySelectorAll('.ProseMirror')[0]
        }
        alignY="bottom"
        fitHeight={200}
        fitWidth={200}
        alignX={'right'}
        offset={[
          this.props.element &&
            -(
              window.innerWidth -
              this.props.element.getBoundingClientRect().right -
              50
            ),
          20,
        ]}
      >
        <div style={this.getStyles()}>
          <AvatarItem
            avatar={
              <Avatar
                src="https://api.adorable.io/avatars/80/chaki@me.com.png"
                presence="online"
              />
            }
            key={'vsutrave@atlassian.com'}
            primaryText={'Vijay Sutrave'}
            secondaryText={'vsutrave@atlassian.com'}
          />
          {this.renderContent(this.props.markerRef)}
        </div>
      </Popup>
    );
  }
}

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
          // eslint-disable-next-line no-console
          console.log(value);
          localStorage.setItem(
            LOCALSTORAGE_defaultDocKey,
            JSON.stringify(value),
          );
        });
      }}
    >
      Publish
    </Button>
    <Button
      tabIndex={-1}
      appearance="subtle"
      onClick={() => {
        if (!props.editorActions) {
          return;
        }
        props.editorActions.clear();
        localStorage.removeItem(LOCALSTORAGE_defaultDocKey);
        localStorage.removeItem(LOCALSTORAGE_defaultTitleKey);
      }}
    >
      Close
    </Button>
  </ButtonGroup>
);

export type State = {
  disabled: boolean;
  title?: string;
  appearance: EditorAppearance;
};

export const providers: any = {
  emojiProvider: emoji.storyData.getEmojiResource({
    uploadSupported: true,
    currentUser: {
      id: emoji.storyData.loggedUser,
    },
  }) as Promise<EmojiProvider>,
  mentionProvider: Promise.resolve(mention.storyData.resourceProvider),
  taskDecisionProvider: Promise.resolve(
    taskDecision.getMockTaskDecisionResource(),
  ),
  contextIdentifierProvider: storyContextIdentifierProviderFactory(),
  activityProvider: Promise.resolve(new MockActivityResource()),
  macroProvider: Promise.resolve(macroProvider),
  autoformattingProvider: Promise.resolve(autoformattingProvider),
};

export const mediaProvider = storyMediaProviderFactory({
  includeUserAuthProvider: true,
});

export const quickInsertProvider = quickInsertProviderFactory();

export const getAppearance = (): EditorAppearance => {
  return (localStorage.getItem(LOCALSTORAGE_defaultMode) || DEFAULT_MODE) ===
    DEFAULT_MODE
    ? 'full-page'
    : 'full-width';
};

export interface ExampleProps {
  onTitleChange?: (title: string) => void;
}

class ExampleEditorComponent extends React.Component<
  EditorProps & ExampleProps,
  State
> {
  state: State = {
    disabled: true,
    title: localStorage.getItem(LOCALSTORAGE_defaultTitleKey) || '',
    appearance: this.props.appearance || getAppearance(),
  };

  componentDidMount() {
    // eslint-disable-next-line no-console
    console.log(`To try the macro paste handler, paste one of the following links:

  www.dumbmacro.com?paramA=CFE
  www.smartmacro.com?paramB=CFE
    `);
  }

  componentDidUpdate(prevProps: EditorProps) {
    if (prevProps.appearance !== this.props.appearance) {
      this.setState(() => ({
        appearance: this.props.appearance || 'full-page',
      }));
    }
  }

  render() {
    return (
      <Wrapper>
        <Content>
          <SmartCardProvider>
            <Editor
              analyticsHandler={analyticsHandler}
              allowAnalyticsGASV3={true}
              quickInsert={{ provider: Promise.resolve(quickInsertProvider) }}
              allowCodeBlocks={{ enableKeybindingsForIDE: true }}
              allowLists={true}
              allowTextColor={true}
              allowTables={{
                advanced: true,
              }}
              allowBreakout={true}
              allowJiraIssue={true}
              allowUnsupportedContent={true}
              allowPanel={true}
              allowExtension={{
                allowBreakout: true,
              }}
              allowRule={true}
              allowDate={true}
              allowLayouts={{
                allowBreakout: true,
                UNSAFE_addSidebarLayouts: true,
              }}
              allowTextAlignment={true}
              allowIndentation={true}
              allowDynamicTextSizing={true}
              allowTemplatePlaceholders={{ allowInserting: true }}
              UNSAFE_cards={{
                provider: Promise.resolve(cardProvider),
              }}
              annotationProvider={{
                component: ShowAnnotation,
              }}
              allowStatus={true}
              {...providers}
              media={{
                provider: mediaProvider,
                allowMediaSingle: true,
                allowResizing: true,
                allowAnnotation: true,
              }}
              placeholder="Use markdown shortcuts to format your page as you type, like * for lists, # for headers, and *** for a horizontal rule."
              shouldFocus={false}
              disabled={this.state.disabled}
              defaultValue={
                (localStorage &&
                  localStorage.getItem(LOCALSTORAGE_defaultDocKey)) ||
                undefined
              }
              contentComponents={
                <WithEditorActions
                  render={actions => (
                    <>
                      <BreadcrumbsMiscActions
                        appearance={this.state.appearance}
                        onFullWidthChange={this.setFullWidthMode}
                      />
                      <TitleInput
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                        innerRef={this.handleTitleRef}
                        onFocus={this.handleTitleOnFocus}
                        onBlur={this.handleTitleOnBlur}
                        onKeyDown={(e: KeyboardEvent) => {
                          this.onKeyPressed(e, actions);
                        }}
                      />
                    </>
                  )}
                />
              }
              primaryToolbarComponents={[
                <WithEditorActions
                  key={1}
                  render={actions => (
                    <SaveAndCancelButtons editorActions={actions} />
                  )}
                />,
              ]}
              onSave={SAVE_ACTION}
              insertMenuItems={customInsertMenuItems}
              extensionHandlers={extensionHandlers}
              {...this.props}
              appearance={this.state.appearance}
            />
          </SmartCardProvider>
        </Content>
      </Wrapper>
    );
  }
  private onKeyPressed = (e: KeyboardEvent, actions: EditorActions) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      // Move to the editor view
      this.setState({
        disabled: false,
      });
      actions.focus();
      return false;
    }
    return;
  };

  private handleTitleChange = (e: KeyboardEvent) => {
    const title = (e.target as HTMLInputElement).value;
    this.setState({
      title,
    });

    if (this.props.onTitleChange) {
      this.props.onTitleChange(title);
    }
  };

  private handleTitleOnFocus = () => this.setState({ disabled: true });
  private handleTitleOnBlur = () => this.setState({ disabled: false });
  private handleTitleRef = (ref?: HTMLElement) => {
    if (ref) {
      ref.focus();
    }
  };

  private setFullWidthMode = (fullWidthMode: boolean) => {
    this.setState({ appearance: fullWidthMode ? 'full-width' : 'full-page' });
  };
}

export const ExampleEditor = withSentry<EditorProps>(ExampleEditorComponent);

export default function Example(props: EditorProps & ExampleProps) {
  return (
    <EditorContext>
      <div style={{ height: '100%' }}>
        <DevTools />
        <ExampleEditor {...props} />
      </div>
    </EditorContext>
  );
}
