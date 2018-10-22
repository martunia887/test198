/* eslint-disable */

class DynamicHashTable {
  constructor(capacity = 50) {
    this.table1 = new Array(capacity);
    this.table2 = [];
    this.active = 'table1';
    this.inactive = 'table2';
    this.activeLoad = 0;
    this.loadFactor = 0.75;
  }

  set(id, data, skip) {
    console.log('Set: ', { id, data });
    let active = this[this.active];
    if (!skip && this.activeLoad / active.length >= this.loadFactor) {
      console.log();
      console.log('Double:', this.activeLoad / active.length);
      console.log();
      this.inactive = this.active === 'table1' ? 'table2' : 'table1';
      this[this.inactive] = new Array(active.length * 2);
      this.active = this.inactive;
      this.inactive = this.active === 'table1' ? 'table2' : 'table1';
      this.activeLoad = 0;
    }

    active = this[this.active];
    const hash = id % active.length;
    const slot = active[hash] || [];
    slot.push({ id, data });
    active[hash] = slot;
    this.activeLoad++;

    const updates = {
      inactive: [],
      active: [hash],
    };

    const rehashingUpdates = !skip
      ? this.rehashInactive()
      : { inactive: [], active: [] };

    updates.active = updates.active.concat(rehashingUpdates.active);
    updates.inactive = updates.inactive.concat(rehashingUpdates.inactive);

    if (skip) {
      return updates;
    }

    console.log();
    console.log('Updates:', JSON.stringify(updates));
    console.log();
  }

  rehashInactive() {
    let updates = {
      inactive: [],
      active: [],
    };

    if (!this[this.inactive].length) {
      return updates;
    }

    for (let i = 0; i < 3; i++) {
      const slotIndex = this[this.inactive].findIndex(Boolean);
      if (slotIndex === -1) {
        console.log(`${this.inactive} is empty!`);
        this[this.inactive] = [];
        return updates;
      }

      console.log('Rehashing:', this[this.inactive][slotIndex]);
      updates = this[this.inactive][slotIndex].reduce((acc, item) => {
        const setUpdates = this.set(item.id, item.data, true);
        acc.active = acc.active.concat(setUpdates.active);
        acc.inactive = acc.inactive.concat(setUpdates.inactive);
        return acc;
      }, updates);

      this[this.inactive][slotIndex] = undefined;
      updates.inactive.push(slotIndex);
    }

    return updates;
  }
}

const HT = new DynamicHashTable(2);
HT.set(0, 1);
HT.set(1, 2);
HT.set(2, 3);
HT.set(3, 4);
HT.set(4, 5);
HT.set(5, 6);
HT.set(6, 7);
HT.set(7, 8);
HT.set(8, 9);
HT.set(9, 10);

console.log();
console.log('Table1: ', HT.table1.length);
console.log(
  HT.table1
    .map(
      (slot, idx) =>
        `${idx}: ${slot ? slot.map(i => i.data).join(', ') : 'empty'}`,
    )
    .filter(Boolean)
    .join('\n'),
);

console.log('Table2: ', HT.table2.length);
console.log(
  HT.table2
    .map(
      (slot, idx) =>
        `${idx}: ${slot ? slot.map(i => i.data).join(', ') : 'empty'}`,
    )
    .filter(Boolean)
    .join('\n'),
);

console.log();
console.log('Active table: ', HT.active);
console.log('Active load: ', HT.activeLoad);
console.log('Load index: ', HT.activeLoad / HT.table1.length);
