import React from 'react';

import ClipboardPolyfill, * as clipboard from 'clipboard-polyfill';

const Clipboard: typeof ClipboardPolyfill = clipboard as any;

const CopyTextContext = React.createContext<{
  copyTextToClipboard: (textToCopy: string) => Promise<void>;
}>({
  copyTextToClipboard: () =>
    new Promise<void>((_resolve, reject) =>
      reject('"copyTextToClipboard" is not initialized'),
    ),
});

const { Provider, Consumer } = CopyTextContext;

export class CopyTextProvider extends React.Component {
  copyTextToClipboard = (textToCopy: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      return Clipboard.writeText(textToCopy).then(resolve, reject);
    });
  };

  render() {
    return (
      <Provider
        value={{
          copyTextToClipboard: this.copyTextToClipboard,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { Consumer as CopyTextConsumer };
export { CopyTextContext };
