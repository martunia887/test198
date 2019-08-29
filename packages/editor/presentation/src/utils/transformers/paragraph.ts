import { EntityTransformer } from './types';
import { ADFEntity, reduce, p, doc } from '@atlaskit/adf-utils';
import { ParagraphDefinition, Inline } from '@atlaskit/adf-schema';
import { Slide } from '../convertADFToSlides';

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

function closeSentenceIfNeeded(sentence: string): string {
  if (sentence[sentence.length - 1] !== '.') {
    return `${sentence}.`;
  }
  return sentence;
}

function splitParagraph(entity: ADFEntity): Partial<Slide>[] {
  let currentSize = 0;
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

      if (!entity.text) {
        currentParagraph.content!.push(entity as Inline);
        return [...paragraphs, currentParagraph];
      }

      const size = entity.text.length;
      // If the current text doesn't reach the limit. Add it.
      if (currentSize + size < MAX_PARAGRAPH_LENGTH) {
        currentSize += size;
        currentParagraph.content!.push(entity as Inline);
        return [...paragraphs, currentParagraph];
      }

      // The current text reach paragraph limit words,
      // lets try to split it into using the closest sentence
      const maybeASentence = entity.text
        .split('. ')
        .filter(sentence => !!sentence);
      if (maybeASentence.length < 2) {
        // no sentence found, add the whole text.
        currentSize += size;
        currentParagraph.content!.push(entity as Inline);
        return [...paragraphs, currentParagraph];
      }

      // We have at least one sentence.
      const newParagraphs = [...paragraphs, currentParagraph];

      // Assure the we have a closing sentence in the current paragraph
      const endingSentence = maybeASentence.shift()!;
      currentSize += endingSentence.length;
      currentParagraph.content!.push({
        ...entity,
        text: closeSentenceIfNeeded(endingSentence),
      } as Inline);

      for (const sentence of maybeASentence) {
        if (currentSize + sentence.length >= MAX_PARAGRAPH_LENGTH) {
          currentParagraph = p();
          currentSize = sentence.length;

          currentParagraph.content!.push({
            ...entity,
            text: closeSentenceIfNeeded(sentence),
          } as Inline);
          newParagraphs.push(currentParagraph);
        } else {
          currentSize += sentence.length;
          currentParagraph.content!.push({
            ...entity,
            text: closeSentenceIfNeeded(sentence),
          } as Inline);
        }
      }
      return newParagraphs;
    },
    [] as ADFEntity[],
  );

  return paragraphs.map<Partial<Slide>>(paragraph => ({
    adf: doc(paragraph as any),
  }));
}

const paragraphTransformer: EntityTransformer = paragraphEntity => {
  if (isEmptyParagraph(paragraphEntity)) {
    return []; // Remove this entity from the final slide
  }

  if (shouldSplitParagraph(paragraphEntity)) {
    return splitParagraph(paragraphEntity);
  }

  return [
    {
      adf: doc(paragraphEntity as any),
    },
  ];
};

export default paragraphTransformer;
