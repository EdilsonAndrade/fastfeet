import {produce} from 'immer';
const INITIAL_VALUE = {
  name: null,
  email: null,
  avatar: null,
  signed:false,
  createdAt:'',
  id:0

}

export default function auth(state = INITIAL_VALUE, action){
  return produce(state, draft =>{
    switch (action.type) {
      case '@signin/REQUEST':{
        const {id, name, email, avatar, createdAt} = action.payload;
        draft.name = name;
        draft.email = email;
        draft.avatar = avatar;
        draft.signed=true;
        draft.createdAt = createdAt;
        draft.id = id;
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
