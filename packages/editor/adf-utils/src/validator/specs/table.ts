export default {
  props: {
    type: { type: 'enum', values: ['table'] },
    attrs: {
      props: {
        isNumberColumnEnabled: { type: 'boolean', optional: true },
        layout: {
          type: 'enum',
          values: ['default', 'full-width', 'wide'],
          optional: true,
        },
        id: { type: 'string' },
        reference: { type: 'string' },
      },
      optional: true,
    },
    content: { type: 'array', items: ['tableRow'], minItems: 1 },
  },
};
