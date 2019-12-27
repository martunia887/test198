import { Node, Schema, ResolvedPos } from 'prosemirror-model';
import { Transaction, EditorState, TextSelection } from 'prosemirror-state';
import { validator, ADFEntity, ValidationError } from '@atlaskit/adf-utils';
import { analyticsService } from '../analytics';
import { ContentNodeWithPos } from 'prosemirror-utils';
import { sanitizeNodeForPrivacy } from '../utils/filter/privacy-filter';
import { ProviderFactory } from '@atlaskit/editor-common';
import { JSONDocNode } from '../utils';

const FALSE_POSITIVE_MARKS = ['code', 'alignment', 'indentation'];

/**
 * Checks if node is an empty paragraph.
 */
export function isEmptyParagraph(node?: Node | null): boolean {
  return !!node && node.type.name === 'paragraph' && !node.childCount;
}

/**
 * Returns false if node contains only empty inline nodes and hardBreaks.
 */
export function hasVisibleContent(node: Node): boolean {
  const isInlineNodeHasVisibleContent = (inlineNode: Node) => {
    return inlineNode.isText
      ? !!inlineNode.textContent.trim()
      : inlineNode.type.name !== 'hardBreak';
  };

  if (node.isInline) {
    return isInlineNodeHasVisibleContent(node);
  } else if (node.isBlock && (node.isLeaf || node.isAtom)) {
    return true;
  } else if (!node.childCount) {
    return false;
  }

  for (let index = 0; index < node.childCount; index++) {
    const child = node.child(index);

    if (hasVisibleContent(child)) {
      return true;
    }
  }

  return false;
}

/**
 * Checks if a node has any content. Ignores node that only contain empty block nodes.
 */
export function isNodeEmpty(node?: Node): boolean {
  if (node && node.textContent) {
    return false;
  }

  if (
    !node ||
    !node.childCount ||
    (node.childCount === 1 && isEmptyParagraph(node.firstChild))
  ) {
    return true;
  }

  const block: Node[] = [];
  const nonBlock: Node[] = [];

  node.forEach(child => {
    child.isInline ? nonBlock.push(child) : block.push(child);
  });

  return (
    !nonBlock.length &&
    !block.filter(
      childNode =>
        (!!childNode.childCount &&
          !(
            childNode.childCount === 1 && isEmptyParagraph(childNode.firstChild)
          )) ||
        childNode.isAtom,
    ).length
  );
}

/**
 * Checks if a node looks like an empty document
 */
export function isEmptyDocument(node: Node): boolean {
  const nodeChild = node.content.firstChild;
  if (node.childCount !== 1 || !nodeChild) {
    return false;
  }
  return isEmptyParagraph(nodeChild);
}

// Checks to see if the parent node is the document, ie not contained within another entity
export function hasDocAsParent($anchor: ResolvedPos): boolean {
  return $anchor.depth === 1;
}

export function isInEmptyLine(state: EditorState) {
  const { selection } = state;
  const { $cursor, $anchor } = selection as TextSelection;

  if (!$cursor) {
    return false;
  }

  const node = $cursor.node();

  if (!node) {
    return false;
  }

  return isEmptyParagraph(node) && hasDocAsParent($anchor);
}

function wrapWithUnsupported(
  originalValue: ADFEntity,
  type: 'block' | 'inline' = 'block',
) {
  return {
    type: `unsupported${type === 'block' ? 'Block' : 'Inline'}`,
    attrs: { originalValue },
  };
}

function fireAnalyticsEvent(
  entity: ADFEntity,
  error: ValidationError,
  type: 'block' | 'inline' | 'mark' = 'block',
) {
  const { code, meta } = error;
  analyticsService.trackEvent('atlassian.editor.unsupported', {
    name: entity.type || 'unknown',
    type,
    errorCode: code,
    meta: meta && JSON.stringify(meta),
  });
}

export function processRawValue(
  schema: Schema,
  value?: string | object,
  providerFactory?: ProviderFactory,
  sanitizePrivateContent?: boolean,
): Node | undefined {
  if (!value) {
    return;
  }

  let node: {
    [key: string]: any;
  };

  if (typeof value === 'string') {
    try {
      node = JSON.parse(value);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`Error processing value: ${value} isn't a valid JSON`);
      return;
    }
  } else {
    node = value;
  }

  if (Array.isArray(node)) {
    // eslint-disable-next-line no-console
    console.error(
      `Error processing value: ${node} is an array, but it must be an object.`,
    );
    return;
  }
  try {
    const nodes = Object.keys(schema.nodes);
    const marks = Object.keys(schema.marks);
    const validate = validator(nodes, marks, { allowPrivateAttributes: true });
    const emptyDoc: ADFEntity = { type: 'doc', content: [] };

    // ProseMirror always require a child under doc
    if (node.type === 'doc') {
      if (Array.isArray(node.content) && node.content.length === 0) {
        node.content.push({
          type: 'paragraph',
          content: [],
        });
      }
      // Just making sure doc is always valid
      if (!node.version) {
        node.version = 1;
      }
    }

    const { entity = emptyDoc } = validate(
      node as ADFEntity,
      (entity, error, options) => {
        // Remove any invalid marks
        if (marks.indexOf(entity.type) > -1) {
          if (
            !(
              error.code === 'INVALID_TYPE' &&
              FALSE_POSITIVE_MARKS.indexOf(entity.type) > -1
            )
          ) {
            fireAnalyticsEvent(entity, error, 'mark');
          }
          return;
        }

        /**
         * There's a inconsistency between ProseMirror and ADF.
         * `content` is actually optional in ProseMirror.
         * And, also empty `text` node is not valid.
         */
        if (
          error.code === 'MISSING_PROPERTIES' &&
          entity.type === 'paragraph'
        ) {
          return { type: 'paragraph', content: [] };
        }

        // Can't fix it by wrapping
        // TODO: We can repair missing content like `panel` without a `paragraph`.
        if (error.code === 'INVALID_CONTENT_LENGTH') {
          return entity;
        }

        if (options.allowUnsupportedBlock) {
          fireAnalyticsEvent(entity, error);
          return wrapWithUnsupported(entity);
        } else if (options.allowUnsupportedInline) {
          fireAnalyticsEvent(entity, error, 'inline');
          return wrapWithUnsupported(entity, 'inline');
        }

        return entity;
      },
    );

    let newEntity = maySanitizePrivateContent(
      entity as JSONDocNode,
      providerFactory,
      sanitizePrivateContent,
    );

    const parsedDoc = Node.fromJSON(schema, newEntity);

    // throws an error if the document is invalid
    parsedDoc.check();

    return parsedDoc;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(
      `Error processing document:\n${e.message}\n\n`,
      JSON.stringify(node),
    );
    return;
  }
}

const maySanitizePrivateContent = (
  entity: JSONDocNode,
  providerFactory?: ProviderFactory,
  sanitizePrivateContent?: boolean,
): JSONDocNode => {
  if (sanitizePrivateContent && providerFactory) {
    return sanitizeNodeForPrivacy(entity, providerFactory);
  }
  return entity;
};

export const getStepRange = (
  transaction: Transaction,
): { from: number; to: number } | null => {
  let from = -1;
  let to = -1;

  transaction.steps.forEach(step => {
    step.getMap().forEach((_oldStart, _oldEnd, newStart, newEnd) => {
      from = newStart < from || from === -1 ? newStart : from;
      to = newEnd < to || to === -1 ? newEnd : to;
    });
  });

  if (from !== -1) {
    return { from, to };
  }

  return null;
};

/**
 * Find the farthest node given a condition
 * @param predicate Function to check the node
 */
export const findFarthestParentNode = (predicate: (node: Node) => boolean) => (
  $pos: ResolvedPos,
): ContentNodeWithPos | null => {
  let candidate: ContentNodeWithPos | null = null;

  for (let i = $pos.depth; i > 0; i--) {
    const node = $pos.node(i);
    if (predicate(node)) {
      candidate = {
        pos: i > 0 ? $pos.before(i) : 0,
        start: $pos.start(i),
        depth: i,
        node,
      };
    }
  }
  return candidate;
};

export const isSelectionEndOfParagraph = (state: EditorState): boolean =>
  state.selection.$to.parent.type === state.schema.nodes.paragraph &&
  state.selection.$to.pos === state.doc.resolve(state.selection.$to.pos).end();

export function nodesBetweenChanged(
  tr: Transaction,
  f: (
    node: Node<any>,
    pos: number,
    parent: Node<any>,
    index: number,
  ) => boolean | null | undefined | void,
  startPos?: number,
) {
  const stepRange = getStepRange(tr);
  if (!stepRange) {
    return;
  }

  tr.doc.nodesBetween(stepRange.from, stepRange.to, f, startPos);
}

export function getNodesCount(node: Node): Record<string, number> {
  let count: Record<string, number> = {};

  node.nodesBetween(0, node.nodeSize - 2, node => {
    count[node.type.name] = (count[node.type.name] || 0) + 1;
  });

  return count;
}
