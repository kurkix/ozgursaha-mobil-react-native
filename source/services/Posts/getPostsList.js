import Api from '../../config/api.json';

var PostsList = () => {

  this.url = Api.ApiURL + "Posts";

  return fetch(this.url,{
    method:'GET'
  })
  .then( (response) => response.json())
  .then( (responseJson) => { return responseJson; })
  .catch( (error) => { console.log("Can't get posts list."); return 0; });
};

export default getPostsList;
