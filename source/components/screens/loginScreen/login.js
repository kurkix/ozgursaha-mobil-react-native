import React from 'react';
import {Text,StyleSheet,View,TextInput,Button,Alert,AsyncStorage,Image,ScrollView } from 'react-native';
import {Login} from '../../../controllers/user';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import LoginData from '../../../actions/actions';

 class LoginScreen extends React.Component{
   constructor(props){
     super(props);
   }
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {title:'Login',headerTitleStyle:{color:'#ffffff'},headerStyle:{backgroundColor:'#1976D2'}};
  }
  state = {
    userinfo:null,
    password:null,
    passwordVisible:false,
  }
  _login = async () => {
    Login(this.state.userinfo,this.state.password).then((response) => {
      if(response.success){
        return AsyncStorage.setItem("loginData", JSON.stringify(response.data)).then(() => {
          this.props.Login(response.data);
          this.props.navigation.navigate("Main", { login: true });
        }).catch((error) => {console.log(error);Alert.alert("Try Again.");});
      }else {
        Alert.alert("Login Failed.");
      }
    });
  }
  render(){
    return(
      <View style = {{flex:1}}>
        <ScrollView contentContainerStyle = {styles.container}>
          <Image resizeMode = "contain" source = {require('../../../../assets/icon.png')} style = {styles.logo}/>
          <TextInput placeholder = "Username or Email.." style = {styles.textInput} onChangeText={(text) => this.setState({userinfo:text})}/>

          <View style = {styles.passwordArea}>
            <TextInput placeholder = "Password.." secureTextEntry = {!this.state.passwordVisible} style = {styles.passwordTextInput} onChangeText={(text) => this.setState({password:text})}/>
            {this.state.passwordVisible ? <Icon name = "eye-slash" size = {30}  onPress = {() => {this.setState({passwordVisible:false}); }}/> : <Icon name = "eye" size = {30}  onPress = {() => {this.setState({passwordVisible:true}); }}/>}
          </View>
          <Button title = "Login" color = "green" onPress = {this._login} style = {{flex:1}}/>
          <View style = {styles.button}>
            <Button title = "Register" onPress = {() => {this.props.navigation.navigate("Register");}}/>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main:{
    flex:1,
    alignItems:'stretch'
  },
  container:{
    flexGrow:1,
    alignItems:'stretch',
    backgroundColor:'#FF5722',
    padding:20
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
    marginTop:50,
    marginBottom:100
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
export default connect(mapsToProps, mapDispatchToProps)(LoginScreen)
