// @flow
import colorOptions from './options';

//eslint-disable-next-line no-unused-vars
const nestedDecisionsObject = {
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
    borderColor: {
      resting: colorOptions.R400,
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
export default {
  colorChangeboardingBackgroundActive: '#403294',
  colorCriticalBoxshadowFocus: '#ff8f73',
  colorCriticalTextResting: '#ffffff',
  colorCriticalBackgroundResting: '#de350b',
  colorChangeboardingBackgroundHover: '#8777d9',
  colorLinkBackgroundSelected: '#253858',
  colorNeutralBackgroundActive: 'rgba(179, 212, 255, 0.6)',
  colorLinkTextSelected: '#f4f5f7',
  colorNeutralTextActive: '#0052cc',
  colorPrimaryBackgroundHover: '#0065ff',
  colorLinkTextDisabled: '#a5adba',
  colorLinkTextResting: '#0052cc',
  colorWarningBoxshadowFocus: '#ff8b00',
  colorLinkBackgroundResting: 'transparent',
  colorCriticalBackgroundSelected: '#bf2600',
  colorCriticalBackgroundDisabled: 'rgba(9, 30, 66, 0.04)',
  colorCriticalTextSelected: '#ffffff',
  colorCriticalTextDisabled: '#a5adba',
  colorWarningBackgroundHover: '#ffc400',
  colorPrimaryBoxshadowFocus: 'rgba(38, 132, 255, 0.6)',
  colorWarningBackgroundSelected: '#ff991f',
  colorChangeboardingBoxshadowFocus: '#998dd9',
  colorWarningTextSelected: '#172b4d',
  colorWarningBackgroundDisabled: 'rgba(9, 30, 66, 0.04)',
  colorCriticalBackgroundHover: '#ff5630',
  colorWarningTextDisabled: '#a5adba',
  colorLinkTextActive: '#0747a6',
  colorNeutralTextResting: '#505f79',
  colorNeutralBoxshadowFocus: 'rgba(38, 132, 255, 0.6)',
  colorNeutralBackgroundResting: 'rgba(9, 30, 66, 0.04)',
  colorCriticalBackgroundActive: '#bf2600',
  colorPrimaryBackgroundSelected: '#253858',
  colorChangeboardingTextResting: '#ffffff',
  colorLinkTextHover: '#0065ff',
  colorPrimaryBackgroundDisabled: 'rgba(9, 30, 66, 0.04)',
  colorPrimaryTextSelected: '#f4f5f7',
  colorChangeboardingBackgroundResting: '#5243aa',
  colorPrimaryTextResting: '#ffffff',
  colorPrimaryTextDisabled: '#a5adba',
  colorChangeboardingBackgroundSelected: '#253858',
  colorChangeboardingTextSelected: '#f4f5f7',
  colorPrimaryBackgroundResting: '#0052cc',
  colorChangeboardingBackgroundDisabled: 'rgba(9, 30, 66, 0.04)',
  colorChangeboardingTextDisabled: '#a5adba',
  colorNeutralBackgroundSelected: '#253858',
  colorWarningBackgroundActive: '#ff991f',
  colorNeutralBackgroundDisabled: 'rgba(9, 30, 66, 0.04)',
  colorNeutralTextSelected: '#f4f5f7',
  colorNeutralTextDisabled: '#a5adba',
  colorWarningTextResting: '#172b4d',
  colorLinkBoxshadowFocus: 'rgba(38, 132, 255, 0.6)',
  colorWarningBackgroundResting: '#ffab00',
  colorPrimaryBackgroundActive: '#0747a6',
  colorNeutralBackgroundHover: 'rgba(9, 30, 66, 0.08)',
};
