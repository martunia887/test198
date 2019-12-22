import { GasPayload } from '@atlaskit/analytics-gas-types';
import { end } from 'perf-marks';
import { packageAttributes, PackageAttributes } from './index';

export type ClosedInputType = 'button' | 'blanket' | 'escKey';
export interface CloseGasPayload extends GasPayload {
  attributes: PackageAttributes & {
    input: ClosedInputType;
    sessionDurationMs: number;
  };
}

export function closedEvent(input: ClosedInputType): CloseGasPayload {
  const { duration = 0 } = end('MediaViewer.SessionDuration');
  return {
    eventType: 'ui',
    action: 'closed',
    actionSubject: 'mediaViewer',
    actionSubjectId: undefined,
    attributes: {
      ...packageAttributes,
      sessionDurationMs: duration,
      input,
    },
  };
}
