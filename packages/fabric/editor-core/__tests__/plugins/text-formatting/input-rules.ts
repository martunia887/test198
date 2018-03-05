import {
  mention,
  em,
  strike,
  code,
  strong,
  insertText,
  doc,
  createEditor,
  a as link,
  p,
  code_block,
} from '@atlaskit/editor-test-helpers';

import codeBlockPlugin from '../../../src/editor/plugins/code-block';
import mentionsPlugin from '../../../src/editor/plugins/mentions';
import {
  strongRegex1,
  strongRegex2,
  italicRegex1,
  italicRegex2,
  strikeRegex,
  codeRegex,
} from '../../../src/plugins/text-formatting/input-rule';

const autoFormatPatterns = [
  {
    string: '**abc**',
    doc: strong('abc'),
    name: 'strong',
    regex: strongRegex2,
  },
  {
    string: '__abc__',
    doc: strong('abc'),
    name: 'strong',
    regex: strongRegex1,
  },
  { string: '*abc*', doc: em('abc'), name: 'em', regex: italicRegex2 },
  { string: '_abc_', doc: em('abc'), name: 'em', regex: italicRegex1 },
  { string: '~~abc~~', doc: strike('abc'), name: 'strike', regex: strikeRegex },
  { string: '`abc`', doc: code('abc'), name: 'code', regex: codeRegex },
];

describe('text-formatting input rules', () => {
  let trackEvent;
  const editor = (doc: any, disableCode = false) =>
    createEditor({
      doc,
      editorPlugins: [codeBlockPlugin, mentionsPlugin],
      editorProps: {
        analyticsHandler: trackEvent,
        textFormatting: { disableCode },
      },
    });

  beforeEach(() => {
    trackEvent = jest.fn();
  });

  const autoformats = (string, editorContent, analyticsName) => {
    it(`should autoformat: ${string}`, () => {
      const { editorView } = editor(doc(p('{<>}')));
      insertText(editorView, string, 1);
      expect(editorView.state.doc).toEqualDocument(doc(editorContent));

      expect(trackEvent).toHaveBeenCalledWith(
        `atlassian.editor.format.${analyticsName}.autoformatting`,
      );
    });
  };

  const checkInvalidStrings = (regex, string, formatting) => {
    it(`should return null for incorrect markdown style: ${formatting}, regex: ${regex}, string: ${string}`, () => {
      expect(regex.exec(string)).toEqual(null);
    });
  };

  const notautoformats = string => {
    it(`should not autoformat: ${string}`, () => {
      const { editorView } = editor(doc(p('{<>}')));
      insertText(editorView, string, 1);
      expect(editorView.state.doc).toEqualDocument(doc(p(string)));
    });
  };

  const autoformatCombinations = (
    strings,
    editorContent,
    analyticsName?: string,
  ) => {
    it(`should autoformat combinations: ${strings}`, () => {
      const { editorView } = editor(doc(p('{<>}')));
      strings.forEach(str => {
        insertText(editorView, str, editorView.state.selection.$from.pos);
      });
      expect(editorView.state.doc).toEqualDocument(doc(p(editorContent)));

      if (analyticsName) {
        expect(trackEvent).toHaveBeenCalledWith(
          `atlassian.editor.format.${analyticsName}.autoformatting`,
        );
      }
    });
  };

  describe('atlassian product rule', () => {
    autoformats('atlassian', p('Atlassian'), 'product');
    notautoformats('something-atlassian');

    autoformats('jira and JIRA', p('Jira and Jira'), 'product');
    notautoformats('.jira');

    autoformats('bitbucket', p('Bitbucket'), 'product');
    notautoformats('.bitbucket');

    autoformats('hipchat and HipChat', p('Hipchat and Hipchat'), 'product');
    notautoformats('.hipchat');

    autoformats('trello', p('Trello'), 'product');
    notautoformats('.trello');

    autoformats('  \t    atlassian   ', p('  \t    Atlassian   '), 'product');
  });

  describe('smart quotes rule', () => {
    autoformats("'nice'", p('‘nice’'), 'quote');
    autoformats("'hello' 'world'", p('‘hello’ ‘world’'), 'quote');

    autoformats("don't hate, can't wait", p('don’t hate, can’t wait'), 'quote');
    autoformats(
      "don't hate, can't 'wait'",
      p('don’t hate, can’t ‘wait’'),
      'quote',
    );

    notautoformats("':)");
    notautoformats("'t hate");
    notautoformats("let'. it");
    notautoformats("let' it 'be");

    autoformats('"hello" "world"', p('“hello” “world”'), 'quote');
    autoformats('let " it\'d close"', p('let “ it’d close”'), 'quote');
    autoformats(
      'let " it\'d close" \'hey',
      p("let “ it’d close” 'hey"),
      'quote',
    );

    // test spacing
    autoformats(
      '  \t   "hello" \'world\'   ',
      p('  \t   “hello” ‘world’   '),
      'quote',
    );
  });

  describe('arrow rule', () => {
    notautoformats('->');
    notautoformats('-->');
    notautoformats('<-');
    notautoformats('<--');
    notautoformats('>');
    notautoformats('-!>');
    notautoformats('- >');

    notautoformats('-->>');
    notautoformats('-->> ');
    notautoformats('->> ');

    notautoformats(' <-> ');

    // autoformat only after space
    autoformats('-> ', p('→ '), 'arrow');
    autoformats('--> ', p('→ '), 'arrow');
    autoformats('<- ', p('← '), 'arrow');
    autoformats('<-- ', p('← '), 'arrow');

    // test spacing
    autoformatCombinations(
      [' \t   -> ', ' \t  --> ', ' '],
      ' \t   →  \t  →  ',
      'arrow',
    );
  });

  describe('typography rule', () => {
    notautoformats('.. .');

    autoformats('...', p('…'), 'typography');
    autoformatCombinations(['...', '.'], '….', 'typography');
    autoformatCombinations(['...', '...'], '……', 'typography');
    autoformatCombinations(['...', '\t...'], '…\t…', 'typography');
    autoformatCombinations(
      ['\t ...', '  \t text'],
      '\t …  \t text',
      'typography',
    );

    notautoformats('--');
    notautoformats('    --.');

    autoformats('-- ', p('— '), 'typography');
    autoformats('--\t', p('—\t'), 'typography');

    autoformatCombinations(
      ['\t -- ', '  \t text'],
      '\t —   \t text',
      'typography',
    );
  });

  describe('strong rule', () => {
    it('should convert text to strong for link also', () => {
      const { editorView, sel } = editor(
        doc(
          p(
            '**',
            link({ href: 'http://www.atlassian.com' })('Atlassian'),
            '{<>}',
          ),
        ),
      );

      insertText(editorView, '**', sel);

      expect(editorView.state.doc).toEqualDocument(
        doc(p(strong(link({ href: 'http://www.atlassian.com' })('Atlassian')))),
      );
      expect(trackEvent).toHaveBeenCalledWith(
        'atlassian.editor.format.strong.autoformatting',
      );
    });

    it('should not convert the surrounding text to strong', () => {
      const { editorView, sel } = editor(doc(p('hello {<>} there')));

      insertText(editorView, '**text**', sel);

      expect(editorView.state.doc).toEqualDocument(
        doc(p('hello ', strong('text'), ' there')),
      );
    });
  });

  describe('em rule', () => {
    it('should keep current marks when converting from markdown', () => {
      const { editorView, sel } = editor(doc(p(strong('This is bold {<>}'))));

      insertText(editorView, '*italic*', sel);
      expect(editorView.state.doc).toEqualDocument(
        doc(p(strong('This is bold '), em(strong('italic')))),
      );
    });
  });

  describe('code rule', () => {
    it('should convert mention to plaint text', () => {
      const mentionNode = mention({ id: '1234', text: '@helga' })();
      const { editorView, sel } = editor(
        doc(p('hey! `hello, ', mentionNode, ' there{<>}?')),
      );
      insertText(editorView, '`', sel);

      expect(editorView.state.doc).toEqualDocument(
        doc(p('hey! ', code('hello, @helga there'), '?')),
      );
    });

    it('should cleanup other formatting', () => {
      const mentionNode = mention({ id: '1234', text: '@helga' })();
      const { editorView, sel } = editor(
        doc(
          p('`', strong('hello '), mentionNode, em(', '), strike('there?{<>}')),
        ),
      );
      insertText(editorView, '`', sel);

      expect(editorView.state.doc).toEqualDocument(
        doc(p(code('hello @helga, there?'))),
      );
    });
  });

  describe('nested rules', () => {
    it('should not convert " __world__" to strong if I insert a space afterwards', () => {
      const { editorView, sel } = editor(doc(p(' __world__{<>}')));

      insertText(editorView, ' ', sel);

      expect(editorView.state.doc).toEqualDocument(doc(p(' __world__ ')));
    });

    it('should convert "~~**text**~~" to strike strong', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '~~**text**', sel);
      expect(editorView.state.doc).toEqualDocument(
        doc(p('~~', strong('text'))),
      );
      insertText(editorView, '~~', editorView.state.selection.from);
      expect(editorView.state.doc).toEqualDocument(
        doc(p(strike(strong('text')))),
      );
      expect(trackEvent).toHaveBeenCalledWith(
        'atlassian.editor.format.strong.autoformatting',
      );
      expect(trackEvent).toHaveBeenCalledWith(
        'atlassian.editor.format.strike.autoformatting',
      );
    });
  });

  describe('autoformatting is not right inclusive', () => {
    const autoformatsNotRightInclusive = (string, content) => {
      it(`should not be right inclusive: ${string}`, () => {
        const { editorView, sel } = editor(doc(p('{<>}')));
        insertText(editorView, string, sel);
        insertText(editorView, 'text', editorView.state.selection.$from.pos);
        expect(editorView.state.doc).toEqualDocument(doc(p(content, 'text')));
      });
    };
    autoFormatPatterns.forEach(pattern => {
      autoformatsNotRightInclusive(pattern.string, pattern.doc);
    });
  });

  describe('valid autoformatting', () => {
    describe('simple single word', () => {
      autoFormatPatterns.forEach(pattern => {
        autoformats(pattern.string, p(pattern.doc), pattern.name);
      });
    });

    describe('multiple word should autoformat', () => {
      autoformats('__test test__', p(strong('test test')), 'strong');
      autoformats('**test test**', p(strong('test test')), 'strong');
      autoformats('_test test_', p(em('test test')), 'em');
      autoformats('*test test*', p(em('test test')), 'em');
      autoformats('~~test test~~', p(strike('test test')), 'strike');
      autoformats('`test test`', p(code('test test')), 'code');
    });

    describe('single word with special characters', () => {
      autoformats('__^hello__', p(strong('^hello')), 'strong');
      autoformats('**^hello**', p(strong('^hello')), 'strong');
      autoformats('_^hello_', p(em('^hello')), 'em');
      autoformats('*^hello*', p(em('^hello')), 'em');
      autoformats('~~^hello~~', p(strike('^hello')), 'strike');
      autoformats('`^hello`', p(code('^hello')), 'code');
      autoformats('__`test`__', p(strong('`test`')), 'strong');
      autoformats('**`test`**', p(strong('`test`')), 'strong');
      autoformats('_`test`_', p(em('`test`')), 'em');
      autoformats('*`test`*', p(em('`test`')), 'em');
      autoformats('~~`test`~~', p(strike('`test`')), 'strike');
    });

    describe('single character', () => {
      autoformats('__a__', p(strong('a')), 'strong');
      autoformats('**a**', p(strong('a')), 'strong');
      autoformats('_a_', p(em('a')), 'em');
      autoformats('*a*', p(em('a')), 'em');
      autoformats('~~a~~', p(strike('a')), 'strike');
      autoformats('`a`', p(code('a')), 'code');
    });

    describe('2 characters', () => {
      autoformats('__ab__', p(strong('ab')), 'strong');
      autoformats('**ab**', p(strong('ab')), 'strong');
      autoformats('_ab_', p(em('ab')), 'em');
      autoformats('*ab*', p(em('ab')), 'em');
      autoformats('~~ab~~', p(strike('ab')), 'strike');
      autoformats('`ab`', p(code('ab')), 'code');
    });

    describe('after other works', () => {
      autoFormatPatterns.forEach(pattern => {
        autoformats(
          `abc abc abc ${pattern.string}`,
          p('abc abc abc ', pattern.doc),
          pattern.name,
        );
      });
    });

    describe('` not in beginning of the word', () => {
      autoFormatPatterns.forEach(pattern => {
        if (pattern.name !== 'code') {
          autoformats(
            `\`test ${pattern.string}`,
            p('`test ', pattern.doc),
            pattern.name,
          );
          autoformats(
            `\` ${pattern.string}`,
            p('` ', pattern.doc),
            pattern.name,
          );
        }
      });
    });

    describe('when inside code block', () => {
      const notautoformatsAfterInCodeBlock = string => {
        it(`should not autoformat: ${string}`, () => {
          const { editorView, sel } = editor(doc(code_block()('{<>}')));
          insertText(editorView, string, sel);
          expect(editorView.state.doc).toEqualDocument(
            doc(code_block()(string)),
          );
        });
      };
      autoFormatPatterns.forEach(pattern => {
        notautoformatsAfterInCodeBlock(pattern.string);
      });
    });

    describe('when there is code mark in the line', () => {
      const autoformatsAfterCodeMark = (string, content) => {
        it(`should autoformat: ${string}`, () => {
          const { editorView, sel } = editor(doc(p(code('abc'), ' {<>}')));
          insertText(editorView, string, sel);
          expect(editorView.state.doc).toEqualDocument(
            doc(p(code('abc'), ' ', content)),
          );
        });
      };
      autoFormatPatterns.forEach(pattern => {
        autoformatsAfterCodeMark(pattern.string, pattern.doc);
      });
    });

    describe('combination of regex should autoformat', () => {
      // conbining autoformatting
      autoformatCombinations(['~~__test__', '~~'], strike(strong('test')));
      autoformatCombinations(['*__test__', '*'], em(strong('test')));
      autoformatCombinations(['~~**test**', '~~'], strike(strong('test')));
      autoformatCombinations(['_**test**', '_'], em(strong('test')));
      autoformatCombinations(['~~_test_', '~~'], strike(em('test')));
      autoformatCombinations(['**_test_', '**'], strong(em('test')));
      autoformatCombinations(['~~*test*', '~~'], strike(em('test')));
      autoformatCombinations(['__*test*', '__'], strong(em('test')));
      autoformatCombinations(['__~~test~~', '__'], strong(strike('test')));
      autoformatCombinations(['**~~test~~', '**'], strong(strike('test')));
      autoformatCombinations(['_~~test~~', '_'], em(strike('test')));
      autoformatCombinations(['*~~test~~', '*'], em(strike('test')));
      autoformatCombinations(
        ['*~~__test__', '~~', '*'],
        em(strike(strong('test'))),
      );
      autoformatCombinations(
        ['~~*__test__', '*', '~~'],
        strike(em(strong('test'))),
      );
      autoformatCombinations(
        ['_~~**test**', '~~', '_'],
        em(strike(strong('test'))),
      );
    });
  });

  describe('code mark autoformatting using ` with space or other regex characters', () => {
    notautoformats('` test`');
    autoformats('`test test`', p(code('test test')), 'code');
  });

  describe('invalid autoformatting', () => {
    describe('space or text after autoformatting character', () => {
      // these strings can not ne testes using notautoformats function
      // as they autoformat as soon as '__test__' is entered and does not waits for following space
      // space after
      autoFormatPatterns.forEach(pattern => {
        checkInvalidStrings(pattern.regex, `${pattern.string} `, pattern.name);
        checkInvalidStrings(
          pattern.regex,
          `${pattern.string} abc`,
          pattern.name,
        );
      });
    });

    describe('text before', () => {
      autoFormatPatterns.forEach(pattern => {
        notautoformats(`abc${pattern.string}`);
      });
    });

    describe('space after formatting character', () => {
      notautoformats('__ test__');
      notautoformats('** test**');
      notautoformats('_ test_');
      notautoformats('* test*');
      notautoformats('~~ test~~');
    });

    describe('backtick before', () => {
      autoFormatPatterns.forEach(pattern => {
        notautoformats(`\`${pattern.string}`);
      });
    });

    describe('wrong combinations', () => {
      notautoformats('___test__');
      notautoformats('___test_');
      notautoformats('***test**');
      notautoformats('***test*');
    });
  });
});
