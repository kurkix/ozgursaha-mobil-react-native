import React from 'react';
import {StyleSheet,View, Button, Text,StatusBar, TextInput,AsyncStorage,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CategoriesList} from '../../../controllers/category';
import UserData from '../../../config/UserData';
import {connect} from 'react-redux';
import LoginData from '../../../actions/actions';

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchClick: false,
      menuClick:false,
    };
  }
  signOut = async () => {
    return AsyncStorage.removeItem("loginData").then(()=> {
      this.props.Login(undefined);
      this.props.navigation.navigate("Login");
    }).catch((error) => {console.log(error);});
  }
  componentWillMount =  () => {
    CategoriesList().then((response) => {
      if(response.success){
        this.setState({data:response.data});
      }
    });
  };
  search = () => {
    console.log("searchin..");
  };
  render(){
    if(this.state.searchClick){
      return(
        <View style = {styles.header}>
          <Icon name = "chevron-left" size = {30} color = "white" onPress = {() => {this.setState({searchClick:false});this.props.navigation.setParams({searchClick:false});}} />
          <TextInput placeholder= "Search.." style = {styles.search} onChangeText = {(text) => {this.props.navigation.setParams({searchClick:true,searchText:text});}} />
        </View>
      );
    }else if (this.state.menuClick){
      return(
        <View style = {styles.menuBack}>
          <View style = {styles.menuTop}>
            <Icon name = "search" size = {30} color = 'white' onPress = {() => {this.setState({searchClick:true});}} />
            <Text style = {styles.text}>ÖzgürSaha</Text>
            <View style = {styles.right}>
              {this.props.loginData != undefined ? <Icon name = "sign-out" size = {30} color = "white" style = {styles.rightItem} onPress = {() => {this.props.navigation.navigate("Login"); }}/>  : <Icon name = "user" size = {30} color = "white" style = {styles.rightItem} onPress = {() => {this.props.navigation.navigate("Login"); }}/> }
              <Icon name = "bars" size = {30} color = "white" style = {styles.rightItem} onPress = {() => {if(this.state.data != null) this.setState({menuClick:false});}}/>
            </View>
          </View>
          <View style = {styles.menu}>
            <Text style = {styles.menuText} onPress = {() => {this.props.navigation.setParams({category:-1})} }>Hepsi</Text>
              {this.state.data.map((category, i)=>{ if(i!=0) return <Text key = {i} style = {styles.menuText} onPress = {() => {this.props.navigation.setParams({category:category.id})} }>{category.name}</Text>})}
          </View>
        </View>
      );
    }else{
      return(
        <View style = {styles.header}>
          <Icon name = "search" size = {30} color = 'white' onPress = {() => {this.setState({searchClick:true});}} />
          <Text style = {styles.text}>ÖzgürSaha</Text>
          <View style = {styles.right}>
            {this.props.loginData != undefined ? <Icon name = "sign-out" size = {30} color = "white" style = {styles.rightItem} onPress = {this.signOut}/> : <Icon name = "user" size = {30} color = "white" style = {styles.rightItem} onPress = {() => {this.props.navigation.navigate("Login"); }}/> }
            <Icon name = "bars" size = {30} color = "white" style = {styles.rightItem} onPress = {() => {if(this.state.data != null) this.setState({menuClick:true});}}/>
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  header:{
    backgroundColor: '#1976D2',
    flexDirection:'row',
    justifyContent:'space-between',
    alignSelf:'stretch',
    alignItems:'center',
    padding:15,

  },
  text:{
    color:"#ffffff",
    fontSize:25,
    alignSelf:'center'
  },
  right:{
    flexDirection:'row',
  },
  rightItem:{
    marginLeft:20,
  },
  search:{
    flex:9,
    padding:5,
    fontSize:20,
    color:'#ffffff',
    marginLeft:20
  },
  left:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignSelf:'stretch',
    alignItems:'center',
  },
  searchArea:{
    flexDirection:'row'
  },
  menuBack:{
    backgroundColor: '#1976D2',

    padding:15
  },
  menuText:{
    color:'yellow',
    fontSize:15,
    marginTop:30,
    marginRight:10,
  },
 menuTop:{
   flexDirection:'row',
   justifyContent:'space-between',
   alignSelf:'stretch',
 },
  menu:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
    alignSelf:'stretch'
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
export default connect(mapsToProps, mapDispatchToProps)(Header)
