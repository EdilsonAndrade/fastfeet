import { produce } from 'immer';

const INITIAL_VALUE = {
  deliverymanId: null,
  recipientId: null,
  product: '',
  Recipient: '',
  DeliveryMan: '',
  orders: [],
};

export default function student(state = INITIAL_VALUE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@order/SAVE_SUCCESS': {
        const {
          deliverymanId,
          recipientId,
          product,
          id,
          Recipient,
          DeliveryMan,
        } = action.payload;

        draft.deliverymanId = deliverymanId;
        draft.recipientId = recipientId;
        draft.product = product;
        draft.Recipient = Recipient;
        draft.DeliveryMan = DeliveryMan;
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
