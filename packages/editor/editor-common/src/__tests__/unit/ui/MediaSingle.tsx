import React from 'react';
import { mount } from 'enzyme';
import MediaSingle from '../../../ui/MediaSingle';
import Wrapper from '../../../ui/MediaSingle/styled';

describe('MediaSingle', () => {
  describe('when forcePercentCalcWithContainerWidth is true', () => {
    it('should use containerWidth to calc the percent', () => {
      const component = mount(
        <MediaSingle
          layout="center"
          width={1400}
          height={600}
          containerWidth={2000}
          lineLength={1000}
          pctWidth={50}
          forcePercentCalcWithContainerWidth
        >
          <span />
        </MediaSingle>,
      );

      const fallbackSpan = component.find(Wrapper);
      expect(fallbackSpan).toHaveLength(1);
      expect(fallbackSpan.prop('width')).toEqual(988);
      component.unmount();
    });
  });

  describe('when forcePercentCalcWithContainerWidth is false', () => {
    it('should use lineLength to calc the percent', () => {
      const component = mount(
        <MediaSingle
          layout="center"
          width={1400}
          height={600}
          containerWidth={2000}
          lineLength={1000}
          pctWidth={50}
          forcePercentCalcWithContainerWidth={false}
        >
          <span />
        </MediaSingle>,
      );

      const fallbackSpan = component.find(Wrapper);
      expect(fallbackSpan).toHaveLength(1);
      expect(fallbackSpan.prop('width')).toEqual(488);
      component.unmount();
    });
  });
});
