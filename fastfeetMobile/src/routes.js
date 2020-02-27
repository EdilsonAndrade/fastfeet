import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Dashboard from '~/pages/Dashboard';
import Signin from '~/pages/Signin';


export default (isSigned = false) => createAppContainer(
  createSwitchNavigator({
    Signin: createSwitchNavigator({
      Signin
    }),
    App: createBottomTabNavigator({
      Dashboard,
    })
  }),
 
)