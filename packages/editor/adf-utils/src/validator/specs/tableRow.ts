export default {
  props: {
    type: { type: 'enum', values: ['tableRow'] },
    attrs: {
      props: { isFiltered: { type: 'boolean', optional: true } },
      optional: true,
    },
    content: { type: 'array', items: [['tableCell', 'tableHeader']] },
  },
};
