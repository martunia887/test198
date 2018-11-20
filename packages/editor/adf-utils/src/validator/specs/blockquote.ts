export default {
  props: {
    type: { type: 'enum', values: ['blockquote'] },
    content: { type: 'array', items: ['paragraph_no_marks'], minItems: 1 },
  },
};
