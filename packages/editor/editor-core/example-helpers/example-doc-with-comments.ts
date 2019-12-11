export const exampleDocument = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'For Q1, our main ',
        },
        {
          type: 'text',
          text: 'areas of focus are:',
          marks: [
            {
              type: 'annotation',
              attrs: {
                id: 'b81e1de8-9df7-4210-861d-89e13512ce33',
                annotationType: 'inlineComment',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Performance',
                  marks: [
                    {
                      type: 'strong',
                    },
                    {
                      type: 'annotation',
                      attrs: {
                        id: '5551fe04-3517-4821-8330-b7c506a43bd5',
                        annotationType: 'inlineComment',
                      },
                    },
                  ],
                },
                {
                  type: 'text',
                  text:
                    ': Instrument key performance metrics and improve typing speed in the editor.',
                  marks: [
                    {
                      type: 'annotation',
                      attrs: {
                        id: '5551fe04-3517-4821-8330-b7c506a43bd5',
                        annotationType: 'inlineComment',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Insertion & nesting logic:',
                  marks: [
                    {
                      type: 'strong',
                    },
                  ],
                },
                {
                  type: 'text',
                  text:
                    ' Remove invisible barriers by enabling more content to be placed ',
                },
                {
                  type: 'text',
                  text: 'inside each other.',
                  marks: [
                    {
                      type: 'annotation',
                      attrs: {
                        id: '42497172-2e64-4aa6-b8b1-5a37270ee1f9',
                        annotationType: 'inlineComment',
                      },
                    },
                  ],
                },
                {
                  type: 'text',
                  text: ' E.g. allow users to paste an image inside a panel.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
