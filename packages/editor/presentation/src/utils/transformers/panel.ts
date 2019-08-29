import { EntityTransformer } from './types';
import { doc } from '@atlaskit/adf-utils';

const panelTransformer: EntityTransformer = panelEntity => {
  const content = panelEntity.content || [];
  return [
    {
      layout: {
        type: 'panel',
        attrs: panelEntity.attrs,
      },
      adf: doc(...(content as any)),
    },
  ];
};

export default panelTransformer;
