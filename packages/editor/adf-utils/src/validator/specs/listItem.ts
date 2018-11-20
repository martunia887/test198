export default {
  props: {
    type: { type: 'enum', values: ['listItem'] },
    content: {
      type: 'array',
      items: [
        ['paragraph_no_marks', 'mediaSingle'],
        ['paragraph_no_marks', 'bulletList', 'mediaSingle', 'orderedList'],
      ],
      minItems: 1,
    },
  },
};
