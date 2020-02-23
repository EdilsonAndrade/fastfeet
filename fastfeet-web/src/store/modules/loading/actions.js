export const startLoading = () => {
  return {
    type: '@loading/START',
  };
};

export const stopLoading = () => {
  return {
    type: '@loading/STOP',
  };
};
