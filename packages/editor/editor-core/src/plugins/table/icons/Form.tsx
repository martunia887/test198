import * as React from 'react';
import Icon from '@atlaskit/icon';

const customGlyph = () => (
  <svg viewBox="0 0 24 24">
    <title>Form</title>
    <desc>Created with Sketch.</desc>
    <g id="Form" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <path
        d="M6,4 L11,4 C11.5522847,4 12,4.44771525 12,5 C12,5.55228475 11.5522847,6 11,6 L6,6 C5.44771525,6 5,5.55228475 5,5 C5,4.44771525 5.44771525,4 6,4 Z M6,12 L11,12 C11.5522847,12 12,12.4477153 12,13 C12,13.5522847 11.5522847,14 11,14 L6,14 C5.44771525,14 5,13.5522847 5,13 C5,12.4477153 5.44771525,12 6,12 Z M6,7 L18,7 C18.5522847,7 19,7.44771525 19,8 L19,9 C19,9.55228475 18.5522847,10 18,10 L6,10 C5.44771525,10 5,9.55228475 5,9 L5,8 C5,7.44771525 5.44771525,7 6,7 Z M6,15 L18,15 C18.5522847,15 19,15.4477153 19,16 L19,18 C19,18.5522847 18.5522847,19 18,19 L6,19 C5.44771525,19 5,18.5522847 5,18 L5,16 C5,15.4477153 5.44771525,15 6,15 Z"
        id="Combined-Shape"
        fill="#42526E"
      />
    </g>
  </svg>
);

export default ({ label }) => (
  <Icon glyph={customGlyph} label={label} size="medium" />
);
