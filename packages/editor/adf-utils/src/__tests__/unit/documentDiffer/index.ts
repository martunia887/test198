import { diffDocs } from '../../../documentDiffer';

describe('Document differ', () => {
  it('should diff emoji', () => {
    const oldDoc = {
      version: 1,
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'emoji',
              attrs: {
                shortName: ':grinning:',
                id: '1f600',
                text: '😀',
              },
            },
          ],
        },
      ],
    };
    const newDoc = {
      version: 1,
      type: 'doc',
      content: [{ type: 'paragraph', content: [] }],
    };
    // should not crash
    const diff = diffDocs(oldDoc, newDoc);
    console.log(diff);
  });
});
