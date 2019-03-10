import React from 'react';
import {ScrollView,View,StyleSheet,Image,Text,StatusBar,ActivityIndicator} from 'react-native';
import {PostsList} from '../../../controllers/posts';
import PostArea from './postArea';
export default class Posts extends React.Component {
  state = {
    data:null,
  }
  componentWillMount = () => {
    PostsList().then( (response) => {
      if(response.success){
        this.setState({
          data: response.data
        });
      }
    });
  }
  render(){
    return(
      <ScrollView contentContainerStyle = {styles.container}>
      {  this.state.data ?
        this.props.navigation.getParam("category") == -1 ?
        this.state.data.map((post,i)=>{
          if(this.props.navigation.getParam("searchClick") == true)
          {
            console.log(this.props.navigation.getParam("searchText"));
            if(post.title.toLowerCase().search(this.props.navigation.getParam("searchText").toLowerCase()) != -1)
              return (<PostArea key= {i} data = {post} navigation = {this.props.navigation} />);
          }else
            return (<PostArea key= {i} data = {post} navigation = {this.props.navigation} />)
          })
            : this.state.data.map((post,i)=>{

              if(post.categoryId == this.props.navigation.getParam("category"))
              {
                if(this.props.navigation.getParam("searchClick") == true)
                {
                  console.log(this.props.navigation.getParam("searchText"));
                  if(post.title.toLowerCase().search(this.props.navigation.getParam("searchText").toLowerCase()) != -1)
                    return (<PostArea key= {i} data = {post} navigation = {this.props.navigation} />);
                }else
                  return (<PostArea key= {i} data = {post} navigation = {this.props.navigation} />)
              }
            }) : <ActivityIndicator size = "large" color = "#ffffff" />
             }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flexGrow:1,
    alignItems:'center',
    backgroundColor:'#FF5722',
    padding:10
  }
});
