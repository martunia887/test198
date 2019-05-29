import { defaultSchema } from '@atlaskit/adf-schema';
import { Node as PMNode, Schema } from 'prosemirror-model';
import { encode } from './encoder';
import AbstractTree from './parser/abstract-tree';
import { Context } from './parser/tokenize';
import { buildIssueKeyRegex } from './parser/tokenize/issue-key';

interface Transformer<T> {
  encode(node: PMNode): T;
  parse(content: T): PMNode;
}

export class WikiMarkupTransformer implements Transformer<string> {
  private schema: Schema;

  constructor(schema: Schema = defaultSchema) {
    this.schema = schema;
  }

  encode(node: PMNode): string {
    return encode(node);
  }

  parse(wikiMarkup: string, context?: Context): PMNode {
    const tree = new AbstractTree(this.schema, wikiMarkup);

    return tree.getProseMirrorModel(this.buildContext(context));
  }

  private buildContext(context?: Context): Context {
    return context
      ? {
          ...context,
          issueKeyRegex: buildIssueKeyRegex(context.inlineCardConversion),
        }
      : {};
  }
}

export default WikiMarkupTransformer;
