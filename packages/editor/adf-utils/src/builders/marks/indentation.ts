import {
  IndentationMarkDefinition,
  IndentationMarkAttributes,
  ParagraphDefinition,
} from '@atlaskit/adf-schema';
import { WithMark, WithAppliedMark } from '../types';
import { applyMark } from '../utils/apply-mark';

export const indentation = (attrs: IndentationMarkAttributes) => (
  maybeNode: WithMark | string,
) =>
  applyMark<IndentationMarkDefinition>(
    { type: 'indentation', attrs },
    maybeNode,
  ) as WithAppliedMark<ParagraphDefinition, IndentationMarkDefinition>;
