import { produce } from 'immer';

const INITIAL_VALUE = {
  name: null,
  email: null,
  id: null,
  avatar: null,
  deliveryMans: [],
};

export default function deliveryman(state = INITIAL_VALUE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@deliveryMan/SAVE_SUCCESS': {
        console.tron.warn(JSON.stringify(action.payload));
        const { name, email, id, avatar } = action.payload;
        draft.name = name;
        draft.email = email;
        draft.avatar = avatar;
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
