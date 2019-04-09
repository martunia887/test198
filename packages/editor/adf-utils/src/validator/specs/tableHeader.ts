export default {
  props: {
    type: { type: 'enum', values: ['tableHeader'] },
    attrs: {
      props: {
        id: { type: 'string', optional: true },
        reference: { type: 'string', optional: true },
        formatting: {
          props: {
            rules: {
              type: 'array',
              items: [
                {
                  props: {
                    condition: {
                      type: 'enum',
                      values: [
                        'is',
                        'is_not',
                        'contains',
                        'does_not_contain',
                        'is_empty',
                        'is_not_empty',
                      ],
                    },
                    value: { type: 'string' },
                  },
                },
              ],
            },
            marks: {
              type: 'array',
              items: [
                {
                  type: 'enum',
                  values: ['em', 'strike', 'strong', 'underline'],
                },
              ],
            },
          },
          optional: true,
        },
        filter: {
          props: {
            rules: {
              type: 'array',
              items: [
                {
                  props: {
                    condition: {
                      type: 'enum',
                      values: [
                        'is',
                        'is_not',
                        'contains',
                        'does_not_contain',
                        'is_empty',
                        'is_not_empty',
                      ],
                    },
                    value: { type: 'string' },
                    reference: { type: 'string', optional: true },
                  },
                },
              ],
            },
          },
          optional: true,
        },
        colspan: { type: 'number', optional: true },
        rowspan: { type: 'number', optional: true },
        colwidth: {
          type: 'array',
          items: [{ type: 'number' }],
          optional: true,
        },
        background: { type: 'string', optional: true },
        defaultMarks: {
          type: 'array',
          items: [
            [
              'em',
              'code',
              'strike',
              'strong',
              'underline',
              'subsup',
              'textColor',
            ],
          ],
          forceContentValidation: true,
          optional: true,
        },
        isFormatted: { type: 'boolean', optional: true },
      },
      optional: true,
    },
    content: 'tableCell_content',
  },
  required: ['content'],
};
