jest.mock('react-dom');
import { getElementDimensions } from '../../getElementDimension';

describe('getElementDimension', () => {
  it('should return a rounded value for the passed dimension', () => {
    const element = {
      getBoundingClientRect() {
        return {
          width: 1.1,
          height: 10.2,
        };
      },
    };
    const { width, height } = getElementDimensions(element as Element);
    expect(width).toEqual(1);
    expect(height).toEqual(10);
  });
});
