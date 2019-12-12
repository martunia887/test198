const ts = require('typescript');
const stylis = require('stylis');

const JSX_PRAGMA = 'jsx';
const CSS_PROP = 'css';

class StringIdGenerator {
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
    ts.isVariableDeclaration(node) &&
    node.name.text === 'IS_CSS_FREEDOM_COMPILED'
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

const processCssProperties = (properties, className) => {
  const css = properties.reduce((css, prop) => {
    const key = kebabCase(prop.name.escapedText);
    const value = prop.initializer.text;

    return `${css}
      ${key}: ${value};`;
  }, '');

  return {
    className,
    css: stylis(`.${className}`, css),
  };
};

// @flow
module.exports = (config = {}) => {
  console.log(`

@atlaskit/css-freedom typescript transformer has been enabled.
Have feedback? Post it to http://go/dst-sd
`);

  const ids = new StringIdGenerator();

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

      const visitor = node => {
        if (isCssFreedomCompiledNode(node)) {
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

          // Compile the CSS from the styles object node.
          const compiledCss = processCssProperties(
            cssPropNode.initializer.expression.properties,
            ids.next(),
          );

          // Remove css prop from the react element.
          const newNode = ts.getMutableClone(node);
          newNode.openingElement.attributes.properties = newNode.openingElement.attributes.properties.filter(
            prop => prop.name.escapedText !== CSS_PROP,
          );
          newNode.openingElement.attributes.properties.push(
            ts.createJsxAttribute(
              ts.createIdentifier('className'),
              ts.createStringLiteral(compiledCss.className),
            ),
          );

          // Create the style element that will precede the node that had the css prop.
          const styleNode = ts.createJsxElement(
            ts.createJsxOpeningElement(
              ts.createIdentifier('style'),
              [],
              ts.createJsxAttributes([]),
            ),
            [ts.createJsxText(compiledCss.css)],
            ts.createJsxClosingElement(ts.createIdentifier('style')),
          );

          // Create a new fragment that will wrap both the style and the node we found initially.
          const newFragmentParent = ts.createJsxFragment(
            ts.createJsxOpeningFragment(),
            [styleNode, newNode],
            ts.createJsxJsxClosingFragment(),
          );

          return newFragmentParent;
        }

        return ts.visitEachChild(node, visitor, context);
      };

      return ts.visitNode(rootNode, visitor);
    };
  };

  return transformer;
};
