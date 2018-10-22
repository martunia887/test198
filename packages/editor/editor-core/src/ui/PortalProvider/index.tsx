import * as React from 'react';
import { createPortal } from 'react-dom';
import { EventDispatcher } from '../../event-dispatcher';

class DynamicHashTable {
  constructor(onUpdate, onResize, capacity = 50) {
    this.onUpdate = onUpdate;
    this.onResize = onResize;
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
      this[this.inactive] = new Array(active.length * 2);
      this.onResize(this.inactive, this[this.inactive].length);
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

    this.onUpdate({
      [this.active]: updates.active.map(item => ({
        hash: item,
        data: this[this.active][item],
      })),
      [this.inactive]: updates.inactive.map(item => ({
        hash: item,
        data: this[this.inactive][item],
      })),
    });

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

export type PortalProviderProps = {
  render: (portalProviderAPI: PortalProviderAPI) => React.ReactChild | null;
};

export type PortalRendererState = {
  portals: Map<HTMLElement, React.ReactChild>;
};

export class PortalProviderAPI extends EventDispatcher {
  constructor() {
    super();
    this.table = new DynamicHashTable(this.onUpdate, this.onResize);
  }

  portals = new Array(50);
  capacity = 50;

  onUpdate = ({ table1, table2 }) => {
    if (table1.length) {
      this.emit('update:table1', table1);
    }
    if (table2.length) {
      this.emit('update:table2', table2);
    }
    console.log({ table1, table2 });
  };

  onResize = id => {
    this.emit(`update:${id}`, null);
  };

  setContext = context => {
    this.context = context;
  };

  render(id: number, children: React.ReactChild, container: HTMLElement) {
    this.table.set(id, { children, container });

    // const portal = { id, children, container };
    // const hash = id % this.capacity;
    // const portals = this.portals[hash] || [];
    // portals.push(portal);
    // this.portals[hash] = portals;
    // this.emit('update', { id: hash, portals });
  }

  remove(id: number) {
    // const hash = id % this.capacity;
    // const slot = this.portals[hash];
    // this.portals[hash] = slot.filter(item => item.id !== id);
    // this.emit('update', { id: hash, portals: this.portals[hash] });
  }
}

export class PortalProvider extends React.Component<PortalProviderProps> {
  portalProviderAPI: PortalProviderAPI;

  constructor(props) {
    super(props);
    this.portalProviderAPI = new PortalProviderAPI();
  }

  render() {
    return this.props.render(this.portalProviderAPI);
  }
}

export class PortalRenderer extends React.Component<
  { portalProviderAPI: PortalProviderAPI; id: string },
  PortalRendererState
> {
  subscriptions = {};

  constructor(props) {
    super(props);
    props.portalProviderAPI.setContext(this);
    props.portalProviderAPI.on(`update:${props.id}`, this.handleUpdate);
    props.portalProviderAPI.on(`update:resize:${props.id}`, () =>
      this.forceUpdate(),
    );
  }

  subscribe = idx => cb => {
    this.subscriptions[idx] = cb;
  };

  handleUpdate = slot => {
    console.log({ slot });
    slot.forEach(item => {
      console.log(slot.hash);
      this.subscriptions[slot.hash](slot.data);
    });
  };

  render() {
    console.log(this.props.portalProviderAPI.table);
    return (
      <>
        {Array.from(
          new Array(this.props.portalProviderAPI.table[this.props.id].length),
        ).map((_val, idx) => <PortalSlot subscribe={this.subscribe(idx)} />)}
      </>
    );
  }
}

export class PortalSlot extends React.Component<any, any> {
  constructor(props) {
    super(props);
    props.subscribe(this.handleUpdate);
  }

  state = {};

  handleUpdate = portals => {
    console.log({ portals });
    this.setState({ portals: portals.data });
  };

  render() {
    return this.state.portals && this.state.portals.length ? (
      <>
        {this.state.portals.map(portal =>
          createPortal(portal.children, portal.container),
        )}
      </>
    ) : null;
  }
}
