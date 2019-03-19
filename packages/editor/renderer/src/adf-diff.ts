import differ, { DiffArray, diff } from 'deep-diff';

const diffDocs = (oldDoc: { content: object }, newDoc: { content: object }) => {
  // TODO faster clone
  const content = JSON.parse(JSON.stringify(newDoc.content));
  const differences = differ.diff(oldDoc.content, newDoc.content);

  if (!differences) return content;
  console.log(differences);
  differences.forEach(change => {
    switch (change.kind) {
      case 'A': // Array modification
        applyArrayModification(content, change);
        break;
      case 'E': // Property modification
        if (!change.path) break;
        const changedAttr = change.path.pop();
        const parent = getParentReference(content, change.path);
        parent[changedAttr] = change.rhs;
        break;
      case 'D': // Property deletion
        break;
      case 'N': // Property addition
        break;
    }
  });

  return {
    type: 'doc',
    version: 1,
    content,
  };
};

const createDiffNode = (node: any, diffType: string) => {
  return {
    type: !!node.content ? 'blockDiff' : 'inlineDiff',
    attrs: {
      diffType,
    },
    content: [node],
  };
};

const getParentReference = (content: any, path: any[]) => {
  let arrayReference: any = content;
  path.forEach(path => {
    arrayReference = arrayReference[path];
  });
  return arrayReference;
};

// !!! object modifying functions !!!

const applyArrayModification = (content: any, change: DiffArray<any, any>) => {
  // guard
  if (!change.path || change.path.length) return content;

  const parent = getParentReference(content, change.path);

  switch (change.item.kind) {
    case 'D':
      parent.splice(change.index, 0, createDiffNode(change.item.lhs, 'delete'));
      break;
    case 'N':
    case 'E':
      parent[change.index] = createDiffNode(change.item.rhs, 'insert');
      break;
    case 'A':
      parent[change.index] = createDiffNode(change.item, 'insert');
      break;
  }
};

export default diffDocs;
