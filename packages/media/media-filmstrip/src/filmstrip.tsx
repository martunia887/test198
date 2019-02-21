/* tslint:disable variable-name */
import * as React from 'react';
import { Component } from 'react';
import {
  Card,
  CardAction,
  CardOnClickCallback,
  CardEvent,
  OnSelectChangeFunc,
  OnLoadingChangeFunc,
  defaultImageCardDimensions,
} from '@atlaskit/media-card';
import { Identifier } from '@atlaskit/media-client';
import { FilmstripView } from './filmstripView';
import { generateIdentifierKey } from './utils/generateIdentifierKey';

export interface FilmstripItem {
  readonly identifier: Identifier;
  readonly actions?: Array<CardAction>;
  readonly selectable?: boolean;
  readonly selected?: boolean;
  readonly onClick?: CardOnClickCallback;
  readonly onMouseEnter?: (result: CardEvent) => void;
  readonly onSelectChange?: OnSelectChangeFunc;
  readonly onLoadingChange?: OnLoadingChangeFunc;
}

export interface FilmstripProps {
  items: FilmstripItem[];
}

export interface FilmstripState {
  animate: boolean;
  offset: number;
}

export class Filmstrip extends Component<FilmstripProps, FilmstripState> {
  state: FilmstripState = {
    animate: false,
    offset: 0,
  };

  private handleSize = ({ offset }: Pick<FilmstripState, 'offset'>) =>
    this.setState({ offset });
  private handleScroll = ({ animate, offset }: FilmstripState) =>
    this.setState({ animate, offset });

  private renderCards() {
    const { items } = this.props;
    const cards = items.map(item => {
      const key = generateIdentifierKey(item.identifier);

      return (
        <Card
          key={key}
          dimensions={defaultImageCardDimensions}
          useInlinePlayer={false}
          {...item}
        />
      );
    });

    return cards;
  }

  render() {
    const { animate, offset } = this.state;

    return (
      <FilmstripView
        animate={animate}
        offset={offset}
        onSize={this.handleSize}
        onScroll={this.handleScroll}
      >
        {this.renderCards()}
      </FilmstripView>
    );
  }
}
