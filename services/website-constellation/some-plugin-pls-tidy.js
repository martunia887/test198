// @flow
const visit = require('unist-util-visit');

const globalImportMatch = /import\s+([\w${},\s*]+)\s*from\s*['"`]([^'"`]+)['"`]\s*/gm;
const nonGlobalImportMatch = /import\s+([\w${},\s*]+)\s*from\s*['"`]([^'"`]+)['"`]\s*/;

const filePathToVarName = filePath => {
  return `RAW_UNSAFE${filePath
    .split('/')
    .map(a => {
      if (a === '..') {
        return 'UPUP';
      }
      if (a === '.') {
        return 'UP';
      }
      return a;
    })
    .join('SLASH')
    .replace(/[^a-zA-Z0-9]/i, '_')}`;
};

const getImportInfo = importValueString => {
  const newImportNames = [];

  const imports = importValueString.match(globalImportMatch);
  const newNodes = imports.map(a => {
    const b = nonGlobalImportMatch.exec(a);
    const [_, importValues, importLocation] = b;

    const rawImportName = filePathToVarName(importLocation);

    importValues
      .split(',')
      .map(s =>
        s
          .replace('{', '')
          .replace('}', '')
          .trim(),
      )
      .forEach(importName =>
        newImportNames.push({ importName, rawImportName }),
      );

    return {
      type: 'import',
      value: `import ${rawImportName} from "!!raw-loader!${importLocation}"`,
    };
  });

  return { newNodes, newImportNames };
};

module.exports = () => tree =>
  // BC: I attempted to do a visitor on 'import', however this created an infinite loop of modifying the parent
  // and then the visitors being rerun - by modifying the root node directly, this avoids this loop but
  // is less elegant
  visit(tree, 'root', node => {
    let lastIndex;

    const imports = node.children.filter((n, i) => {
      if (n.type === 'import') {
        lastIndex = i;
        return true;
      }
      return false;
    });

    if (imports.length) {
      const allNewNodes = [];
      const allImportNames = [];

      imports.forEach(({ value }) => {
        const { newNodes, newImportNames } = getImportInfo(value);

        allNewNodes.push(...newNodes);
        allImportNames.push(...newImportNames);
      });

      const newJSXNode = {
        type: 'jsx',
        value: `<div hidden>${allImportNames
          .map(
            ({ importName, rawImportName }) =>
              `{${importName}.__raw = ${rawImportName}}`,
          )
          .join('\n')}</div>`,
      };

      allNewNodes.push(newJSXNode);

      node.children.splice(lastIndex + 1, 0, ...allNewNodes);
    }
  });
