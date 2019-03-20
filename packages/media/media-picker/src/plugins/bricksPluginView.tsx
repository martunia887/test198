import * as React from 'react';
import { Component } from 'react';
import { ExternalImageIdentifier } from '@atlaskit/media-core';
import { Card } from '@atlaskit/media-card';
import Spinner from '@atlaskit/spinner';
import { Container, GridCell } from '../popup/components/views/giphy/styles';
import { SelectedItem } from '../popup/domain';
import { BricksLayout } from '../popup/components/views/giphy/bricksGrid';
import gridCellScaler from '../popup/tools/gridCellScaler';
import { SpinnerWrapper } from './styled';

const NUMBER_OF_COLUMNS = 4;
const GAP_SIZE = 5;
const CONTAINER_WIDTH = 677;

export interface BrickItem {
  readonly id: string;
  readonly dimensions: { width: number; height: number };
  readonly dataURI: string;
  readonly name?: string;
}

export type BricksViewProps = {
  items: BrickItem[];
  selectedItems: SelectedItem[];
  pluginName: string;
  onFileClick(item: BrickItem): void;
};

export class BricksView extends Component<BricksViewProps, {}> {
  render() {
    return (
      <Container
        style={{ height: 'auto', overflowY: 'hidden' }}
        id="mediapicker-bricks-container"
      >
        {this.getContent()}
      </Container>
    );
  }

  private getContent = () => {
    const { items } = this.props;

    if (items.length === 0) {
      return this.renderLoading();
    }

    return this.renderSearchResults();
  };

  private renderLoading = () => {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    );
  };

  private renderSearchResults = () => {
    const { items } = this.props;
    return <div>{this.renderMasonaryLayout(items)}</div>;
  };

  private renderMasonaryLayout = (items: BrickItem[]) => {
    if (items.length === 0) {
      return null;
    }
    const { pluginName, selectedItems } = this.props;
    const cards = items.map((item, i) => {
      const { dimensions: actualDimensions, dataURI, name, id } = item;
      const selected = selectedItems.some(
        item => item.id === id && item.serviceName === pluginName,
      );
      const dimensions = gridCellScaler({
        ...actualDimensions,
        gapSize: GAP_SIZE,
        containerWidth: CONTAINER_WIDTH,
        numberOfColumns: NUMBER_OF_COLUMNS,
      });
      const identifier: ExternalImageIdentifier = {
        dataURI,
        name,
        mediaItemType: 'external-image',
      };
      return (
        <GridCell key={`${i}-metadata.id`} width={dimensions.width}>
          <Card
            context={{} as any}
            identifier={identifier}
            dimensions={dimensions}
            selectable={true}
            selected={selected}
            onClick={this.createClickHandler(item)}
          />
        </GridCell>
      );
    });

    return (
      <BricksLayout
        id="mediapicker-bricks-layout"
        sizes={[{ columns: NUMBER_OF_COLUMNS, gutter: GAP_SIZE }]}
      >
        {cards}
      </BricksLayout>
    );
  };

  private createClickHandler = (item: BrickItem) => () => {
    const { onFileClick } = this.props;

    onFileClick(item);
  };
}
