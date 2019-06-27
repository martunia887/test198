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
              const acronym = (textPart as string).match(/\[.*?\]/g);
              const descAndSource = (textPart as string).match(/\(.*?\)/g);
              if (acronym && descAndSource) {
                const description = descAndSource[0].slice(1, -1).split('|')[0];
                //const source = descAndSource[0].slice(1, -1).split('|')[1];
                return (
                  <Tooltip content={description} tag="span">
                    <span style={{ textDecoration: 'underline dashed' }}>
                      {acronym[0].slice(1, -1)}
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
