import login from '../services/User/login';
import register from '../services/User/register';

var Login = (info,password) =>{
  return login(info,password)
         .then((response)=> {
           return response;
         })
         .catch((error)=>{return {success:false};});
};

var Register = (data) => {
  return register(data).then((response)=>{return response;}).catch((error) => {return {success:false};});
};
export {
  Login,
  Register
};
