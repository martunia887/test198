import { Serializer } from './serializer';
import { defaultSchema } from '@atlaskit/adf-schema';
import {
  getValidDocument,
  getValidNode,
  ADNode,
  ADFStage,
} from '@atlaskit/editor-common';
import { Node as PMNode, Schema, Fragment } from 'prosemirror-model';

import acronymList from './acronyms-list.json';
console.log(acronymList);

export interface RenderOutput<T> {
  result: T;
  stat: RenderOutputStat;
}

export interface RenderOutputStat {
  buildTreeTime?: number;
  sanitizeTime: number;
  serializeTime?: number;
}

export interface ResultWithTime<T> {
  output: T;
  time: number;
}

const SUPPORTS_HIRES_TIMER_API = window.performance && performance.now;

const withStopwatch = <T>(cb: () => T): ResultWithTime<T> => {
  const startTime = SUPPORTS_HIRES_TIMER_API ? performance.now() : Date.now();
  const output = cb();
  const endTime = SUPPORTS_HIRES_TIMER_API ? performance.now() : Date.now();
  const time = endTime - startTime;

  return { output, time };
};

function matchWord(word: string) {
  const found = acronymList[word];
  if (found instanceof Array && found.length)
    return `[${word}](${found[0].definition})`;
  else return word;
}

function doTheAcronymBaby(text: string) {
  return text
    .split(/\b(\w+)\b/)
    .map((word: string) => matchWord(word))
    .join('');
}

function parseAcronyms(doc: any): any {
  if (doc.type == 'text') {
    return {
      ...doc,
      text: doTheAcronymBaby(doc.text),
    };
  } else if (doc.content instanceof Array) {
    return {
      ...doc,
      content: doc.content.map((node: any) => parseAcronyms(node)),
    };
  } else return doc;
}

function getAcronyms() {
  const Confluence = (window as any).Confluence;
  if (Confluence) {
    const pageId = Confluence.getContentId();
    const hostname = Confluence.host.split('.')[0];
    return fetch(`https://d8045dd8.ngrok.io/a/${hostname}/${pageId}`).then(
      function(response) {
        if (response.status !== 200) throw new Error('Something went wrong');
        return response.json();
      },
    );
  } else return Promise.reject('Not a confluence instance');
}

export const renderDocument = <T>(
  doc: any,
  serializer: Serializer<T>,
  schema: Schema = defaultSchema,
  adfStage: ADFStage = 'final',
): RenderOutput<T | null> => {
  const stat: RenderOutputStat = { sanitizeTime: 0 };

  const parsedAcronyms = parseAcronyms(doc);

  getAcronyms()
    .then(function(data) {
      console.log(data);
    })
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });

  const { output: validDoc, time: sanitizeTime } = withStopwatch(() =>
    getValidDocument(parsedAcronyms, schema, adfStage),
  );

  // save sanitize time to stats
  stat.sanitizeTime = sanitizeTime;

  if (!validDoc) {
    return { stat, result: null };
  }

  const { output: node, time: buildTreeTime } = withStopwatch<PMNode>(() => {
    const pmNode = schema.nodeFromJSON(validDoc);
    pmNode.check();
    return pmNode;
  });

  // save build tree time to stats
  stat.buildTreeTime = buildTreeTime;

  const { output: result, time: serializeTime } = withStopwatch<T | null>(() =>
    serializer.serializeFragment(node.content),
  );

  // save serialize tree time to stats
  stat.serializeTime = serializeTime;

  return { result, stat };
};

export const renderNodes = <T>(
  nodes: ADNode[],
  serializer: Serializer<T>,
  schema: Schema = defaultSchema,
  target?: any,
  adfStage: ADFStage = 'final',
): T | null => {
  const validNodes = nodes.map(n => getValidNode(n, schema, adfStage));

  const pmFragment = Fragment.fromJSON(schema, validNodes);

  return serializer.serializeFragment(pmFragment, {}, target, 'node-0');
};
