import styled from 'styled-components';
// @ts-ignore: unused variable
// prettier-ignore
import { HTMLAttributes, ClassAttributes, ComponentClass } from 'react';
import { fontSize } from '@atlaskit/theme';
import { borderRadius } from '@atlaskit/theme';

export const padding = 8;

export const Wrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  background: hotpink;
  border-radius: ${borderRadius()}px;
  position: relative;
  vertical-align: middle;
  font-size: ${fontSize()}px;

  .ProseMirror-selectednode > & > .extension-overlay {
    border: 2px solid hotpink;
    top: -2px;
    left: -2px;
    opacity: 1;
  }

  &.with-overlay {
    .extension-overlay {
      background: hotpink;
      color: transparent;
    }

    &:hover .extension-overlay {
      opacity: 1;
    }
  }
`;

export const Overlay: ComponentClass<HTMLAttributes<{}>> = styled.div`
  border-radius: ${borderRadius()}px;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
`;

export const PlaceholderFallback: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  display: inline-flex;
  align-items: center;

  & > img {
    margin: 0 4px;
  }
`;

export const PlaceholderFallbackParams: ComponentClass<
  HTMLAttributes<{}>
> = styled.span`
  display: inline-block;
  max-width: 200px;
  margin-left: 5px;
  color: hotpink;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
