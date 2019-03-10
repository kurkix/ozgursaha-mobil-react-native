import getPostComments from '../services/Comment/getPostComments';
import sendComment from '../services/Comment/sendComment';
var PostComments = postID => {
  return getPostComments(postID)
        then((response) => {return response;})
        .catch((error) => {return {success:false};});
};
var SendComment = data => {
  return sendComment(data).
         then((response) => {return response;})
         .catch((error) => {return {success:false};});
};
export {
  PostComments,
  SendComment
};
