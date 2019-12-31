// @flow
const globalImportMatch = /import\s+([\w${},\s*]+)\s*from\s*['"`]([^'"`]+)['"`]\s*/gm;
const nonGlobalImportMatch = /import\s+([\w${},\s*]+)\s*from\s*['"`]([^'"`]+)['"`]\s*/;

const processImportValues = importValuesString =>
  importValuesString.split(',').map(s =>
    s
      .replace('{', '')
      .replace('}', '')
      .trim(),
  );

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
  //   return imports;
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
        newImportNames.push([{ importName, rawImportName }]),
      );

    return {
      type: 'import',
      value: `import ${rawImportName} from "!!raw-loader!${importLocation}"`,
    };
  });

  return { newNodes, newImportNames };
};

const stringish = `import a from './b';
import { b } from '../c';
import { c, deeeee } from '../../../e'
import what, { the, heck } from '.e'
import efffffffthis from "somewhere";import NopeNopeNope from "somewhereElse"`;

const a = getImportInfo(stringish);

console.log(a);
