import React from 'react';
import { gridSize } from '@atlaskit/theme';
import Rating, { RatingItem } from '../src/index';

const Emoji = ({
  children,
  isChecked,
}: {
  isChecked: boolean;
  children: React.ReactNode;
}) => (
  <div
    style={{
      // Setting font size is important here as it's set to ZERO in the parent Rating to work around inline-block spacing issues.
      fontSize: 30,
      margin: gridSize() / 2,
      opacity: isChecked ? 1 : 0.7,
    }}
  >
    {children}
  </div>
);

export default () => {
  return (
    <div
      style={{
        margin: `${gridSize() * 2}px 0 ${gridSize()}px`,
        textAlign: 'center',
      }}
    >
      <Rating groupName="rating--custom">
        <RatingItem
          render={props => <Emoji {...props}>😭</Emoji>}
          label="OMFG"
          value="omfg"
          id="omfg"
        />
        <RatingItem
          render={props => <Emoji {...props}>😬</Emoji>}
          label="Omg.."
          value="omg"
          id="omg"
        />
        <RatingItem
          render={props => <Emoji {...props}>😞</Emoji>}
          label="Meh"
          value="meh"
          id="meh"
        />
        <RatingItem
          render={props => <Emoji {...props}>🙂</Emoji>}
          label="It's ok"
          value="its-ok"
          id="its-ok"
        />
        <RatingItem
          render={props => <Emoji {...props}>😁</Emoji>}
          label="So good!"
          value="so-good"
          id="so-good"
        />
        <RatingItem
          render={props => <Emoji {...props}>😍</Emoji>}
          label="I LOVE THIS"
          value="love-it"
          id="love-it"
        />
      </Rating>
    </div>
  );
};
