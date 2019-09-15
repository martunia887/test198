import React, { PureComponent } from 'react';
import * as styled from './styled';

interface MetadataTableState {}
interface MetadataTableProps {
  meta?: { [key: string]: string | number | boolean | undefined };
}

export default class MetadataTable extends PureComponent<
  MetadataTableProps,
  MetadataTableState
> {
  render() {
    const { meta } = this.props;

    if (meta === undefined) {
      return;
    }

    return (
      <styled.Table>
        <tbody>
          {Object.keys(meta).map(key => {
            return (
              <tr key={key}>
                <td style={{ fontWeight: 'bold', textAlign: 'right' }}>
                  {key}:{' '}
                </td>
                <td>{meta[key]}</td>
              </tr>
            );
          })}
        </tbody>
      </styled.Table>
    );
  }
}
