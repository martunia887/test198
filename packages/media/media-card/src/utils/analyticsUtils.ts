import { BaseAnalyticsContext } from '../index';
import { version, name } from '../version.json';
import { MediaType } from '@atlaskit/media-client';
import { GasCorePayload } from '@atlaskit/analytics-gas-types';

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

export type AnalyticsEventPayolad = GasCorePayload & {
  action: string;
  attributes: GasCorePayload['attributes'] & {
    fileAttributes: MediaAnalyticsFileAttributes;
    label?: string;
  };
};

export interface MediaAnalyticsFileAttributes {
  fileSource: string;
  fileMediatype?: MediaType;
  fileId?: string;
  fileStatus?: 'original' | 'converted';
  fileSize?: number;
}
