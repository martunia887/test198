import * as React from 'react';

import Tooltip from '@atlaskit/tooltip';

import Inline from './inline';

const deepMap = (children: any): any => {
  if (Array.isArray(children)) {
    return children.map(child => deepMap(child));
  } else if (typeof children === 'string') {
    return children.split(/(\[.*?\]\(.*?\))/g).map(textPart => {
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
    });
  } else {
    return children;
  }
};

export default function Paragraph({ children }: React.Props<{}>) {
  return (
    <p>
      <Inline>{deepMap(children)}</Inline>
    </p>
  );
}
