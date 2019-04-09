// @ts-ignore: unused variable
import { css, Styles, StyledComponentClass } from 'styled-components';
import { borderRadius, colors } from '@atlaskit/theme';

const { N20, R300, N40, G300, B200 } = colors;

const disableDrag = `
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

export const sliderStyles = css`
  .ProseMirror {
    .sliderView-content-wrap {
      display: inline-block;
      width: 250px;
      padding: 5px 0;
      cursor: pointer;
      vertical-align: middle;

      &.ProseMirror-selectednode {
        position: relative;

        &::before {
          content: '';
          border: 2px solid ${B200};
          background: transparent;
          border-radius: ${borderRadius()}px;
          box-sizing: border-box;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
      }
    }

    .rangeslider {
      flex: 1;
      margin: 0 10px;
      position: relative;
      background: #e6e6e6;
      -ms-touch-action: none;
      touch-action: none;
    }
    .rangeslider,
    .rangeslider .rangeslider__fill {
      display: block;
    }
    .rangeslider .rangeslider__handle {
      cursor: pointer;
      display: inline-block;
      position: absolute;
    }
    .rangeslider .rangeslider__handle .rangeslider__active {
      opacity: 1;
    }
    .rangeslider .rangeslider__handle-tooltip {
      width: 40px;
      height: 40px;
      text-align: center;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.8);
      font-weight: 400;
      font-size: 14px;
      transition: all 0.1s ease-in;
      border-radius: 4px;
      display: inline-block;
      color: #fff;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
    }
    .rangeslider .rangeslider__handle-tooltip span {
      margin-top: 12px;
      display: inline-block;
      line-height: 100%;
    }
    .rangeslider .rangeslider__handle-tooltip:after {
      content: ' ';
      position: absolute;
      width: 0;
      height: 0;
    }
    .rangeslider-horizontal .rangeslider__fill {
      height: 100%;
      background-color: ${G300};
      border-radius: 3px;
      top: 0;
    }
    .rangeslider-horizontal .rangeslider__handle {
      width: 30px;
      height: 30px;
      border-radius: 30px;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
    .rangeslider-horizontal .rangeslider__handle-tooltip {
      top: -55px;
    }
    .rangeslider-horizontal .rangeslider__handle-tooltip:after {
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid rgba(0, 0, 0, 0.8);
      left: 50%;
      bottom: -8px;
      transform: translate3d(-50%, 0, 0);
    }
    .rangeslider-vertical {
      margin: 20px auto;
      height: 150px;
      max-width: 10px;
      background-color: transparent;
    }
    .rangeslider-vertical .rangeslider__fill,
    .rangeslider-vertical .rangeslider__handle {
      position: absolute;
    }
    .rangeslider-vertical .rangeslider__fill {
      width: 100%;
      background-color: #7cb342;
      box-shadow: none;
      bottom: 0;
    }
    .rangeslider-vertical .rangeslider__handle {
      width: 30px;
      height: 10px;
      left: -10px;
      box-shadow: none;
    }
    .rangeslider-vertical .rangeslider__handle-tooltip {
      left: -100%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
    .rangeslider-vertical .rangeslider__handle-tooltip:after {
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: 8px solid rgba(0, 0, 0, 0.8);
      left: 100%;
      top: 12px;
    }
    .rangeslider-reverse.rangeslider-horizontal .rangeslider__fill {
      right: 0;
    }
    .rangeslider-reverse.rangeslider-vertical .rangeslider__fill {
      top: 0;
      bottom: inherit;
    }
    .rangeslider__labels {
      position: relative;
    }
    .rangeslider-vertical .rangeslider__labels {
      position: relative;
      list-style-type: none;
      margin: 0;
      padding: 0;
      text-align: left;
      width: 250px;
      height: 100%;
      left: 10px;
    }
    .rangeslider-vertical .rangeslider__labels .rangeslider__label-item {
      position: absolute;
      transform: translate3d(0, -50%, 0);
    }
    .rangeslider-vertical
      .rangeslider__labels
      .rangeslider__label-item::before {
      content: '';
      width: 10px;
      height: 2px;
      background: #000;
      position: absolute;
      left: -16px;
      top: 50%;
      transform: translateY(-50%);
      z-index: -1;
    }
    .rangeslider__labels .rangeslider__label-item {
      position: absolute;
      font-size: 14px;
      cursor: pointer;
      display: inline-block;
      top: 10px;
      transform: translate3d(-50%, 0, 0);
    }
    ul.rangeslider__labels {
      margin: 0;
    }
    .rangeslider-horizontal {
      height: 4px;
      border-radius: 3px;
      background: ${N40};
    }
    .rangeslider-horizontal .rangeslider__handle {
      width: 16px;
      height: 16px;
      border: 1px solid ${colors.G400};
      background: ${G300};
      outline: none;
    }
    .rangeslider .rangeslider__handle-tooltip {
      display: none;
    }

    .slider {
      display: flex;
      align-items: center;
      width: 100%;
      height: 17px;
    }
    .slider__value {
      padding: 0 4px;
      background: ${N20};
      color: ${G300};
      border-radius: ${borderRadius}px;
      min-width: 32px;
      text-align: center;
      ${disableDrag}
    }

    .sliderView-content-wrap,
    .slider,
    .slider__value,
    .rangeslider-horizontal,
    &.ProseMirror-selectednode {
      ${disableDrag}
    }

    .danger {
      .rangeslider__fill {
        background-color: ${R300};
        td[celltype='checkbox'] {
          width: 60px;
        }
      }
      .rangeslider__handle {
        background: ${R300};
        border: 1px solid ${colors.R400};
        cursor: move;
        cursor: grab;
        cursor: -moz-grab;
        cursor: -webkit-grab;
      }
      .slider__value {
        color: ${R300};
      }
    }
  }
`;
