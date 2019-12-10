import WikiMarkupTransformer from '../../..';
import { Context } from '../../../interfaces';

describe('WikiMarkup => ADF Formatters - citation', () => {
  test('[CS-491] should detect mention in the following pattern', () => {
    const wiki = 'Hi [~qm:78032763-2feb-4f5b-88c0-99b50613d53a],';

    const context: Context = {
      mentionConversion: {
        'qm:78032763-2feb-4f5b-88c0-99b50613d53a':
          '78032763-2feb-4f5b-88c0-99b50613d53a',
      },
    };
    const transformer = new WikiMarkupTransformer();
    expect(transformer.parse(wiki, context)).toMatchSnapshot();
  });
});
