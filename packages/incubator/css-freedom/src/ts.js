const ts = require('typescript');
const stylis = require('stylis');

const JSX_PRAGMA = 'jsx';
const CSS_PROP = 'css';
const UNCOMPILED_GUARD_NAME = 'IS_CSS_FREEDOM_COMPILED';

class SequentialCharacterGenerator {
  constructor(chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    this._chars = chars;
    this._nextId = [0];
  }

  next() {
    const r = [];
    for (const char of this._nextId) {
      r.unshift(this._chars[char]);
    }
    this._increment();
    return r.join('');
  }

  _increment() {
    for (let i = 0; i < this._nextId.length; i++) {
      const val = ++this._nextId[i];
      if (val >= this._chars.length) {
        this._nextId[i] = 0;
      } else {
        return;
      }
    }
    this._nextId.push(0);
  }

  *[Symbol.iterator]() {
    while (true) {
      yield this.next();
    }
  }
}

const KEBAB_REGEX = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g;
function kebabCase(str) {
  return str.replace(KEBAB_REGEX, match => {
    return `-${match.toLowerCase()}`;
  });
}

const isCssFreedomCompiledNode = node => {
  return (
    ts.isVariableDeclaration(node) && node.name.text === UNCOMPILED_GUARD_NAME
  );
};

const isJsxWithCssProp = node => {
  return (
    ts.isJsxElement(node) &&
    node.openingElement.attributes.properties.find(
      prop => prop.name.escapedText === CSS_PROP,
    )
  );
};

const processCssProperties = (properties, { cssVariableIds }) => {
  let cssVariables = [];

  const css = properties.reduce((acc, prop) => {
    const key = kebabCase(prop.symbol.escapedName);
    let value;

    if (
      ts.isShorthandPropertyAssignment(prop) ||
      ts.isIdentifier(prop.initializer)
    ) {
      // We have a prop assignment using a variable, e.g. "fontSize: props.fontSize"
      // Time to turn it into a css variable.
      const cssVariable = `--${key}-${cssVariableIds.next()}`;
      value = `var(${cssVariable});`;
      cssVariables.push({
        var: cssVariable,
        nodeReference: prop.initializer || prop.name,
      });
    } else if (ts.isObjectLiteralExpression(prop.initializer)) {
      const result = processCssProperties(prop.initializer.properties, {
        cssVariableIds,
      });
      cssVariables = cssVariables.concat(result.cssVariables);

      return `${acc}
      ${key} {
        ${result.css}
      }
      `;
    } else {
      // We have a regular static assignment, e.g. "fontSize: '20px'"
      value = `${prop.initializer.text};`;
    }

    return `${acc}
      ${key}: ${value}`;
  }, '');

  return {
    cssVariables,
    css,
  };
};

// @flow
module.exports = ({ debug } = {}) => {
  const log = msg => debug && console.log(`  @atlaskit/css-freedom ==> ${msg}`);
  const classNameIds = new SequentialCharacterGenerator();
  const cssVariableIds = new SequentialCharacterGenerator();

  debug &&
    console.log(`

@atlaskit/css-freedom typescript transformer has been enabled and has logging turned on.
Have feedback? Post it to http://go/dst-sd
`);

  /**
   * Built primarily using https://ts-ast-viewer.com, typescript typedefs, and google.
   * If you want to touch this 100% recommend using all!
   * @param {*} context
   */
  const transformer = context => {
    return sourceFile => {
      let rootNode = sourceFile;
      let needsCssTransform = false;

      if (
        // Only continue if the jsx pragma is enabled.
        rootNode.localJsxNamespace === JSX_PRAGMA &&
        // Only continue if we've found an import for css-freedom.
        rootNode.statements.find(
          statement =>
            (statement.moduleSpecifier &&
              statement.moduleSpecifier.text === '@atlaskit/css-freedom') ||
            // Hack for local development
            (statement.moduleSpecifier &&
              statement.moduleSpecifier.text === '../src'),
        )
      ) {
        log('file needs to be transformed');

        needsCssTransform = true;
      }

      if (
        needsCssTransform &&
        // Only add React if it's not found.
        !rootNode.statements.find(
          statement =>
            statement.importClause &&
            statement.importClause.name &&
            statement.importClause.name.escapedText === 'React',
        )
      ) {
        // Okay so React doesn't exist anywhere. But the 'react' import could still be around. Let's do another search.
        const reactImportNode = rootNode.statements.find(statement => {
          return (
            statement.moduleSpecifier &&
            statement.moduleSpecifier.text === 'react'
          );
        });

        if (reactImportNode) {
          log('react module found, ensuring it has a default export');

          // Ok it exists, lets ensure it has the default export as "React".
          rootNode = ts.updateSourceFileNode(rootNode, [
            ts.createImportDeclaration(
              /* decorators */ undefined,
              /* modifiers */ undefined,
              ts.createImportClause(
                ts.createIdentifier('React'),
                reactImportNode.namedBindings,
              ),
              ts.createLiteral('react'),
            ),
            ...rootNode.statements,
          ]);
        } else {
          log('react module not found, adding it');

          rootNode = ts.updateSourceFileNode(rootNode, [
            ts.createImportDeclaration(
              /* decorators */ undefined,
              /* modifiers */ undefined,
              ts.createImportClause(ts.createIdentifier('React'), undefined),
              ts.createLiteral('react'),
            ),
            ...rootNode.statements,
          ]);
        }
      }

      const visitor = node => {
        if (!needsCssTransform && isCssFreedomCompiledNode(node)) {
          log(`setting ${UNCOMPILED_GUARD_NAME} variable to true`);

          // Reassign the variable declarations to `true` so it doesn't blow up at runtime.
          const newNode = ts.updateVariableDeclaration(
            node,
            node.name.text,
            ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
            ts.createTrue(),
          );

          return newNode;
        }

        if (needsCssTransform && isJsxWithCssProp(node)) {
          // Grab the css prop node
          const cssPropNode = node.openingElement.attributes.properties.find(
            prop => prop.name.escapedText === CSS_PROP,
          );

          log('processing css');

          // Compile the CSS from the styles object node.
          const className = classNameIds.next();
          let compiledCss;
          let cssVariables = [];

          if (
            ts.isObjectLiteralExpression(cssPropNode.initializer.expression)
          ) {
            const processedCssObject = processCssProperties(
              cssPropNode.initializer.expression.properties,
              { cssVariableIds },
            );
            cssVariables = processedCssObject.cssVariables;
            compiledCss = stylis(`.${className}`, processedCssObject.css);
          } else if (
            ts.isNoSubstitutionTemplateLiteral(
              cssPropNode.initializer.expression,
            )
          ) {
            compiledCss = stylis(
              `.${className}`,
              cssPropNode.initializer.expression.text,
            );
          } else {
            throw new Error('unsupported value in css prop');
          }

          log('removing css prop');

          // Remove css prop from the react element.
          const nodeToTransform = ts.getMutableClone(node);
          nodeToTransform.openingElement.attributes.properties = nodeToTransform.openingElement.attributes.properties.filter(
            prop => prop.name.escapedText !== CSS_PROP,
          );
          nodeToTransform.openingElement.attributes.properties.push(
            ts.createJsxAttribute(
              ts.createIdentifier('className'),
              ts.createStringLiteral(className),
            ),
          );

          if (cssVariables.length) {
            nodeToTransform.openingElement.attributes.properties.push(
              ts.createJsxAttribute(
                ts.createIdentifier('style'),
                ts.createJsxExpression(
                  undefined,
                  ts.createObjectLiteral(
                    cssVariables.map(variable => {
                      return ts.createPropertyAssignment(
                        ts.createStringLiteral(variable.var),
                        variable.nodeReference,
                      );
                    }),
                    false,
                  ),
                ),
              ),
            );
          }

          // Create the style element that will precede the node that had the css prop.
          const styleNode = ts.createJsxElement(
            ts.createJsxOpeningElement(
              ts.createIdentifier('style'),
              [],
              ts.createJsxAttributes([]),
            ),
            [ts.createJsxText(compiledCss)],
            ts.createJsxClosingElement(ts.createIdentifier('style')),
          );

          // Create a new fragment that will wrap both the style and the node we found initially.
          const newFragmentParent = ts.createJsxFragment(
            ts.createJsxOpeningFragment(),
            [
              // important that the style goes before the node
              styleNode,
              nodeToTransform,
            ],
            ts.createJsxJsxClosingFragment(),
          );

          log('returning composed component with fragment');

          return ts.visitEachChild(newFragmentParent, visitor, context);
        }

        return ts.visitEachChild(node, visitor, context);
      };

      return ts.visitNode(rootNode, visitor);
    };
  };

  return transformer;
};
