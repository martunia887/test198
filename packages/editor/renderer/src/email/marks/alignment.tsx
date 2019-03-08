import { MarkSerializerOpts } from '../interfaces';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

export const emailAlignmentsMap: { [key: string]: string } = {
  end: 'right',
  right: 'right',
  center: 'center',
};

export default function alignment({ mark, text }: MarkSerializerOpts) {
  const alignmentProps = {
    style: {
      width: '100%',
      'text-align': emailAlignmentsMap[mark.attrs.align],
    },
    dangerouslySetInnerHTML: { __html: text },
  };
  return renderToStaticMarkup(<div {...alignmentProps} />);
}
