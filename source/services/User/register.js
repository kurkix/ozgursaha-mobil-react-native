import Api from '../../config/api.json';
var register = (data) => {
  this.url = Api.ApiURL + "Users";
  return fetch(this.url,{
    method:'post',
    headers:{
      Accept:'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      NickName: data.nickname,
      UserEmail: data.email,
      Name: data.name,
      LastName: data.lastname,
      Password: data.password,
      UserUrl: data.userurl,
    })
  }).then((response) => {
    if(response.status == 200){
      return {success:true};
    }else{
      return {success:false};
    }
  }).catch((error) => {return {success:false};});
};

export default register;
