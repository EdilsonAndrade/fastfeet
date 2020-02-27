import {produce} from 'immer';
const INITIAL_VALUE = {
  name: null,
  email: null,
  avatar: null,
  signed:false

}

export default function auth(state = INITIAL_VALUE, action){
  return produce(state, draft =>{
    switch (action.type) {
      case '@signin/REQUEST':{
        const {name, email, avatar} = action.payload;
        draft.name = name;
        draft.email = email;
        draft.avatar = avatar;
        draft.signed=true;
        break;

      }
      case '@signout/REQUEST':{
        draft.signed=false;
        break;

      }
      default:
    }
  })
}