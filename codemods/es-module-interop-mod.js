/* eslint-disable flowtype/require-valid-file-annotation */
const importsToFix = [
  'uuid/v4',
  'react-loadable',
  'dataloader',
  'debounce',
  'classnames',
  'xregexp',
  'date-fns/',
  'markdown-it',
  'filesize',
  'dateformat',
  'pubnub',
  'snake-case',
  'ajv',
  'linkify-it',
  'uuid-validate',
  'meow',
  'assert',
  'mkdirp',
  'lorem-ipsum',
  'ora',
  'fetchMock',
  'lodash.debounce',
];

export default function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.ImportDeclaration)

    .filter(path =>
      importsToFix.find(importPath => {
        return (
          path.value.source !== 'react' &&
          path.value.source.value.startsWith(importPath)
        );
      }),
    )
    .filter(
      path => path.value.specifiers[0].type === 'ImportNamespaceSpecifier',
    )
    .forEach(path => {
      j(path).replaceWith(() => {
        const newDec = j.importDeclaration(
          [
            j.importDefaultSpecifier(
              j.identifier(path.value.specifiers[0].local.name),
            ),
          ],
          j.literal(path.value.source.value),
        );

        newDec.comments = path.value.comments;

        return newDec;
      });
    })
    .toSource();
}
