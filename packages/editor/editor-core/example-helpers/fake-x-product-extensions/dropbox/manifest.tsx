import { ExtensionManifest } from '@atlaskit/editor-common';

const manifest: ExtensionManifest = {
  title: 'Dropbox',
  type: 'com.dropbox.fabric',
  key: 'dropbox',
  description: 'Dropbox extension for Atlassian Editor',
  icons: {
    '16': () => import('./icons/DropboxIcon'),
    '24': () => import('./icons/DropboxIcon'),
    '48': () => import('./icons/DropboxIcon'),
  },
  modules: {
    quickInsert: [
      {
        key: 'item',
        action: () =>
          new Promise((resolve, reject) => {
            (window as any).Dropbox.choose({
              success: (files: any) => {
                resolve({
                  type: 'mediaSingle',
                  content: [
                    {
                      type: 'media',
                      attrs: {
                        type: 'external',
                        url: files[0].link.replace('?dl=0', '?dl=1'),
                      },
                    },
                  ],
                });
              },
              cancel: reject,
            });
          }),
      },
    ],
  },
};

export default manifest;
