import React from 'react';
import {ScrollView,View,StyleSheet,Image,Text,TouchableWithoutFeedback} from 'react-native';

export default class PostArea extends React.Component {
  goPost = () => {
    console.log("going to post");
    this.props.navigation.navigate("Post", {data:this.props.data});
  }
  render(){
    return(
      <TouchableWithoutFeedback onPress = {this.goPost}>
      <View style = {styles.postArea}>
      <Image source = {{uri:this.props.data.featuredImage }} style = {styles.postImage}/>
      <View style = {styles.postTextArea}><Text style = {styles.postText}> { this.props.data.title }</Text></View>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  postArea:{
    alignSelf:'stretch',
    alignItems:'center',
    marginTop:10,
  },
  postImage:{
    alignSelf:'stretch',
    width:'100%',
    height:200
  },
  postTextArea:{
    position:'absolute',
    bottom:0,
    backgroundColor:'#000000bb',
    width:'100%',
    padding:10
  },
  postText:{
    textAlign:'center',
    fontSize:20,
    color:'#ffffff'
  }
});
