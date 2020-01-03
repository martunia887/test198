import { OperationalAEP, AnalyticsEventPayloadWithChannel } from './events';
import { ACTION, ACTION_SUBJECT, ACTION_SUBJECT_ID } from './enums';
import { SimplifiedNode } from '../../../utils/document-logger';

type InvalidTransactionErrorAEP = OperationalAEP<
  ACTION.DISPATCHED_INVALID_TRANSACTION,
  ACTION_SUBJECT.EDITOR,
  undefined,
  {
    analyticsEventPayloads: AnalyticsEventPayloadWithChannel[];
    invalidNodes: (SimplifiedNode | string)[];
  },
  undefined
>;

type FailedToUnmountErrorAEP = OperationalAEP<
  ACTION.FAILED_TO_UNMOUNT,
  ACTION_SUBJECT.EDITOR,
  ACTION_SUBJECT_ID.REACT_NODE_VIEW,
  {
    error: Error;
    domNodes: {
      container?: string;
      child?: string;
    };
  },
  undefined
>;

export type ErrorEventPayload =
  | InvalidTransactionErrorAEP
  | FailedToUnmountErrorAEP;
