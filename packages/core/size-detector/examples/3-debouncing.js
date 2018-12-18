// @flow
import React from 'react';
import styled from 'styled-components';
import SizeDetector from '../src';

const ResultBox = styled.div`
  align-items: center;
  background-color: rebeccapurple;
  color: white;
  display: flex;
  height: 100%;
  justify-content: center;
  white-space: nowrap;
`;

type SizeMetrics = {
  width: number,
  height: number,
};

const displayResults = ({ width, height }: SizeMetrics) => (
  <ResultBox>
    <span className="sd-size" data-width={width} data-height={height}>
      {width} x {height}
    </span>
  </ResultBox>
);

const ColourBox = styled(ResultBox)`
  background-color: ${p => (p.width >= 300 ? 'rebeccapurple' : 'red')};
`;

export default function Example() {
  return (
    <div>
      <p>Changing colour based on width</p>
      <div style={{ height: 100 }}>
        <SizeDetector debounceTime={1000}>
          {({ width, height }) => (
            <>
              <ColourBox width={width} />
              {displayResults({ width, height })}
            </>
          )}
        </SizeDetector>
      </div>
    </div>
  );
}
