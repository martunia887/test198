import {
  AlignmentMarkDefinition,
  AlignmentAttributes,
  ParagraphDefinition,
  HeadingDefinition,
} from '@atlaskit/adf-schema';
import { WithMark, WithAppliedMark } from '../types';
import { applyMark } from '../utils/apply-mark';

export const alignment = (attrs: AlignmentAttributes) => (
  maybeNode: WithMark | string,
) =>
  applyMark<AlignmentMarkDefinition>(
    { type: 'alignment', attrs },
    maybeNode,
  ) as WithAppliedMark<
    ParagraphDefinition | HeadingDefinition,
    AlignmentMarkDefinition
  >;
