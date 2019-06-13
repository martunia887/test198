import * as React from 'react';
import Inline from './inline';

export default function Paragraph({
  children,
  isBlock,
  nodeSize,
}: { isBlock: boolean; nodeSize: number } & React.Props<{}>) {
  return (
    <p data-isblock={isBlock} data-nodesize={nodeSize}>
      <Inline>{children}</Inline>
    </p>
  );
}
