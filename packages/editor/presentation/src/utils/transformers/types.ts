import { ADFEntity } from '@atlaskit/adf-utils';
import { Slide } from '../convertADFToSlides';

export type EntityTransformer = (entity: ADFEntity) => Partial<Slide>[];
