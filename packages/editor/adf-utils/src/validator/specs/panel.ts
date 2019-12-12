export default {
  props: {
    type: { type: 'enum', values: ['panel'] },
    attrs: {
      props: {
        panelType: {
          type: 'enum',
          values: [
            'emoji',
            'info',
            'note',
            'tip',
            'warning',
            'error',
            'success',
          ],
        },
        panelIcon: { type: 'string' },
        panelColor: { type: 'string' },
      },
    },
    content: {
      type: 'array',
      items: [
        [
          'paragraph_with_no_marks',
          'bulletList',
          'orderedList',
          'heading_with_no_marks',
        ],
      ],
      minItems: 1,
    },
  },
};
