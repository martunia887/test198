// @flow
import colorOptions from './options';

export default {
  neutral: {
    backgroundColor: {
      resting: colorOptions.N40, // changed from N20A to N40 because standards.
      hover: colorOptions.N30A,
      active: colorOptions.B75A,
      disabled: colorOptions.N20A,
      selected: colorOptions.N700,
    },
    boxShadowColor: {
      focus: colorOptions.B200A,
    },
    textColor: {
      resting: colorOptions.N400,
      active: colorOptions.B400,
      disabled: colorOptions.N70,
      selected: colorOptions.N20,
    },
  },
  primary: {
    backgroundColor: {
      resting: colorOptions.B400,
      hover: colorOptions.B300,
      active: colorOptions.B500,
      disabled: colorOptions.N20A,
      selected: colorOptions.N700,
    },
    boxShadowColor: {
      focus: colorOptions.B200A,
    },
    textColor: {
      resting: colorOptions.N0,
      disabled: colorOptions.N70,
      selected: colorOptions.N20,
    },
  },
  warning: {
    backgroundColor: {
      resting: colorOptions.Y300,
      hover: colorOptions.Y200,
      active: colorOptions.Y400,
      disabled: colorOptions.N20A,
      selected: colorOptions.Y400,
    },
    boxShadowColor: {
      focus: colorOptions.Y500,
    },
    textColor: {
      resting: colorOptions.N800,
      disabled: colorOptions.N70,
      selected: colorOptions.N800,
    },
  },
  constructive: {
    // TO BE FILLED:
    backgroundColor: {
      resting: colorOptions.G400,
    },
    textColor: {
      resting: colorOptions.N0,
    },
  },
  critical: {
    backgroundColor: {
      resting: colorOptions.R400,
      hover: colorOptions.R300,
      active: colorOptions.R500,
      disabled: colorOptions.N20A,
      selected: colorOptions.R500,
    },
    boxShadowColor: {
      focus: colorOptions.R100,
    },
    textColor: {
      resting: colorOptions.N0,
      disabled: colorOptions.N70,
      selected: colorOptions.N0,
    },
  },
  changeBoarding: {
    backgroundColor: {
      resting: colorOptions.P400,
      hover: colorOptions.P200,
      active: colorOptions.P500,
      disabled: colorOptions.N20A,
      selected: colorOptions.N700,
    },
    boxShadowColor: {
      focus: colorOptions.P100,
    },
    textColor: {
      resting: colorOptions.N0,
      disabled: colorOptions.N70,
      selected: colorOptions.N20,
    },
  },
  link: {
    backgroundColor: {
      resting: colorOptions.transparent,
      selected: colorOptions.N700,
    },
    boxShadowColor: {
      focus: colorOptions.B200A,
    },
    textColor: {
      resting: colorOptions.B400,
      hover: colorOptions.B300,
      active: colorOptions.B500,
      disabled: colorOptions.N70,
      selected: colorOptions.N20,
    },
  },
};
