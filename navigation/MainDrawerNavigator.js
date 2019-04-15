import React from 'react';
import { createAppContainer, createSwitchNavigator ,createStackNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import HomeScreen from '../screens/HomeScreen.js'
import SignInScreen from '../screens/SignInScreen.js'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'




const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  Notifications: {
    screen: MyNotificationsScreen,
  },
});

const MyApp = createAppContainer(MyDrawerNavigator);
