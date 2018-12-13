import styled, { keyframes } from 'styled-components';
import { HTMLAttributes, ComponentClass, ImgHTMLAttributes } from 'react';
import {
  akColorN200,
  akColorB200,
  akColorN30,
  akColorN10,
  akColorN800,
  akBorderRadius,
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';
import { AVATAR_DIALOG_WIDTH, CONTAINER_SIZE } from './common';
import { AvatarImageProps } from './avatar';

/** AvatarPickerDialog */

export const AvatarPickerWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;

  .round-button {
    width: 40px;
    height: 40px;
    border-radius: 20px;

    align-items: center;
    justify-content: center;

    margin: 0;
    padding: 0;
  }

  .spinner {
    position: absolute;
    top: 160px;
  }
`;
AvatarPickerWrapper.displayName = 'AvatarPickerWrapper';

export const ModalHeader = styled.div`
  margin: 15px;
  font-weight: 500;
  font-size: 20px;
`;

export const ModalFooterButtons = styled.div`
  text-align: right;
  width: 100%;

  button:first-child {
    margin-right: 3px;
  }
`;

/** ImageView */

export const ImageViewWrapper = styled.div`
  border-radius: ${akGridSizeUnitless}px;
  position: relative;
  width: 256px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

ImageViewWrapper.displayName = 'ImageViewWrapper';

export const ErrorZoneText = styled.div`
  text-align: center;
  width: 120px;
`;

export const ErrorZone = styled.div`
  margin-top: 50px;
  color: ${akColorN200};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FileInput = styled.input`
  display: none;
`;

export const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 6px;
  right: 4px;
  width: 24px;
  height: 24px;
`;

export const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ImageButtonsWrapper = styled.div`
  color: ${akColorN200};
  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: 0px;
  position: absolute;

  div {
    margin-top: 15px;
  }

  button {
    margin: 0 5px;
  }
`;

/** DropZone */

export const ImageIcon = styled.img`
  width: 100px;
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const droppingAnimation = `
  border-color: #0e56c4;
  animation: ${spin} 8s linear infinite;
`;

export interface DragZoneProps {
  isDragging: boolean;
  showBorder: boolean;
  borderRadius: number;
}

export const DragZone: ComponentClass<
  HTMLAttributes<{}> & DragZoneProps
> = styled.div`
  width: ${CONTAINER_SIZE}px;
  height: ${CONTAINER_SIZE}px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-top: 15px;
  position: relative;
  border-radius: ${props => props.borderRadius}%;
  transition: background-color 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  color: ${akColorN200};
  pointer-events: none;

  &::after {
    content: '';
    border: ${props => (props.showBorder ? '2px dashed #d0d6d0' : 'none')};
    border-radius: ${props => props.borderRadius}%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: border-color 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  }

  ${props =>
    (props.isDragging &&
      `
    background-color: #ddecfe;
    color: blue;

    &::after {
      ${droppingAnimation}
    }
  `) ||
    ''};
`;

DragZone.displayName = 'DragZone';

export const DragZoneText = styled.div`
  text-align: center;
  width: 120px;
`;

/* Avatars */

const AvatarImage: ComponentClass<
  ImgHTMLAttributes<{}> & AvatarImageProps
> = styled.img`
  border-radius: ${akBorderRadius};
  cursor: pointer;
  ${props =>
    props.isSelected
      ? `box-shadow: 0px 0px 0px 1px white, 0px 0px 0px 3px ${akColorB200};`
      : ''}
`;

export const SmallAvatarImage = styled(AvatarImage)`
  width: ${akGridSizeUnitless * 5}px;
  height: ${akGridSizeUnitless * 5}px;
  margin: 0 2px;
`;

export const LargeAvatarImage = styled(AvatarImage)`
  width: ${akGridSizeUnitless * 9}px;
  height: ${akGridSizeUnitless * 9}px;
  margin: 0 5px 10px 5px;
`;

export const AvatarViewSmallWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 325px;
  width: 100%;
  justify-content: center;
`;

export const AvatarViewSmallDisabled = styled.div`
  background-color: white;
  opacity: 0.5;
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const AvatarViewLargeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 285px;
  position: relative;
  width: 105%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 5px 0 5px 0;
  box-sizing: border-box;
`;

export const AvatarViewLargeBottomLine = styled.div`
  position: absolute;
  bottom: 0;
  left: -20px;
  border-bottom: 1px solid ${akColorN30};
  width: ${AVATAR_DIALOG_WIDTH}px;
`;

/* StackedView */

export const StackedViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

StackedViewWrapper.displayName = 'StackedViewWrapper';

export const StackedViewHeader = styled.div`
  margin-bottom: 15px;
`;

StackedViewHeader.displayName = 'StackedViewHeader';

export const StackedViewTitle = styled.span`
  display: inline-block;
  color: ${akColorN200};
  margin-left: 10px;
`;

StackedViewTitle.displayName = 'StackedViewTitle';

/* WebCam */

export const VideoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 310px;
  position: relative;

  video {
    height: 250px;
    margin-bottom: 25px;
  }

  .message {
    position: absolute;
    top: 45%;
    width: 100%;
    text-align: center;
    color: ${akColorN200};
  }
`;

export const CountdownWrapper = styled.div`
  span {
    margin: 0 10px;
    font-size: 20px;
    vertical-align: middle;
  }
`;
