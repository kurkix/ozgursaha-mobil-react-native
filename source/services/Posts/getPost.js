import Api from '../../config/api.json';

var getPost = (postId) => {
  this.url = Api.ApiURL + "Posts/" + postId;
  return fetch(this.url)
         .then((response) => response.json())
         .then((responseJson) => { return { success:true, data:responseJson }; })
         .catch((error) => { return { success:false, data:error }; });
};

export default getPost;
