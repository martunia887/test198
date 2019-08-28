import { ADFEntity } from '@atlaskit/adf-utils';

export type EntityTransformer = (entity: ADFEntity) => ADFEntity[];
