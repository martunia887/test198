export const exampleDoc = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'How did we get here?',
          marks: [
            {
              type: 'strong',
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text:
            'When it comes to an optimal reading and editing experience, the problem of fixed width, line length, and page layout has always been a controversial topic. With the release of ADG 3, it was decided that the maximum width within a layout for any of our products should be no more than 8 columns, which at 14px works out to be roughly 100 characters per line (CPL), ',
        },
        {
          type: 'text',
          text: 'an acceptable length',
          marks: [
            {
              type: 'annotation',
              attrs: {
                id: '3cb51e32-3159-4fca-8187-4b70f34631c4',
                annotationType: 'inlineComment',
              },
            },
          ],
        },
        {
          type: 'text',
          text: ', but definitely on the longer side. ',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text:
            'This decision was made to optimise the reading experience for all products, and tested positively with ',
        },
        {
          type: 'text',
          text: 'Hipchat users',
          marks: [
            {
              type: 'link',
              attrs: {
                href:
                  'https://extranet.atlassian.com/pages/viewpage.action?pageId=2891808949',
              },
            },
          ],
        },
        {
          type: 'text',
          text:
            ', one of the first products that looked at implementing the new line length. That said, when Stride was launched internally as ',
        },
        {
          type: 'emoji',
          attrs: {
            shortName: ':banana:',
            id: '1f34c',
            text: '🍌',
          },
        },
        {
          type: 'text',
          text: ' there was a lot of ',
        },
        {
          type: 'text',
          text: 'backlash around the fixed line length',
          marks: [
            {
              type: 'link',
              attrs: {
                href:
                  'https://hello.atlassian.net/wiki/spaces/ADG/pages/195119023/Thoughts+on+line+lengths+in+Banana',
              },
            },
          ],
        },
        {
          type: 'text',
          text: ', and removing that choice from users.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text:
            'When it came time for Confluence to make the line length decision we followed in Stride’s footsteps and set the line length to 8 columns, which on an X-Large grid is roughly equal to 680px. Despite what many may think, the editor in Confluence editor sits right in the middle compared to ',
        },
        {
          type: 'text',
          text: 'our direct competitors',
          marks: [
            {
              type: 'annotation',
              attrs: {
                id: '58e8d793-454c-4232-9b28-c0c62a14dbfd',
                annotationType: 'inlineComment',
              },
            },
          ],
        },
        {
          type: 'text',
          text:
            ' and major writing platforms, like Coda, Quip, Dropbox Paper. ',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text:
            'Looking back, we decided on the current fixed line length for a few reasons:',
        },
      ],
    },
    {
      type: 'layoutSection',
      content: [
        {
          type: 'layoutColumn',
          attrs: {
            width: 33.33,
          },
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Beautiful out of the box',
                  marks: [
                    {
                      type: 'strong',
                    },
                  ],
                },
              ],
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text:
                    'One of the biggest complaints we heard about the legacy editor was how long it took to make pages look good. We made this a principle going into the project, and the reduced and predictable line length was a major help in achieving this goal.',
                },
              ],
            },
          ],
        },
        {
          type: 'layoutColumn',
          attrs: {
            width: 33.33,
          },
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text:
                    'Easier reading experience, for both makers and consumers',
                  marks: [
                    {
                      type: 'strong',
                    },
                  ],
                },
              ],
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text:
                    'The #1 reason for fixed width is the benefit it brings to consuming content. ',
                },
                {
                  type: 'text',
                  text: 'Only 20% of Confluence users create content',
                  marks: [
                    {
                      type: 'annotation',
                      attrs: {
                        id: '92cacf42-7cfa-4c2f-a271-d9e45fca2cd5',
                        annotationType: 'inlineComment',
                      },
                    },
                    {
                      type: 'annotation',
                      attrs: {
                        id: 'e63f754c-d8b3-4617-b29a-0f76a35f8ea5',
                        annotationType: 'inlineComment',
                      },
                    },
                  ],
                },
                {
                  type: 'text',
                  text:
                    ', which leaves the other 80% just reading. We decided to optimise for the general reading experience.',
                },
              ],
            },
          ],
        },
        {
          type: 'layoutColumn',
          attrs: {
            width: 33.33,
          },
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Consistency across pages',
                  marks: [
                    {
                      type: 'strong',
                    },
                  ],
                },
              ],
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text:
                    'Introducing a fixed line length allows pages to be a lot more consistent.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text:
            'As is true for any product team, we need to ensure that we are constantly re-evaluating past decisions and rationale based on data points we collect over time. As we’ve rolled out the new editor and started to learn more about how people are using it, we’ve heard a LOT of ongoing feedback related to our fixed width decision. That being the case, we believe we need to take another look at our fixed width decision to reassess if it still makes sense, and if not, what we should do moving forward.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [],
    },
    {
      type: 'rule',
    },
    {
      type: 'paragraph',
      content: [],
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Approaching this problem',
          marks: [
            {
              type: 'strong',
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text:
            'To answer such a controversial topic, we needed to do a lot more exploratory research to understand the possible root cause of the problems. Learning from past experience, we combined different approaches to get as many insights as possible. Here’s how we tackled it:',
        },
      ],
    },
    {
      type: 'layoutSection',
      content: [
        {
          type: 'layoutColumn',
          attrs: {
            width: 50,
          },
          content: [
            {
              type: 'mediaSingle',
              attrs: {
                layout: 'center',
              },
              content: [
                {
                  type: 'media',
                  attrs: {
                    id: '4c3c8237-c931-4ad6-bda0-4176ac8485ef',
                    type: 'file',
                    collection: 'contentId-409682584',
                    width: 688,
                    height: 592,
                  },
                },
              ],
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'A) Customer interviews',
                  marks: [
                    {
                      type: 'strong',
                    },
                  ],
                },
              ],
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text:
                    'We first did an exploratory research with a mix of existing Confluence users and evaluators. We picked a balance of industry like software, project management, marketing, education, and startup background so we can get a lay of the land. What we learnt:',
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
                          text:
                            'Different types of pages that our users create and why they structured it that way.',
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
                          text:
                            'How each role has to create different complexity of pages depending on the situation.',
                          marks: [
                            {
                              type: 'annotation',
                              attrs: {
                                id: '3771b186-68f5-43b9-b8ad-db3bd879c064',
                                annotationType: 'inlineComment',
                              },
                            },
                          ],
                        },
                        {
                          type: 'text',
                          text: ' ',
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
                          text:
                            'Not all documents are created for the same purpose. ',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Read more about these interviews',
                  marks: [
                    {
                      type: 'link',
                      attrs: {
                        href:
                          'https://product-fabric.atlassian.net/wiki/spaces/E/pages/865962251/Customer+interview+Understanding+Editor+Confluence',
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'See CSAT feedback relating to fixed width',
                  marks: [
                    {
                      type: 'link',
                      attrs: {
                        href:
                          'https://redash.data.internal.atlassian.com/queries/51130#95360',
                      },
                    },
                  ],
                },
                {
                  type: 'text',
                  text: ' ',
                },
              ],
            },
          ],
        },
        {
          type: 'layoutColumn',
          attrs: {
            width: 50,
          },
          content: [
            {
              type: 'mediaSingle',
              attrs: {
                layout: 'center',
              },
              content: [
                {
                  type: 'media',
                  attrs: {
                    id: '897c1cdd-17e4-494b-bf53-947c9ced2b62',
                    type: 'file',
                    collection: 'contentId-409682584',
                    width: 688,
                    height: 592,
                  },
                },
              ],
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'B) Internal staff interviews',
                  marks: [
                    {
                      type: 'strong',
                    },
                  ],
                },
              ],
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text:
                    'We also made sure that we talked to internal staff who have had problems with using the editor. It’s been really helpful to understand the underlying problem and usage pattern. Additionally we also did a problem stack rank exercise as a way to improve the quality of our experience. What we learnt:',
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
                          text:
                            'There is a need for more flexibility in controlling the amount of information density',
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
                          text:
                            'Centered blog post has been working really well. ',
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
                          text:
                            'Tables are not optimised for handling large sets of data. ',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Get a summary of the insights',
                  marks: [
                    {
                      type: 'link',
                      attrs: {
                        href:
                          'https://product-fabric.atlassian.net/wiki/spaces/E/pages/881134575/Editor+health+check+-+March+2019+Part+1',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [],
    },
    {
      type: 'paragraph',
      content: [],
    },
  ],
};
