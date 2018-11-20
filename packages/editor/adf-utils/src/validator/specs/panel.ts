export default {
  props: {
    type: { type: 'enum', values: ['panel'] },
    attrs: {
      props: {
        panelType: {
          type: 'enum',
          values: ['info', 'note', 'tip', 'warning', 'error', 'success'],
        },
      },
    },
    content: {
      type: 'array',
      items: [
        ['paragraph_no_marks', 'bulletList', 'orderedList', 'heading_no_marks'],
      ],
      minItems: 1,
    },
  },
};
