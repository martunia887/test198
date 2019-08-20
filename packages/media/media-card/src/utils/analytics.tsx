import {
  FileDetails,
  MediaType,
  FileProcessingStatus,
} from '@atlaskit/media-client';

import { GasCorePayload } from '@atlaskit/analytics-gas-types';
import {
  version as packageVersion,
  name as packageName,
} from '../version.json';
import {
  CreateUIAnalyticsEventSignature,
  CreateAndFireEventFunction,
  createAndFireEvent,
} from '@atlaskit/analytics-next';
import { FabricChannel } from '@atlaskit/analytics-listeners';

export interface MediaCardAnalyticsFileAttributes {
  fileSource: string;
  fileMediatype?: MediaType;
  fileId?: string;
  fileStatus?: FileProcessingStatus;
  fileSize?: number;
}

// MediaCardAnalyticsContext can only bring it's own attributes at the object's top level, as other listeners will look for package name and version in there.
// Check in Atlaskit Listener
export type MediaCardAnalyticsContext = GasCorePayload['attributes'] & {
  fileAttributes: MediaCardAnalyticsFileAttributes;
};

export type MediaCardAnalyticsPayoladBase = GasCorePayload & {
  action: string;
};

export type MediaCardAnalyticsPayolad = MediaCardAnalyticsPayoladBase & {
  attributes: GasCorePayload['attributes'] & {
    // You can add attributes optionally to be merged with attributes sent by the context
    packageName: string;
  };
};

function getBaseAnalyticsContext(): GasCorePayload['attributes'] {
  return {
    packageVersion,
    packageName,
    componentName: 'MediaCard',
  };
}

export default function getAnalyticsContext(
  metadata?: FileDetails,
): MediaCardAnalyticsContext {
  const fileAttributes = {
    fileSource: 'mediaCard',
    fileMediatype: metadata && metadata.mediaType,
    fileId: metadata && metadata.id,
    fileSize: metadata && metadata.size,
    fileStatus: metadata && metadata.processingStatus,
  };

  return {
    ...getBaseAnalyticsContext(),
    fileAttributes: {
      ...fileAttributes,
    },
  };
}

function createPayload(
  payload: MediaCardAnalyticsPayoladBase,
): MediaCardAnalyticsPayolad {
  return {
    ...payload,
    attributes: {
      packageName,
      ...(payload.attributes || {}),
    },
  };
}

export function createAndFireMediaAnalyticsEvent(
  basePayload: MediaCardAnalyticsPayoladBase,
  createAnalyticsEvent?: CreateUIAnalyticsEventSignature,
) {
  const payload = createPayload(basePayload);
  if (createAnalyticsEvent) {
    const event = createAnalyticsEvent(payload);
    event.fire(FabricChannel.media);
  }
}

export function createAndFireEventOnMedia(
  basePayload: MediaCardAnalyticsPayoladBase,
): ReturnType<CreateAndFireEventFunction> {
  const payload = createPayload(basePayload);
  return createAndFireEvent(FabricChannel.media)(payload);
}
