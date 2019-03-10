import React from 'react';
import {StyleSheet, View, Text, Button, TouchableWithoutFeedback} from 'react-native';
import Header from '../theme/header';
import Posts from './posts';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class MainScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      category:-1,
    };
    this.props.navigation.setParams({category:this.state.category});
    this.props.navigation.setParams({searchClick:false});
  }
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    if(params.category){
      return{header:(<Header navigation = {navigation} login = {params.login} />)};
    }

  }
  render(){
    return(
      <View style = {styles.container}>
      <Posts navigation = {this.props.navigation } category = {this.state.categoryId}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'stretch',
    backgroundColor:'#1976D2',
  },
});
