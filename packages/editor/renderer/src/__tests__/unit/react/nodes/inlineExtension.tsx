import * as React from 'react';
import { mount } from 'enzyme';
import InlineExtension from '../../../../react/nodes/inlineExtension';
import { RendererContext } from '../../../../react';
import ReactSerializer from '../../../../react';
import { defaultSchema } from '@atlaskit/adf-schema';
import {
  ExtensionHandlers,
  DefaultExtensionProvider,
  ProviderFactory,
  combineExtensionProviders,
} from '@atlaskit/editor-common';
import { createFakeExtensionManifest } from '@atlaskit/editor-test-helpers/src/extensions';
import Loadable from 'react-loadable';

describe('Renderer - React/Nodes/InlineExtension', () => {
  const providerFactory = ProviderFactory.create({});
  const extensionHandlers: ExtensionHandlers = {
    'com.atlassian.fabric': (param: any) => {
      switch (param.extensionKey) {
        case 'react':
          return <span>This is a react element</span>;
        case 'adf':
          return [
            {
              type: 'text',
              text: 'This is a ADF node',
            },
          ];
        case 'error':
          throw new Error('Cursed by Tong');
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
          type: 'inlineExtension',
          attrs: {
            extensionType: 'com.atlassian.stride',
            extensionKey: 'default',
            bodyType: 'none',
          },
          content: [
            {
              type: 'text',
              text: 'This is the default content of the extension',
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
      <InlineExtension
        providers={providerFactory}
        serializer={serializer}
        extensionHandlers={extensionHandlers}
        rendererContext={rendererContext}
        extensionType="com.atlassian.fabric"
        extensionKey="default"
        text="This is the default text"
      />,
    );

    expect(
      extension
        .find('span')
        .first()
        .text(),
    ).toEqual('This is the default text');
    extension.unmount();
  });

  it('should be able to render React.Element from extensionHandler', () => {
    const extension = mount(
      <InlineExtension
        providers={providerFactory}
        serializer={serializer}
        extensionHandlers={extensionHandlers}
        rendererContext={rendererContext}
        extensionType="com.atlassian.fabric"
        extensionKey="react"
      />,
    );

    expect(
      extension
        .find('span')
        .first()
        .text(),
    ).toEqual('This is a react element');
    extension.unmount();
  });

  it('should be able to render Atlassian Document from extensionHandler', () => {
    const extension = mount(
      <InlineExtension
        providers={providerFactory}
        serializer={serializer}
        extensionHandlers={extensionHandlers}
        rendererContext={rendererContext}
        extensionType="com.atlassian.fabric"
        extensionKey="adf"
      />,
    );

    expect(
      extension
        .find('span')
        .first()
        .text(),
    ).toEqual('This is a ADF node');
    extension.unmount();
  });

  it('should render the default content if extensionHandler throws an exception', () => {
    const extension = mount(
      <InlineExtension
        providers={providerFactory}
        serializer={serializer}
        extensionHandlers={extensionHandlers}
        rendererContext={rendererContext}
        extensionType="com.atlassian.fabric"
        extensionKey="error"
      />,
    );

    expect(
      extension
        .find('span')
        .first()
        .text(),
    ).toEqual('inlineExtension');
    extension.unmount();
  });

  it('extension handler should receive type = inlineExtension', () => {
    const extensionHandler = jest.fn();
    const extensionHandlers: ExtensionHandlers = {
      'com.atlassian.fabric': extensionHandler,
    };

    const extension = mount(
      <InlineExtension
        providers={providerFactory}
        serializer={serializer}
        extensionHandlers={extensionHandlers}
        rendererContext={rendererContext}
        extensionType="com.atlassian.fabric"
        extensionKey="react"
      />,
    );

    expect(extensionHandler.mock.calls[0][0]).toEqual({
      type: 'inlineExtension',
      extensionType: 'com.atlassian.fabric',
      extensionKey: 'react',
      parameters: undefined,
      content: undefined,
    });

    extension.unmount();
  });

  it('should be able to render extensions with the extension provider', async () => {
    // const ExtensionHandlerComponent = jest.fn();
    const ExtensionHandlerComponent = ({ extensionParams }) => {
      return (
        <span>
          Inline macro from extension provider:{' '}
          {extensionParams.parameters.words}
        </span>
      );
    };

    const macroManifest = createFakeExtensionManifest(
      'fake confluence macro',
      'fake.confluence',
      ['inline-macro'],
    );

    const FakeES6Module = {
      __esModule: true,
      default: ExtensionHandlerComponent,
    };

    macroManifest.modules.nodes[0].render = () =>
      Promise.resolve(FakeES6Module);

    const confluenceMacrosExtensionProvider = new DefaultExtensionProvider([
      macroManifest,
    ]);

    const providers = ProviderFactory.create({
      extensionProvider: Promise.resolve(
        combineExtensionProviders([confluenceMacrosExtensionProvider]),
      ),
    });

    const extension = mount(
      <InlineExtension
        providers={providers}
        serializer={serializer}
        extensionHandlers={extensionHandlers}
        rendererContext={rendererContext}
        extensionType="fake.confluence-extension"
        extensionKey="inline-macro"
        parameters={{
          words: 'lorem ipsum',
        }}
      />,
    );

    await Loadable.preloadAll();

    extension.update();

    expect(extension.text()).toEqual(
      'Inline macro from extension provider: lorem ipsum',
    );

    extension.unmount();
  });
});
