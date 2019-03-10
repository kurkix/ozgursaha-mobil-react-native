import { createStackNavigator,createAppContainer } from 'react-navigation';
import MainScreen from '../mainScreen/main';
import PostScreen from '../postScreen/post';
import LoginScreen from '../loginScreen/login';
import RegisterScreen from '../registerScreen/register';

const Navigation = createStackNavigator({
  Main:{ screen: MainScreen },
  Post: { screen: PostScreen },
  Login: {screen:LoginScreen },
  Register: {screen:RegisterScreen}
},
{
  headerMode:'screen',
  headerLayoutPreset:'center',
  navigationOptions:{
    title: 'Özgür Saha',
    headerStyle:{
      backgroundColor: '#1976D2',
    },
    headerTitleStyle: {
      fontSize:25,
      color:'#ffffff'
    }
  }
});
const AppNav = createAppContainer(Navigation);
export default AppNav;
