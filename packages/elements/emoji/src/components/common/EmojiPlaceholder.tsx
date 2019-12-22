import * as React from 'react';
import Tooltip from '@atlaskit/tooltip';
import classNames from 'classnames';

import { EmojiImageRepresentation } from '../../types';
import { defaultEmojiHeight } from '../../util/constants';
import {
  isImageRepresentation,
  isMediaRepresentation,
} from '../../util/type-helpers';

import { placeholder, placeholderContainer } from './styles';

export interface Props {
  shortName: string;
  size?: number;
  showTooltip?: boolean;
  representation?: EmojiImageRepresentation;
}

const EmojiPlaceholder = (props: Props) => {
  const {
    shortName,
    size = defaultEmojiHeight,
    showTooltip,
    representation,
  } = props;

  let scaledWidth;
  let scaledHeight;
  if (
    representation &&
    size &&
    (isImageRepresentation(representation) ||
      isMediaRepresentation(representation))
  ) {
    const width = representation.width;
    const height = representation.height;
    if (width && height) {
      scaledWidth = (size / height) * width;
      scaledHeight = size;
    }
  }
  const width: number = scaledWidth || size;
  const height: number = scaledHeight || size;
  const style = {
    fill: 'f7f7f7',
    width: `${width}px`,
    height: `${height}px`,
  };
  const classes = {
    [placeholder]: true,
    [placeholderContainer]: true,
  };

  const placeholderNode = (
    <span
      aria-label={shortName}
      className={classNames(classes)}
      style={style}
    />
  );

  return showTooltip ? (
    <Tooltip tag="span" content={shortName}>
      {placeholderNode}
    </Tooltip>
  ) : (
    placeholderNode
  );
};

export default EmojiPlaceholder;
