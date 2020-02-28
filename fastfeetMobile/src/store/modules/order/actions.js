export const loadSuccess = (data) =>{
  return{
    type: "@order/LOAD_SUCCESS",
    payload: data
  }
}

export const selectOrder = (order)=>{
  return {
    type: "@order/SELECT_ONE_ORDER",
    payload: order

  }
}
