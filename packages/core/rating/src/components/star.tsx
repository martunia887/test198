import React, { useCallback, forwardRef } from 'react';
import StarIcon from '@atlaskit/icon/glyph/star';
import StarFilledIcon from '@atlaskit/icon/glyph/star-filled';
import { colors } from '@atlaskit/theme';
import RatingItem, { RatingItemProps, RatingItemRender } from './rating-item';

export interface StarProps extends RatingItemProps {
  /**
   * Size of the star icon.

   * Defaults to `"large"`.
   */
  size?: 'small' | 'medium' | 'large' | 'xlarge';

  /**
   * Color of the star icon,
   * when wanting to customize the color please ensure you use `colors` from `@atlaskit/theme`.

   * Defaults to `colors.Y200`.
   */
  color?: string;
}

const Star = forwardRef<HTMLLabelElement, StarProps>(
  ({ size = 'large', color = colors.Y200, ...props }, ref) => {
    const render: RatingItemRender = useCallback(
      props => {
        return props.isChecked ? (
          // Labels are set inside RatingItem - blank them out here to not double up.
          <StarFilledIcon size={size} primaryColor={color} label="" />
        ) : (
          // Labels are set inside RatingItem - blank them out here to not double up.
          <StarIcon size={size} primaryColor={color} label="" />
        );
      },
      [color, size],
    );

    return <RatingItem {...props} ref={ref} render={render} />;
  },
);

export default Star;
