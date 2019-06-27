import * as React from 'react';

import Tooltip from '@atlaskit/tooltip';

import Inline from './inline';

export default function Paragraph({ children }: React.Props<{}>) {
  let newChildren = children;

  if (Array.isArray(children)) {
    newChildren = children.map(innerChild =>
      (innerChild as Array<any>)!.map(child =>
        typeof child === 'string'
          ? child.split(/\b([A-Z]{2,})\b/g).map(textPart =>
              (textPart as string).match(/[A-Z]{2,}/) ? (
                <Tooltip
                  content={`this is going to be expanded into an acronym ${textPart}`}
                  tag="span"
                >
                  <span>{textPart}</span>
                </Tooltip>
              ) : (
                textPart
              ),
            )
          : child,
      ),
    );
  }

  return (
    <p>
      <Inline>{newChildren}</Inline>
    </p>
  );
}
