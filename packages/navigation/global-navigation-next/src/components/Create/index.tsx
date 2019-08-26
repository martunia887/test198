/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from '@emotion/core';
import Button from '@atlaskit/button';
import AddIcon from '@atlaskit/icon/glyph/add';

import Item from '../Item';

import { createButtonStyles, buttonTheme, createIconStyles } from './styles';
import { CreateProps } from './types';

export const Create = ({ onClick, text = 'Create' }: CreateProps) => (
  <Fragment>
    <div css={createButtonStyles}>
      <Button onClick={onClick} theme={buttonTheme}>
        {text}
      </Button>
    </div>
    <div css={createIconStyles}>
      <Item
        appearance="secondary"
        onClick={onClick}
        text={<AddIcon label={text} />}
      />
    </div>
  </Fragment>
);
