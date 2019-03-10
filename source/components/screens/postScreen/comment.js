import React from 'react';
import {Text,View,StyleSheet} from 'react-native';

export default class Comment extends React.Component{
  render(){
    return(
      <View style = {this.props.data.commentParentId == 0 ? styles.containerParent : styles.containerChild}>
      <View style = {styles.commentInfo}>
      <Text style = {styles.commentInfoText}>{this.props.data.author}</Text>
      </View>
      <Text style = {styles.commentText}>{this.props.data.content}</Text>
      <View style = {styles.commentInfoBottom}>
      <Text style = {styles.commentInfoText}>{this.props.data.authorEmail}</Text>
      <Text style = {styles.commentInfoText}>{new Date(this.props.data.date).toDateString()}</Text>
      </View>
      {this.props.data.childComments ? this.props.data.childComments.map((child,i)=><Comment data = {child} key = {i}/>) : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerParent:{
    borderRadius:5,
    margin:10,
    backgroundColor:'#C8E6C9'
  },
  containerChild:{
    width:'95%',
    backgroundColor:'#ffffff',
    alignSelf:'flex-end',
    margin:5,
  },
  commentInfo:{
    flexDirection:'row',
    justifyContent:'center',
    padding:5,
    backgroundColor:'green',
  },
  commentInfoText:{
    color:'#ffffff'
  },
  commentText:{
    padding:15,
    backgroundColor:'white'
  },
  commentInfoBottom:{
    backgroundColor:'grey',
    flexDirection:'row',
    justifyContent:'space-between',
    padding:5
  }
});
