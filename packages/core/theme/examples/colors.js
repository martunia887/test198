// @flow

import React, { useState } from 'react';
import color from 'color';
import Textfield from '@atlaskit/textfield';
import { colors } from '../src';

const calculateColorDistance = (color1, color2) => {
  let distance = 0;
  color1.color.forEach((value, idx) => {
    distance += (value - color2.color[idx]) ** 2;
  });

  return distance;
};

const ColorSwatch = ({ colorsToShow }) => {
  return (
    <>
      {Object.keys(colorsToShow)
        .filter(colorCode => typeof colors[colorCode] === 'string')
        .map(colorCode => (
          <span
            key={colorCode}
            style={{
              backgroundColor: colors[colorCode],
              borderRadius: 3,
              color: color(colors[colorCode]).negate(),
              display: 'inline-block',
              marginBottom: 10,
              marginRight: 10,
              padding: 10,
            }}
          >
            {colorCode}
          </span>
        ))}
    </>
  );
};

export default () => {
  let inputColor = '';
  const colorDistances = [];
  const [colorsToShow, setColorsToShow] = useState(colors);
  const [isInputColorValid, setIsInputColorValid] = useState(false);

  const onChange = event => {
    try {
      inputColor = color(event.target.value);
      setIsInputColorValid(false);
    } catch {
      setIsInputColorValid(true);
      inputColor = '';
    }

    Object.keys(colors)
      .filter(c => typeof colors[c] === 'string')
      .forEach(c => {
        if (inputColor) {
          colorDistances.push({
            colorCode: c,
            distance: calculateColorDistance(
              color(colors[c]).hsl(),
              inputColor.hsl(),
            ),
          });
        }
      });
    const closestColor = colorDistances
      .sort((color1, color2) => color2.distance - color1.distance)
      .pop();

    setColorsToShow(
      event.target.value && inputColor
        ? {
            [closestColor.colorCode]: colors[closestColor.colorCode],
          }
        : colors,
    );
  };

  return (
    <>
      <div style={{ padding: '1rem', marginBottom: '2rem' }}>
        <label>Enter a color in HEX/RGB/HSL/CSS color codes</label>
        <Textfield autoFocus width="medium" onChange={onChange} />

        {isInputColorValid && <div>Please enter a valid color value</div>}
      </div>
      <ColorSwatch colorsToShow={colorsToShow} />
    </>
  );
};
