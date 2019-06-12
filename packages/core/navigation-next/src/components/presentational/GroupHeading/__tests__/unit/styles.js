// @flow
import groupHeadingStyles from '../../styles';

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

describe('Navigation Next: GroupHeading styles', () => {
  it('should add the default background color into the items styles if element has no active states', () => {
    const styles = groupHeadingStyles(modeArgs)();
    expect(styles.product.headingBase.color).toEqual('#5AAD91');
  });
});
