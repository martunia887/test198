import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Node as PmNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { findDomRefAtPos } from 'prosemirror-utils';
import { setCellAttrs } from '@atlaskit/editor-common';
import Button from '@atlaskit/button';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import EditorTextStyleIcon from '@atlaskit/icon/glyph/editor/text-style';
import EditorMentionIcon from '@atlaskit/icon/glyph/editor/mention';
import EditorTaskIcon from '@atlaskit/icon/glyph/editor/task';
import EditorEmojiIcon from '@atlaskit/icon/glyph/editor/emoji';
import DecisionIcon from '@atlaskit/icon/glyph/editor/decision';
import Date from '../icons/Date';
import Number from '../icons/Number';
import MultiSelect from '../icons/MultiSelect';
import Slider from '../icons/Slider';
import Currency from '../icons/Currency';
import EditorAlignLeftIcon from '@atlaskit/icon/glyph/editor/align-left';
import RadioIcon from '@atlaskit/icon/glyph/radio';
import EditorWarningIcon from '@atlaskit/icon/glyph/editor/warning';

import ReactNodeView from '../../../nodeviews/ReactNodeView';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import ToolbarButton from '../../../ui/ToolbarButton';
import WithPluginState from '../../../ui/WithPluginState';
import messages from '../ui/messages';
import { pluginKey } from '../pm-plugins/main';
import { pluginKey as columnTypesPluginKey } from '../pm-plugins/column-types';
import { toggleContextualMenu } from '../actions';
import { TableCssClassName as ClassName } from '../types';
import { closestElement } from '../../../utils/';

export interface CellViewProps {
  node: PmNode;
  view: EditorView;
  portalProviderAPI: PortalProviderAPI;
  getPos: () => number;
}

export type CellProps = {
  view: EditorView;
  node: PmNode;
  forwardRef: (ref: HTMLElement | null) => void;
  withCursor: boolean;
  isContextualMenuOpen: boolean;
  getPos: () => number;
  columnIndex?: number;
};

class Cell extends React.Component<CellProps & InjectedIntlProps> {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.withCursor !== nextProps.withCursor ||
      this.props.isContextualMenuOpen !== nextProps.isContextualMenuOpen ||
      this.props.columnIndex !== nextProps.columnIndex ||
      this.props.node.attrs.cellType !== nextProps.node.attrs.cellType
    );
  }

  render() {
    const {
      withCursor,
      isContextualMenuOpen,
      forwardRef,
      intl: { formatMessage },
      node,
      view: {
        state: { schema },
      },
    } = this.props;
    const labelCellOptions = formatMessage(messages.cellOptions);

    return (
      <div className={ClassName.CELL_NODEVIEW_WRAPPER}>
        <div className={ClassName.CELL_NODEVIEW_CONTENT} ref={forwardRef}>
          {withCursor && (
            <div className={ClassName.CONTEXTUAL_MENU_BUTTON}>
              <ToolbarButton
                selected={isContextualMenuOpen}
                title={labelCellOptions}
                onClick={this.toggleContextualMenu}
                iconBefore={<ExpandIcon label={labelCellOptions} />}
              />
            </div>
          )}
        </div>
        {node.type === schema.nodes.tableHeader && (
          <div className={ClassName.CELL_NODEVIEW_COLUMN_TYPES_BUTTON}>
            <Button
              appearance="subtle"
              iconBefore={this.getCellTypeIcon()}
              spacing="none"
              onClick={this.toggleCellTypeMenu}
              isSelected={this.isColumnTypeMenuOpen()}
            />
          </div>
        )}
      </div>
    );
  }

  private isColumnTypeMenuOpen = (): boolean => {
    const pos = this.props.getPos();
    if (pos) {
      const { columnIndex, view } = this.props;
      const cell = findDomRefAtPos(
        pos,
        view.domAtPos.bind(view),
      ) as HTMLTableDataCellElement;
      return (
        typeof columnIndex !== 'undefined' && cell.cellIndex === columnIndex
      );
    }
    return false;
  };

  private toggleContextualMenu = () => {
    const { state, dispatch } = this.props.view;
    toggleContextualMenu(state, dispatch);
  };

  private toggleCellTypeMenu = (event: MouseEvent) => {
    const { dispatch, state } = this.props.view;
    const target = event.target as HTMLElement;
    const ref = closestElement(target, 'th') as HTMLTableDataCellElement;
    const columnIndex = ref ? ref.cellIndex : undefined;
    const targetCellPosition = this.props.getPos();
    if (targetCellPosition) {
      dispatch(
        state.tr.setMeta(columnTypesPluginKey, {
          isMenuOpen: true,
          targetCellPosition,
          columnIndex,
        }),
      );
    }
  };

  private getCellTypeIcon = () => {
    let icon;
    switch (this.props.node.attrs.cellType) {
      case 'text':
        icon = <EditorTextStyleIcon label="Normal text" />;
        break;
      case 'long-text':
        icon = <EditorAlignLeftIcon label="Long text" />;
        break;
      case 'number':
        icon = <Number label="Number" />;
        break;
      case 'currency':
        icon = <Currency label="Currency" />;
        break;
      case 'date':
        icon = <Date label="Date" />;
        break;
      case 'mention':
        icon = <EditorMentionIcon label="Person" />;
        break;
      case 'checkbox':
        icon = <EditorTaskIcon label="Checkbox" />;
        break;
      case 'slider':
        icon = <Slider label="Slider" />;
        break;
      case 'emoji':
        icon = <EditorEmojiIcon label="Emoji" />;
        break;
      case 'decision':
        icon = <DecisionIcon label="Decision" />;
        break;
      case 'single-select':
        icon = <ExpandIcon label="Single select" />;
        break;
      case 'multi-select':
        icon = <MultiSelect label="Multiple select" />;
        break;
      case 'radio-select':
        icon = <RadioIcon label="Radio" />;
        break;
      case 'status-select':
        icon = <EditorWarningIcon label="Status" />;
        break;
      default:
        icon = <EditorTextStyleIcon label="Normal text" />;
        break;
    }
    return icon;
  };
}

const CellComponent = injectIntl(Cell);

class CellView extends ReactNodeView {
  private cell: HTMLElement | undefined;

  constructor(props: CellViewProps) {
    super(props.node, props.view, props.getPos, props.portalProviderAPI, props);
  }

  createDomRef() {
    const { tableCell } = this.view.state.schema.nodes;
    this.cell = document.createElement(
      `t${this.node.type === tableCell ? 'd' : 'h'}`,
    );
    return this.cell;
  }

  getContentDOM() {
    const dom = document.createElement('div');
    dom.className = ClassName.TABLE_CELL_NODEVIEW_CONTENT_DOM;
    return { dom };
  }

  setDomAttrs(node) {
    const { cell } = this;
    if (cell) {
      const attrs = setCellAttrs(node, cell);
      Object.keys(attrs).forEach(attr => {
        cell.setAttribute(attr, attrs[attr]);
      });
    }
  }

  render(props, forwardRef) {
    // nodeview does not re-render on selection changes
    // so we trigger render manually to hide/show contextual menu button when `targetCellPosition` is updated
    return (
      <WithPluginState
        plugins={{
          pluginState: pluginKey,
          columnTypesState: columnTypesPluginKey,
        }}
        editorView={props.view}
        render={({ pluginState, columnTypesState }) => (
          <CellComponent
            forwardRef={forwardRef}
            withCursor={this.getPos() === pluginState.targetCellPosition}
            isContextualMenuOpen={pluginState.isContextualMenuOpen}
            columnIndex={columnTypesState.columnIndex}
            view={props.view}
            node={this.node}
            getPos={this.getPos}
          />
        )}
      />
    );
  }

  ignoreMutation(record: MutationRecord) {
    // @see https://github.com/ProseMirror/prosemirror/issues/862
    const target = record.target as HTMLElement;
    if (
      record.attributeName === 'class' ||
      (target && closestElement(target, `.${ClassName.CELL_NODEVIEW_WRAPPER}`))
    ) {
      return true;
    }
    return false;
  }
}

export const createCellView = (portalProviderAPI: PortalProviderAPI) => (
  node,
  view,
  getPos,
): NodeView => {
  return new CellView({ node, view, getPos, portalProviderAPI }).init();
};
