import ResizeState, {
  getCandidates,
} from '../../../../../../../plugins/table/pm-plugins/table-resizing/resizer/resizeState';

import ColumnState from '../../../../../../../plugins/table/pm-plugins/table-resizing/resizer/columnState';

describe('ResizeState', () => {
  describe('getCandidates()', () => {
    it('should take columns before idx when amount is negative', () => {
      const state = new ResizeState(
        [
          new ColumnState(10, 0),
          new ColumnState(20, 0),
          new ColumnState(30, 0),
        ],
        0,
      );
      let candidates = getCandidates(state, 1, -5);
      expect(candidates.length).toEqual(1);
      expect(candidates[0].col.width).toEqual(10);
      expect(candidates[0].idx).toEqual(0);
    });

    it('should take columns after idx when amount is positive', () => {
      const state = new ResizeState(
        [
          new ColumnState(10, 0),
          new ColumnState(20, 0),
          new ColumnState(30, 0),
        ],
        0,
      );
      let candidates = getCandidates(state, 1, 5);
      expect(candidates.length).toEqual(1);
      expect(candidates[0].col.width).toEqual(30);
      expect(candidates[0].idx).toEqual(2);
    });
  });

  describe('ResizeState', () => {
    it('should almost be immutable', () => {
      const state = new ResizeState([], 0);
      expect(() => (state.cols = [])).toThrow();
      expect(() => (state.maxSize = 10)).toThrow();
      expect(() => (state.breakout = false)).toThrow();
      expect(() => (state.freeColFunc = () => 1)).toThrow();
    });

    describe('#totalWidth()', () => {
      it('should return columns summed width + border', () => {
        const state = new ResizeState(
          [
            new ColumnState(10, 0),
            new ColumnState(20, 0),
            new ColumnState(30, 0),
          ],
          0,
        );

        expect(state.totalWidth).toEqual(60);
      });
    });

    describe('#clone()', () => {
      it('should clone all properties', () => {
        const state = new ResizeState([new ColumnState(10, 0)], 0);
        const newState = state.clone();

        expect(newState).not.toBe(state);
        expect(newState.cols).not.toBe(state.cols);
        expect(newState.cols[0]).not.toBe(state.cols[0]);
      });
    });

    describe('#stackGrow()', () => {
      it('should grow specified column, while stacking others to the right', () => {
        const state = new ResizeState(
          [
            new ColumnState(226, 48),
            new ColumnState(176, 78),
            new ColumnState(277, 48),
          ],
          680,
        );

        const newState = state.stackResize(0, 200);
        expect(newState.cols[0].width).toEqual(426);
        expect(newState.cols[1].width).toEqual(78);
        expect(newState.cols[2].width).toEqual(175);

        expect(state.cols[0].width).toEqual(226);
        expect(state.cols[1].width).toEqual(176);
        expect(state.cols[2].width).toEqual(277);
      });

      it('should grow specified column, while stacking to the right', () => {
        const state = new ResizeState(
          [
            new ColumnState(226, 48),
            new ColumnState(176, 78),
            new ColumnState(277, 48),
          ],
          680,
        );

        const newState = state.stackResize(0, 76);
        expect(newState.cols[0].width).toEqual(302);
        expect(newState.cols[1].width).toEqual(100);
        expect(newState.cols[2].width).toEqual(277);

        expect(state.cols[0].width).toEqual(226);
        expect(state.cols[1].width).toEqual(176);
        expect(state.cols[2].width).toEqual(277);
      });
    });
  });
});
