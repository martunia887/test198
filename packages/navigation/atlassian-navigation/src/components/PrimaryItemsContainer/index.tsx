/** @jsx jsx */
import { jsx } from '@emotion/core';
import Popup from '@atlaskit/popup';
import { TriggerProps } from '@atlaskit/popup/types';
import WidthDetector from '@atlaskit/width-detector';
import { useCallback, useState } from 'react';

import {
  useOverflowController,
  OverflowProvider,
} from '../../controllers/overflow';
import { PrimaryDropdownButton } from '../PrimaryDropdownButton';

import { containerCSS, widthDetectorContainerStyle } from './styles';
import { PrimaryItemsContainerProps } from './types';
import { NavigationTheme } from '../../theme';

export const PrimaryItemsContainer = ({
  moreLabel,
  items,
  create: Create,
  theme,
}: PrimaryItemsContainerProps & { theme: NavigationTheme }) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [shouldCloseOnBodyClick, setShouldCloseOnBodyClick] = useState(true);
  const { updateWidth, visibleItems, overflowItems } = useOverflowController(
    items,
  );

  const onMoreClick = useCallback(() => {
    setIsMoreOpen(!isMoreOpen);
  }, [isMoreOpen]);

  const onMoreClose = useCallback(() => {
    setIsMoreOpen(false);
  }, []);

  const setCloseOnBodyClick = useCallback(
    value => setShouldCloseOnBodyClick(value),
    [],
  );

  const content = useCallback(
    () => (
      <OverflowProvider
        isVisible={false}
        setCloseOnBodyClick={setCloseOnBodyClick}
      >
        {overflowItems}
      </OverflowProvider>
    ),
    [overflowItems, setCloseOnBodyClick],
  );

  const trigger = useCallback(
    (triggerProps: TriggerProps) => (
      <PrimaryDropdownButton
        onClick={onMoreClick}
        isSelected={isMoreOpen}
        {...triggerProps}
      >
        {moreLabel}
      </PrimaryDropdownButton>
    ),
    [moreLabel, onMoreClick, isMoreOpen],
  );

  return (
    <div css={containerCSS(theme)}>
      <OverflowProvider isVisible setCloseOnBodyClick={setCloseOnBodyClick}>
        {visibleItems}
      </OverflowProvider>
      {overflowItems.length > 0 && (
        <Popup
          content={content}
          isOpen={isMoreOpen}
          onClose={onMoreClose}
          trigger={trigger}
          shouldCloseOnBodyClick={shouldCloseOnBodyClick}
        />
      )}
      {Create && <Create />}
      <WidthDetector
        containerStyle={widthDetectorContainerStyle}
        onResize={updateWidth}
      >
        {() => null}
      </WidthDetector>
    </div>
  );
};
