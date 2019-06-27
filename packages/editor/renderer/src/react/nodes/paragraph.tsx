import * as React from 'react';

import Tooltip from '@atlaskit/tooltip';

import Inline from './inline';

export default function Paragraph({ children }: React.Props<{}>) {
  let newChildren = children;

  if (Array.isArray(children)) {
    newChildren = children.map(innerChild =>
      (innerChild as Array<any>)!.map(child =>
        typeof child === 'string'
          ? child.split(/(\[.*?\]\(.*?\))/g).map(textPart => {
              const acronym = (textPart as string).match(/(?<=\[).*?(?=\])/);
              const expansion = (textPart as string).match(/(?<=\().*?(?=\))/);
              if (acronym && expansion) {
                return (
                  <Tooltip content={expansion[0]} tag="span">
                    <span style={{ textDecoration: 'underline dashed' }}>
                      {acronym[0]}
                    </span>
                  </Tooltip>
                );
              } else {
                return textPart;
              }
            })
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
