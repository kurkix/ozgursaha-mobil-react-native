import Api from '../../config/api.json';
var sendComment = (data) => {
  this.url = Api.ApiURL + "Comments";
  return fetch(this.url,{
    method:'post',
    headers:{
      Accept:'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      Author: data.author,
      AuthorEmail: data.authorEmail,
      Content: data.content,
      PostId:data.postId,
      CommentParentId:data.commentParentId
    })
  }).then((response) => {
    if(response.status == 200){
      return {success:true};
    }else{
      return {success:false};
    }
  }).catch((error) => {return {success:false};});
};

export default sendComment;
