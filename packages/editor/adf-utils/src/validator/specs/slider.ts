export default {
  props: {
    type: { type: 'enum', values: ['slider'] },
    attrs: {
      props: {
        id: { type: 'string', optional: true },
        title: { type: 'string', optional: true },
        value: { type: 'number', optional: true },
        min: { type: 'number', optional: true },
        max: { type: 'number', optional: true },
        step: { type: 'number', optional: true },
      },
    },
  },
};
