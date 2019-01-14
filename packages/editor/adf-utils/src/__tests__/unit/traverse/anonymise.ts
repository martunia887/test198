import { anonymise } from '../../../traverse/anonymise';
import {
  doc,
  blockCard,
  blockQuote,
  p,
  bodiedExtension,
  bulletList,
  listItem,
  codeBlock,
  text,
  date,
  decisionList,
  decisionItem,
  heading,
  emoji,
  extension,
  ul,
  li,
  mediaGroup,
  media,
  mention,
  panel,
} from '../../../builders';
import { inlineCard } from '../../../builders/nodes/inline-card';

describe('Anonymise', () => {
  it('should should anonymise doc node', () => {
    const adf = doc();
    expect(anonymise(adf)).toMatchSnapshot();
  });

  it('should anonymise block-card node', () => {
    const adf = doc(blockCard({ url: 'https://www.atlassian.com' }));
    expect(anonymise(adf)).toMatchSnapshot();
  });

  it('should anonymise blockquote node', () => {
    const adf = doc(blockQuote(p('this is a blockquote')));
    expect(anonymise(adf)).toMatchSnapshot();
  });

  it('should anonymise bodiedExtension node', () => {
    const adf = doc(
      bodiedExtension({
        extensionKey: 'plugin',
        extensionType: 'com.atlassian.fabric',
        layout: 'full-width',
        parameters: {
          text: 'user content',
        },
        text: 'a fabric extension',
      })(),
    );
    expect(anonymise(adf)).toMatchSnapshot();
  });

  it('should anonymise bullet-list node', () => {
    const adf = doc(
      bulletList(listItem([p('a list item ')]), listItem([p('2 list item ')])),
    );
    expect(anonymise(adf)).toMatchSnapshot();
  });

  it('should anonymise code-block node', () => {
    const adf = doc(
      codeBlock({ language: 'javascript' })(text('const i = 0;')),
    );
    expect(anonymise(adf)).toMatchSnapshot();
  });

  it('should anonymise date node', () => {
    const adf = doc(p(date({ timestamp: '1111111111111' })));
    expect(anonymise(adf)).toMatchSnapshot();
  });

  it('should anonymise decision nodes', () => {
    const adf = doc(
      decisionList({ localId: 'xxxxx' })(
        decisionItem({ localId: 'xxx', state: 'DECIDED' })(
          text('this is a decision'),
        ),
      ),
    );
    expect(anonymise(adf)).toMatchSnapshot();
  });

  it('should anonymise emoji node', () => {
    const adf = doc(p(emoji({ id: '111', shortName: 'smile', text: 'smile' })));
    expect(anonymise(adf)).toMatchSnapshot();
  });

  it('should anonymise heading node', () => {
    const adf = doc(heading({ level: 1 })(text('this is heading')));
    expect(anonymise(adf)).toMatchSnapshot();
  });

  it('should anonymise extension node', () => {
    const adf = doc(
      extension({
        extensionKey: 'plugin',
        extensionType: 'com.atlassian.fabric',
        layout: 'full-width',
        parameters: {
          text: 'user content',
        },
        text: 'a fabric extension',
      }),
    );
    expect(anonymise(adf)).toMatchSnapshot();
  });

  it('should anonymise inline-card node', () => {
    const adf = doc(p(inlineCard({ url: 'https://www.atlassian.com' })));
    expect(anonymise(adf)).toMatchSnapshot();
  });

  it('should anonymise list nodes', () => {
    const adf = doc(ul(li([p('this is a list')])));
    expect(anonymise(adf)).toMatchSnapshot();
  });

  it('should anonymise media-group node', () => {
    const adf = doc(
      mediaGroup(
        media({
          type: 'file',
          id: 'xxx',
          collection: 'xxx',
          height: 183,
          width: 183,
          occurrenceKey: 'xxx',
        }),
      ),
    );
    expect(anonymise(adf)).toMatchSnapshot();
  });

  it('should anonymise mention node', () => {
    const adf = doc(p(mention({ id: 'xxx', text: 'tongli' })));
    expect(anonymise(adf)).toMatchSnapshot();
  });

  it('should anonymise panel node', () => {
    const adf = doc(panel({ panelType: 'info' })(p('this is user content')));
    expect(anonymise(adf)).toMatchSnapshot();
  });
});
