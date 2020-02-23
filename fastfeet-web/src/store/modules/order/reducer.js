import { produce } from 'immer';

const INITIAL_VALUE = {
  deliveryManId: null,
  recipientId: null,
  product: '',
  orders: [],
};

export default function student(state = INITIAL_VALUE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@order/SAVE_SUCCESS': {
        const { deliverymanId, recipientId, product, id } = action.payload;

        draft.deliveryManId = deliverymanId;
        draft.recipientId = recipientId;
        draft.product = product;
        draft.id = id;
        break;
      }
      case '@order/LOAD_SUCCESS': {
        draft.orders = action.payload;
        break;
      }
      default:
        break;
    }
  });
}
