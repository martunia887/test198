import { BaseAnalyticsContext } from '../index';
import { version, name } from '../version.json';
import { MediaType } from '@atlaskit/media-client';

export const getBaseAnalyticsContext = (
  componentName: any,
  actionSubjectId: any,
): BaseAnalyticsContext => ({
  packageVersion: version,
  packageName: name,
  componentName,
  actionSubject: 'MediaCard',
  actionSubjectId,
});

export interface AnalyticsEventPayolad {
  eventType: MediaAnalyticsEventType;
  action: string;
  actionSubject: string;
  actionSubjectId: string;
  attributes: {
    fileAttributes: MediaAnalyticsFileAttributes;
  };
}

export interface MediaAnalyticsFileAttributes {
  fileSource: string;
  fileMediatype?: MediaType;
  fileId?: string;
  fileStatus?: 'original' | 'converted';
  fileSize?: number;
}

export type MediaAnalyticsEventType = 'ui' | 'operational';
