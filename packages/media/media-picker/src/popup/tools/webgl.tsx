let isWebGLAvailableValue: boolean;

export const isWebGLAvailable = (forceCheck?: boolean): boolean => {
  if (isWebGLAvailableValue !== undefined && !forceCheck) {
    return isWebGLAvailableValue;
  }

  const canvas = document.createElement('canvas');
  const mediaClient =
    canvas.getContext('webgl') || canvas.getContext('experimental-webgl'); // experimental-webgl is needed for IE11

  isWebGLAvailableValue = !!mediaClient;

  return isWebGLAvailableValue;
};
