import { produce } from 'immer';

const INITIAL_VALUE = {
  name: null,
  email: null,
  id: null,
  deliveryMans: [],
};

export default function deliveryman(state = INITIAL_VALUE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@deliveryMan/SAVE_SUCCESS': {
        const { name, email, id } = action.payload;
        draft.name = name;
        draft.email = email;
        draft.id = id;

        break;
      }
      case '@deliveryMan/LOAD_SUCCESS': {
        draft.deliveryMans = action.payload;
        break;
      }

      default:
        break;
    }
  });
}
