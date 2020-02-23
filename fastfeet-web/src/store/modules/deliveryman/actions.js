export const saveRequest = data => {
  return {
    type: '@deliveryMan/SAVE_REQUEST',
    payload: { data },
  };
};

export const saveSuccess = data => {
  return {
    type: '@deliveryMan/SAVE_SUCCESS',
    payload: data,
  };
};

export const loadSuccess = data => {
  return {
    type: '@deliveryMan/LOAD_SUCCESS',
    payload: data,
  };
};
