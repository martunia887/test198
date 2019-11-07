import React from 'react';
import Loadable, { LoadingComponentProps } from 'react-loadable';

import {
  ExtensionProvider,
  ExtensionType,
  ExtensionKey,
  ExtensionParams,
} from './types';

export async function getManifestNode(
  extensionProvider: ExtensionProvider,
  extensionType: ExtensionType,
  extensionKey: ExtensionKey,
) {
  const manifest = await extensionProvider.getExtension(extensionType);

  if (!manifest) {
    throw new Error(`Extension with key "${extensionType}" not found!`);
  }

  const node = manifest.modules.nodes.find(node => node.key === extensionKey);

  if (!node) {
    throw new Error(
      `Node with key "${extensionKey}" not found on extension "${extensionType}"!`,
    );
  }

  return node;
}

function ExtensionLoading(props: LoadingComponentProps) {
  if (props.error || props.timedOut) {
    console.error('Error rendering extension', props.error);
    return <div>Error loading the extension!</div>;
  } else {
    return null;
  }
}

export function getNodeRenderer<T>(
  extensionProvider: ExtensionProvider,
  extensionType: ExtensionType,
  extensionKey: ExtensionKey,
) {
  return Loadable<{ extensionParams: ExtensionParams<T> }, any>({
    loader: () => {
      return getManifestNode(
        extensionProvider,
        extensionType,
        extensionKey,
      ).then(node => node.render());
    },
    loading: ExtensionLoading,
  });
}
