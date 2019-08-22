import styled from 'styled-components';

import { HTMLAttributes, ImgHTMLAttributes, ComponentClass } from 'react';
import { borderIcon } from '../../../../icons';

export const SpinnerWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
  height: 100%;
  width: calc(100% - 25px);
  padding-top: 30px;
`;

export const DefaultImage: ComponentClass<ImgHTMLAttributes<{}>> = styled.img`
  float: left;
  width: 115px;
`;

export const TextWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  float: left;
`;

export const DropzoneText: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: block;
  margin-left: 10px;
  white-space: nowrap;
  margin-top: 15px;
  color: #6c798f;
`;

export const ButtonWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  margin-left: 10px;
  margin-top: 14px;
  text-align: center;
`;

export const DropzoneContentWrapper: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  display: block;
  float: left;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const DropzoneContainer: ComponentClass<HTMLAttributes<{}>> = styled.div`
  box-sizing: border-box;
  border: 2px dashed #cfd4db;
  border-image-source: url('${borderIcon}');
  border-image-slice: 2;
  border-image-repeat: round;
  border-radius: 3px;
  height: calc(100% - 20px);
  margin: 25px 25px 25px 0;
`;

export const RecentUploadsTitle: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  padding: 15px 10px 5px 0;
  font-size: 20px;
  color: #071d43;
`;

export const CardsWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 80px;
`;

export const CardWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  margin: 6px 0;
  margin-right: 12px;
  outline: none;

  /* Cards are displayed in rows of 4, line up last card with edge of dropzone border */
  &:nth-child(4n) {
    margin-right: 0;
  }
`;

export const LocalBrowserButtonWrapper = styled.div`
  position: absolute;
  bottom: 25px;
  left: 25px;
`;

export const Wrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 0px 0px 0px 25px;
`;

export const LoadingNextPageWrapper = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 70px;
  margin-top: 30px;
`;

export const UploadWrapper = styled.div`
  height: 100%;
`;

export const LocalButtonUploadWrapper = styled.div`
  button[type='button'] {
    justify-content: center;
  }
`;
