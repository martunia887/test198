import * as React from 'react';
import { Component } from 'react';
import { Schema } from 'prosemirror-model';
import { Step, AddMarkStep } from 'prosemirror-transform';
import { defaultSchema } from '@atlaskit/adf-schema';
import {
  ADFStage,
  UnsupportedBlock,
  ProviderFactory,
  EventHandlers,
  ExtensionHandlers,
  BaseTheme,
  WidthProvider,
} from '@atlaskit/editor-common';
import { ReactSerializer, renderDocument, RendererContext } from '../../';
import { RenderOutputStat } from '../../render-document';
import { Wrapper } from './style';
import { TruncatedWrapper } from './truncated-wrapper';
import { RendererAppearance } from './types';

export interface Extension<T> {
  extensionKey: string;
  parameters?: T;
  content?: any; // This would be the original Atlassian Document Format
}

export interface Props {
  document: any;
  dataProviders?: ProviderFactory;
  eventHandlers?: EventHandlers;
  extensionHandlers?: ExtensionHandlers;
  onComplete?: (stat: RenderOutputStat) => void;
  portal?: HTMLElement;
  rendererContext?: RendererContext;
  schema?: Schema;
  appearance?: RendererAppearance;
  adfStage?: ADFStage;
  disableHeadingIDs?: boolean;
  allowDynamicTextSizing?: boolean;
  maxHeight?: number;
  truncated?: boolean;
}

function getNodeSize(e: Element) {
  return parseInt(e.getAttribute('data-nodesize') || '', 10);
}

function isBlock(e: Element) {
  return Boolean(e.getAttribute('data-isblock'));
}

function findParent(e: Element): Element | null {
  const { parentElement } = e;
  if (!parentElement) {
    return null;
  }

  if (isBlock(parentElement)) {
    return parentElement;
  }

  return findParent(parentElement);
}

function isInlineNode(node: Node) {
  const isMention = (node as HTMLElement).hasAttribute('data-mention-id');
  const isEmoji = (node as HTMLElement).hasAttribute('data-emoji-id');
  const isDate = (node as HTMLElement).hasAttribute('timestamp');
  const isStatus =
    (node as HTMLElement).getAttribute('data-node-type') === 'status';

  return isMention || isEmoji || isDate || isStatus;
}

function resolveNodePos(node: Node) {
  let resolvedPos = 0;
  let prev = node.previousSibling;
  while (prev) {
    if (prev && prev.nodeType === 3) {
      resolvedPos += prev.textContent!.length;
    } else if (prev) {
      // Quick and dirty hack to get proper size of marks
      if (!isInlineNode(prev)) {
        resolvedPos += prev.textContent!.length;
      } else {
        resolvedPos += 1;
      }
    }

    prev = prev.previousSibling;
  }

  return resolvedPos;
}

function resolvePos(node: Node | null, offset: number) {
  if (!node) {
    return 1;
  }

  const parent = findParent(node as Element);

  if (!parent) {
    return 1;
  }

  // Traverse tree to get nodeSize of previous block nodes.
  let parentPrev = parent.previousElementSibling;
  let resolvedPos = 1;
  while (parentPrev) {
    resolvedPos += getNodeSize(parentPrev);
    parentPrev = parentPrev.previousElementSibling;
  }

  // Traverse tree to get size of previous textnodes in block.

  let cur = node;
  if (cur.parentElement !== parent) {
    resolvedPos += resolveNodePos(cur);
    while (cur.parentElement !== parent) {
      cur = cur.parentNode!;
      resolvedPos += resolveNodePos(cur);
    }
  } else {
    resolvedPos += resolveNodePos(cur);
  }

  return resolvedPos + offset;
}

export default class Renderer extends Component<Props, { doc?: any }> {
  private providerFactory: ProviderFactory;
  private serializer?: ReactSerializer;

  constructor(props: Props) {
    super(props);
    this.providerFactory = props.dataProviders || new ProviderFactory();
    this.updateSerializer(props);

    this.state = {};
  }

  componentWillReceiveProps(nextProps: Props) {
    if (
      nextProps.portal !== this.props.portal ||
      nextProps.appearance !== this.props.appearance
    ) {
      this.updateSerializer(nextProps);
    }
  }

  private updateSerializer(props: Props) {
    const {
      eventHandlers,
      portal,
      rendererContext,
      document,
      extensionHandlers,
      schema,
      appearance,
      disableHeadingIDs,
      allowDynamicTextSizing,
    } = props;

    this.serializer = new ReactSerializer({
      providers: this.providerFactory,
      eventHandlers,
      extensionHandlers,
      portal,
      objectContext: {
        adDoc: document,
        schema,
        ...rendererContext,
      } as RendererContext,
      appearance,
      disableHeadingIDs,
      allowDynamicTextSizing,
    });
  }

  private renderContent(result: JSX.Element | null) {
    const {
      appearance,
      allowDynamicTextSizing,
      maxHeight,
      truncated,
    } = this.props;

    const rendererOutput = (
      <RendererWrapper
        appearance={appearance}
        dynamicTextSizing={!!allowDynamicTextSizing}
      >
        {result}
      </RendererWrapper>
    );

    return truncated ? (
      <TruncatedWrapper height={maxHeight}>{rendererOutput}</TruncatedWrapper>
    ) : (
      rendererOutput
    );
  }

  private addInlineComment = (pmDoc: any) => {
    const { schema } = pmDoc.type;

    const sel = window.getSelection();

    if (!sel || sel.isCollapsed) {
      return;
    }

    const { anchorNode, anchorOffset, focusNode, focusOffset } = sel;

    const from = resolvePos(anchorNode, anchorOffset);

    const to = resolvePos(focusNode, focusOffset);

    console.log({
      from,
      to,
    });

    const step = new AddMarkStep(
      from < to ? from : to,
      to > from ? to : from,
      (schema as Schema).marks.annotation.create({
        id: Math.floor(Math.random() * 1000000).toString(),
        annotationType: 'inlineComment',
      }),
    );
    const { doc, failed } = step.apply(pmDoc);

    console.log(step);

    if (!failed && doc) {
      // TODO: Serialize to ADF properly..
      this.setState(
        {
          doc: {
            version: 1,
            ...doc.toJSON(),
          },
        },
        () => {
          sel.removeAllRanges();
        },
      );
    }
  };

  render() {
    const {
      document,
      onComplete,
      schema,
      appearance,
      adfStage,
      allowDynamicTextSizing,
    } = this.props;

    const { doc } = this.state;

    try {
      const { result, stat, pmDoc } = renderDocument(
        doc || document,
        this.serializer!,
        schema || defaultSchema,
        adfStage,
      );

      if (onComplete) {
        onComplete(stat);
      }

      return (
        <>
          <button onClick={() => this.addInlineComment(pmDoc)}>
            Add annotation!
          </button>
          {this.renderContent(result)}
        </>
      );
    } catch (ex) {
      return (
        <RendererWrapper
          appearance={appearance}
          dynamicTextSizing={!!allowDynamicTextSizing}
        >
          <UnsupportedBlock />
        </RendererWrapper>
      );
    }
  }

  componentWillUnmount() {
    const { dataProviders } = this.props;

    // if this is the ProviderFactory which was created in constructor
    // it's safe to destroy it on Renderer unmount
    if (!dataProviders) {
      this.providerFactory.destroy();
    }
  }
}

type RendererWrapperProps = {
  appearance: RendererAppearance;
  dynamicTextSizing: boolean;
} & { children?: React.ReactNode };

export function RendererWrapper({
  appearance,
  children,
  dynamicTextSizing,
}: RendererWrapperProps) {
  return (
    <WidthProvider>
      <BaseTheme dynamicTextSizing={dynamicTextSizing}>
        <Wrapper appearance={appearance}>{children}</Wrapper>
      </BaseTheme>
    </WidthProvider>
  );
}
