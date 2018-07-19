import React from 'react';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import Test from '../../DESIGN_EXAMPLES';

export const customInsertMenuItems = Test.map(
  ({ name, component, componentPath }) => ({
    content: name,
    title: name,
    value: { name: 'inline-eh' },
    tooltipDescription: 'Inline macro (Using extension handlers)',
    tooltipPosition: 'right',
    elemBefore: <AtlassianIcon />,
    onClick: editorActions => {
      editorActions.replaceSelection({
        type: 'inlineExtension',
        attrs: {
          extensionType: 'com.ajay.test',
          extensionKey: 'block-eh',
          parameters: {
            tag: componentPath,
            props: {
              name: 'xlarge',
              size: 'xlarge',
              presence: 'online',
            },
            componentPath,
          },
        },
      });
    },
    action(insert) {
      return insert({
        type: 'inlineExtension',
        attrs: {
          extensionType: 'com.ajay.test',
          extensionKey: 'block-eh',
          parameters: {
            tag: componentPath,
            props: {
              name: 'xlarge',
              size: 'xlarge',
              presence: 'online',
            },
            componentPath,
          },
        },
      });
    },
  }),
);

export default function quickInsertProviderFactory() {
  return {
    getItems() {
      return new Promise(resolve => {
        setTimeout(() => resolve(customInsertMenuItems), 100);
      });
    },
  };
}
