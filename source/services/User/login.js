import Api from '../../config/api.json';


var login = (info,password) => {
  this.url = Api.ApiURL + "Users/" + info + "/" + password;
  return fetch(this.url)
         .then((response)=>response.json())
         .then((responseJson) => {return {success:true,data:responseJson};})
         .catch((error)=>{return {success:false, data:error};});
};
export default login;
