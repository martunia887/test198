import { ADFEntity } from '@atlaskit/adf-utils';
import { Slide } from '../convertADFToSlides';
import { Schema } from 'prosemirror-model';

export type EntityTransformer = (
  entity: ADFEntity,
  schema: Schema,
) => Partial<Slide>[];
