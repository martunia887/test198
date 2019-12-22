import { SimplifiedNode } from '../../../utils/document-logger';
import { ACTION, ACTION_SUBJECT } from './enums';
import { OperationalAEP, AnalyticsEventPayloadWithChannel } from './events';

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

export type ErrorEventPayload = InvalidTransactionErrorAEP;
