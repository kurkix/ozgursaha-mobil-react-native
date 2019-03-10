import React from 'react';
import {ScrollView,View,StyleSheet,Image,Text,Button,TouchableWithoutFeedback,WebView,StatusBar,ActivityIndicator,Alert,TouchableHighlight} from 'react-native';
import {Post} from '../../../controllers/posts';
import {widthToDP, heightToDP} from '../../../lib/responsiveScale';
import Icon from 'react-native-vector-icons/FontAwesome';
import CommentArea from './commentsArea';
import {PostComments} from '../../../controllers/Comment';

export default class PostScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {title:params.data.title,headerTitleStyle:{color:'#69f0ae'},headerStyle:{backgroundColor:'#1976D2'}};
  }

  state = {
    data:null,
    title:null,
    postId:null,
    comments:null,
    commentsVisible:false,
  };

  componentWillMount = () => {
    let id = this.props.navigation.getParam("data").id;
    this.setState({postId:id});
    Post(id).then((response) => {
      if(response.success){
        this.setState({
          data:response.data
        });
      }
    });
  }
  componentDidMount = () => {
    this.refreshComments();
  };
  closeModal = () => {
    this.setState({commentsVisible:false});
  }
  refreshComments = () => {
    PostComments(this.state.postId).then((response)=>{
      if(response.success){
        this.setState({comments:response.data});
      }else{
        Alert.alert("Can't access comments." + response.data);
      }
    });
  }
  render(){
    if(this.state.data){
      return(
        <View style = {styles.container}>
        <CommentArea refreshComment = {this.refreshComments} data = {this.state.comments} visible = {this.state.commentsVisible} close = {this.closeModal} postid = {this.state.postId} />
        <View style = {styles.header}>
        <View style = {styles.details}>
        <View style = {styles.detailsElements}>
        <Button title = {new Date(this.state.data.postDate).toDateString()} onPress = {() => {}} disable = {true} />
        </View>
        <View style = {styles.detailsElements}>
        <Button title = {this.state.data.author} onPress = {() => {}} disable = {true} />
        </View>
        <View style = {styles.detailsElements}>
        <Button title = {String(this.state.data.commentCount) + " Comments"} onPress = {() => {this.setState({commentsVisible:true});}} />
        </View>
        </View>
        </View>
        { this.state.data ? <WebView scrollEnabled = {false} javascriptEnabled source = {{baseUrl:'',html:"<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" /><style>img,iframe{align-self:'streetch';max-width:100%; margin-top:10px; height:auto} iframe{height:200} strong{white-space:normal;} body{margin-top:30px;text-align:'justify';text-justify:'inter-word';padding:10px;white-space:normal;word-wrap: break-word;    font-family: 'Open Sans', serif;} p:{margin-top:30px;}</style></head><body>"+ this.state.data.postContent +"</body></html>"}} style = { styles.webview }/> : <Text>""</Text> }
        </View>
      );
    }else{
      return(<ActivityIndicator size = "large" color = "#ffffff" />);
    }
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  header:{
    padding:10
  },
  title:{
    fontSize:widthToDP('5%'),
    textAlign:'center'
  },
  details:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    paddingLeft:5,
    paddingRight:5,
    marginTop:20,
    paddingBottom:10
  },
  detailsElements:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    marginLeft:5
  },
  detailsElementsText:{
    marginLeft:5,
  },
  webview:{
    flex:1,
    width:widthToDP('100%'),
  }
});
