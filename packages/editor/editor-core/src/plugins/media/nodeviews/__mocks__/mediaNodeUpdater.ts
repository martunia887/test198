export class MediaNodeUpdater {
  static instances: MediaNodeUpdater[] = [];
  static mockOverrides = {};
  static mockReset() {
    this.instances.length = 0;
    MediaNodeUpdater.mockOverrides = {};
  }

  constructor() {
    const mockOverrides = MediaNodeUpdater.mockOverrides as any;
    this.updateContextId =
      mockOverrides['updateContextId'] ||
      jest.fn().mockResolvedValue(undefined);
    this.getAttrs = mockOverrides['getAttrs'] || jest.fn();
    this.getObjectId =
      mockOverrides['getObjectId'] || jest.fn().mockResolvedValue(undefined);
    this.getCurrentContextId =
      mockOverrides['getCurrentContextId'] || jest.fn();
    this.updateDimensions = mockOverrides['updateDimensions'] || jest.fn();
    this.getRemoteDimensions =
      mockOverrides['getRemoteDimensions'] ||
      jest.fn().mockResolvedValue(undefined);
    this.isNodeFromDifferentCollection =
      mockOverrides['isNodeFromDifferentCollection'] ||
      jest.fn().mockResolvedValue(true);
    this.copyNode =
      mockOverrides['copyNode'] || jest.fn().mockResolvedValue(undefined);
    this.updateFileAttrs = mockOverrides['updateFileAttrs'] || jest.fn();
    MediaNodeUpdater.instances.push(this);
  }

  static setMock(thisKey: string, value: any) {
    (MediaNodeUpdater.mockOverrides as any)[thisKey] = value;
  }

  async updateContextId() {}
  getAttrs() {}
  async getObjectId() {}
  getCurrentContextId() {}
  updateDimensions() {}
  async getRemoteDimensions() {}
  async isNodeFromDifferentCollection() {}
  async copyNode() {}
  async updateFileAttrs() {}
}
