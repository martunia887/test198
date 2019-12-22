import { BlockCardResolvedViewProps } from '@atlaskit/media-ui';
import { genericExtractPropsFromJSONLD } from '..';

import { extractPropsFromDocument } from './extractPropsFromDocument';
import { extractPropsFromObject } from './extractPropsFromObject';
import { extractPropsFromPresentation } from './extractPropsFromPresentation';
import { extractBlockViewPropsFromProject } from './extractPropsFromProject';
import { extractPropsFromSourceCodeRepository } from './extractPropsFromSourceCodeRepository';
import { extractPropsFromSpreadsheet } from './extractPropsFromSpreadsheet';
import { extractBlockViewPropsFromTask } from './extractPropsFromTask';
import { extractPropsFromTextDocument } from './extractPropsFromTextDocument';

const extractorPrioritiesByType = {
  Object: 0,
  Document: 5,
  'schema:TextDigitalDocument': 10,
  'schema:SpreadsheetDigitalDocument': 10,
  'schema:PresentationDigitalDocument': 10,
  Spreadsheet: 10,
  'atlassian:Task': 10,
  'atlassian:Project': 10,
  'atlassian:SourceCodeRepository': 10,
};

const extractorFunctionsByType = {
  Object: extractPropsFromObject,
  'schema:TextDigitalDocument': extractPropsFromTextDocument,
  'schema:SpreadsheetDigitalDocument': extractPropsFromSpreadsheet,
  'schema:PresentationDigitalDocument': extractPropsFromPresentation,
  Document: extractPropsFromDocument,
  Spreadsheet: extractPropsFromSpreadsheet,
  Presentation: extractPropsFromPresentation,
  'atlassian:Task': extractBlockViewPropsFromTask,
  'atlassian:Project': extractBlockViewPropsFromProject,
  'atlassian:SourceCodeRepository': extractPropsFromSourceCodeRepository,
};

export function extractBlockPropsFromJSONLD(
  json: any,
): BlockCardResolvedViewProps {
  return genericExtractPropsFromJSONLD({
    extractorPrioritiesByType: extractorPrioritiesByType,
    extractorFunctionsByType: extractorFunctionsByType,
    defaultExtractorFunction: extractPropsFromObject,
    json,
  });
}
