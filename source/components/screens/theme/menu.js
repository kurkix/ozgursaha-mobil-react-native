import React from 'react';
import {StyleSheet,View, Button, Text,StatusBar, TextInput} from 'react-native';
import {CategoriesList} from '../../../controllers/category';

export default class Menu extends React.Component {
  componentWillMount = () => {
    CategoriesList().then((response) => {
      if(response.success){
        this.setState({data:response.data});
      }
    });
  }
  render(){
    return(
      <View>

      </View>
      <Icon name = "bars" size = {30} color = "white" style = {styles.menu} onPress = {() => {this.setState({menuClick:true});}}/>

    );
  }
}
