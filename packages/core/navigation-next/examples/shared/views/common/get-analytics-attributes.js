// @flow

import { viewReducerUtils } from '../../../../';
import type { ViewData } from '../../../../view-controller/types';

import { LinkItem } from '../../components';

export default (items: ViewData) => {
  const flattenedItems = viewReducerUtils.flattenItems(items);

  return {
    standardItemCount: flattenedItems.filter(i => i.type === 'Item').length,
    groupCount: flattenedItems.filter(i => i.type === 'Group').length,
    sectionCount: flattenedItems.filter(i => i.type === 'Section').length,
    linkCount: flattenedItems.filter(i => i.type === LinkItem).length,
  };
};
