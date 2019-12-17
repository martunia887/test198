/** @jsx jsx */
import { FC, useState, useCallback } from 'react';
import Button from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';
import { Placement } from '@atlaskit/popper';
import { jsx } from '@emotion/core';

import Popup from '../src';

const spacerCSS = {
  margin: '250px',
};

const sizedContentCSS = {
  alignItems: 'center',
  height: '80px',
  overflow: 'auto',
  padding: '30px',
  textAlign: 'center',
  verticalAlign: 'center',
} as const;

type PopupProps = {
  setPosition(): void;
  placement: string;
  clickAwayClose: boolean;
  onClickawayChange(): void;
};

const PopupContent: FC<PopupProps> = ({
  setPosition,
  placement,
  clickAwayClose,
  onClickawayChange,
}) => {
  return (
    <div id="popup-content" css={sizedContentCSS}>
      <Button onClick={() => setPosition()}>Toggle Position</Button>
      <p>
        Current placement: <strong>{placement}</strong>
      </p>
      <hr />
      <p>Scroll down.</p>
      <Button>Button 5</Button>
      <Button>Button 6</Button>
      <Checkbox
        isChecked={clickAwayClose}
        value="clickaway"
        label="Close popup on click away"
        onChange={onClickawayChange}
        name="clickaway-checkbox"
      />
    </div>
  );
};

const placements: Placement[] = [
  'bottom-start',
  'bottom',
  'bottom-end',
  'top-start',
  'top',
  'top-end',
  'right-start',
  'right',
  'right-end',
  'left-start',
  'left',
  'left-end',
  'auto-start',
  'auto',
  'auto-end',
];

export default () => {
  const [idx, setIdx] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [clickAwayClose, setClickAwayClose] = useState(true);

  const placement = placements[idx];

  const setPlacement = () => {
    if (idx !== placements.length - 1) {
      setIdx(idx + 1);
    } else {
      setIdx(0);
    }
  };

  const onClickawayChange = useCallback(() => {
    setClickAwayClose(!clickAwayClose);
  }, [clickAwayClose]);

  return (
    <div css={spacerCSS}>
      <Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        content={() => (
          <PopupContent
            setPosition={setPlacement}
            placement={placement}
            clickAwayClose={clickAwayClose}
            onClickawayChange={onClickawayChange}
          />
        )}
        trigger={triggerProps => (
          <Button
            id="popup-trigger"
            {...triggerProps}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? 'Close' : 'Open'} Popup
          </Button>
        )}
        placement={placement}
        shouldCloseOnBodyClick={clickAwayClose}
      />
    </div>
  );
};
