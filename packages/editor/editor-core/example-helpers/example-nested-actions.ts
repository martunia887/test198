export const exampleDocument = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: {
        level: 1,
      },
      content: [
        {
          type: 'text',
          text: 'Actions nesting',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text:
            'Actions are a key part of the collaboration elements. They help progress teamwork forward by helping teams capture important bits of work in the context they’re currently in.',
        },
      ],
    },
    {
      type: 'taskList',
      attrs: {
        localId: 'a07086f8-715e-4722-8c36-f28c7a689e0d',
      },
      content: [
        {
          type: 'taskItem',
          attrs: {
            localId: 'e44b914a-9963-4c39-be89-83f648f40c02',
            state: 'TODO',
          },
          content: [
            {
              type: 'text',
              text: 'Release instructions',
            },
          ],
        },
        {
          type: 'taskList',
          attrs: {
            localId: 'b07086f8-715e-4722-8c36-f28c7a689e0d',
          },
          content: [
            {
              type: 'taskItem',
              attrs: {
                localId: 'c44b914a-9963-4c39-be89-83f648f40c02',
                state: 'TODO',
              },
              content: [
                {
                  type: 'text',
                  text: 'Main preparation',
                },
              ],
            },
            {
              type: 'taskList',
              attrs: {
                localId: '707086f8-715e-4722-8c36-f28c7a689e0d',
              },
              content: [
                {
                  type: 'taskItem',
                  attrs: {
                    localId: '844b914a-9963-4c39-be89-83f648f40c02',
                    state: 'TODO',
                  },
                  content: [
                    {
                      type: 'text',
                      text: 'Announce internally with keynote presentations',
                    },
                  ],
                },
                {
                  type: 'taskItem',
                  attrs: {
                    localId: '8561de11-1e6e-43d8-ab69-ccac3e64e351',
                    state: 'TODO',
                  },
                  content: [
                    {
                      type: 'text',
                      text: 'Add permission function to feature',
                    },
                  ],
                },
              ],
            },
            {
              type: 'taskItem',
              attrs: {
                localId: 'd2cc48c5-ced3-4b2f-a317-9cb22d6adc4c',
                state: 'TODO',
              },
              content: [
                {
                  type: 'text',
                  text: 'Deployment',
                },
              ],
            },
            {
              type: 'taskList',
              attrs: {
                localId: 'e07086f8-715e-4722-8c36-f28c7a689e0d',
              },
              content: [
                {
                  type: 'taskItem',
                  attrs: {
                    localId: 'f44b914a-9963-4c39-be89-83f648f40c02',
                    state: 'TODO',
                  },
                  content: [
                    {
                      type: 'text',
                      text: 'Deploy master to production ',
                    },
                    {
                      type: 'mention',
                      attrs: {
                        id: '4',
                        text: '@sly',
                        accessLevel: '',
                      },
                    },
                    {
                      type: 'text',
                      text: ' ',
                    },
                  ],
                },
                {
                  type: 'taskList',
                  attrs: {
                    localId: '107086f8-715e-4722-8c36-f28c7a689e0d',
                  },
                  content: [
                    {
                      type: 'taskItem',
                      attrs: {
                        localId: '244b914a-9963-4c39-be89-83f648f40c02',
                        state: 'TODO',
                      },
                      content: [
                        {
                          type: 'text',
                          text: 'Deploy new login page',
                        },
                      ],
                    },
                    {
                      type: 'taskList',
                      attrs: {
                        localId: '307086f8-715e-4722-8c36-f28c7a689e0d',
                      },
                      content: [
                        {
                          type: 'taskItem',
                          attrs: {
                            localId: '444b914a-9963-4c39-be89-83f648f40c02',
                            state: 'TODO',
                          },
                          content: [
                            {
                              type: 'text',
                              text: 'Write visual regression test ',
                            },
                            {
                              type: 'mention',
                              attrs: {
                                id: '4',
                                text: '@nflew',
                                accessLevel: '',
                              },
                            },
                            {
                              type: 'text',
                              text: ' ',
                            },
                          ],
                        },
                        {
                          type: 'taskList',
                          attrs: {
                            localId: '507086f8-715e-4722-8c36-f28c7a689e0d',
                          },
                          content: [
                            {
                              type: 'taskItem',
                              attrs: {
                                localId: '644b914a-9963-4c39-be89-83f648f40c02',
                                state: 'TODO',
                              },
                              content: [
                                {
                                  type: 'text',
                                  text:
                                    'Brainstorm visual regression test ideas ',
                                },
                                {
                                  type: 'mention',
                                  attrs: {
                                    id: '4',
                                    text: '@alex',
                                    accessLevel: '',
                                  },
                                },
                                {
                                  type: 'text',
                                  text: ' ',
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
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [],
    },
  ],
};
