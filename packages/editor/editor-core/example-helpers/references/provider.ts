const tables = [
  {
    id: '11230123097394768134',
    title: 'T-shirts',
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

  getReferencedColumn: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  },
};

export default referenceProvider;
