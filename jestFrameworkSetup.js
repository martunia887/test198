/* eslint-disable */
import { toBeInTheDocument, toHaveFocus } from '@testing-library/jest-dom';
import { XMLHttpRequest } from 'xmlhttprequest';
import 'jest-styled-components';
import { toMatchSnapshot } from 'jest-snapshot';
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import { createSerializer, matchers } from 'jest-emotion';
import 'jest-localstorage-mock';
import ScreenshotReporter from './build/visual-regression/utils/screenshotReporter';
import { cleanup } from '@testing-library/react';
import { NodeSelection } from 'prosemirror-state';
import { CellSelection } from 'prosemirror-tables';

// override timeout
jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;

// https://product-fabric.atlassian.net/browse/BUILDTOOLS-176
global.XMLHttpRequest = XMLHttpRequest;
global.fetch = require('jest-fetch-mock');
global.fetchMock = global.fetch;

let consoleError;
let consoleWarn;
let consoleLog;

// URL is not available for non Node environment
if (global.URL) {
  global.URL.createObjectURL = () => 'mock result of URL.createObjectURL()';
  global.URL.revokeObjectURL = () => 'mock result of URL.revokeObjectURL()';
}

if (!global.WEBSITE_ENV) {
  global.WEBSITE_ENV = 'local';
}

// Node promise rejection are now logged for debbugging
process.on('unhandledRejection', reason => {
  console.log('REJECTION', reason);
});

// We need to ensure that each test has at least one assertion.
// Currently, the integration tests are using a custom matcher and it is not considered as an assertion.
// `expect.hasAssertions()` will only run for Visual Regression And Unit tests.
if (!process.env.INTEGRATION_TESTS) {
  beforeEach(() => {
    expect.hasAssertions();
  });
}

/*
  This file is executed after the test framework is setup for each test file. Addons that modify
  the `expect` object can be applied here.
  @see https://facebook.github.io/jest/docs/configuration.html#setuptestframeworkscriptfile-string
*/
const pmModel = require('./node_modules/prosemirror-model');
const diff = require('./node_modules/jest-diff');

/**
 * We're checking if fetch is not available in the window, in case we
 * don't have, we need to make sure that `global` and `window`
 * are aligned with the same mock
 */
if (typeof window !== 'undefined' && !('fetch' in window)) {
  window.fetch = global.fetch;
}

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

function transformDoc(fn) {
  return doc => {
    const walk = fn => node => {
      const { content = [], ...rest } = node;
      const transformedNode = fn(rest);
      const walkWithFn = walk(fn);
      if (content.length) {
        transformedNode.content = content.map(walkWithFn);
      }
      return transformedNode;
    };
    return walk(fn)(doc);
  };
}

const hasLocalId = type =>
  type === 'status' ||
  type === 'taskItem' ||
  type === 'taskList' ||
  type === 'decisionItem' ||
  type === 'decisionList';

const removeIdsFromDoc = transformDoc(node => {
  /**
   * Replace `id` of media nodes with a fixed id
   * @see https://regex101.com/r/FrYUen/1
   */
  if (node.type === 'media') {
    const replacedNode = {
      ...node,
      attrs: {
        ...node.attrs,
        id: node.attrs.id.replace(
          /(temporary:)?([a-z0-9\-]+)(:.*)?$/,
          '$11234-5678-abcd-efgh$3',
        ),

        __fileName: 'example.png',
      },
    };

    if (node.attrs.__key) {
      replacedNode.attrs.__key = node.attrs.__key.replace(
        /(temporary:)?([a-z0-9\-]+)(:.*)?$/,
        '$11234-5678-abcd-efgh$3',
      );
    }

    if (node.attrs.occurrenceKey) {
      replacedNode.attrs.occurrenceKey = node.attrs.occurrenceKey.replace(
        /([a-z0-9\-]+)(:.*)?$/,
        '12345678-9abc-def0-1234-56789abcdef0$2',
      );
    }

    return replacedNode;
  }
  if (hasLocalId(node.type)) {
    return {
      ...node,
      attrs: {
        ...node.attrs,
        localId: node.attrs.localId.replace(/([a-z0-9\-]+)/, () => 'abc-123'),
      },
    };
  }
  return node;
});

const toEqualDocument = (equals, utils, expand) => (actual, expected) => {
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
      message: 'Expected both values to be instance of prosemirror-model Node.',
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

  const pass = equals(actual.toJSON(), expected.toJSON());
  const message = pass
    ? () =>
        `${utils.matcherHint('.not.toEqualDocument')}\n\n` +
        `Expected JSON value of document to not equal:\n  ${utils.printExpected(
          expected,
        )}\n` +
        `Actual JSON:\n  ${utils.printReceived(actual)}`
    : () => {
        const diffString = diff(expected, actual, {
          expand: expand,
        });
        return (
          `${utils.matcherHint('.toEqualDocument')}\n\n` +
          `Expected JSON value of document to equal:\n${utils.printExpected(
            expected,
          )}\n` +
          `Actual JSON:\n  ${utils.printReceived(actual)}` +
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
};

/* eslint-disable no-undef */
expect.extend({
  toEqualDocument(actual, expected) {
    return toEqualDocument(this.equals, this.utils, this.expand)(
      actual,
      expected,
    );
  },

  toEqualDocumentAndSelection(actual, expected) {
    const { doc: actualDoc, selection: actualSelection } = actual;
    const docComparison = toEqualDocument(this.equals, this.utils, this.expand)(
      actualDoc,
      expected,
    );
    if (!docComparison.pass) {
      return docComparison;
    }

    expected =
      typeof expected === 'function' && actualDoc.type && actualDoc.type.schema
        ? expected(actualDoc.type.schema)
        : expected;

    const fail = {
      pass: false,
      actual,
      expected,
      name: 'toEqualDocumentAndSelection',
      message: () => 'Expected specified selections to match in both values.',
    };

    if (expected.refs) {
      const refConditions = {
        '<': (position, selection) => position === selection.$from.pos,
        '>': (position, selection) => position === selection.$to.pos,
        '<>': (position, selection) =>
          position === selection.$from.pos && position == selection.$to.pos,
        '<node>': (position, selection) =>
          selection instanceof NodeSelection &&
          position === selection.$from.pos,
        // The | denotes the gap cursor's side, based on the node on the side of the |.
        '<|gap>': (position, selection) =>
          // Using literal values from constructor as unable to import type from editor-core
          // Some tests use mock packages which will conflict with jestFrameworkSetup.js
          selection.constructor.name === 'GapCursorSelection' &&
          selection.side === 'right' &&
          position === selection.$from.pos,
        '<gap|>': (position, selection) =>
          selection.constructor.name === 'GapCursorSelection' &&
          selection.side === 'left' &&
          position === selection.$from.pos,
      };

      if (
        !Object.keys(refConditions).every(key => {
          if (key in expected.refs) {
            return refConditions[key](expected.refs[key], actualSelection);
          }
          return true;
        })
      ) {
        return fail;
      }
    }

    return docComparison;
  },

  /**
   * The current toMatchSnapshot implementation is not deterministic
   * with currentTestName, this is causing issues when we use on `it.concurrent`
   * to avoid this issue we are sending the testCase by ourself.
   *
   * Issue: https://github.com/facebook/jest/issues/5801
   */
  toMatchCustomSnapshot(actual, testCase) {
    const fakeThis = { ...this, currentTestName: testCase };
    return toMatchSnapshot.call(fakeThis, actual);
  },

  /**
   * The current toMatchDocSnapshot implementation is not deterministic
   * with currentTestName, this is causing issues when we use on `it.concurrent`
   * to avoid this issue we are sending the testCase by ourself.
   *
   * Issue: https://github.com/facebook/jest/issues/5801
   */
  toMatchCustomDocSnapshot(actual, testCase) {
    const { snapshotState } = this;
    // remove ids that may change from the document so snapshots are repeatable
    const transformedDoc = removeIdsFromDoc(actual);

    // since the test runner fires off multiple browsers for a single test, map each snapshot to the same one
    // (otherwise we'll try to create as many snapshots as there are browsers)
    const oldCounters = snapshotState._counters;
    snapshotState._counters = Object.create(oldCounters, {
      set: {
        value: key => oldCounters.set(key, 1),
      },
      get: {
        value: key => oldCounters.get(key),
      },
    });
    const fakeThis = { ...this, currentTestName: testCase };
    const ret = toMatchSnapshot.call(fakeThis, transformedDoc);
    return ret;
  },

  toMatchDocSnapshot(actual) {
    const { currentTestName, snapshotState } = this;

    const removeFirstWord = sentence =>
      sentence
        .split(' ')
        .slice(1)
        .join(' ');

    // this change is to ensure we are mentioning test file name only once in snapshot file
    // for integration tests only
    const newTestName = removeFirstWord(currentTestName);

    // remove ids that may change from the document so snapshots are repeatable
    const transformedDoc = removeIdsFromDoc(actual);

    // since the test runner fires off multiple browsers for a single test, map each snapshot to the same one
    // (otherwise we'll try to create as many snapshots as there are browsers)
    const oldCounters = snapshotState._counters;
    snapshotState._counters = Object.create(oldCounters, {
      set: {
        value: key => oldCounters.set(key, 1),
      },
      get: {
        value: key => oldCounters.get(key),
      },
    });

    // In `jest-snapshot@22`, passing the optional testName doesn't override test name anymore.
    // Instead it appends the passed name with original name.
    const oldTestName = this.currentTestName;
    this.currentTestName = newTestName;

    const ret = toMatchSnapshot.call(this, transformedDoc);

    this.currentTestName = oldTestName;
    return ret;
  },
  toHaveStyleDeclaration: matchers.toHaveStyleRule,
  toBeInTheDocument,
  toHaveFocus,
});

// Copied from react-beautiful-dnd/test/setup.js
if (typeof document !== 'undefined') {
  // overriding these properties in jsdom to allow them to be controlled
  Object.defineProperties(document.documentElement, {
    clientWidth: {
      writable: true,
      value: document.documentElement.clientWidth,
    },
    clientHeight: {
      writable: true,
      value: document.documentElement.clientHeight,
    },
    scrollWidth: {
      writable: true,
      value: document.documentElement.scrollWidth,
    },
    scrollHeight: {
      writable: true,
      value: document.documentElement.scrollHeight,
    },
  });
}

// Setting initial viewport
// Need to set clientWidth and clientHeight as jsdom does not set these properties
if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  document.documentElement.clientWidth = window.innerWidth;
  document.documentElement.clientHeight = window.innerHeight;
}

if (process.env.CI) {
  beforeEach(() => {
    consoleError = console.error;
    consoleWarn = console.warn;
    consoleLog = console.log;
    console.error = jest.fn();
    console.warn = jest.fn();
    console.log = jest.fn();
  });
  afterEach(() => {
    console.error = consoleError;
    console.warn = consoleWarn;
    console.log = consoleLog;
  });
}

expect.addSnapshotSerializer(createSerializer());

// set up for visual regression
if (process.env.VISUAL_REGRESSION) {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

  const screenshotReporter = new ScreenshotReporter(global.page);
  jasmine.getEnv().addReporter(screenshotReporter);

  beforeAll(async () => {
    global.page = await global.browser.newPage();
    screenshotReporter.reset(global.page);
  }, jasmine.DEFAULT_TIMEOUT_INTERVAL);

  afterAll(async () => {
    await screenshotReporter.waitForPendingScreenshots();
    await global.page.close();
    await global.browser.disconnect();
  });

  // A failureThreshold of 1 will pass tests that have > 2 percent failing pixels
  const customConfig = { threshold: 0.0 };
  const toMatchProdImageSnapshot = configureToMatchImageSnapshot({
    customDiffConfig: customConfig,
    failureThreshold: '20',
    failureThresholdType: 'pixel',
    noColors: true,
  });

  expect.extend({ toMatchProdImageSnapshot });
}

// unmount any components mounted with react-testing-library
afterEach(cleanup);
