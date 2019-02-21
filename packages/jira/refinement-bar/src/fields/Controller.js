// @flow

export default class FieldController {
  constructor(config) {
    this.config = config;
    this.key = config.key;
    this.label = config.label;
    this.note = config.note;
    this.type = config.type;
  }

  hasValue = ({ value }) => Boolean(value);

  getValue = data => data[this.config.key] || '';
  getInitialValue = () => this.config.defaultValue || '';
  validateValue = () => ({ message: null, isInvalid: false });
}
