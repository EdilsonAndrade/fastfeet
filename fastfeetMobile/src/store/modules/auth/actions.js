export const signinRequest =(data) =>{
  return{
    type: "@signin/REQUEST",
    payload: data
  }
}
export const signoutRequest = () =>{
  return{
    type: '@signout/REQUEST',
    
  }
}