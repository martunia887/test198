import Loadable from 'react-loadable';

const ClipboardLoader = Loadable({
  loader: async () => {
    const {
      Clipboard,
    } = await import(/* webpackChunkName:"@atlaskit-internal_Clipboard" */ './clipboard');
    return Clipboard;
  },
  loading: () => null,
});

export { ClipboardLoader };
