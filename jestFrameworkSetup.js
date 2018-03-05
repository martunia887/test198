/* eslint-disable */

import 'jest-styled-components';

// URL is not available for non Node environment
if (global.URL) {
  global.URL.createObjectURL = () => 'mock result of URL.createObjectURL()';
}

/*
  This file is executed after the test framework is setup for each test file. Addons that modify
  the `expect` object can be applied here.
  @see https://facebook.github.io/jest/docs/configuration.html#setuptestframeworkscriptfile-string
*/
const pmModel = require('./node_modules/prosemirror-model');
const diff = require('./node_modules/jest-diff');

/**
 * Polyfill DOMElement.innerText because JSDOM lacks support for it.
 * @link https://github.com/tmpvar/jsdom/issues/1245
 */
/**
 * We're checking the document actually exists here because tests using `jest-styled-components`
 * need to be run with `testEnvironment=node` for `styled-components@^1`
 * @see https://github.com/styled-components/jest-styled-components#styled-components--v2
 */
if (
  typeof document !== 'undefined' &&
  !('innerText' in document.createElement('a'))
) {
  const getInnerText = node =>
    Array.prototype.slice.call(node.childNodes).reduce((text, child) => {
      if (child.nodeType === child.TEXT_NODE) {
        return `${text}${child.textContent}`;
      }

      if (child.childNodes.length) {
        return `${text}${getInnerText(child)}`;
      }

      return text;
    }, '');

  Object.defineProperty(HTMLElement.prototype, 'innerText', {
    configurable: false,
    enumerable: true,
    get: function get() {
      return getInnerText(this);
    },
    set: function set(text) {
      const textNodes = Array.prototype.slice
        .call(this.childNodes)
        .filter(node => node.nodeType === node.TEXT_NODE);

      // If there's only one child that is a text node, update it
      if (textNodes.length === 1) {
        textNodes[0].textContent = text;
        return;
      }

      // Remove all child nodes as per WHATWG LS Spec
      Array.prototype.slice
        .call(this.childNodes)
        .forEach(node => this.removeChild(node));

      // Append a single text child node with the text
      this.appendChild(this.ownerDocument.createTextNode(text));
    },
  });
}

/**
 * We're checking the window actually exists here because tests using `jest-styled-components`
 * need to be run with `testEnvironment=node` for `styled-components@^1`
 * @see https://github.com/styled-components/jest-styled-components#styled-components--v2
 */
if (typeof window !== 'undefined' && !('cancelAnimationFrame' in window)) {
  window.cancelAnimationFrame = () => {
    if (!window.hasWarnedAboutCancelAnimationFramePolyfill) {
      window.hasWarnedAboutCancelAnimationFramePolyfill = true;
      console.warn(
        'Warning! Test uses DOM cancelAnimationFrame API which is not available in JSDOM/Node environment.',
      );
    }
  };
}

function isNodeOrFragment(thing) {
  // Using a simple `instanceof` check is intentionally avoided here to make
  // this code agnostic to a specific instance of a Schema.
  return thing && typeof thing.eq === 'function';
}

/* eslint-disable no-undef */
expect.extend({
  toEqualDocument(actual, expected) {
    // Because schema is created dynamically, expected value is a function (schema) => PMNode;
    // That's why this magic is necessary. It simplifies writing assertions, so
    // instead of expect(doc).toEqualDocument(doc(p())(schema)) we can just do:
    // expect(doc).toEqualDocument(doc(p())).
    //
    // Also it fixes issues that happens sometimes when actual schema and expected schema
    // are different objects, making this case impossible by always using actual schema to create expected node.
    expected =
      typeof expected === 'function' && actual.type && actual.type.schema
        ? expected(actual.type.schema)
        : expected;

    if (
      !(expected instanceof pmModel.Node) ||
      !(actual instanceof pmModel.Node)
    ) {
      return {
        pass: false,
        actual,
        expected,
        name: 'toEqualDocument',
        message:
          'Expected both values to be instance of prosemirror-model Node.',
      };
    }

    if (expected.type.schema !== actual.type.schema) {
      return {
        pass: false,
        actual,
        expected,
        name: 'toEqualDocument',
        message: 'Expected both values to be using the same schema.',
      };
    }

    const pass = this.equals(actual.toJSON(), expected.toJSON());
    const message = pass
      ? () =>
          `${this.utils.matcherHint('.not.toEqualDocument')}\n\n` +
          `Expected JSON value of document to not equal:\n  ${this.utils.printExpected(
            expected,
          )}\n` +
          `Actual JSON:\n  ${this.utils.printReceived(actual)}`
      : () => {
          const diffString = diff(expected, actual, {
            expand: this.expand,
          });
          return (
            `${this.utils.matcherHint('.toEqualDocument')}\n\n` +
            `Expected JSON value of document to equal:\n${this.utils.printExpected(
              expected,
            )}\n` +
            `Actual JSON:\n  ${this.utils.printReceived(actual)}` +
            `${diffString ? `\n\nDifference:\n\n${diffString}` : ''}`
          );
        };

    return {
      pass,
      actual,
      expected,
      message,
      name: 'toEqualDocument',
    };
  },
});
