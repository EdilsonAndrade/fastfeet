import { produce } from 'immer';

const INITIAL_VALUES = {
  loading: false,
};

export default function load(state = INITIAL_VALUES, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@loading/START': {
        draft.loading = true;
        break;
      }
      case '@loading/STOP': {
        draft.loading = false;
        break;
      }
      default:
        break;
    }
  });
}
