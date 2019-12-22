import OfSchemaNode from './of-schema-node';
import SchemaNode from './schema-node';

export default class AllOfSchemaNode extends OfSchemaNode {
  constructor(values: Array<SchemaNode> = []) {
    super('allOf', values);
  }

  toSpec() {
    return this.values.map(value => value.toSpec());
  }
}
