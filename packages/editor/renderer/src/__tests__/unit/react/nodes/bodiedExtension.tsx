import * as React from 'react';
import { mount } from 'enzyme';
import BodiedExtension from '../../../../react/nodes/bodiedExtension';

import { RendererContext } from '../../../../react';
import ReactSerializer from '../../../../react';
import { defaultSchema } from '@atlaskit/adf-schema';
import { ExtensionHandlers } from '@atlaskit/editor-common';

describe('Renderer - React/Nodes/BodiedExtension', () => {
  const extensionHandlers: ExtensionHandlers = {
    'com.atlassian.fabric': (param: any, doc: any) => {
      switch (param.extensionKey) {
        case 'react':
          return <p>This is a react element</p>;
        case 'adf':
          return [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'This is a ADF node',
                },
              ],
            },
          ];
        case 'originalContent':
          return param.content;
        case 'error':
          throw new Error('Tong is cursing you...');
        default:
          return null;
      }
    },
  };

  const rendererContext: RendererContext = {
    adDoc: {
      version: 1,
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Check out this extension',
            },
          ],
        },
        {
          type: 'extension',
          attrs: {
            extensionType: 'com.atlassian.stride',
            extensionKey: 'default',
          },
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'This is the default content of the extension',
                },
              ],
            },
          ],
        },
      ],
    },
    schema: defaultSchema,
  };

  const serializer = new ReactSerializer({});

  it('should be able to fall back to default content', () => {
    const extension = mount(
      <BodiedExtension
        serializer={serializer}
        extensionHandlers={extensionHandlers}
        rendererContext={rendererContext}
        extensionType="com.atlassian.fabric"
        extensionKey="default"
      >
        <p>This is the default content of the extension</p>
      </BodiedExtension>,
    );

    expect(
      extension
        .find('div')
        .first()
        .text(),
    ).toEqual('This is the default content of the extension');
    extension.unmount();
  });

  it('should be able to render React.Element from extensionHandler', () => {
    const extension = mount(
      <BodiedExtension
        serializer={serializer}
        extensionHandlers={extensionHandlers}
        rendererContext={rendererContext}
        extensionType="com.atlassian.fabric"
        extensionKey="react"
      />,
    );

    expect(
      extension
        .find('div')
        .first()
        .text(),
    ).toEqual('This is a react element');
    extension.unmount();
  });

  it('should be able to render Atlassian Document from extensionHandler', () => {
    const extension = mount(
      <BodiedExtension
        serializer={serializer}
        extensionHandlers={extensionHandlers}
        rendererContext={rendererContext}
        extensionType="com.atlassian.fabric"
        extensionKey="adf"
      />,
    );

    expect(
      extension
        .find('div')
        .first()
        .text(),
    ).toEqual('This is a ADF node');
    extension.unmount();
  });

  it('should render the default content if extensionHandler throws an exception', () => {
    const extension = mount(
      <BodiedExtension
        serializer={serializer}
        extensionHandlers={extensionHandlers}
        rendererContext={rendererContext}
        extensionType="com.atlassian.fabric"
        extensionKey="error"
      >
        <p>This is the default content of the extension</p>
      </BodiedExtension>,
    );

    expect(
      extension
        .find('div')
        .first()
        .text(),
    ).toEqual('This is the default content of the extension');
    extension.unmount();
  });

  it('should be able to render the oringinlal content', () => {
    const originalContent = [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'This is the original content',
          },
        ],
      },
    ];
    const extension = mount(
      <BodiedExtension
        serializer={serializer}
        extensionHandlers={extensionHandlers}
        rendererContext={rendererContext}
        extensionType="com.atlassian.fabric"
        extensionKey="originalContent"
        content={originalContent}
      >
        <p>This is the default content of the extension</p>
      </BodiedExtension>,
    );

    expect(
      extension
        .find('div')
        .first()
        .text(),
    ).toEqual('This is the original content');
    extension.unmount();
  });

  it('extension handler should receive type = bodiedExtension', () => {
    const extensionHandler = jest.fn();
    const extensionHandlers: ExtensionHandlers = {
      'com.atlassian.fabric': extensionHandler,
    };

    const extension = mount(
      <BodiedExtension
        serializer={serializer}
        extensionHandlers={extensionHandlers}
        rendererContext={rendererContext}
        extensionType="com.atlassian.fabric"
        extensionKey="react"
      />,
    );

    expect(extensionHandler.mock.calls[0][0]).toEqual({
      type: 'bodiedExtension',
      extensionType: 'com.atlassian.fabric',
      extensionKey: 'react',
      parameters: undefined,
      content: undefined,
    });

    extension.unmount();
  });
});
