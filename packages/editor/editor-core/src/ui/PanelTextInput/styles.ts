import styled from 'styled-components';
import { InputHTMLAttributes, ComponentClass } from 'react';

// Normal .className gets overridden by input[type=text] hence this hack to produce input.className
export const Input: ComponentClass<
  InputHTMLAttributes<{}> & { innerRef?: any }
> = styled.input`
  input& {
    background: transparent;
    border: 0;
    border-radius: 0;
    box-sizing: content-box;
    color: hotpink;
    flex-grow: 1;
    font-size: 13px;
    line-height: 20px;
    padding: 0;
    ${props => (props.width ? `width: ${props.width}px` : '')};
    min-width: 145px;

    /* Hides IE10+ built-in [x] clear input button */
    &::-ms-clear {
      display: none;
    }

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: hotpink;
      opacity: 0.5;
    }
  }
`;
