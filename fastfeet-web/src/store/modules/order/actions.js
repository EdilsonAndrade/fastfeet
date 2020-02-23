export const saveRequest = data => {
  return {
    type: '@order/SAVE_REQUEST',
    payload: { data },
  };
};

export const saveSuccess = data => {
  return {
    type: '@order/SAVE_SUCCESS',
    payload: data,
  };
};

export const loadSuccess = data => {
  return {
    type: '@order/LOAD_SUCCESS',
    payload: data,
  };
};
