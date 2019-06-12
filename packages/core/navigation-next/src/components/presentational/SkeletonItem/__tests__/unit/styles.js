// @flow
import skeletonItemStyles from '../../styles';

const modeArgs = {
  product: {
    background: {
      default: '#0065FF',
      hint: '#0F63E0',
      static: '#0B4BAA',
      interact: '#104493',
      skeleton: '#0B4BAA',
      separator: '#0B4BAA',
    },
    text: {
      default: '#DEEBFF',
      subtle: '#5AAD91',
      active: '#DEEBFF',
    },
  },
  container: {
    background: {
      default: '#0065FF',
      hint: '#0F63E0',
      static: '#0B4BAA',
      interact: '#104493',
      skeleton: '#0B4BAA',
      separator: '#0B4BAA',
    },
    text: {
      default: '#DEEBFF',
      subtle: '#5AAD91',
      active: '#DEEBFF',
    },
  },
};

describe('Navigation Next: SkeletonItem styles', () => {
  let styles;
  beforeEach(() => {
    styles = skeletonItemStyles(modeArgs)();
  });

  it('should add the static background color before the product', () => {
    expect(styles.product.before.backgroundColor).toEqual('#0B4BAA');
  });

  it('should add the static background color into the product content', () => {
    expect(styles.product.content.backgroundColor).toEqual('#0B4BAA');
  });
});
