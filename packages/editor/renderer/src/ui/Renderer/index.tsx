import * as React from 'react';
import { PureComponent } from 'react';
import { Schema } from 'prosemirror-model';
import { defaultSchema } from '@atlaskit/adf-schema';
import {
  ADFStage,
  UnsupportedBlock,
  ProviderFactory,
  EventHandlers,
  ExtensionHandlers,
  BaseTheme,
  WidthProvider,
} from '@atlaskit/editor-common';
import { ReactSerializer, renderDocument, RendererContext } from '../../';
import { RenderOutputStat } from '../../render-document';
import { Wrapper } from './style';
import { TruncatedWrapper } from './truncated-wrapper';
import { RendererAppearance } from './types';

export interface Extension<T> {
  extensionKey: string;
  parameters?: T;
  content?: any; // This would be the original Atlassian Document Format
}

export interface Props {
  document: any;
  dataProviders?: ProviderFactory;
  eventHandlers?: EventHandlers;
  extensionHandlers?: ExtensionHandlers;
  onComplete?: (stat: RenderOutputStat) => void;
  portal?: HTMLElement;
  rendererContext?: RendererContext;
  schema?: Schema;
  appearance?: RendererAppearance;
  adfStage?: ADFStage;
  disableHeadingIDs?: boolean;
  allowDynamicTextSizing?: boolean;
  maxHeight?: number;
  truncated?: boolean;
}

export default class Renderer extends PureComponent<Props, {}> {
  private providerFactory: ProviderFactory;
  private serializer: ReactSerializer;

  constructor(props: Props) {
    super(props);
    this.providerFactory = props.dataProviders || new ProviderFactory();
    this.updateSerializer(props);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.portal !== this.props.portal) {
      this.updateSerializer(nextProps);
    }
  }

  private updateSerializer(props: Props) {
    const {
      eventHandlers,
      portal,
      rendererContext,
      document,
      extensionHandlers,
      schema,
      appearance,
      disableHeadingIDs,
      allowDynamicTextSizing,
    } = props;

    this.serializer = new ReactSerializer({
      providers: this.providerFactory,
      eventHandlers,
      extensionHandlers,
      portal,
      objectContext: {
        adDoc: document,
        schema,
        ...rendererContext,
      } as RendererContext,
      appearance,
      disableHeadingIDs,
      allowDynamicTextSizing,
    });
  }

  render() {
    const {
      document,
      onComplete,
      schema,
      appearance,
      adfStage,
      allowDynamicTextSizing,
      maxHeight,
      truncated,
    } = this.props;

    try {
      const { result, stat } = renderDocument(
        document,
        this.serializer,
        schema || defaultSchema,
        adfStage,
      );

      if (onComplete) {
        onComplete(stat);
      }
      const rendererOutput = (
        <RendererWrapper
          appearance={appearance}
          dynamicTextSizing={!!allowDynamicTextSizing}
        >
          {result}
        </RendererWrapper>
      );

      return truncated ? (
        <TruncatedWrapper height={maxHeight}>{rendererOutput}</TruncatedWrapper>
      ) : (
        rendererOutput
      );
    } catch (ex) {
      return (
        <RendererWrapper
          appearance={appearance}
          dynamicTextSizing={!!allowDynamicTextSizing}
        >
          <UnsupportedBlock />
        </RendererWrapper>
      );
    }
  }

  componentWillUnmount() {
    const { dataProviders } = this.props;

    // if this is the ProviderFactory which was created in constructor
    // it's safe to destroy it on Renderer unmount
    if (!dataProviders) {
      this.providerFactory.destroy();
    }
  }
}

type RendererWrapperProps = {
  appearance: RendererAppearance;
  dynamicTextSizing: boolean;
} & { children?: React.ReactNode };

export function RendererWrapper({
  appearance,
  children,
  dynamicTextSizing,
}: RendererWrapperProps) {
  return (
    <WidthProvider>
      <BaseTheme dynamicTextSizing={dynamicTextSizing}>
        <Wrapper appearance={appearance}>{children}</Wrapper>
      </BaseTheme>
    </WidthProvider>
  );
}
