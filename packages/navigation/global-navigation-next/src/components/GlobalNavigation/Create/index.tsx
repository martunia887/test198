/** @jsx jsx */
import { jsx } from '@emotion/core';
import Button from '@atlaskit/button';
import AddIcon from '@atlaskit/icon/glyph/add';
import { CreateProps } from './types';
import { CREATE_BREAKPOINT } from '../../../common/constants';
import { buttonTheme } from './styles';
import Item from '../../Item';

type Props = CreateProps & {
  width?: number;
};

const Create = ({ onClick, text = 'Create', width }: Props) => {
  const fullWidth = width && width > CREATE_BREAKPOINT;
  return fullWidth ? (
    <Button onClick={onClick} theme={buttonTheme}>
      {text}
    </Button>
  ) : (
    <Item
      appearance="secondary"
      onClick={onClick}
      text={<AddIcon label={text} />}
    />
  );
};

export default Create;
