import { createMjmlDocument, renderMjmlDocument } from '../../../email/mjml';

// WIP : ABANDONED

describe('Renderer - Email - ADF to MJML', () => {
  // tslint:disable-next-line:no-only-tests
  it.only('chould convert adf -> mjml', () => {
    const input: any = {
      type: 'doc',
      version: 1,
      content: [
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'inlineCard with url',
            },
          ],
          attrs: {
            level: 3,
          },
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Lorem ipsum',
            },
            {
              type: 'inlineCard',
              attrs: {
                url:
                  'https://extranet.atlassian.com/pages/viewpage.action?pageId=3088533424',
              },
            },
            {
              type: 'text',
              text: 'dolor sit amet',
            },
          ],
        },
      ],
    };
    const mjmlDocument = createMjmlDocument(input.content);
    // console.log(JSON.stringify(mjmlDocument, null, 2))
    expect(mjmlDocument).toMatchSnapshot();
  });

  // tslint:disable-next-line:no-only-tests
  it.only('chould convert very simple adf -> mjml -> html', () => {
    const input: any = {
      type: 'doc',
      version: 1,
      content: [
        {
          type: 'text',
          text: '!!!!!!! -----> SIMPLE TEXT <----- !!!!!! ',
        },
      ],
    };
    const mjmlDocument = createMjmlDocument(input.content);
    const htmlDocument = renderMjmlDocument(mjmlDocument);
    // tslint:disable-next-line:no-console
    console.log(JSON.stringify(mjmlDocument, null, 2));
    // tslint:disable-next-line:no-console
    console.log(htmlDocument);
    expect(htmlDocument).toMatchSnapshot();
  });

  // // tslint:disable-next-line:no-only-tests
  // it.skip('should convert slightly more complex adf -> mjml -> html', () => {

  //   const input: any = {
  //     "type": "doc",
  //     "version": 1,
  //     "content": [
  //       {
  //         "type": "heading",
  //         "content": [
  //           {
  //             "type": "text",
  //             "text": "inlineCard with url"
  //           }
  //         ],
  //         "attrs": {
  //           "level": 3
  //         }
  //       },
  //       {
  //         "type": "paragraph",
  //         "content": [
  //           {
  //             "type": "text",
  //             "text": "Lorem ipsum"
  //           },
  //           {
  //             "type": "inlineCard",
  //             "attrs": {
  //               "url": "https://extranet.atlassian.com/pages/viewpage.action?pageId=3088533424"
  //             }
  //           },
  //           {
  //             "type": "text",
  //             "text": "dolor sit amet"
  //           }
  //         ]
  //       }
  //     ]
  //   }
  //   const mjmlDocument = createMjmlDocument(input.content)
  //   const htmlDocument = renderMjmlDocument(mjmlDocument)
  //   // // tslint:disable-next-line:no-console
  //   // console.log(JSON.stringify(mjmlDocument, null, 2))
  //   // // tslint:disable-next-line:no-console
  //   // console.log(htmlDocument)
  //   expect(htmlDocument).toMatchSnapshot()
  // })
});
