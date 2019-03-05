import ColumnState from './columnState';
import { findNextFreeCol, makeColIdxPair, ColIdxPair } from './utils';

export enum ColType {
  SOURCE = 'src',
  DEST = 'dest',
}

export function amountFor(colType: ColType) {
  return (amount: number) =>
    colType === ColType.SOURCE
      ? amount > 0
        ? -amount
        : amount
      : amount < 0
      ? -amount
      : amount;
}

export function widthFor(colType: ColType) {
  return (amount: number, srcCol: ColumnState, destCol: ColumnState) =>
    (colType === ColType.SOURCE ? srcCol : destCol).width +
    amountFor(colType)(amount);
}

// TODO: should handle when destIdx:
// - is beyond the range, and then not give it back
export function moveSpaceFrom(
  state: ResizeState,
  srcIdx: number,
  destIdx: number,
  amount: number,
  useFreeSpace: boolean = true,
) {
  const srcCol = state.cols[srcIdx];
  const destCol = state.cols[destIdx];

  if (useFreeSpace) {
    // if taking more than source column's free space, only take that much
    if (amountFor(ColType.DEST)(amount) > srcCol.freeSpace) {
      amount = amount > 0 ? srcCol.freeSpace : -srcCol.freeSpace;
    }
  }

  // if the source column shrinks past its min size, don't give the space away
  if (
    amountFor(ColType.SOURCE)(amount) < 0 &&
    widthFor(ColType.SOURCE)(amount, srcCol, destCol) < srcCol.minWidth
  ) {
    amount = srcCol.width - srcCol.minWidth;
  }

  const newDest = destCol
    ? destCol.clone(widthFor(ColType.DEST)(amount, srcCol, destCol))
    : undefined;
  if (!newDest && amountFor(ColType.SOURCE)(amount) < 0) {
    // non-zero-sum game, ensure that we're not removing more than the total table width either
    if (
      state.totalWidth -
        srcCol.width +
        widthFor(ColType.SOURCE)(amount, srcCol, destCol) <
      state.maxSize
    ) {
      // would shrink table below max width, stop it
      amount =
        state.maxSize - (state.totalWidth - srcCol.width) - srcCol.width - 1;
    }
  }

  const newSrc = srcCol.clone(
    widthFor(ColType.SOURCE)(amount, srcCol, destCol),
  );

  const newCols = state.cols
    .map((existingCol, idx) =>
      idx === srcIdx ? newSrc : idx === destIdx ? newDest : existingCol,
    )
    .filter(Boolean) as ColumnState[];

  return { state: new ResizeState(newCols, state.maxSize), amount };
}

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

export function stackSpace(state, destIdx, amount) {
  const candidates = getCandidates(state, destIdx, amount);

  while (candidates.length && amount) {
    // search for most (or least) free space in candidates
    const candidateIdx = state.freeColFunc(candidates, amount);
    if (candidateIdx === -1) {
      // no free space remains
      break;
    }

    let { col: srcCol, idx: srcIdx } = candidates.splice(candidateIdx, 1)[0];

    if (srcCol.freeSpace <= 0) {
      // no more columns with free space remain
      break;
    }

    const res = moveSpaceFrom(state, srcIdx, destIdx, amount);
    state = res.state;
    amount -= res.amount;
  }

  return {
    state,
    remaining: amount,
  };
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

const serialiseMap = (map: Map<number, ColumnState>) => {
  const arr: Array<ColumnState> = [];
  for (let [, col] of map) {
    arr.push(col);
  }

  return arr;
};

export default class ResizeState {
  public colMap: Map<number, ColumnState> = new Map();

  constructor(
    public cols: ColumnState[],
    public maxSize: number,
    public breakout: boolean = false,
    public freeColFunc: (
      colIdxObj: Array<ColIdxPair>,
      direction: number,
    ) => number = findNextFreeCol,
  ) {
    cols.forEach((colState, idx) => this.colMap.set(idx, colState));
    return Object.freeze(this);
  }

  get totalWidth() {
    return this.cols.reduce((totalWidth, col) => totalWidth + col.width, 0);
  }

  grow(colIdx: number, amount: number): ResizeState {
    // if last column
    if (!this.cols[colIdx + 1]) {
      return new ResizeState(this.cols, this.maxSize, true);
    }

    let newState = this.clone();

    if (amount && this.cols[colIdx + 1]) {
      // if we couldn't naturally resize and we're growing this one,
      // directly shrink the adjacent one with the remaining width
      const res = moveSpaceFrom(this, colIdx + 1, colIdx, amount, false);

      newState = res.state;
      amount -= res.amount;
    }

    if (amount) {
      // if we still have remaining space, directly resize the column
      const oldCol = newState.cols[colIdx];

      if (amount < 0 && oldCol.width + amount < oldCol.minWidth) {
        amount = -(oldCol.width - oldCol.minWidth);
      }

      return new ResizeState(
        [
          ...newState.cols.slice(0, colIdx),
          oldCol.clone(oldCol.width + amount),
          ...newState.cols.slice(colIdx + 1),
        ],
        newState.maxSize,
        newState.breakout,
      );
    }

    return newState;
  }

  shrink(colIdx: number, amount: number): ResizeState {
    let canRedistribute =
      this.cols[colIdx + 1] || this.totalWidth > this.maxSize;

    if (!canRedistribute) {
      return this.clone();
    }

    // try to shrink this one by giving from the column to the right first
    const res = moveSpaceFrom(this, colIdx, colIdx + 1, -amount);

    let remaining = amount + res.amount;
    let newState = res.state;

    if (remaining < 0) {
      const stackResult = stackSpace(newState, colIdx, remaining);

      remaining += stackResult.remaining;
      newState = stackResult.state;
    }

    canRedistribute =
      newState.cols[colIdx + 1] || newState.totalWidth > newState.maxSize;

    if (remaining && canRedistribute) {
      // direct resize
      const oldCol = newState.cols[colIdx];
      const oldNextCol = newState.cols[colIdx + 1];

      if (oldCol.width + remaining < oldCol.minWidth) {
        remaining = -(oldCol.width - oldCol.minWidth);
      }

      if (!oldNextCol) {
        const newSum = newState.totalWidth + remaining;
        if (newSum < newState.maxSize) {
          remaining = newState.maxSize - newState.totalWidth - 1;
        }
      }

      const newCol = oldCol.clone(oldCol.width + remaining);

      if (oldNextCol) {
        const nextCol = oldNextCol.clone(oldNextCol.width - remaining);

        return new ResizeState(
          [
            ...newState.cols.slice(0, colIdx),
            newCol,
            nextCol,
            ...newState.cols.slice(colIdx + 2),
          ],
          newState.maxSize,
        );
      }

      return new ResizeState(
        [
          ...newState.cols.slice(0, colIdx),
          newCol,
          ...newState.cols.slice(colIdx + 1),
        ],
        newState.maxSize,
      );
    }

    return newState;
  }

  stackGrow(colIdx: number, amount: number): ResizeState {
    // Dont allow resizing off the last column for grow.
    if (!this.cols[colIdx + 1] || !this.colMap.has(colIdx + 1)) {
      return new ResizeState(this.cols, this.maxSize, true);
    }

    let newState = this.clone();
    // Candidates is every column to the right of `colIdx`
    let candidates = getCandidates(newState, colIdx, amount);

    const map = newState.colMap;
    const currentCol = map.get(colIdx);

    // Directly resize our target col.
    // We steal widths from other cols below.
    if (currentCol) {
      const newWidth = Math.max(currentCol.width + amount, currentCol.minWidth);
      map.set(colIdx, currentCol.clone(newWidth));
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
        map.set(idx, col.clone(col.minWidth));
        remaining = col.minWidth - newWidth;
        continue;
      }

      // If we reach here, the remaining/amount value
      // didnt take up all available space in this column.
      // We can bail out here since there is no 'amount' left.
      map.set(idx, col.clone(newWidth));
      break;
    }

    return new ResizeState(
      serialiseMap(map),
      newState.maxSize,
      newState.breakout,
    );
  }

  resize(colIdx: number, amount: number): ResizeState {
    if (amount > 0) {
      return this.stackGrow(colIdx, amount);
    } else if (amount < 0) {
      return this.shrink(colIdx, amount);
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
