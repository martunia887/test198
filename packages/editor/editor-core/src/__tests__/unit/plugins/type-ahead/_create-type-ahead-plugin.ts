import { TypeAheadSelectItem } from '../../../../plugins/type-ahead/types';

export const createTypeAheadPlugin = ({
  trigger,
  getItems,
  selectItem,
}: {
  trigger?: string;
  getItems?: Function;
  selectItem?: TypeAheadSelectItem;
} = {}) => {
  return {
    pluginsOptions: {
      typeAhead: {
        trigger: typeof trigger !== 'undefined' ? trigger : '|',
        getItems:
          getItems !== undefined
            ? getItems
            : () => [{ title: '1' }, { title: '2' }, { title: '3' }],
        selectItem:
          selectItem !== undefined
            ? selectItem
            : (((state, item, replaceWith) =>
                replaceWith(
                  state.schema.text(`${item.title} selected`),
                )) as TypeAheadSelectItem),
      },
    },
  };
};
