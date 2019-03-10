import React from 'react';
import {View,Modal,Text,Button,StyleSheet,ScrollView,ActivityIndicator,TextInput,Alert} from 'react-native';
import Comment from './comment';
import {connect} from 'react-redux';
import LoginData from '../../../actions/actions';
import {widthToDP, heightToDP} from '../../../lib/responsiveScale';
import {SendComment} from '../../../controllers/Comment';
class CommentArea extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalOpened:this.props.visible,
      commentContent:undefined
    };
  };
  send = () => {
    let data = {
      author:this.props.loginData.displayName,
      authorEmail:this.props.loginData.email,
      content:this.state.commentContent,
      postId:this.props.postid,
      commentParentId:0
    };
    SendComment(data).then((response) => {
      if(response.success){
        this.props.refreshComment();
        this.setState({commentContent:''});
      }else{
        Alert.alert("Error.","Try again.");
      }
    }).catch((error) => {console.log(error);Alert.alert("Error.","Try again.");});
  };
  render(){
    return(
      <Modal
      animationType = "slide"
      transparent = {true}
      visible = {this.props.visible}
      onRequestClose = {()=> {console.log("closing..")}}>
      <View style = {styles.main}>
      <ScrollView contentContainerStyle = {styles.container}>
      <Button title = "Close " onPress = {this.props.close}/>
      {
        this.props.data ?
        <View>
        {this.props.data.map((comment,i)=><Comment data = {comment} key = {i} />)}
        { this.props.loginData != undefined ?
          <View>
            <TextInput placeholder = "Write here.." style = {styles.textInput} value = {this.state.commentContent} onChangeText = {(text) => {this.setState({commentContent:text});}} />
            <Button title = "Send" onPress = {this.send} style = {styles.sendButton} />
          </View> : null }
        </View>
        :
        <ActivityIndicator size = "large" color = "#FF5722" />
      }
      </ScrollView>
      </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    flex:1,
    marginTop:30,
    marginBottom:30
  },
  container:{
    width:'90%',
    alignSelf:'center',
    backgroundColor:'#ffffffdd',
    justifyContent:'space-between',
  },
  textInput:{
    backgroundColor:'#0000000a'
  },
  sendButton:{
    marginBottom:10
  }
});
const mapsToProps = ({appReducer}) => {
  const {loginData} = appReducer;
  return {loginData};
};
const mapDispatchToProps = (dispatch) => {
  return {
    Login: (data) => dispatch(LoginData(data))
  };
};
export default connect(mapsToProps, mapDispatchToProps)(CommentArea)
