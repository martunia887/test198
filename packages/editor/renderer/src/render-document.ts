import { Serializer } from './serializer';
import { defaultSchema } from '@atlaskit/adf-schema';
import {
  getValidDocument,
  getValidNode,
  ADNode,
  ADFStage,
} from '@atlaskit/editor-common';
import { Node as PMNode, Schema, Fragment } from 'prosemirror-model';

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

function matchWord(word: string, acronyms: AcronymDefinition) {
  const found = acronyms[word];
  if (found && found.length > 0) {
    return `[${word}](${found[0].definition})`;
  } else {
    return word;
  }
}

function doTheAcronymBaby(text: string, acronyms: AcronymDefinition) {
  return text
    .split(/\b(\w+)\b/)
    .map((word: string) => matchWord(word, acronyms))
    .join('');
}

interface AcronymDefinition {
  [key: string]: [
    {
      definition: string;
      url: string;
    }
  ];
}

function parseAcronyms(doc: any, acronyms: AcronymDefinition): any {
  if (doc.type === 'text') {
    return {
      ...doc,
      text: doTheAcronymBaby(doc.text, acronyms),
    };
  } else if (doc.content instanceof Array) {
    return {
      ...doc,
      content: doc.content.map((node: any) => parseAcronyms(node, acronyms)),
    };
  } else return doc;
}

async function getAcronyms() {
  const Confluence = (window as any).Confluence;
  if (Confluence) {
    const pageId = Confluence.getContentId();
    const hostname = new URL(Confluence.getBaseUrl()).hostname.split('.')[0];
    const response = await fetch(
      `https://project-sa.dev.atl-paas.net/a/${hostname}/${pageId}`,
    );
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(`${response.status}`);
    }
  } else {
    return {};
  }
}

export const renderDocument = async <T>(
  doc: any,
  serializer: Serializer<T>,
  schema: Schema = defaultSchema,
  adfStage: ADFStage = 'final',
): Promise<RenderOutput<T | null>> => {
  const stat: RenderOutputStat = { sanitizeTime: 0 };

  const acronyms = await getAcronyms();
  const parsedAcronyms = await parseAcronyms(doc, acronyms);

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
