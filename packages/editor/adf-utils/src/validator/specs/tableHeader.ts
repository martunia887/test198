export default {
  props: {
    type: { type: 'enum', values: ['tableHeader'] },
    attrs: {
      props: {
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
          type: 'array',
          items: [
            { props: { label: { type: 'string' }, value: { type: 'string' } } },
          ],
          optional: true,
        },
        sort: { type: 'enum', values: ['a-z', 'z-a'], optional: true },
        colspan: { type: 'number', optional: true },
        rowspan: { type: 'number', optional: true },
        colwidth: {
          type: 'array',
          items: [{ type: 'number' }],
          optional: true,
        },
        background: { type: 'string', optional: true },
        isFormatted: { type: 'boolean', optional: true },
      },
      optional: true,
    },
    content: 'tableCell_content',
  },
  required: ['content'],
};
