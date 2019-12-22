import * as React from 'react';
import QuestionIcon from '@atlaskit/icon/glyph/question';
import { PositionType } from '@atlaskit/tooltip/types';

import ToolbarButton from '../ToolbarButton';
import WithHelpTrigger from '../WithHelpTrigger';

interface Props {
  title?: string;
  titlePosition?: PositionType;
}

export default ({
  title = 'Open help dialog',
  titlePosition = 'left',
}: Props) => (
  <WithHelpTrigger
    render={(showHelp: () => void) => (
      <ToolbarButton
        onClick={showHelp}
        title={title}
        titlePosition={titlePosition}
        iconBefore={<QuestionIcon label={title} />}
      />
    )}
  />
);
