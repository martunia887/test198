import React from 'react';
import { Card } from '@atlaskit/smart-card';
import { EventHandlers } from '@atlaskit/editor-common';

import { getEventHandler } from '../../utils';

export default function BlockCard(props: {
  url?: string;
  data?: object;
  eventHandlers?: EventHandlers;
}) {
  const { url, data, eventHandlers } = props;
  const handler = getEventHandler(eventHandlers, 'smartCard');
  const onClick = url && handler ? () => handler(url) : undefined;
  return <Card appearance="block" url={url} data={data} onClick={onClick} />;
}
