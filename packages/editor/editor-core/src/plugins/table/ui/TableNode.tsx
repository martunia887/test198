import React, { FunctionComponent } from 'react';
import { Node as ProsemirrorNode } from 'prosemirror-model';
import { TableAttributes } from '@atlaskit/adf-schema';
import classnames from 'classnames';
import { TableCssClassName as ClassName } from '../types';
import { akEditorMobileBreakoutPoint } from '@atlaskit/editor-common';

interface TableNodeProps {
  node: ProsemirrorNode;
}

export const TableNode: FunctionComponent<TableNodeProps> = ({
  node,
  children,
}) => {
  const {
    isNumberColumnEnabled,
    layout,
    __autoSize,
  } = node.attrs as TableAttributes;
  return (
    <div
      style={{
        width: 700,
      }}
      className={classnames(ClassName.TABLE_CONTAINER, {
        'less-padding': 700 < akEditorMobileBreakoutPoint,
      })}
      data-number-column={isNumberColumnEnabled}
      data-layout={layout}
    >
      <div className={classnames(ClassName.TABLE_NODE_WRAPPER)}>
        <table
          data-number-column={isNumberColumnEnabled}
          data-layout={layout}
          data-autosize={__autoSize}
        >
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
};
