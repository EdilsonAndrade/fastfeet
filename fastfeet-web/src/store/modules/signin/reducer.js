import { produce } from 'immer';

const INITIAL_VALUE = {
  token: null,
  signed: false,
};

export default function signin(state = INITIAL_VALUE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@signin/SINING_SUCCESS': {
        draft.token = action.payload;
        draft.signed = true;
        break;
      }
      case '@signin/SIGNOUT_SUCCESS': {
        draft.tolen = null;
        draft.signed = null;
        break;
      }
      default:
    }
  });
}
