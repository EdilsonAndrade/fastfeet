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
        const {product, recipient, deliveryMan} = action.payload;
        draft.produc= product;
        draft.recipient = recipient;
        draft.deliveryMan = deliveryMan;
        break;
      }
      default:
    }
  })
}
