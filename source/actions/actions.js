import {LOGIN_DATA} from './types.js';

var LoginData = (data) => (dispatch) => {
  dispatch({
    type:LOGIN_DATA,
    payload:data
  });
};
export default LoginData;
