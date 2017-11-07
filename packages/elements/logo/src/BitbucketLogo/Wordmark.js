// @flow
/* eslint-disable max-len */
import React, { Component } from 'react';

import { Props, DefaultProps } from '../constants';
import Wrapper from '../styledWrapper';

const svg = `<canvas height="32" width="105" aria-hidden="true"></canvas>
<svg viewBox="0 0 105 32" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
  <g stroke="none" stroke-width="1" fill-rule="evenodd" fill="inherit">
    <path d="M4.48530102e-14,6.918 L6.63,6.918 C10.114,6.918 11.804,8.634 11.804,11.39 C11.804,13.444 10.868,14.718 8.944,15.186 C11.466,15.602 12.714,16.98 12.714,19.398 C12.714,22.128 10.868,24 7.046,24 L4.48530102e-14,24 L4.48530102e-14,6.918 Z M6.318,9.154 L2.34,9.154 L2.34,14.25 L6.318,14.25 C8.528,14.25 9.438,13.236 9.438,11.598 C9.438,9.934 8.45,9.154 6.318,9.154 Z M7.072,16.33 L2.34,16.33 L2.34,21.66 L7.124,21.66 C9.36,21.66 10.374,20.854 10.374,19.138 C10.374,17.318 9.412,16.33 7.072,16.33 Z M15.236,7.568 C15.236,8.556 15.886,9.128 16.796,9.128 C17.706,9.128 18.356,8.556 18.356,7.568 C18.356,6.58 17.706,6.008 16.796,6.008 C15.886,6.008 15.236,6.58 15.236,7.568 Z M15.652,24 L17.888,24 L17.888,11 L15.652,11 L15.652,24 Z M24.362,19.892 L24.362,13.08 L27.82,13.08 L27.82,11 L24.362,11 L24.362,8.244 L22.178,8.244 L22.178,11 L20.072,11 L20.072,13.08 L22.178,13.08 L22.178,19.944 C22.178,22.362 23.53,24 26.312,24 C26.988,24 27.43,23.896 27.82,23.792 L27.82,21.634 C27.43,21.712 26.936,21.816 26.416,21.816 C25.038,21.816 24.362,21.036 24.362,19.892 Z M42.51,17.5 C42.51,21.166 40.69,24.26 37.05,24.26 C35.152,24.26 33.696,23.402 32.916,21.712 L32.916,24 L30.68,24 L30.68,5.566 L32.916,5.566 L32.916,13.34 C33.748,11.624 35.308,10.74 37.31,10.74 C40.768,10.74 42.51,13.678 42.51,17.5 Z M40.274,17.5 C40.274,14.38 39.026,12.82 36.712,12.82 C34.71,12.82 32.916,14.094 32.916,16.98 L32.916,18.02 C32.916,20.906 34.554,22.18 36.452,22.18 C38.974,22.18 40.274,20.516 40.274,17.5 Z M44.85,18.618 C44.85,22.206 46.566,24.26 49.556,24.26 C51.298,24.26 52.832,23.402 53.664,21.868 L53.664,24 L55.9,24 L55.9,11 L53.664,11 L53.664,18.228 C53.664,20.854 52.234,22.232 50.154,22.232 C48.022,22.232 47.086,21.192 47.086,18.852 L47.086,11 L44.85,11 L44.85,18.618 Z M68.458,21.66 C67.652,21.946 66.82,22.128 65.494,22.128 C62.088,22.128 60.684,19.996 60.684,17.474 C60.684,14.952 62.062,12.82 65.442,12.82 C66.664,12.82 67.548,13.054 68.38,13.444 L68.38,11.364 C67.366,10.896 66.456,10.74 65.286,10.74 C60.658,10.74 58.5,13.548 58.5,17.474 C58.5,21.452 60.658,24.26 65.286,24.26 C66.482,24.26 67.678,24.078 68.458,23.662 L68.458,21.66 Z M73.242,24 L73.242,17.916 L78.962,24 L82.004,24 L75.634,17.396 L81.744,11 L78.832,11 L73.242,17.084 L73.242,5.566 L71.006,5.566 L71.006,24 L73.242,24 Z M94.224,23.48 C93.158,24.052 91.52,24.26 90.194,24.26 C85.332,24.26 83.2,21.452 83.2,17.474 C83.2,13.548 85.384,10.74 89.336,10.74 C93.34,10.74 94.952,13.522 94.952,17.474 L94.952,18.488 L85.462,18.488 C85.774,20.698 87.204,22.128 90.272,22.128 C91.78,22.128 93.054,21.842 94.224,21.426 L94.224,23.48 Z M89.232,12.768 C86.866,12.768 85.67,14.302 85.436,16.564 L92.69,16.564 C92.56,14.146 91.468,12.768 89.232,12.768 Z M100.698,19.892 L100.698,13.08 L104.156,13.08 L104.156,11 L100.698,11 L100.698,8.244 L98.514,8.244 L98.514,11 L96.408,11 L96.408,13.08 L98.514,13.08 L98.514,19.944 C98.514,22.362 99.866,24 102.648,24 C103.324,24 103.766,23.896 104.156,23.792 L104.156,21.634 C103.766,21.712 103.272,21.816 102.752,21.816 C101.374,21.816 100.698,21.036 100.698,19.892 Z"></path>
  </g>
</svg>`;

export default class BitbucketWordmark extends Component<Props> {
  static defaultProps = DefaultProps;

  render() {
    const { label } = this.props;
    return (
      <Wrapper
        aria-label={label}
        dangerouslySetInnerHTML={{ __html: svg }}
        {...this.props}
      />
    );
  }
}
