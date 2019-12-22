/* eslint-disable max-len */
import React, { Component } from 'react';
import { uid } from 'react-uid';

import Wrapper from '../Wrapper';
import { Props, DefaultProps } from '../constants';

const svg = (iconGradientStart: string, iconGradientStop: string) => {
  const id = uid({ iconGradientStart: iconGradientStop });
  return `<canvas height="32" width="211" aria-hidden="true"></canvas>
  <svg viewBox="0 0 211 32" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
    <defs>
      <linearGradient x1="38.0412357%" y1="6.63683429%" x2="59.8560262%" y2="63.7778713%" id="${id}">
        <stop stop-color="${iconGradientStart}" ${
    iconGradientStart === 'inherit' ? 'stop-opacity="0.4"' : ''
  } offset="0%"></stop>
        <stop stop-color="${iconGradientStop}" offset="100%"></stop>
      </linearGradient>
    </defs>
      <g stroke="none" stroke-width="1" fill-rule="nonzero">
        <path d="M11.191,13.4484211 L17.7175,13.4736842 C18.1019517,13.475472 18.4524969,13.6934048 18.623358,14.0368529 C18.794219,14.3803011 18.7561568,14.7904914 18.525,15.0968421 L8.892,27.9242105 C7.43758041,26.8410282 6.47431921,25.2259563 6.21419504,23.4344131 C5.95407087,21.6428699 6.41839981,19.821665 7.505,18.3715789 L11.191,13.4484211 Z" fill="url(#${id})"></path>
        <path d="M7.50183333,18.3715789 L1.01333333,18.3305263 C0.628881593,18.3287385 0.278336389,18.1108058 0.10747538,17.7673576 C-0.0633856302,17.4239094 -0.0253234719,17.0137191 0.205833333,16.7073684 L9.74383333,4 C11.1982529,5.08318232 12.1615141,6.69825426 12.4216383,8.48979744 C12.6817625,10.2813406 12.2174335,12.1025456 11.1308333,13.5526316 L7.50183333,18.3715789 Z" fill="currentColor"></path>
        <path d="M32.07,18.956 C32.07,20.646 31.394,21.842 29.418,21.842 C28.56,21.842 27.702,21.686 27,21.4 L27,23.662 C27.65,23.896 28.586,24.104 29.808,24.104 C33.032,24.104 34.41,21.946 34.41,18.8 L34.41,6.918 L32.07,6.918 L32.07,18.956 Z M37.894,7.568 C37.894,8.556 38.544,9.128 39.454,9.128 C40.364,9.128 41.014,8.556 41.014,7.568 C41.014,6.58 40.364,6.008 39.454,6.008 C38.544,6.008 37.894,6.58 37.894,7.568 Z M38.31,24 L40.546,24 L40.546,11 L38.31,11 L38.31,24 Z M43.926,24 L46.11,24 L46.11,16.33 C46.11,13.574 47.852,12.716 50.712,13.002 L50.712,10.818 C48.164,10.662 46.864,11.754 46.11,13.288 L46.11,11 L43.926,11 L43.926,24 Z M61.45,24 L61.45,21.66 C60.618,23.376 59.058,24.26 57.056,24.26 C53.598,24.26 51.856,21.322 51.856,17.5 C51.856,13.834 53.676,10.74 57.316,10.74 C59.214,10.74 60.67,11.598 61.45,13.288 L61.45,11 L63.686,11 L63.686,24 L61.45,24 Z M54.092,17.5 C54.092,20.62 55.34,22.18 57.654,22.18 C59.656,22.18 61.45,20.906 61.45,18.02 L61.45,16.98 C61.45,14.094 59.812,12.82 57.914,12.82 C55.392,12.82 54.092,14.484 54.092,17.5 Z M82.926,19.294 C82.926,16.226 80.898,15.056 77.284,14.146 C74.268,13.392 73.176,12.69 73.176,11.286 C73.176,9.726 74.502,8.946 76.738,8.946 C78.506,8.946 80.352,9.258 82.068,10.246 L82.068,7.906 C80.898,7.256 79.312,6.658 76.842,6.658 C72.864,6.658 70.836,8.634 70.836,11.286 C70.836,14.094 72.552,15.42 76.4,16.356 C79.65,17.136 80.586,17.942 80.586,19.45 C80.586,20.958 79.624,21.972 77.05,21.972 C74.788,21.972 72.344,21.374 70.758,20.542 L70.758,22.934 C72.084,23.61 73.618,24.26 76.92,24.26 C81.158,24.26 82.926,22.258 82.926,19.294 Z M95.926,23.48 C94.86,24.052 93.222,24.26 91.896,24.26 C87.034,24.26 84.902,21.452 84.902,17.474 C84.902,13.548 87.086,10.74 91.038,10.74 C95.042,10.74 96.654,13.522 96.654,17.474 L96.654,18.488 L87.164,18.488 C87.476,20.698 88.906,22.128 91.974,22.128 C93.482,22.128 94.756,21.842 95.926,21.426 L95.926,23.48 Z M90.934,12.768 C88.568,12.768 87.372,14.302 87.138,16.564 L94.392,16.564 C94.262,14.146 93.17,12.768 90.934,12.768 Z M99.306,24 L101.49,24 L101.49,16.33 C101.49,13.574 103.232,12.716 106.092,13.002 L106.092,10.818 C103.544,10.662 102.244,11.754 101.49,13.288 L101.49,11 L99.306,11 L99.306,24 Z M111.604,24 L114.594,24 L119.638,11 L117.298,11 L113.112,22.102 L108.9,11 L106.56,11 L111.604,24 Z M121.146,7.568 C121.146,8.556 121.796,9.128 122.706,9.128 C123.616,9.128 124.266,8.556 124.266,7.568 C124.266,6.58 123.616,6.008 122.706,6.008 C121.796,6.008 121.146,6.58 121.146,7.568 Z M121.562,24 L123.798,24 L123.798,11 L121.562,11 L121.562,24 Z M136.356,21.66 C135.55,21.946 134.718,22.128 133.392,22.128 C129.986,22.128 128.582,19.996 128.582,17.474 C128.582,14.952 129.96,12.82 133.34,12.82 C134.562,12.82 135.446,13.054 136.278,13.444 L136.278,11.364 C135.264,10.896 134.354,10.74 133.184,10.74 C128.556,10.74 126.398,13.548 126.398,17.474 C126.398,21.452 128.556,24.26 133.184,24.26 C134.38,24.26 135.576,24.078 136.356,23.662 L136.356,21.66 Z M149.148,23.48 C148.082,24.052 146.444,24.26 145.118,24.26 C140.256,24.26 138.124,21.452 138.124,17.474 C138.124,13.548 140.308,10.74 144.26,10.74 C148.264,10.74 149.876,13.522 149.876,17.474 L149.876,18.488 L140.386,18.488 C140.698,20.698 142.128,22.128 145.196,22.128 C146.704,22.128 147.978,21.842 149.148,21.426 L149.148,23.48 Z M144.156,12.768 C141.79,12.768 140.594,14.302 140.36,16.564 L147.614,16.564 C147.484,14.146 146.392,12.768 144.156,12.768 Z M157.572,6.918 L163.864,6.918 C169.402,6.918 172.08,10.376 172.08,15.498 C172.08,20.672 169.376,24 163.864,24 L157.572,24 L157.572,6.918 Z M163.76,9.154 L159.912,9.154 L159.912,21.764 L163.89,21.764 C167.79,21.764 169.74,19.71 169.74,15.576 C169.74,11.416 167.894,9.154 163.76,9.154 Z M185.054,23.48 C183.988,24.052 182.35,24.26 181.024,24.26 C176.162,24.26 174.03,21.452 174.03,17.474 C174.03,13.548 176.214,10.74 180.166,10.74 C184.17,10.74 185.782,13.522 185.782,17.474 L185.782,18.488 L176.292,18.488 C176.604,20.698 178.034,22.128 181.102,22.128 C182.61,22.128 183.884,21.842 185.054,21.426 L185.054,23.48 Z M180.062,12.768 C177.696,12.768 176.5,14.302 176.266,16.564 L183.52,16.564 C183.39,14.146 182.298,12.768 180.062,12.768 Z M197.404,20.464 C197.404,18.202 195.948,17.136 193.062,16.434 C190.67,15.862 190.046,15.29 190.046,14.38 C190.046,13.366 190.93,12.794 192.568,12.794 C193.946,12.794 195.22,13.21 196.78,13.99 L196.78,11.676 C195.818,11.156 194.284,10.74 192.594,10.74 C189.63,10.74 187.888,12.118 187.888,14.38 C187.888,16.512 189.11,17.63 191.996,18.332 C194.466,18.93 195.22,19.502 195.22,20.49 C195.22,21.504 194.336,22.206 192.62,22.206 C190.982,22.206 189.11,21.582 187.992,20.932 L187.992,23.298 C188.98,23.818 190.566,24.26 192.516,24.26 C196,24.26 197.404,22.622 197.404,20.464 Z M202.214,24 L202.214,17.916 L207.934,24 L210.976,24 L204.606,17.396 L210.716,11 L207.804,11 L202.214,17.084 L202.214,5.566 L199.978,5.566 L199.978,24 L202.214,24 Z" fill="inherit" fill-rule="evenodd"></path>
    </g>
  </svg>`;
};

export default class JiraServiceDeskLogo extends Component<Props> {
  static defaultProps = DefaultProps;

  render() {
    return <Wrapper {...this.props} svg={svg} />;
  }
}
