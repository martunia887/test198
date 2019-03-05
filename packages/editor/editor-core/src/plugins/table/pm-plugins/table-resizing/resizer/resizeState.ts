import ColumnState from './columnState';
import { findNextFreeCol, makeColIdxPair, ColIdxPair } from './utils';

export function getCandidates(
  state: ResizeState,
  destIdx: number,
  amount: number,
) {
  let candidates = makeColIdxPair(state.cols);

  // only consider rows after the selected column in the direction of resize
  return amount < 0
    ? candidates.slice(0, destIdx)
    : candidates.slice(destIdx + 1);
}

export function reduceSpace(
  state: ResizeState,
  amount: number,
  ignoreCols: number[] = [],
) {
  let remaining = amount;

  // keep trying to resolve resize request until we run out of free space,
  // or nothing to resize
  while (remaining) {
    // filter candidates only with free space
    const candidates = makeColIdxPair(state.cols).filter(colIdxPair => {
      return (
        colIdxPair.col.freeSpace && ignoreCols.indexOf(colIdxPair.idx) === -1
      );
    });

    if (candidates.length === 0) {
      break;
    }

    const requestedResize = Math.ceil(remaining / candidates.length);
    if (requestedResize === 0) {
      break;
    }

    candidates.forEach(candidate => {
      let newWidth = candidate.col.width - requestedResize;
      let remainder = 0;
      if (newWidth < candidate.col.minWidth) {
        // If the new requested width is less than our min
        // Calc what width we didn't use, we'll try extract that
        // from other cols.
        remainder = candidate.col.minWidth - newWidth;
        newWidth = candidate.col.minWidth;
      }

      state = new ResizeState(
        [
          ...state.cols.slice(0, candidate.idx),
          candidate.col.clone(newWidth),
          ...state.cols.slice(candidate.idx + 1),
        ],
        state.maxSize,
        state.breakout,
        state.freeColFunc,
      );

      remaining -= requestedResize + remainder;
    });
  }

  return state;
}

export default class ResizeState {
  constructor(
    public cols: ColumnState[],
    public maxSize: number,
    public breakout: boolean = false,
    public freeColFunc: (
      colIdxObj: Array<ColIdxPair>,
      direction: number,
    ) => number = findNextFreeCol,
  ) {
    return Object.freeze(this);
  }

  get totalWidth() {
    return this.cols.reduce((totalWidth, col) => totalWidth + col.width, 0);
  }

  stackResize(colIdx: number, amount: number): ResizeState {
    // Dont allow resizing off the last column for grow.
    if (!this.cols[colIdx + 1]) {
      return new ResizeState(this.cols, this.maxSize, true);
    }

    let newState = this.clone();
    // Candidates is every column to the right of `colIdx`
    let candidates = getCandidates(newState, colIdx, amount);

    const cols = newState.cols;

    /**
     * In the case of shrink (amount less than zero).
     * We move the cursor of our `currentCol` plus one.
     * +------+------+------------+--------------+-------+
     * | Col1 | Col2 |    Col3    |     Col4     | Col 5 |
     * +------+------+------------+--------------+-------+
     * |      |      | *handle* > | < *handle*   |       |
     * |      |      | colIdx     | `currentCol` |       |
     * |      |      |            |              |       |
     * +------+------+------------+--------------+-------+
     *
     * Our candidates then become an array of `Col1`, `Col2` and `Col3`.
     *
     * In the case of grow, our cursor remains on `Col3`
     * And the candidates consist of `Col4` and `Col5`.
     */
    const currentColIdx = amount < 0 ? colIdx + 1 : colIdx;
    const currentCol = cols[currentColIdx];

    // Directly resize our target col.
    // We steal widths from other cols below.
    if (currentCol) {
      const newWidth = Math.max(
        // Amount should always be a positive number
        // when applying to the `currentCol`
        currentCol.width + Math.abs(amount),
        currentCol.minWidth,
      );

      cols[currentColIdx] = currentCol.clone(newWidth);
    }

    if (amount < 0) {
      candidates = [
        { col: cols[colIdx], idx: colIdx },
        ...candidates.reverse(),
      ];
    }

    // Iterate over all our 'candidates'.
    // Take as much width as possibile (upto Column minWidth)
    // Move onto to the next col until we dont meet minWidth.
    let remaining = amount;
    for (let { col, idx } of candidates) {
      // Skip any column already at its min.
      if (col.width === col.minWidth) {
        continue;
      }

      // Calculate potential new width.
      const newWidth = col.width - Math.abs(remaining);

      // Don't allow the column to go below its defined minWidth.
      if (newWidth < col.minWidth) {
        cols[idx] = col.clone(col.minWidth);
        remaining = col.minWidth - newWidth;
        continue;
      }

      // If we reach here, the remaining/amount value
      // didnt take up all available space in this column.
      // We can bail out here since there is no 'amount' left.
      cols[idx] = col.clone(newWidth);
      break;
    }

    return new ResizeState(cols, newState.maxSize, newState.breakout);
  }

  resize(colIdx: number, amount: number): ResizeState {
    if (amount !== 0) {
      return this.stackResize(colIdx, amount);
    }

    return this.clone();
  }

  scale(newWidth: number): ResizeState {
    const scaleFactor = newWidth / this.totalWidth;

    let accumulatedWidth = 0;
    let newState = new ResizeState(
      this.cols.map((col, index) => {
        const { minWidth, width } = col;
        let newColWidth = Math.floor(width * scaleFactor);

        // enforce min width
        if (newColWidth < minWidth) {
          newColWidth = minWidth;
        }

        accumulatedWidth += newColWidth;

        // Since we Math.floor above, often we fall short
        // of `newWidth` by ~5px, attempt to apply
        // remaining buffer to last cell.
        if (index + 1 === this.cols.length && accumulatedWidth < newWidth) {
          newColWidth = newColWidth + (newWidth - accumulatedWidth);
        }

        return col.clone(newColWidth);
      }),
      newWidth,
    );

    if (newState.totalWidth > newWidth) {
      newState = reduceSpace(newState, newState.totalWidth - newWidth);
    }

    return newState;
  }

  clone(): ResizeState {
    return new ResizeState(
      this.cols.map(col => col.clone()),
      this.maxSize,
      this.breakout,
      this.freeColFunc,
    );
  }
}
