export default {
  props: {
    type: { type: 'enum', values: ['expand'] },
    attrs: {
      props: {
        title: { type: 'string', optional: true },
        collapsed: { type: 'boolean', optional: true },
      },
    },
    content: 'extension_content',
  },
  required: ['content'],
};
