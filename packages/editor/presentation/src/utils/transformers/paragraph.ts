import { EntityTransformer } from './types';
import { ADFEntity, reduce, p } from '@atlaskit/adf-utils';
import { ParagraphDefinition, Inline } from '@atlaskit/adf-schema';

function isEmptyParagraph(entity: ADFEntity) {
  return (
    !entity.content ||
    entity.content.length === 0 ||
    (entity.content.length === 1 && entity.content[0].text === '')
  );
}

const MAX_PARAGRAPH_LENGTH = 120;

function shouldSplitParagraph(entity: ADFEntity) {
  const size = reduce(
    entity,
    (acc, node) => {
      if (!node.text) {
        return acc;
      }

      return acc + node.text.length;
    },
    0,
  );

  if (size >= MAX_PARAGRAPH_LENGTH * 2) {
    return true;
  }
  return false;
}

function splitParagraph(entity: ADFEntity) {
  const currentSize = 0;
  const paragraphs: ADFEntity[] = reduce(
    entity,
    (paragraphs, entity) => {
      if (entity.type === 'paragraph') {
        return paragraphs;
      }
      let currentParagraph = paragraphs.pop() as
        | ParagraphDefinition
        | undefined;

      if (!currentParagraph) {
        currentParagraph = p();
      }

      currentParagraph.content!.push(entity as Inline);
      return [...paragraphs, currentParagraph];
    },
    [] as ADFEntity[],
  );

  return paragraphs;
}

const paragraphTransformer: EntityTransformer = paragraphEntity => {
  if (isEmptyParagraph(paragraphEntity)) {
    return []; // Remove this entity from the final slide
  }

  if (shouldSplitParagraph(paragraphEntity)) {
    return splitParagraph(paragraphEntity);
  }

  return [paragraphEntity];
};

export default paragraphTransformer;
