import * as React from 'react';
import { Component } from 'react';
// import * as debounce from 'lodash.debounce';
// import FieldText from '@atlaskit/field-text';
// import Button from '@atlaskit/button';
// import Spinner from '@atlaskit/spinner';
import { Card } from '@atlaskit/media-card';
// import { ImageCardModel } from '../../../tools/fetcher/fetcher';

import {
  Container,
  Title,
  GridCell,
  WarningContainer,
  // WarningIconWrapper,
  WarningImage,
} from '../popup/components/views/giphy/styles';

// import { errorIcon } from '../../../../icons';
import { SelectedItem } from '../popup/domain';
// import { errorIcon } from '../icons';
import { BricksLayout } from '../popup/components/views/giphy/bricksGrid';
import gridCellScaler from '../popup/tools/gridCellScaler';
import { ExternalImageIdentifier } from '@atlaskit/media-core';

const NUMBER_OF_COLUMNS = 4;
const GAP_SIZE = 5;
const CONTAINER_WIDTH = 677;

export interface BrickItem extends ExternalImageIdentifier {
  id: string;
  dimensions: { width: number; height: number };
}

export type BricksViewProps = {
  // hasError: boolean;
  // isLoading: boolean;
  // TODO: extend ExternalImageIdentifier by adding "id"
  items: BrickItem[];
  selectedItems: SelectedItem[];
  pluginName: string;
  // TODO: dimensions need to come within the identifier
  // onCardClick(item: ImageCardModel, upfrontId: Promise<string>): void;
  totalResultCount?: number;
};

export interface BricksViewState {
  query: string;
}

export class BricksView extends Component<BricksViewProps, BricksViewState> {
  // private searchChangeHandler: (e: FormEvent<HTMLInputElement>) => void;

  state: BricksViewState = {
    query: '',
  };

  // componentDidUpdate({
  //   onSearchQueryChange: oldOnSearchQueryChange,
  // }: BricksViewProps) {
  //   const { onSearchQueryChange: newOnSearchQueryChange } = this.props;

  //   if (oldOnSearchQueryChange !== newOnSearchQueryChange) {
  //     this.createSearchChangeHandler();
  //   }
  // }

  render() {
    // const { query } = this.state;

    return (
      // TODO: rename
      <Container id="mediapicker-giphy-container">
        <Title>Bricks!</Title>
        {/* <FieldText
          label=""
          placeholder={formatMessage(messages.search_all_gifs)}
          onChange={this.searchChangeHandler}
          shouldFitContainer={true}
          value={query}
        /> */}
        {this.getContent()}
      </Container>
    );
  }

  private getContent = () => {
    const { items } = this.props;

    if (items.length === 0) {
      return this.renderEmptyState();
    }

    return this.renderSearchResults();
  };

  // private renderError = () => {
  //   return (
  //     <WarningContainer>
  //       <WarningIconWrapper>{errorIcon}</WarningIconWrapper>
  //     </WarningContainer>
  //   );
  // };

  private renderEmptyState = () => {
    // const { query } = this.state;

    // The GIF used in this error state is too large to store as a data URI (> 3.2 MB)
    return (
      <WarningContainer>
        <WarningImage src="https://media1.giphy.com/media/10YK5Hh53nC3dK/200w.gif" />
      </WarningContainer>
    );
  };

  private renderSearchResults = () => {
    const { items } = this.props;
    // const { isLoading, cardModels, totalResultCount } = this.props;

    // const isThereAreMoreResults =
    //   totalResultCount === undefined ||
    //   cardModels.length < totalResultCount - 1;
    // const shouldShowLoadMoreButton = isLoading || isThereAreMoreResults;

    // const loadMoreButton =
    //   shouldShowLoadMoreButton && this.renderLoadMoreButton();

    return (
      <div>
        {this.renderMasonaryLayout(items)}
        {/* {loadMoreButton} */}
      </div>
    );
  };

  private renderMasonaryLayout = (items: BrickItem[]) => {
    if (items.length === 0) {
      return null;
    }
    // const {dimensions: actualDimensions, pluginName, selectedItems} = this.props;
    const cards = items.map((item, i) => {
      // TODO: get id
      // const selected = selectedItems.some(
      //   item => item.id === identifier.id && item.serviceName === pluginName,
      // );
      const { dimensions: actualDimensions, dataURI } = item;
      const selected = false;
      const dimensions = gridCellScaler({
        ...actualDimensions,
        gapSize: GAP_SIZE,
        containerWidth: CONTAINER_WIDTH,
        numberOfColumns: NUMBER_OF_COLUMNS,
      });
      const identifier: ExternalImageIdentifier = {
        dataURI,
        mediaItemType: 'external-image',
        // name
      };
      return (
        <GridCell key={`${i}-metadata.id`} width={dimensions.width}>
          <Card
            context={{} as any}
            identifier={identifier}
            dimensions={dimensions}
            selectable={true}
            selected={selected}
            onClick={this.createClickHandler(identifier)}
          />
        </GridCell>
      );
    });

    return (
      <BricksLayout
        id="mediapicker-gif-layout"
        sizes={[{ columns: NUMBER_OF_COLUMNS, gutter: GAP_SIZE }]}
      >
        {cards}
      </BricksLayout>
    );
  };

  // private renderLoadMoreButton = () => {
  //   const { isLoading } = this.props;
  //   const iconAfter = isLoading ? <Spinner /> : undefined;

  //   return (
  //     <ButtonContainer>
  //       <Button
  //         onClick={this.handleLoadMoreButtonClick}
  //         isDisabled={isLoading}
  //         iconAfter={iconAfter}
  //       >
  //         <FormattedMessage {...messages.load_more_gifs} />
  //       </Button>
  //     </ButtonContainer>
  //   );
  // };

  // private createSearchChangeHandler = () => {
  //   const { onSearchQueryChange } = this.props;
  //   const debouncedOnSearchQueryChange = debounce(onSearchQueryChange, 1000);

  //   return (e: FormEvent<HTMLInputElement>) => {
  //     const query: string = e.currentTarget.value;
  //     this.setState({
  //       query,
  //     });

  //     debouncedOnSearchQueryChange(query);
  //   };
  // };

  private createClickHandler = (identifier: ExternalImageIdentifier) => () => {
    console.log('createClickHandler', identifier);
    // const { onCardClick } = this.props;

    // onCardClick(cardModel);
  };

  // private handleLoadMoreButtonClick = () => {
  //   const { onLoadMoreButtonClick } = this.props;
  //   onLoadMoreButtonClick(this.state.query, true);
  // };

  // private handleRetryButtonClick = () => {
  //   const { onSearchQueryChange } = this.props;
  //   onSearchQueryChange(this.state.query);
  // };
}
