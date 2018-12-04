// array of tables available for referencing
const tables = [
  {
    id: 'table-1',
    title: 'T-shirts',
    columns: [
      {
        id: 'column-1',
        title: 'Colour',
      },
      {
        id: 'column-2',
        title: 'Brand',
      },
      {
        id: 'column-3',
        title: 'Size',
      },
    ],
  },
];

// each item is the content of each cell in the selected column in the referenced table
const values = [
  {
    type: 'paragraph',
    content: [
      {
        type: 'text',
        text: 'Brand',
      },
    ],
  },
  {
    type: 'paragraph',
    content: [
      {
        type: 'text',
        text: 'Nike',
      },
    ],
  },
  {
    type: 'paragraph',
    content: [
      {
        type: 'text',
        text: 'Adidas',
      },
    ],
  },
  {
    type: 'paragraph',
    content: [
      {
        type: 'text',
        text: 'Puma',
      },
    ],
  },
];

const referenceProvider = {
  getReferences: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(tables);
      }, 1000);
    });
  },

  getValues: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(values);
      }, 1000);
    });
  },
};

export default referenceProvider;
