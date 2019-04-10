import { Node as PmNode } from 'prosemirror-model';
import {
  isRgb,
  rgbToHex,
  N20,
  B50,
  T50,
  P50,
  R50,
  G50,
  Y50,
  N0,
  B75,
  G75,
  R75,
  N40,
  P75,
  T75,
  Y75,
} from '../../utils/colors';
import { uuid } from '../../utils';
import { TableCellContent } from './doc';

const akEditorTableNumberColumnWidth = 42;
const DEFAULT_TABLE_HEADER_CELL_BACKGROUND = N20.toLocaleLowerCase();

const getCellAttrs = (dom: HTMLElement, defaultValues: CellAttributes = {}) => {
  const widthAttr = dom.getAttribute('data-colwidth');
  const width =
    widthAttr && /^\d+(,\d+)*$/.test(widthAttr)
      ? widthAttr.split(',').map(str => Number(str))
      : null;
  const colspan = Number(dom.getAttribute('colspan') || 1);
  let { backgroundColor } = dom.style;
  if (backgroundColor && isRgb(backgroundColor)) {
    backgroundColor = rgbToHex(backgroundColor);
  }

  const attrs = {
    colspan,
    rowspan: Number(dom.getAttribute('rowspan') || 1),
    colwidth: width && width.length === colspan ? width : undefined,
    background:
      backgroundColor && backgroundColor !== defaultValues['background']
        ? backgroundColor
        : undefined,
    isFormatted: Boolean(dom.getAttribute('data-is-formatted')),
  };

  if (dom.nodeName === 'TH') {
    return {
      ...attrs,
      id: uuid.generate(),
      reference: dom.getAttribute('data-reference') || null,
      formatting: JSON.parse(dom.getAttribute('data-formatting') || '{}'),
      filter: JSON.parse(dom.getAttribute('data-filter') || '{}'),
    };
  }

  return attrs;
};

export const setCellAttrs = (node: PmNode, cell?: HTMLElement) => {
  const attrs: {
    colspan?: number;
    rowspan?: number;
    style?: string;
    'data-colwidth'?: string;
    'data-id'?: string;
    'data-reference'?: string;
    'data-formatting'?: string;
    'data-is-formatted'?: boolean;
    'data-filter'?: string;
  } = {};
  const colspan = cell ? parseInt(cell.getAttribute('colspan') || '1', 10) : 1;
  const rowspan = cell ? parseInt(cell.getAttribute('rowspan') || '1', 10) : 1;

  if (node.attrs.colspan !== colspan) {
    attrs.colspan = node.attrs.colspan;
  }
  if (node.attrs.rowspan !== rowspan) {
    attrs.rowspan = node.attrs.rowspan;
  }

  if (node.attrs.colwidth) {
    attrs['data-colwidth'] = node.attrs.colwidth.join(',');
  }
  if (node.attrs.background) {
    const { background } = node.attrs;
    const nodeType = node.type.name;

    // to ensure that we don't overwrite product's style:
    // - it clears background color for <th> if its set to gray
    // - it clears background color for <td> if its set to white
    const ignored =
      (nodeType === 'tableHeader' &&
        background === tableBackgroundColorNames.get('gray')) ||
      (nodeType === 'tableCell' &&
        background === tableBackgroundColorNames.get('white'));

    if (ignored) {
      attrs.style = '';
    } else {
      const color = isRgb(background) ? rgbToHex(background) : background;

      attrs.style = `${attrs.style || ''}background-color: ${color};`;
    }
  } else {
    attrs.style = `${attrs.style || ''}background-color: none;`;
  }

  if (node.type.name === 'tableHeader') {
    attrs['data-id'] = node.attrs.id;

    if (node.attrs.reference) {
      attrs['data-reference'] = node.attrs.reference;
    }
    if (node.attrs.formatting) {
      attrs['data-formatting'] = JSON.stringify(node.attrs.formatting);
    }
    if (node.attrs.filter) {
      attrs['data-filter'] = JSON.stringify(node.attrs.filter);
    }
  }

  attrs['data-is-formatted'] = node.attrs.isFormatted;

  return attrs;
};

export const tableBackgroundColorPalette = new Map<string, string>();

/** New borders for colors in the color picker */
export const tableBackgroundBorderColors = {
  blue: B75,
  teal: T75,
  red: R75,
  gray: N40,
  purple: P75,
  green: G75,
  yellow: Y75,
  white: N40,
};

export const tableBackgroundColorNames = new Map<string, string>();
[
  [B50, 'Blue'],
  [T50, 'Teal'],
  [R50, 'Red'],
  [N20, 'Gray'],
  [P50, 'Purple'],
  [G50, 'Green'],
  [Y50, 'Yellow'],
  [N0, 'White'],
].forEach(([colorValue, colorName]) => {
  tableBackgroundColorPalette.set(colorValue.toLowerCase(), colorName);
  tableBackgroundColorNames.set(
    colorName.toLowerCase(),
    colorValue.toLowerCase(),
  );
});

export function calcTableColumnWidths(node: PmNode): number[] {
  let tableColumnWidths: Array<number> = [];
  const { isNumberColumnEnabled } = node.attrs;

  node.forEach((rowNode, _) => {
    rowNode.forEach((colNode, _, j) => {
      let colwidth = colNode.attrs.colwidth || [0];

      if (isNumberColumnEnabled && j === 0) {
        if (!colwidth) {
          colwidth = [akEditorTableNumberColumnWidth];
        }
      }

      // if we have a colwidth attr for this cell, and it contains new
      // colwidths we haven't seen for the whole table yet, add those
      // (colwidths over the table are defined as-we-go)
      if (colwidth && colwidth.length + j > tableColumnWidths.length) {
        tableColumnWidths = tableColumnWidths.slice(0, j).concat(colwidth);
      }
    });
  });

  return tableColumnWidths;
}

export type Layout = 'default' | 'full-width' | 'wide';

export type Condition =
  | 'is'
  | 'is_not'
  | 'contains'
  | 'does_not_contain'
  | 'is_empty'
  | 'is_not_empty';

export type FormattingMarks = 'strong' | 'em' | 'underline' | 'strike';

export interface TableAttributes {
  isNumberColumnEnabled?: boolean;
  layout?: Layout;
  __autoSize?: boolean;
  id?: string;
  title?: string;
}

/**
 * @name table_node
 */
export interface TableDefinition {
  type: 'table';
  attrs?: TableAttributes;
  /**
   * @minItems 1
   */
  content: Array<TableRow>;
}

/**
 * @name table_row_node
 */
export interface TableRow {
  type: 'tableRow';
  attrs?: TableRowAttributes;
  content: Array<TableHeader | TableCell>;
}

/**
 * @name table_cell_node
 */
export interface TableCell {
  type: 'tableCell';
  attrs?: CellAttributes;
  content: TableCellContent;
}

/**
 * @name table_header_node
 */
export interface TableHeader {
  type: 'tableHeader';
  attrs?: HeaderCellAttributes;
  content: TableCellContent;
}

export interface CellAttributes {
  colspan?: number;
  rowspan?: number;
  colwidth?: number[];
  background?: string;
  isFormatted?: boolean;
}

export interface HeaderCellAttributes extends CellAttributes {
  id?: string;
  reference?: string;
  formatting?: {
    rules: Array<{
      condition: Condition;
      value: string;
    }>;
    marks: FormattingMarks[];
  };
  filter?: { label: string; value: string }[];
}

export interface TableRowAttributes {
  isFiltered?: boolean;
}

// TODO: Fix any, potential issue. ED-5048
export const table: any = {
  content: 'tableRow+',
  attrs: {
    isNumberColumnEnabled: { default: false },
    layout: { default: 'default' },
    __autoSize: { default: false },
    id: { default: null },
    title: { default: null },
  },
  tableRole: 'table',
  isolating: true,
  selectable: false,
  group: 'block',
  parseDOM: [
    {
      tag: 'table',
      getAttrs: (dom: Element) => ({
        isNumberColumnEnabled:
          dom.getAttribute('data-number-column') === 'true' ? true : false,
        layout: dom.getAttribute('data-layout') || 'default',
        __autoSize: dom.getAttribute('data-autosize') === 'true' ? true : false,
        id: uuid.generate(),
        title: dom.getAttribute('data-title') || null,
      }),
    },
  ],
  toDOM(node: PmNode) {
    const attrs = {
      'data-number-column': node.attrs.isNumberColumnEnabled,
      'data-layout': node.attrs.layout,
      'data-autosize': node.attrs.__autoSize,
    };
    return ['table', attrs, ['tbody', 0]];
  },
};

export const tableToJSON = (node: PmNode) => ({
  attrs: Object.keys(node.attrs)
    .filter(key => !key.startsWith('__'))
    .reduce<typeof node.attrs>((obj, key) => {
      obj[key] = node.attrs[key];
      return obj;
    }, {}),
});

export const tableRow = {
  content: '(tableCell | tableHeader)+',
  tableRole: 'row',
  attrs: {
    isFiltered: { default: false },
  },
  parseDOM: [
    {
      tag: 'tr',
      getAttrs: (dom: Element) => ({
        isFiltered: dom.getAttribute('data-is-filtered') || false,
      }),
    },
  ],
  toDOM(node: PmNode) {
    const attrs = {
      'data-is-filtered': node.attrs.isFiltered,
    };
    return ['tr', attrs, 0];
  },
};

const cellAttrs = {
  colspan: { default: 1 },
  rowspan: { default: 1 },
  colwidth: { default: null },
  background: { default: null },
  id: { default: null },
  reference: { default: null },
  isFormatted: { default: false },
  formatting: { default: null },
  filter: { default: null },
};

export const tableCell = {
  content:
    '(paragraph | panel | blockquote | orderedList | bulletList | rule | heading | codeBlock |  mediaGroup | mediaSingle | applicationCard | decisionList | taskList | blockCard | extension | unsupportedBlock)+',
  attrs: cellAttrs,
  tableRole: 'cell',
  marks: 'alignment',
  isolating: true,
  parseDOM: [
    // Ignore number cell copied from renderer
    {
      tag: '.ak-renderer-table-number-column',
      ignore: true,
    },
    {
      tag: 'td',
      getAttrs: (dom: HTMLElement) => getCellAttrs(dom),
    },
  ],
  toDOM(node: PmNode) {
    return ['td', setCellAttrs(node), 0];
  },
};

export const toJSONTableCell = (node: PmNode) => ({
  attrs: (Object.keys(node.attrs) as Array<keyof CellAttributes>).reduce<
    Record<string, any>
  >((obj, key) => {
    if (cellAttrs[key].default !== node.attrs[key]) {
      obj[key] = node.attrs[key];
    }

    return obj;
  }, {}),
});

export const tableHeader = {
  content:
    '(paragraph | panel | blockquote | orderedList | bulletList | rule | heading | codeBlock | mediaGroup | mediaSingle  | applicationCard | decisionList | taskList | blockCard | extension)+',
  attrs: {
    ...cellAttrs,
    id: { default: null },
    reference: { default: null },
    formatting: { default: null },
    filter: { default: null },
  },
  tableRole: 'header_cell',
  isolating: true,
  marks: 'alignment',
  parseDOM: [
    {
      tag: 'th',
      getAttrs: (dom: HTMLElement) =>
        getCellAttrs(dom, { background: DEFAULT_TABLE_HEADER_CELL_BACKGROUND }),
    },
  ],
  toDOM(node: PmNode) {
    return ['th', setCellAttrs(node), 0];
  },
};

export const toJSONTableHeader = toJSONTableCell;
