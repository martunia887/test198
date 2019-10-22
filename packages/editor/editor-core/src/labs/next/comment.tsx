import * as React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { colors, borderRadius, gridSize } from '@atlaskit/theme';
import {
  Editor,
  EditorContent,
  EditorSharedConfigConsumer,
  EditorSharedConfig,
} from './Editor';
import {
  akEditorMobileBreakoutPoint,
  BaseTheme,
  WidthConsumer,
} from '@atlaskit/editor-common';
import ContentStyles from '../../ui/ContentStyles';
import { tableCommentEditorStyles } from '../../plugins/table/ui/styles';
import { GRID_GUTTER } from '../../plugins/grid';
import { Toolbar } from './Toolbar';
import { ClickAreaBlock } from '../../ui/Addon';
import WidthEmitter from '../../ui/WidthEmitter';
import { EditorProps } from '../../types';
import { EditorActions } from '../..';

export interface CommentEditorProps {
  isMaxContentSizeReached?: boolean;
  maxHeight?: number;
}

const CommentEditorMargin = 14;
const CommentEditorSmallerMargin = 8;
const TableControlsPadding = 20;

const CommentEditorWrapper: any = styled.div`
  display: flex;
  flex-direction: column;

  .less-margin .ProseMirror {
    margin: 12px ${CommentEditorSmallerMargin}px ${CommentEditorSmallerMargin}px;
  }

  min-width: 272px;
  /* Border + Toolbar + Footer + (Paragraph + ((Parahraph + Margin) * (DefaultLines - 1)) */
  /* calc(2px + 40px + 24px + ( 20px + (32px * 2))) */
  min-height: 150px;
  height: auto;
  ${(props: CommentEditorProps) =>
    props.maxHeight
      ? 'max-height: ' + props.maxHeight + 'px;'
      : ''} background-color: white;
  border: 1px solid ${colors.N40};
  box-sizing: border-box;
  border-radius: ${borderRadius()}px;

  max-width: inherit;
  word-wrap: break-word;
`;
CommentEditorWrapper.displayName = 'CommentEditorWrapper';

const MainToolbar = styled.div`
  position: relative;
  align-items: center;
  padding: ${gridSize()}px ${gridSize()}px 0;
  display: flex;
  height: auto;

  padding-left: ${TableControlsPadding}px;

  & > div > *:first-child {
    margin-left: 0;
  }

  .block-type-btn {
    padding-left: 0;
  }
`;
MainToolbar.displayName = 'MainToolbar';

const MainToolbarCustomComponentsSlot = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
  padding-right: ${TableControlsPadding}px;
  > div {
    display: flex;
    flex-shrink: 0;
  }
`;
MainToolbarCustomComponentsSlot.displayName = 'MainToolbar';

const ContentArea = styled(ContentStyles)`
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 24px;

  /** Hack for Bitbucket to ensure entire editorView gets drop event; see ED-3294 **/
  /** Hack for tables controlls. Otherwise marging collapse and controlls are misplaced. **/
  .ProseMirror {
    margin: 12px ${CommentEditorMargin}px ${CommentEditorMargin}px;
  }

  .gridParent {
    margin-left: ${CommentEditorMargin - GRID_GUTTER}px;
    margin-right: ${CommentEditorMargin - GRID_GUTTER}px;
    width: calc(100% + ${CommentEditorMargin - GRID_GUTTER}px);
  }

  padding: ${TableControlsPadding}px;

  ${tableCommentEditorStyles};
`;
ContentArea.displayName = 'ContentArea';

const SecondaryToolbar = styled.div`
  box-sizing: border-box;
  justify-content: flex-end;
  align-items: center;
  display: flex;
  padding: 12px 1px;
`;
SecondaryToolbar.displayName = 'SecondaryToolbar';

interface State {}

export class Comment extends React.Component<
  EditorProps & {
    onMount: (actions: EditorActions) => void;
  } & CommentEditorProps,
  State
> {
  static displayName = 'CommentEditor';
  private containerElement: HTMLElement | undefined;

  render() {
    const {
      primaryToolbarComponents,
      contentComponents,
      allowDynamicTextSizing,
      maxHeight,
    } = this.props;

    return (
      <Editor {...this.props}>
        <BaseTheme dynamicTextSizing={allowDynamicTextSizing}>
          <CommentEditorWrapper maxHeight={maxHeight} className="akEditor">
            <MainToolbar>
              <Toolbar />
              <MainToolbarCustomComponentsSlot>
                {primaryToolbarComponents}
              </MainToolbarCustomComponentsSlot>
            </MainToolbar>
            <EditorSharedConfigConsumer>
              {config => (
                <>
                  <ClickAreaBlock
                    editorView={
                      (config || ({} as EditorSharedConfig)).editorView
                    }
                  >
                    <WidthConsumer>
                      {({ width }) => (
                        <ContentArea
                          innerRef={ref => (this.containerElement = ref)}
                          className={classnames('ak-editor-content-area', {
                            'less-margin': width < akEditorMobileBreakoutPoint,
                          })}
                        >
                          {contentComponents}
                          <EditorContent />
                        </ContentArea>
                      )}
                    </WidthConsumer>
                  </ClickAreaBlock>
                  <WidthEmitter
                    editorView={
                      (config || ({} as EditorSharedConfig)).editorView!
                    }
                    contentArea={this.containerElement}
                  />
                </>
              )}
            </EditorSharedConfigConsumer>
          </CommentEditorWrapper>
        </BaseTheme>
      </Editor>
    );
  }
}
