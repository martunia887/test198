import WikiMarkupTransformer from '../../../index';
import { Context } from '../../../interfaces';

describe('JIRA wiki markup - Images and attachments', () => {
  const testCases: Array<[string, string]> = [
    ['should find images in the text', '!image.png!'],
    [
      'should find absolute URL images and convert it to external media item',
      '!http://www.host.com/image.gif!',
    ],
    [
      'should find attachments with attributes',
      '!quicktime.mov|width=300,height=400!',
    ],
    [
      'should find attachments in multiline string',
      `this is a line of text
!image.gif|align=right, vspace=4!
yep`,
    ],
    [
      'should find images in a multiline string with return symbols',
      '!Kapture 2018-04-04 at 16.36.13.gif!\r\n\r\nFoo',
    ],
    [
      '[CS-216] should parse media filename with "(" and ")"',
      '!Screen Shot (9db1eca8-8257-4763-92fb-e6417f9e34c9).jpeg|thumbnail!',
    ],
    [
      '[CS-1404] should parse attachments as one media group',
      '[^a-doc (jadsjdasjadsjkdasjk).pdf][^not-empty (askjsajnkjknads).txt]',
    ],
    [
      '[CS-1404] should parse attachments separated by a single new line as one media group',
      '[^a-doc (jadsjdasjadsjkdasjk).pdf]\r\n[^not-empty (askjsajnkjknads).txt]',
    ],
    [
      '[CS-1404] should parse attachments separated by any number of spaces as one media group',
      '[^a-doc (jadsjdasjadsjkdasjk).pdf]   [^not-empty (askjsajnkjknads).txt]',
    ],
    [
      '[CS-1404] should parse attachments separated by non-space character as separate media groups',
      '[^a-doc (jadsjdasjadsjkdasjk).pdf]a[^not-empty (askjsajnkjknads).txt]',
    ],
    [
      '[CS-1404] should parse attachments separated by multiple new lines as separate media groups',
      '[^a-doc (jadsjdasjadsjkdasjk).pdf]\r\n\r\n[^not-empty (askjsajnkjknads).txt]',
    ],
    [
      '[CS-1404] should parse consecutive attachments separated by one new line as one media group',
      '[^file1.txt]\r\n[^file2.txt]\r\n[^file3.txt]',
    ],
    [
      '[CS-1404] should parse list of multiple attachments separated by multiple new lines as separate media groups with multiple child media elements',
      '[^a-doc (jadsjdasjadsjkdasjk).pdf]\r\n[^not-empty (askjsajnkjknads).txt]\r\n\r\n[^a-doc (jadsjdasjadsjkdasjk).pdf]\r\n[^not-empty (askjsajnkjknads).txt]',
    ],
    [
      '[CS-1404] should parse attachments inside tables as single media group',
      '|colum 1 [^a-doc (jadsjdasjadsjkdasjk).pdf]\r\n[^not-empty (askjsajnkjknads).txt]|column 2|',
    ],
    [
      'should transform filename to id for embeddable attachments if present in context',
      '!Screen Shot.jpeg!',
    ],
    [
      'should transform filename to id for attachment links if present in context',
      '[^document.pdf]',
    ],
  ];

  const context: Context = {
    mediaConversion: {
      'Screen Shot.jpeg': '9db1eca8-8257-4763-92fb-e6417f9e34c9',
      'document.pdf': '9db1eca8-8257-4763-92fb-abc12346',
    },
  };

  for (const [testCaseDescription, markup] of testCases) {
    it(testCaseDescription, () => {
      const transformer = new WikiMarkupTransformer();
      expect(transformer.parse(markup, context)).toMatchSnapshot();
    });
  }
});
