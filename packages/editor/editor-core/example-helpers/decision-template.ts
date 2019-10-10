export const exampleDoc = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'panel',
      attrs: {
        panelType: 'info',
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text:
                'Add your comments directly to the page. Include links to any relevant research, data, or feedback.',
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'placeholder',
          attrs: {
            text:
              'Summarize this decision in the table below. Type /date to quickly add the due date and @mention the driver, approver, contributors, and informed to keep everyone on the same page.',
          },
        },
        {
          type: 'text',
          text: '  ',
        },
      ],
    },
    {
      type: 'bodiedExtension',
      attrs: {
        extensionType: 'com.atlassian.confluence.macro.core',
        extensionKey: 'details',
        parameters: {
          macroParams: {
            label: {
              value: '',
            },
          },
          macroMetadata: {
            macroId: {
              value: '131d1c58-9a29-42f6-bbb0-dbd0e96022fc',
            },
            schemaVersion: {
              value: '1',
            },
            title: 'Page Properties',
          },
        },
        text: ' | label',
        layout: 'default',
      },
      content: [
        {
          type: 'table',
          attrs: {
            isNumberColumnEnabled: false,
            layout: 'default',
          },
          content: [
            {
              type: 'tableRow',
              content: [
                {
                  type: 'tableHeader',
                  attrs: {
                    colwidth: [139],
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Status',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'tableCell',
                  attrs: {
                    colwidth: [507],
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'status',
                          attrs: {
                            text: 'Not started',
                            color: 'neutral',
                            localId: '007b7c00-c03d-4f1e-8b4a-3108f23bdbe2',
                            style: 'bold',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableRow',
              content: [
                {
                  type: 'tableHeader',
                  attrs: {
                    colwidth: [139],
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Impact',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'tableCell',
                  attrs: {
                    colwidth: [507],
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'status',
                          attrs: {
                            text: 'HIGH',
                            color: 'red',
                            localId: 'd9e9a5d6-42d8-483c-83d3-d4429ad41c8f',
                            style: 'bold',
                          },
                        },
                        {
                          type: 'text',
                          text: ' / ',
                        },
                        {
                          type: 'status',
                          attrs: {
                            text: 'MEDIUM',
                            color: 'yellow',
                            localId: '1f5a13bc-2a4a-4985-8285-56860a77d632',
                            style: 'bold',
                          },
                        },
                        {
                          type: 'text',
                          text: ' / ',
                        },
                        {
                          type: 'status',
                          attrs: {
                            text: 'LOW',
                            color: 'green',
                            localId: 'ac4628d7-053d-47f8-a0f7-8d39f91ff3b6',
                            style: 'bold',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableRow',
              content: [
                {
                  type: 'tableHeader',
                  attrs: {
                    colwidth: [139],
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Driver',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'tableCell',
                  attrs: {
                    colwidth: [507],
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'mention',
                          attrs: {
                            id: '5a73b1732d61371e861f3130',
                            text: '@Alexander Hixon',
                            accessLevel: '',
                          },
                        },
                        {
                          type: 'text',
                          text: ' ',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableRow',
              content: [
                {
                  type: 'tableHeader',
                  attrs: {
                    colwidth: [139],
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Approver',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'tableCell',
                  attrs: {
                    colwidth: [507],
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableRow',
              content: [
                {
                  type: 'tableHeader',
                  attrs: {
                    colwidth: [139],
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Contributors',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'tableCell',
                  attrs: {
                    colwidth: [507],
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'placeholder',
                          attrs: {
                            text: 'Add stakeholders',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableRow',
              content: [
                {
                  type: 'tableHeader',
                  attrs: {
                    colwidth: [139],
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Informed',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'tableCell',
                  attrs: {
                    colwidth: [507],
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableRow',
              content: [
                {
                  type: 'tableHeader',
                  attrs: {
                    colwidth: [139],
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Due date',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'tableCell',
                  attrs: {
                    colwidth: [507],
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'placeholder',
                          attrs: {
                            text: 'When does this decision need to be made by?',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableRow',
              content: [
                {
                  type: 'tableHeader',
                  attrs: {
                    colwidth: [139],
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'Outcome',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'tableCell',
                  attrs: {
                    colwidth: [507],
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'placeholder',
                          attrs: {
                            text: 'What did you decide?',
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
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Background',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'placeholder',
          attrs: {
            text:
              'Provide context on the decision the team needs to make. Include links to relevant research, pages, and related decisions, as well as information on constraints or challenges that may impact the outcome.',
          },
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Relevant data',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'placeholder',
          attrs: {
            text:
              'Add any data or feedback the team should consider when making this decision',
          },
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Options considered',
        },
      ],
    },
    {
      type: 'table',
      attrs: {
        isNumberColumnEnabled: false,
        layout: 'default',
      },
      content: [
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableHeader',
              attrs: {
                colwidth: [298],
              },
              content: [
                {
                  type: 'paragraph',
                  content: [],
                },
              ],
            },
            {
              type: 'tableHeader',
              attrs: {
                colwidth: [188],
              },
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Option 1:',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableHeader',
              attrs: {
                colwidth: [194],
              },
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Option 2:',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableHeader',
              attrs: {
                colwidth: [298],
              },
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Description',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {
                colwidth: [188],
              },
              content: [
                {
                  type: 'paragraph',
                  content: [],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {
                colwidth: [194],
              },
              content: [
                {
                  type: 'paragraph',
                  content: [],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableHeader',
              attrs: {
                colwidth: [298],
              },
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Pros and cons',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {
                colwidth: [188],
              },
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'emoji',
                      attrs: {
                        shortName: ':plus:',
                        id: 'atlassian-plus',
                        text: ':plus:',
                      },
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'emoji',
                      attrs: {
                        shortName: ':minus:',
                        id: 'atlassian-minus',
                        text: ':minus:',
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {
                colwidth: [194],
              },
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'emoji',
                      attrs: {
                        shortName: ':plus:',
                        id: 'atlassian-plus',
                        text: ':plus:',
                      },
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'emoji',
                      attrs: {
                        shortName: ':minus:',
                        id: 'atlassian-minus',
                        text: ':minus:',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableHeader',
              attrs: {
                colwidth: [298],
              },
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Estimated cost',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {
                colwidth: [188],
              },
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'status',
                      attrs: {
                        text: 'LARGE',
                        color: 'red',
                        localId: '0bb4e3cc-5ca0-40be-948a-ae04865fe1df',
                        style: 'bold',
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {
                colwidth: [194],
              },
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'status',
                      attrs: {
                        text: 'MEDIUM',
                        color: 'yellow',
                        localId: '35135280-209f-4d80-bdc4-8814c6c4e4c1',
                        style: 'bold',
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
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Action items',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'placeholder',
          attrs: {
            text:
              'Add action items to close the loop on open questions or concerns',
          },
        },
      ],
    },
    {
      type: 'taskList',
      attrs: {
        localId: '1eb1ab5f-d809-48bc-b387-1bf5bf9c8aac',
      },
      content: [
        {
          type: 'taskItem',
          attrs: {
            localId: '2cf8bf6e-e5a4-400a-91b4-2094c5211bad',
            state: 'TODO',
          },
          content: [
            {
              type: 'placeholder',
              attrs: {
                text:
                  'Type your task here. Use "@" to assign a user and "//" to select a due date.',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Outcome',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'placeholder',
          attrs: {
            text: 'Summarize the outcome below',
          },
        },
      ],
    },
  ],
};
