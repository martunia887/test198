import * as React from 'react';
import { Schema } from 'prosemirror-model';
import { defaultSchema } from '@atlaskit/adf-schema';
import { Transformer, ADNode, EventHandlers } from '@atlaskit/editor-common';
import { JSONTransformer } from '@atlaskit/editor-json-transformer';
import Tooltip from '@atlaskit/tooltip';
import { Node as PMNode } from 'prosemirror-model';

function createEncoder<T>(parser: Transformer<T>, encoder: Transformer<any>) {
  return (value: T) => encoder.encode(parser.parse(value));
}
export type TransformerProvider<T> = (schema: Schema) => Transformer<T>;
export class ADFEncoder<T> {
  encode: (value: T) => any;

  constructor(createTransformerWithSchema: TransformerProvider<T>) {
    const transformer = createTransformerWithSchema(defaultSchema);
    this.encode = createEncoder(transformer, new JSONTransformer());
  }
}

export const getText = (node: PMNode | ADNode): string => {
  return (
    node.text ||
    (node.attrs && (node.attrs.text || node.attrs.shortName)) ||
    `[${typeof node.type === 'string' ? node.type : node.type.name}]`
  );
};

export const getEventHandler = (
  eventHandlers?: EventHandlers,
  type?: keyof EventHandlers,
  eventName: string = 'onClick',
): any => {
  return (
    eventHandlers &&
    type &&
    eventHandlers[type] &&
    (eventHandlers as any)[type][eventName]
  );
};

export const deepMapAcronyms = (children: any): any => {
  if (Array.isArray(children)) {
    return children.map(child => deepMapAcronyms(child));
  } else if (typeof children === 'string') {
    return children.split(/(\[.*?\]\(.*?\))/g).map(textPart => {
      const acronym = (textPart as string).match(/\[.*?\]/g);
      const descAndSource = (textPart as string).match(/\(.*?\)/g);
      if (acronym && descAndSource) {
        const description = Buffer.from(
          descAndSource[0].slice(1, -1).split('|')[0],
          'base64',
        ).toString();
        //const source = descAndSource[0].slice(1, -1).split('|')[1];
        return (
          <Tooltip content={description} tag="span">
            <span style={{ textDecoration: 'underline dashed' }}>
              {acronym[0].slice(1, -1)}
            </span>
          </Tooltip>
        );
      } else {
        return textPart;
      }
    });
  } else {
    return children;
  }
};
