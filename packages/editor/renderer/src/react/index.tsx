import * as React from 'react';
// @ts-ignore: unused variable
// prettier-ignore
import { ComponentType, Consumer, Provider } from 'react';
import { Fragment, Mark, MarkType, Node, Schema } from 'prosemirror-model';

import { Serializer } from '../';
import { getText } from '../utils';
import { RendererAppearance } from '../ui/Renderer/types';

import {
  Doc,
  mergeTextNodes,
  isTextWrapper,
  TextWrapper,
  toReact,
} from './nodes';

import { toReact as markToReact } from './marks';
import { calcTableColumnWidths } from '@atlaskit/adf-schema';
import {
  ProviderFactory,
  getMarksByOrder,
  isSameMark,
  EventHandlers,
  ExtensionHandlers,
} from '@atlaskit/editor-common';

export interface RendererContext {
  objectAri?: string;
  containerAri?: string;
  adDoc?: any;
  schema?: Schema;
}

export interface ConstructorParams {
  providers?: ProviderFactory;
  eventHandlers?: EventHandlers;
  extensionHandlers?: ExtensionHandlers;
  portal?: HTMLElement;
  objectContext?: RendererContext;
  appearance?: RendererAppearance;
  disableHeadingIDs?: boolean;
  allowDynamicTextSizing?: boolean;
}

type MarkWithContent = Partial<Mark<any>> & {
  content: Array<MarkWithContent | Node<any>>;
};

function mergeMarks(marksAndNodes: Array<MarkWithContent | Node>) {
  return marksAndNodes.reduce(
    (acc, markOrNode) => {
      const prev = (acc.length && acc[acc.length - 1]) || null;

      if (
        markOrNode.type instanceof MarkType &&
        prev &&
        prev.type instanceof MarkType &&
        Array.isArray(prev.content) &&
        isSameMark(prev as Mark, markOrNode as Mark)
      ) {
        prev.content = mergeMarks(
          prev.content.concat((markOrNode as MarkWithContent).content),
        );
      } else {
        acc.push(markOrNode);
      }

      return acc;
    },
    [] as Array<MarkWithContent | Node>,
  );
}

export default class ReactSerializer implements Serializer<JSX.Element> {
  private providers?: ProviderFactory;
  private eventHandlers?: EventHandlers;
  private extensionHandlers?: ExtensionHandlers;
  private portal?: HTMLElement;
  private rendererContext?: RendererContext;
  private appearance?: RendererAppearance;
  private disableHeadingIDs?: boolean;
  private headingIds: string[] = [];
  private allowDynamicTextSizing?: boolean;

  constructor({
    providers,
    eventHandlers,
    extensionHandlers,
    portal,
    objectContext,
    appearance,
    disableHeadingIDs,
    allowDynamicTextSizing,
  }: ConstructorParams) {
    this.providers = providers;
    this.eventHandlers = eventHandlers;
    this.extensionHandlers = extensionHandlers;
    this.portal = portal;
    this.rendererContext = objectContext;
    this.appearance = appearance;
    this.disableHeadingIDs = disableHeadingIDs;
    this.allowDynamicTextSizing = allowDynamicTextSizing;
  }

  private resetState() {
    this.headingIds = [];
  }

  serializeFragment(
    fragment: Fragment,
    props: any = {},
    target: any = Doc,
    key: string = 'root-0',
    parentInfo?: { parentIsIncompleteTask: boolean },
  ): JSX.Element | null {
    // This makes sure that we reset internal state on re-render.
    if (key === 'root-0') {
      this.resetState();
    }

    const content = ReactSerializer.getChildNodes(fragment).map(
      (node, index) => {
        if (isTextWrapper(node)) {
          return this.serializeTextWrapper(node.content);
        }

        let props;

        if (node.type.name === 'table') {
          props = this.getTableProps(node);
        } else if (node.type.name === 'date') {
          props = this.getDateProps(node, parentInfo);
        } else if (node.type.name === 'heading') {
          props = this.getHeadingProps(node);
        } else {
          props = this.getProps(node);
        }

        let pInfo = parentInfo;
        if (node.type.name === 'taskItem' && node.attrs.state !== 'DONE') {
          pInfo = { parentIsIncompleteTask: true };
        }

        const serializedContent = this.serializeFragment(
          node.content,
          props,
          toReact(node),
          `${node.type.name}-${index}`,
          pInfo,
        );

        if (node.marks && node.marks.length) {
          return ([] as Array<Mark>)
            .concat(node.marks)
            .reverse()
            .reduce((acc, mark) => {
              return this.renderMark(
                markToReact(mark),
                this.getMarkProps(mark),
                `${mark.type.name}-${index}`,
                acc,
              );
            }, serializedContent);
        }

        return serializedContent;
      },
    );

    return this.renderNode(target, props, key, content);
  }

  private serializeTextWrapper(content: Node[]) {
    return ReactSerializer.buildMarkStructure(content).map((mark, index) =>
      this.serializeMark(mark, index),
    );
  }

  private serializeMark(mark: Mark, index: number = 0) {
    if (mark.type.name === 'text') {
      return (mark as any).text;
    }

    const content = ((mark as any).content || []).map(
      (child: Mark, index: number) => this.serializeMark(child, index),
    );
    return this.renderMark(
      markToReact(mark),
      this.getMarkProps(mark),
      `${mark.type.name}-${index}`,
      content,
    );
  }

  private renderNode(
    NodeComponent: ComponentType<any>,
    props: any,
    key: string,
    content: string | JSX.Element | any[] | null | undefined,
  ): JSX.Element {
    return (
      <NodeComponent key={key} {...props}>
        {content}
      </NodeComponent>
    );
  }

  private renderMark(
    MarkComponent: ComponentType<any>,
    props: any,
    key: string,
    content: any,
  ) {
    return (
      <MarkComponent key={key} {...props}>
        {content}
      </MarkComponent>
    );
  }

  private getTableProps(node: Node) {
    return {
      ...this.getProps(node),
      columnWidths: calcTableColumnWidths(node),
    };
  }

  private getDateProps(
    node: Node,
    parentInfo: { parentIsIncompleteTask: boolean } | undefined,
  ) {
    return {
      timestamp: node.attrs && node.attrs.timestamp,
      parentIsIncompleteTask: parentInfo && parentInfo.parentIsIncompleteTask,
    };
  }

  private getProps(node: Node) {
    return {
      text: node.text,
      providers: this.providers,
      eventHandlers: this.eventHandlers,
      extensionHandlers: this.extensionHandlers,
      portal: this.portal,
      rendererContext: this.rendererContext,
      serializer: this,
      content: node.content ? node.content.toJSON() : undefined,
      allowDynamicTextSizing: this.allowDynamicTextSizing,
      rendererAppearance: this.appearance,
      ...node.attrs,
    };
  }

  private getHeadingProps(node: Node) {
    return {
      ...node.attrs,
      content: node.content ? node.content.toJSON() : undefined,
      headingId: this.getHeadingId(node),
    };
  }

  private getHeadingId(node: Node) {
    if (this.disableHeadingIDs || !node.content.size) {
      return;
    }

    const headingId = (node as any).content
      .toJSON()
      .reduce((acc: string, node: any) => acc.concat(getText(node) || ''), '')
      .replace(/ /g, '-');

    return this.getUniqueHeadingId(headingId);
  }

  private getUniqueHeadingId(baseId: string, counter = 0): string {
    if (counter === 0 && this.headingIds.indexOf(baseId) === -1) {
      this.headingIds.push(baseId);
      return baseId;
    } else if (counter !== 0) {
      const headingId = `${baseId}.${counter}`;
      if (this.headingIds.indexOf(headingId) === -1) {
        this.headingIds.push(headingId);
        return headingId;
      }
    }

    return this.getUniqueHeadingId(baseId, ++counter);
  }

  private getMarkProps(mark: Mark): any {
    const { key, ...otherAttrs } = mark.attrs;
    return {
      eventHandlers: this.eventHandlers,
      markKey: key,
      ...otherAttrs,
    };
  }

  static getChildNodes(fragment: Fragment): (Node | TextWrapper)[] {
    const children: Node[] = [];
    fragment.forEach(node => {
      children.push(node);
    });
    return mergeTextNodes(children) as Node[];
  }

  static getMarks(node: Node): Mark[] {
    if (!node.marks || node.marks.length === 0) {
      return [];
    }

    return getMarksByOrder(node.marks);
  }

  static buildMarkStructure(content: Node[]) {
    return mergeMarks(
      content.map(node => {
        const nodeMarks = this.getMarks(node);
        if (nodeMarks.length === 0) {
          return node;
        }

        return nodeMarks.reverse().reduce(
          (acc, mark) => {
            const { eq } = mark;

            return {
              ...mark,
              eq,
              content: [acc],
            };
          },
          node as any,
        );
      }),
    ) as Mark[];
  }

  static fromSchema(
    schema: Schema,
    {
      providers,
      eventHandlers,
      extensionHandlers,
      appearance,
      disableHeadingIDs,
      allowDynamicTextSizing,
    }: ConstructorParams,
  ): ReactSerializer {
    // TODO: Do we actually need the schema here?
    return new ReactSerializer({
      providers,
      eventHandlers,
      extensionHandlers,
      appearance,
      disableHeadingIDs,
      allowDynamicTextSizing,
    });
  }
}
