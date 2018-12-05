import styled from 'styled-components';
import { ComponentClass, HTMLAttributes } from 'react';
import { akColorR500 } from '@atlaskit/util-shared-styles';
import { checkeredBg } from '../src/image-placer/styled';

export const Slider = styled.input``;

export const Label: ComponentClass = styled.label`
  display: block;

  > input {
    margin-left: 10px;
  }

  > span {
    display: inline-block;
    min-width: 120px;
    text-align: right;
  }
`;

export const ExportedImage = styled.img`
  border: 1px solid #ccc;
`;

export const ExportedImageWrapper = styled.div`
  display: inline-block;
  background: url('${checkeredBg}');
  margin-top: 20px;
  position: relative;

  p {
    position: absolute;
    top: -18px;
    left: 0px;
    margin-top: 0;
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: blue;
  }
`;

export const ImagePlacerErrorWrapper: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  background-color: ${akColorR500};
  color: white;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
