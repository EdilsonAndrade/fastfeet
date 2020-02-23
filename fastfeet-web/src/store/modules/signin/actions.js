export const signinRequest = data => {
  return {
    type: '@signin/SIGNIN_REQUEST',
    payload: { data },
  };
};

export const signinSuccess = token => {
  return {
    type: '@signin/SINING_SUCCESS',
    payload: token,
  };
};

export const signOutRequest = () => {
  return {
    type: '@signin/SIGNOUT_REQUEST',
  };
};
export const signOutSuccess = () => {
  return {
    type: '@signin/SIGNOUT_SUCCESS',
  };
};
