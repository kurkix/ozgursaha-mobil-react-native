import {LOGIN_DATA} from '../actions/types.js';
const initialState = {
  loginData:undefined
};

function appReducer(state = initialState,action){
  switch (action.type) {
    case LOGIN_DATA:
      return {...state,loginData:action.payload};
    default:
      return state;
  }
}
export default appReducer;
