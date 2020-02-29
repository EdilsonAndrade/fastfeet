import {produce} from 'immer';
const INITIAL_DATA = {
  orders:[],
  product:null,
  recipipent:null,
  deliveryMan: null
}

export default function order(state=INITIAL_DATA, action){
  return produce(state, draft=>{
    switch (action.type) {
      case "@order/LOAD_SUCCESS":{
        console.tron.warn(`DATA = ${JSON.stringify(action.payload)}`)
        draft.orders = action.payload;
        break;
      }
      case "@order/SELECT_ONE_ORDER":{
        const {product, Recipient, DeliveryMan} = action.payload;
        draft.product= product;
        draft.recipient = Recipient;
        draft.deliveryMan = DeliveryMan;
        break;
      }
      default:
    }
  })
}
