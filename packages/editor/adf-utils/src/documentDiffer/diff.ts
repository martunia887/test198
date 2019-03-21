/**
 * TODO:
 *   1. Deleted/inserted tableRows:
 *     Map content to inserted/deleted diff
 *   2. Deleted/inserted listItems:
 *    Map content
 *   3. Changed text formatting
 *    Map content
 *
 */

import { SequenceMatcher } from 'difflib';
import * as hash from 'object-hash';

export interface DiffOptions {
  diffOnly?: boolean;
}

enum DiffType {
  insert = 'insert',
  delete = 'delete',
}

const scalarizeNode = (node: any, scalarizeContent = false) => {
  return hash({
    ...node,
    content:
      scalarizeContent && node.content
        ? scalarize(node.content, scalarizeContent)
        : [],
  });
};

const scalarize = (arr: any, scalarizeContent = false) => {
  return arr.map((node: any) => scalarizeNode(node, scalarizeContent));
};

const isDiff = (n: any) =>
  n.type === 'blockDiff' ||
  n.type === 'inlineDiff' ||
  (n.content && n.content.some(isDiff));

const diffReducer = (acc: any, current: any) => {
  const { type, content } = current;

  if (isDiff(current)) {
    switch (type) {
      case 'table':
        acc.push({
          ...current,
          content: [
            ...content.filter(
              (n: any) =>
                n.type === 'tableRow' &&
                n.content.some((c: any) => c.type === 'tableHeader'),
            ),
            ...content.filter(isDiff),
          ],
        });

        break;

      default:
        acc.push(current);
        break;
    }
  }

  return acc;
};

const mapNode = (n: any, diffType: DiffType) => {
  const { type, content } = n;
  switch (type) {
    case 'tableRow':
    case 'tableCell':
    case 'tableHeader':
      return {
        ...n,
        content: content.map((c: any) => mapNode(c, diffType)),
      };
  }

  return {
    type: !!content ? 'blockDiff' : 'inlineDiff',
    attrs: {
      diffType,
    },
    content: [n],
  };
};

const getTextValue = (n: any) => {
  return (n.text || n.attrs.text || n.attrs.shortName).split('');
  // return n.text || n.attrs.text || n.attrs.shortName;
};

const getTextValue2 = (acc: any, n: any, index: number) => {
  // acc = [
  //   ...acc,
  //   ...(n.text || n.attrs.text || n.attrs.shortName).split('')
  // ];

  (n.text || n.attrs.text || n.attrs.shortName)
    .split('')
    .forEach((text: string) => {
      acc.push({
        text,
        index,
      });
    });

  return acc;
};

const inlineReducer = (nodes: any, node: any) => {
  const lastNode = nodes[nodes.length - 1];

  if (!lastNode) {
    nodes.push(node);
    return nodes;
  }

  const newMarks = scalarize(node.marks || [], true);
  const oldMarks = scalarize(lastNode.marks || [], true);

  if (
    node.type === 'text' &&
    (!newMarks.some((mark: any) => oldMarks.indexOf(mark) === -1) &&
      !oldMarks.some((mark: any) => newMarks.indexOf(mark) === -1))
  ) {
    lastNode.text = `${lastNode.text}${node.text}`;
  } else {
    nodes.push(node);
  }

  return nodes;
};

const diffInlineContent = (
  content1: any,
  content2: any,
  // options: DiffOptions = {},
  scalarizeContent = false,
) => {
  const node1: any[] = [];
  const node2: any[] = [];

  content1.forEach((n: any) => {
    if (n.type === 'text') {
      const { marks } = n;
      n.text.split(/\b/g).forEach((text: any) => {
        node1.push({
          type: 'text',
          text,
          marks,
        });
      });
    } else {
      node1.push(n);
    }
  });

  content2.forEach((n: any) => {
    if (n.type === 'text') {
      const { marks } = n;
      n.text.split(/\b/g).forEach((text: any) => {
        node2.push({
          type: 'text',
          text,
          marks,
        });
      });
    } else {
      node2.push(n);
    }
  });

  const a = node1.reduce(getTextValue2, []);
  const b = node2.reduce(getTextValue2, []);

  const one = scalarize(a.map(getTextValue), scalarizeContent);
  const two = scalarize(b.map(getTextValue), scalarizeContent);

  let result: any[] = [];
  const seq = new SequenceMatcher(null, one, two);
  const opcodes = seq.getOpcodes();

  opcodes.forEach((code: any) => {
    const [op, i1, i2, j1, j2] = code;

    const oldNodes = a.slice(i1, i2);
    const newNodes = b.slice(j1, j2);

    const oldContent: any = {};
    oldNodes.forEach(({ text, index }: { text: string; index: number }) => {
      if (oldContent[index]) {
        oldContent[index].text += text;
      } else {
        oldContent[index] = {
          ...node1[index],
          text,
        };
      }
    });

    const newContent: any = {};
    newNodes.forEach(({ text, index }: { text: string; index: number }) => {
      if (newContent[index]) {
        newContent[index].text += text;
      } else {
        newContent[index] = {
          ...node2[index],
          text,
        };
      }
    });

    const fixedOld = (Object as any).values(oldContent);
    const fixedNew = (Object as any).values(newContent);

    switch (op) {
      case 'replace': {
        const resultBefore = result.splice(0, i1 + 1);
        const resultAfter = result.splice(fixedNew.length);

        result = [
          ...resultBefore,
          ...fixedOld
            .reduce(inlineReducer, [])
            .map((n: any) => mapNode(n, DiffType.delete)),
          ...fixedNew
            .reduce(inlineReducer, [])
            .map((n: any) => mapNode(n, DiffType.insert)),
          ...resultAfter,
        ];

        break;
      }

      case DiffType.insert: {
        const resultBefore = result.splice(0, j1 + 1);
        const resultAfter = result.splice(fixedNew.length);

        result = [
          ...resultBefore,
          ...fixedNew
            .reduce(inlineReducer, [])
            .map((n: any) => mapNode(n, DiffType.insert)),
          ...resultAfter,
        ];
        break;
      }

      case DiffType.delete: {
        const resultBefore = result.splice(0, i1 + 1);
        const resultAfter = result.splice(i1);

        result = [
          ...resultBefore,
          ...fixedOld
            .reduce(inlineReducer, [])
            .map((n: any) => mapNode(n, DiffType.delete)),
          ...resultAfter,
        ];

        break;
      }

      case 'equal': {
        const resultBefore = result.splice(0, j1 + 1);
        const resultAfter = result.splice(fixedNew.length);

        const mapped = fixedNew.map((node: any, i: number) => {
          const lastNode = fixedOld[i];

          if (!lastNode) {
            return node;
          }

          const newMarks = scalarize(node.marks || [], true);
          const oldMarks = scalarize(lastNode.marks || [], true);

          if (
            node.type === 'text' &&
            (newMarks.some((mark: any) => oldMarks.indexOf(mark) === -1) ||
              oldMarks.some((mark: any) => newMarks.indexOf(mark) === -1))
          ) {
            return {
              type: 'inlineDiff',
              attrs: {
                diffType: 'change',
              },
              content: [node],
            };
          }

          return node;
        });

        result = [
          ...resultBefore,
          ...mapped.reduce(inlineReducer, []),
          ...resultAfter,
        ];
      }
    }
  });

  return result;
};

const diffContent = (
  node1: any,
  node2: any,
  options: DiffOptions = {},
  scalarizeContent = false,
) => {
  const one = scalarize(node1, scalarizeContent);
  const two = scalarize(node2, scalarizeContent);

  let result: any[] = [];

  const seq = new SequenceMatcher(null, one, two);
  const opcodes = seq.getOpcodes();

  const processed: any[] = [];

  opcodes.forEach((code: any) => {
    const [op, i1, i2, j1, j2] = code;

    switch (op) {
      case 'replace': {
        const nodesToDelete = node1.slice(i1, i2);
        const nodesToInsert = node2.slice(j1, j2);
        const resultBefore = result.splice(0, i1 + 1);
        const resultAfter = result.splice(j2);

        result = [
          ...resultBefore,
          ...nodesToDelete.map((n: any) => mapNode(n, DiffType.delete)),
          ...nodesToInsert.map((n: any) => mapNode(n, DiffType.insert)),
          ...resultAfter,
        ];

        break;
      }

      case 'equal': {
        const firstNodes = node1.slice(i1, i2);
        const secondNodes = node2.slice(j1, j2);

        let mapped = firstNodes.reduce((map: any, n: any, index: number) => {
          const { type, content } = n;

          if (content) {
            const secondContent = secondNodes[index].content;
            const contentDiff = diffContent(
              content,
              secondContent,
              options,
              false,
            );
            const contentHasDiff = contentDiff.some(
              t => t.type === 'inlineDiff' || t.type === 'blockDiff',
            );

            if (contentHasDiff) {
              const a = scalarizeNode(n, true);
              const b = scalarize(node2, true);

              // This was actually an insert!
              if (b.indexOf(a) !== -1) {
                processed.push(a);

                map.push({
                  type: 'blockDiff',
                  attrs: {
                    diffType: DiffType.insert,
                  },
                  content: secondContent,
                });

                return map;
              }
            }

            switch (type) {
              case 'table': {
                // const secondNode = secondNodes[index];
                // const asdf = scalarize(node1, true);

                // console.log(asdf);

                // const content = secondNode.content.map(row => {
                //   if (asdf.indexOf(scalarizeNode(row, true) !== -1)) {
                //     console.log({row});
                //     return row;
                //   } else {
                //     return mapNode(row, DiffType.insert);
                //   }

                //   return row;
                // });
                // // const a = scalarizeNode(n, true);
                // // const b = scalarize(node2, true);

                // // map.push({
                // //   ...n,
                // //   content,
                // // });

                map.push({
                  ...n,
                  content: diffContent(content, secondContent, options, true),
                });

                return map;
              }

              case 'paragraph':
                map.push({
                  ...n,
                  content: diffInlineContent(
                    content,
                    secondContent,
                    // options,
                    false,
                  ),
                });

                return map;
            }

            if (contentHasDiff) {
              switch (type) {
                // TODO: Check if this still works properly with scalarizeContent
                case 'codeBlock':
                  const [del, insert] = contentDiff;
                  map.push({
                    type: 'blockDiff',
                    attrs: {
                      diffType: DiffType.delete,
                    },
                    content: [
                      {
                        ...n,
                        content: del.content,
                      },
                    ],
                  });

                  map.push({
                    type: 'blockDiff',
                    attrs: {
                      diffType: DiffType.insert,
                    },
                    content: [
                      {
                        ...n,
                        content: insert.content,
                      },
                    ],
                  });

                  return map;
              }
            }

            map.push({
              ...n,
              content: contentDiff,
            });

            return map;
          }

          map.push(n);

          return map;
        }, []);

        const resultBefore = result.splice(0, j1 + 1);
        const resultAfter = result.splice(j2);

        result = [...resultBefore, ...mapped, ...resultAfter];

        break;
      }

      case DiffType.insert: {
        const nodesToInsert = node2.slice(j1, j2);
        const resultBefore = result.splice(0, j1 + 1);
        const resultAfter = result.splice(j2);

        result = [
          ...resultBefore,
          ...nodesToInsert.map((n: any) => {
            if (processed.indexOf(scalarizeNode(n, true)) !== -1) {
              return n;
            }

            return mapNode(n, DiffType.insert);
          }),
          ...resultAfter,
        ];

        break;
      }

      case DiffType.delete: {
        const nodesToDelete = node1.slice(i1, i2);
        const resultBefore = result.splice(0, i1 + 1);
        const resultAfter = result.splice(i1);

        result = [
          ...resultBefore,
          ...nodesToDelete.map((n: any) => mapNode(n, DiffType.delete)),
          ...resultAfter,
        ];
      }
    }
  });

  // if (options.diffOnly) {
  //   return result.filter(isDiff);
  // }

  return result;
};

export const diffDocs = (
  oldDoc: any,
  newDoc: any,
  options: DiffOptions = {},
) => {
  if (oldDoc.type !== 'doc' || newDoc.type !== 'doc') {
    // TODO: Throw error?
    return;
  }

  const { content: oldContent } = oldDoc;
  const { content: newContent } = newDoc;

  let content = diffContent(oldContent, newContent, options);

  if (options.diffOnly) {
    // content = content.filter(isDiff);
    content = content.reduce(diffReducer, []);
  }

  return {
    type: 'doc',
    version: 1,
    content,
  };
};
