import differ, { DiffArray } from 'deep-diff';

enum DiffTypes {
  insert = 'insert',
  delete = 'delete',
}

const diffDocs = (
  oldDoc: { content: object },
  newDoc: { content: object },
  options: any,
) => {
  // TODO faster clone
  const oldContent = JSON.parse(JSON.stringify(oldDoc));
  const newContent = JSON.parse(JSON.stringify(newDoc));
  const content = JSON.parse(JSON.stringify(newDoc));
  const differences = differ.diff(oldContent, newContent);

  if (!differences) return content;

  differences.forEach(change => {
    try {
      switch (change.kind) {
        case 'A': // Array modification
          applyArrayModification(content, change);
          break;
        case 'E': // Property modification
          if (!change.path) break;
          const { parent, node, index } = getNodeAndParent(
            content,
            change.path,
          );
          parent.content[index] = createDiffNode(node, DiffTypes.insert);
          const oldItem = {
            ...node,
            [change.path[change.path.length - 1]]: change.lhs,
          };
          parent.content.splice(
            index,
            0,
            createDiffNode(oldItem, DiffTypes.delete),
          );

          break;
        case 'D': // Property deletion
          break;
        case 'N': // Property addition
          break;
      }
      console.log('Change ', change, ' passed');
    } catch (e) {
      console.log('Change ', change, ' failed with error ', e);
    }
  });

  console.log(JSON.stringify(content, null, 2));
  return content;
};

const createDiffNode = (node: any, diffType: DiffTypes) => {
  return {
    type: !!node.content ? 'blockDiff' : 'inlineDiff',
    attrs: {
      diffType,
    },
    content: [node],
  };
};

const getNodeAndParent = (content: any, path: any[]) => {
  let node: any = null;
  let parent = content;
  let cursor = content;
  let index = 0;
  path.forEach(pathItem => {
    if (cursor[pathItem].content) {
      parent = cursor[pathItem];
    } else if (cursor[pathItem].type) {
      index = pathItem;
      node = cursor[pathItem];
    }
    cursor = cursor[pathItem];
  });
  return { parent, node, index };
};

// !!! object modifying functions !!!

const applyArrayModification = (content: any, change: DiffArray<any, any>) => {
  // guard
  if (!change.path || change.path.length) return content;

  const { parent } = getNodeAndParent(content, change.path);

  switch (change.item.kind) {
    case 'D':
      parent.splice(
        change.index,
        0,
        createDiffNode(change.item.lhs, DiffTypes.delete),
      );
      break;
    case 'N':
      parent[change.index] = createDiffNode(change.item.rhs, DiffTypes.insert);
      break;
    case 'E':
      parent[change.index] = createDiffNode(change.item.rhs, DiffTypes.insert);
      parent.splice(
        change.index,
        0,
        createDiffNode(change.item.lhs, DiffTypes.delete),
      );
      break;
    case 'A':
      parent[change.index] = createDiffNode(change.item, DiffTypes.insert);
      break;
  }
};

export default diffDocs;
