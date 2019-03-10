import React from 'react';
import {Text,StyleSheet,View,TextInput,Button,Alert,ScrollView,Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Register} from '../../../controllers/user';

export default class RegisterScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {title:'Register',headerTitleStyle:{color:'#ffffff'},headerStyle:{backgroundColor:'#1976D2'}};
  }
  state = {
    nickname:'',
    email:'',
    name:'',
    lastname:'',
    userurl:'',
    password:'',
    passwordVisible:false,
  }
  _register = () => {
    let data = {
      nickname: this.state.nickname,
      email:this.state.email,
      name:this.state.name,
      lastname:this.state.lastname,
      userurl:this.state.userurl,
      password:this.state.password
    };
    Register(data).then((response)=>{
      if(response.success){
        Alert.alert("Ok","Successfull.",[
          {text:'Ok', onPress:() => {this.props.navigation.goBack();}}
        ]);
      }else{
        Alert.alert("Error","Register failed.");
      }
    }).catch((error)=>{
      Alert.alert("Error","Register failed.");
    });
  }
  render(){
    return(
      <View style = {styles.main}>
      <ScrollView contentContainerStyle = {styles.container}>
      <Image resizeMode = "contain" source = {require('../../../../assets/icon.png')} style = {styles.logo}/>
      <TextInput placeholder = "Nickname.." style = {styles.textInput} onChangeText={(text) => this.setState({nickname:text})}/>
      <TextInput placeholder = "Email.." style = {styles.textInput} onChangeText={(text) => this.setState({email:text})}/>
      <TextInput placeholder = "First Name.." style = {styles.textInput} onChangeText={(text) => this.setState({name:text})}/>
      <TextInput placeholder = "Last Name.." style = {styles.textInput} onChangeText={(text) => this.setState({lastname:text})}/>
      <TextInput placeholder = "Web Site.." style = {styles.textInput} onChangeText={(text) => this.setState({userurl:text})}/>
      <View style = {styles.passwordArea}>
      <TextInput placeholder = "Password.." secureTextEntry = {!this.state.passwordVisible} style = {styles.passwordTextInput} onChangeText={(text) => this.setState({password:text})}/>
      {this.state.passwordVisible ? <Icon name = "eye-slash" size = {30}  onPress = {() => {this.setState({passwordVisible:false}); }}/> : <Icon name = "eye" size = {30}  onPress = {() => {this.setState({passwordVisible:true}); }}/>}
      </View>
      <Button title = "Register" color = "green" onPress = {this._register}/>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    flex:1
  },
  container:{
    flexGrow:1,
    alignItems:'stretch',
    backgroundColor:'#FF5722',
    justifyContent:'center',
    padding:30,
  },
  textInput:{
    backgroundColor:'#ffffff',
    marginBottom:20,
    width:'100%'
  },
  passwordTextInput:{
    backgroundColor:'#ffffff',
    width:'90%',
    height:'auto'
  },
  passwordArea:{
    flexDirection:'row',
    justifyContent:'space-around',
    backgroundColor:'#ffffff',
    marginBottom:20,
    alignItems:'center'
  },
  button:{
    marginTop:10
  },
  logo:{
    height:250,
    alignSelf:'center',
    marginBottom:50
  }
});
