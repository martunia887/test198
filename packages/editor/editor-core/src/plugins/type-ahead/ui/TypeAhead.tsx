import * as React from 'react';
import styled from 'styled-components';
import { EditorView } from 'prosemirror-view';
import { borderRadius, gridSize } from '@atlaskit/theme/constants';
import { N0, N60A, N50A } from '@atlaskit/theme/colors';
import { divide } from '@atlaskit/theme/math';
import { Popup, akEditorFloatingDialogZIndex } from '@atlaskit/editor-common';
import { TypeAheadItemsList } from './TypeAheadItemsList';
import { selectByIndex } from '../commands/select-item';
import { setCurrentIndex } from '../commands/set-current-index';
import { TypeAheadItem } from '../types';

export const TypeAheadContent: React.ComponentClass<
  React.HTMLAttributes<{}>
> = styled.div`
  background: ${N0};
  border-radius: ${borderRadius()}px;
  box-shadow: 0 0 1px ${N60A}, 0 4px 8px -2px ${N50A};
  padding: ${divide(gridSize, 2)}px 0;
  width: 320px;
  max-height: 380px; /* ~5.5 visibile items */
  overflow-y: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  position: relative;
`;

export type TypeAheadProps = {
  active: boolean;
  items?: Array<TypeAheadItem>;
  isLoading?: boolean;
  currentIndex: number;
  editorView: EditorView;
  anchorElement?: HTMLElement;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;
};

export function TypeAhead({
  active,
  items,
  isLoading,
  anchorElement,
  currentIndex,
  editorView,
  popupsMountPoint,
  popupsBoundariesElement,
  popupsScrollableElement,
}: TypeAheadProps) {
  if (!active || !anchorElement || !items || !items.length) {
    return null;
  }
  return (
    <Popup
      zIndex={akEditorFloatingDialogZIndex}
      target={anchorElement}
      mountTo={popupsMountPoint}
      boundariesElement={popupsBoundariesElement}
      scrollableElement={popupsScrollableElement}
      fitHeight={300}
      fitWidth={340}
      offset={[0, 8]}
    >
      <TypeAheadContent className="fabric-editor-typeahead">
        {Array.isArray(items) ? (
          <TypeAheadItemsList
            insertByIndex={index =>
              selectByIndex(index)(editorView.state, editorView.dispatch)
            }
            setCurrentIndex={index =>
              setCurrentIndex(index)(editorView.state, editorView.dispatch)
            }
            items={items}
            currentIndex={currentIndex}
          />
        ) : !items && isLoading ? (
          'loading...'
        ) : (
          'no items'
        )}
      </TypeAheadContent>
    </Popup>
  );
}
