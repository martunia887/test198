import { EntityTransformer } from './types';
import { doc } from '@atlaskit/adf-utils';

const listTransformer: EntityTransformer = listEntity => {
  return [
    {
      layout: {
        type: 'list',
        attrs: {
          listAdf: listEntity,
        },
      },
      adf: doc(),
    },
  ];
};

export default listTransformer;
