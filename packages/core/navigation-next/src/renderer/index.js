// @flow

import TypedItemsRenderer from './components';
import TypedItemsRendererLite from './components-lite';

export { TypedItemsRenderer };
export { TypedItemsRendererLite };

// Use TypedItemsRenderer with its default value of empty
export default class ItemsRenderer extends TypedItemsRenderer<> {}
export class ItemsRendererLite extends TypedItemsRenderer<> {}
