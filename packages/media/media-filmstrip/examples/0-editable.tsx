/* tslint:disable: no-console */

import * as React from 'react';
import { HTMLAttributes, ComponentClass, LabelHTMLAttributes } from 'react';
import styled from 'styled-components';
import { AkFieldRadioGroup as RadioGroup } from '@atlaskit/field-radio-group';
import Slider from '@atlaskit/field-range';
import Button from '@atlaskit/button';
import { Card } from '@atlaskit/media-card';
import {
  createStorybookContext,
  genericFileId,
} from '@atlaskit/media-test-helpers';
import { FilmstripView } from '../src/filmstripView';

const StoryWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  padding: 1em;
`;

const Separator: ComponentClass<HTMLAttributes<{}>> = styled.hr`
  margin: 1em 0;
  border: 1px solid #ccc;
`;

const ControlLabel: ComponentClass<
  HTMLAttributes<{}> & LabelHTMLAttributes<{}>
> = styled.label`
  display: block;
  margin-top: 1em;
  font-weight: bold;
`;

const Flex: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface BoxProps {
  grow?: number;
}

const Box: ComponentClass<HTMLAttributes<{}> & BoxProps> = styled.div`
  padding: 4px;
  ${({ grow }: { grow?: number }) => (grow && `flex-grow: ${grow};`) || ''};
`;

const context = createStorybookContext() as any;

const exampleActions = [{ label: 'View', handler: () => console.log('View') }];

const cards = [
  <Card
    key="card3"
    context={context}
    identifier={genericFileId}
    actions={exampleActions}
  />,
];

export interface ViewStoryProps {}

export interface ViewStoryState {
  animate: boolean;
  offset: number;
  offsets: { left: number; right: number }[];
  minOffset: number;
  maxOffset: number;
  containerWidth: string | number;
  children: JSX.Element[];
}

export class ViewStory extends React.Component<ViewStoryProps, ViewStoryState> {
  state: ViewStoryState = {
    animate: false,
    offset: 0,
    offsets: [],
    minOffset: 0,
    maxOffset: 0,
    containerWidth: 'auto',
    children: cards.map((card, index) =>
      React.cloneElement(card, { key: index }),
    ),
  };

  handleSizeChange = ({
    offset,
    offsets,
    minOffset,
    maxOffset,
  }: Pick<
    ViewStoryState,
    'offset' | 'offsets' | 'minOffset' | 'maxOffset'
  >) => {
    this.setState({ offset, offsets, minOffset, maxOffset });
  };

  handleScrollChange = ({
    offset,
    animate,
  }: Pick<ViewStoryState, 'offset' | 'animate'>) => {
    this.setState({ offset, animate });
  };

  handleGoToStart = () => {
    this.setState(({ minOffset }) => ({ offset: minOffset, animate: true }));
  };

  handleGoToEnd = () => {
    this.setState(({ maxOffset }) => ({ offset: maxOffset, animate: true }));
  };

  handleGoTo = (offset: number) => {
    this.setState({ offset, animate: false });
  };

  handleChangeWidthType = (event: any) => {
    const type = event.target.value;
    if (type === 'auto') {
      this.setState({ containerWidth: 'auto' });
    } else {
      this.setState({ containerWidth: 600 });
    }
  };

  handleChangeContainerWidth = (containerWidth: number) => {
    this.setState({ containerWidth });
  };

  handleChangeCardCount = (cardCount: number) => {
    const children: JSX.Element[] = [];
    for (let i = 0; i < cardCount; ++i) {
      children.push(
        React.cloneElement(cards[Math.floor(Math.random() * cards.length)], {
          key: i,
        }),
      );
    }
    this.setState({ children });
  };

  renderFilmstrip() {
    const { animate, offset, containerWidth, children } = this.state;
    return (
      <div style={{ width: containerWidth }}>
        <FilmstripView
          animate={animate}
          offset={offset}
          onSize={this.handleSizeChange}
          onScroll={this.handleScrollChange}
        >
          {children}
        </FilmstripView>
      </div>
    );
  }

  renderControls() {
    const {
      containerWidth,
      offset,
      minOffset,
      maxOffset,
      children,
    } = this.state;
    return (
      <div>
        <ControlLabel>Offset: </ControlLabel>
        <Flex>
          <Box>
            <Button
              onClick={this.handleGoToStart}
              isSelected={offset === minOffset}
            >
              Start
            </Button>
          </Box>
          <Box grow={1}>
            <Slider
              step={1}
              min={minOffset}
              max={maxOffset}
              value={offset}
              onChange={this.handleGoTo}
            />
          </Box>
          <Box>
            <Button
              onClick={this.handleGoToEnd}
              isSelected={offset === maxOffset}
            >
              End
            </Button>
          </Box>
        </Flex>

        <RadioGroup
          label="Width"
          items={[
            {
              value: 'auto',
              label: 'Auto',
              isSelected: containerWidth === 'auto',
            },
            {
              value: 'number',
              label: 'Number',
              isSelected: containerWidth !== 'auto',
            },
          ]}
          onRadioChange={this.handleChangeWidthType}
        />
        {containerWidth !== 'auto' && (
          <Slider
            value={containerWidth}
            min={0}
            max={1000}
            step={1}
            onChange={this.handleChangeContainerWidth}
          />
        )}

        <ControlLabel htmlFor="cardCount">Card count: </ControlLabel>
        <Slider
          id="cardCount"
          value={children.length}
          min={0}
          max={25}
          step={1}
          onChange={this.handleChangeCardCount}
        />
      </div>
    );
  }

  render() {
    return (
      <StoryWrapper>
        <h1>Make your own 🍽</h1>
        <Separator />
        {this.renderFilmstrip()}
        <Separator />
        {this.renderControls()}
      </StoryWrapper>
    );
  }
}

export default () => <ViewStory />;
