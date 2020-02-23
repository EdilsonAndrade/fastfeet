export const saveRequest = data => {
  return {
    type: '@recipient/SAVE_REQUEST',
    payload: { data },
  };
};

export const saveSuccess = data => {
  return {
    type: '@recipient/SAVE_SUCCESS',
    payload: data,
  };
};
export const loadSuccess = data => {
  return {
    type: '@recipient/LOAD_SUCCESS',
    payload: data,
  };
};
