import getPostsList from '../services/Posts/getPostsList';
import getPost from '../services/Posts/getPost';

var PostsList = () => {
  return getPostsList()
  .then( (response) => {
    return {
      success:true,
      data:response
    };
  })
  .catch( (error) => {
    console.log("Error, can't use posts list service.");
    return {
      success:false,
      data: "Error."
    };
  });
};

var Post = (postId) => {
  return getPost(postId)
         .then((response) => { return response; })
         .catch((error) => { return {success:false}; });
};

export {
  PostsList,
  Post
};
