import * as React from 'react';
import { SyntheticEvent } from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Tooltip from '@atlaskit/tooltip';
import { TableCssClassName as ClassName } from '../../types';
import tableMessages from '../messages';
import * as keymaps from '../../../../keymaps';
import InsertLine from './InsertLine';

export interface ButtonProps {
  type: 'row' | 'column';
  tableRef: HTMLElement;
  index: number;
  showInsertButton: boolean;
  onMouseDown: (event: SyntheticEvent<HTMLButtonElement>) => void;
}

const tooltipMessageByType = (type: string) => {
  return type === 'row' ? tableMessages.insertRow : tableMessages.insertColumn;
};

const shortcutMessageByType = (type?: string) => {
  return type === 'row'
    ? keymaps.tooltip(keymaps.addRowAfter)
    : keymaps.tooltip(keymaps.addColumnAfter);
};

const shortcutTooltip = (message: string, shortcut?: string) => (
  <span>
    {message} <small>{shortcut}</small>
  </span>
);

const InsertButton = ({
  onMouseDown,
  index,
  tableRef,
  showInsertButton,
  type,
  intl: { formatMessage },
}: ButtonProps & InjectedIntlProps) => (
  <div
    data-index={index}
    className={`${ClassName.CONTROLS_INSERT_BUTTON_WRAP} ${
      type === 'row'
        ? ClassName.CONTROLS_INSERT_ROW
        : ClassName.CONTROLS_INSERT_COLUMN
    }`}
  >
    {showInsertButton && (
      <Tooltip
        content={shortcutTooltip(
          formatMessage(tooltipMessageByType(type)),
          shortcutMessageByType(type),
        )}
        position="top"
      >
        <>
          <div className={ClassName.CONTROLS_INSERT_BUTTON_INNER}>
            <button
              type="button"
              className={ClassName.CONTROLS_INSERT_BUTTON}
              onMouseDown={onMouseDown}
            >
              <svg className={ClassName.CONTROLS_BUTTON_ICON}>
                <path
                  d="M10 4a1 1 0 0 1 1 1v4h4a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H5a1 1 0 1 1 0-2h4V5a1 1 0 0 1 1-1z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <InsertLine type={type} tableRef={tableRef} />
        </>
      </Tooltip>
    )}
    <div className={ClassName.CONTROLS_INSERT_MARKER} />
  </div>
);

export default injectIntl(InsertButton);
