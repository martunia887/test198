import { name } from '../../../../version.json';
import { createSchema } from '../../../../schema/create-schema';
import { fromHTML, toHTML, textWithMarks } from '../../../../../test-helpers';

const testColorObj1 = { color: '#6b778c' };
const testColorObj2 = { color: '#6B778C' };

describe(`${name}/schema textColor mark`, () => {
  itMatches(
    `<span style="color: rgb(107, 119, 140);">text</span>`,
    'text',
    testColorObj1,
  );
  itMatches(`<span style="color: #6b778c;">text</span>`, 'text', testColorObj1);
  itMatches(`<span style="color: #6B778C;">text</span>`, 'text', testColorObj1);

  it('serializes to <span style="color: ...">', () => {
    const schema = makeSchema();
    const node = schema.text('foo', [
      schema.marks.textColor.create(testColorObj1),
    ]);
    expect(toHTML(node, schema)).toEqual(
      `<span style="color: ${testColorObj1.color}">foo</span>`,
    );
  });

  it('serializes to <span style="color: ..."> case preserving', () => {
    const schema = makeSchema();
    const node = schema.text('foo', [
      schema.marks.textColor.create(testColorObj2),
    ]);
    expect(toHTML(node, schema)).toEqual(
      `<span style="color: ${testColorObj2.color}">foo</span>`,
    );
  });
});

function makeSchema() {
  return createSchema({
    nodes: ['doc', 'paragraph', 'text'],
    marks: ['textColor'],
  });
}

function itMatches(
  html: string,
  expectedText: string,
  attrs: { color: string },
) {
  it(`matches ${html}`, () => {
    const schema = makeSchema();
    const doc = fromHTML(`${html}`, schema);
    const textColorNode = schema.marks.textColor.create(attrs);

    expect(textWithMarks(doc, expectedText, [textColorNode])).toBe(true);
  });
}
