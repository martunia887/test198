import { NodeView } from 'prosemirror-view';
import ReactNodeView from '../../../nodeviews/ReactNodeView';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import Slider from '../ui/Slider';

export default class SliderView extends ReactNodeView implements NodeView {
  createDomRef() {
    return document.createElement('div');
  }

  ignoreMutation(record: MutationRecord) {
    return true;
  }
}

export function sliderNodeViewFactory(portalProviderAPI: PortalProviderAPI) {
  return (node: any, view: any, getPos: () => number): NodeView =>
    new SliderView(
      node,
      view,
      getPos,
      portalProviderAPI,
      { node, view, getPos },
      Slider,
    ).init();
}
