import React, { useState } from 'react';
import RendererDemo from './helper/RendererDemo';
import { Provider, Client } from '@atlaskit/smart-card';

const myComment = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'mediaSingle',
      attrs: {
        width: 33.33333333333333,
        layout: 'wrap-left',
      },
      content: [
        {
          type: 'media',
          attrs: {
            id: '8393126b-0362-4945-8202-a0e101cb1e9f',
            type: 'file',
            collection: 'MediaServicesSample',
            width: 1024,
            height: 683,
          },
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mi nisl, venenatis eget auctor vitae, venenatis quis lorem. Suspendisse maximus tortor vel dui tincidunt cursus. Vestibulum magna nibh, auctor non auctor id, finibus vitae orci. Nulla viverra ipsum et nunc fringilla ultricies. Pellentesque vitae felis molestie justo finibus accumsan. Suspendisse potenti. Nulla facilisi. Integer dignissim quis velit quis elementum. Sed sit amet varius ante. Duis vestibulum porta augue eu laoreet. Morbi id risus et augue sollicitudin aliquam. In et ligula dolor. Nam ac aliquet diam.',
        },
      ],
    },
  ],
};

const badStyle = {
  width: '100%',
  height: '50px',
  backgroundColor: 'red',
};

const goodStyle = {
  width: '100%',
  height: '50px',
  backgroundColor: 'green',
};

export default function Example() {
  const [oldWidthDetector, setOldWidthDetector] = useState(false);

  return (
    <Provider client={new Client('staging')}>
      <button
        style={oldWidthDetector ? badStyle : goodStyle}
        onClick={() => {
          setOldWidthDetector(!oldWidthDetector);
        }}
      >
        {oldWidthDetector
          ? 'Click to use a version non-gluttonous of WidthDetector'
          : 'Click to use the current gluttonous WidthDetector'}
      </button>

      <RendererDemo
        appearance="comment"
        document={myComment}
        allowColumnSorting={true}
        serializer="react"
        showHowManyCopies
        copies={1}
        useResizeObserverWidthProvider={!oldWidthDetector}
      />
    </Provider>
  );
}
