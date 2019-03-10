import Api from '../../config/api.json';
var getPostComments = postID => {
  return fetch(Api.ApiURL + "Comments/" + postID)
         .then((response)=> response.json())
         .then((responseJson) => {console.log("Successfull get comments."); return {success:true, data:responseJson};})
         .catch((error) => {console.log("Can't get comments."); return {success:false, data:error};});
};

export default getPostComments;
