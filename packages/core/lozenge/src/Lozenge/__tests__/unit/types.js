// @flow
import Lozenge from '../../..';

describe('Lozenge', () => {
  it('should do something', () => {
    const generatedSnapShot = `
      declare module '@atlaskit/lozenge' {
  
      }
    `;
    expect(generatedSnapShot).toMatchSnapshot();
  });
});
