import { produce } from 'immer';
const INITIAL_DATA = {
  orders: [],
  product: null,
  recipipent: null,
  deliveryMan: null,
  startDate: null,
  endDate: null,
  createdAt: null,
  canceledAt: null,
  id: null
}

export default function order(state = INITIAL_DATA, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "@order/LOAD_SUCCESS": {
        console.tron.warn(`DATA = ${JSON.stringify(action.payload)}`)
        draft.orders = action.payload;
        break;
      }
      case "@order/SELECT_ONE_ORDER": {
        const { id, product, Recipient, DeliveryMan, canceledAt, createdAt, endDate, startDate } = action.payload;
        console.tron.warn(`startdate = ${startDate}`);
        draft.product = product;
        draft.recipient = Recipient;
        draft.deliveryMan = DeliveryMan;
        draft.id = id;
        draft.canceledAt = canceledAt;
        draft.createdAt = createdAt;
        draft.endDate = endDate;
        draft.startDate = startDate;
        break;
      }
      default:
    }
  })
}
