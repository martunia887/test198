// @flow
import { colors } from './options';

export default {
  neutral: {
    backgroundColor: {
      resting: colors.N20A,
      hover: colors.N30A,
      active: colors.B75A,
      disabled: colors.N20A,
      selected: colors.N700,
    },
    boxShadowColor: {
      focus: colors.B200A,
    },
    textColor: {
      resting: colors.N400,
      active: colors.B400,
      disabled: colors.N70,
      selected: colors.N20,
    },
  },
  primary: {
    backgroundColor: {
      resting: colors.B400,
      hover: colors.B300,
      active: colors.B500,
      disabled: colors.N20A,
      selected: colors.N700,
    },
    boxShadowColor: {
      focus: colors.B200A,
    },
    textColor: {
      resting: colors.N0,
      disabled: colors.N70,
      selected: colors.N20,
    },
  },
  warning: {
    backgroundColor: {
      resting: colors.Y300,
      hover: colors.Y200,
      active: colors.Y400,
      disabled: colors.N20A,
      selected: colors.Y400,
    },
    boxShadowColor: {
      focus: colors.Y500,
    },
    textColor: {
      resting: colors.N800,
      disabled: colors.N70,
      selected: colors.N800,
    },
  },
  constructive: {
    // TO BE FILLED:
    backgroundColor: {
      resting: colors.G50,
    },
  },
  subleCritical: {
    backgroundColor: {},
    boxShadowColor: {},
    textColor: {},
    borderColor: {},
  },
  critical: {
    backgroundColor: {
      resting: colors.R400,
      hover: colors.R300,
      active: colors.R500,
      disabled: colors.N20A,
      selected: colors.R500,
    },
    boxShadowColor: {
      focus: colors.R100,
    },
    textColor: {
      resting: colors.N0,
      disabled: colors.N70,
      selected: colors.N0,
    },
  },
  changeBoarding: {
    backgroundColor: {
      resting: colors.P400,
      hover: colors.P200,
      active: colors.P500,
      disabled: colors.N20A,
      selected: colors.N700,
    },
    boxShadowColor: {
      focus: colors.P100,
    },
    textColor: {
      resting: colors.N0,
      disabled: colors.N70,
      selected: colors.N20,
    },
  },
  link: {
    backgroundColor: {
      resting: colors.transparent,
      selected: colors.N700,
    },
    boxShadowColor: {
      focus: colors.B200A,
    },
    textColor: {
      resting: colors.B400,
      hover: colors.B300,
      active: colors.B500,
      disabled: colors.N70,
      selected: colors.N20,
    },
  },
};
