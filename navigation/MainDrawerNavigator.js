import React from 'react';
import { createDrawerNavigator,createAppContainer, createSwitchNavigator ,createStackNavigator} from 'react-navigation';

// import MainTabNavigator from './MainTabNavigator';
import HomeScreen from '../screens/HomeScreen.js'
import SignInScreen from '../screens/SignInScreen.js'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'


import ScheduleListScreen from '../screens/ScheduleListScreen'

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
  },
  Schedules: {
    screen: ScheduleListScreen,
  },
});

const MyApp = createAppContainer(MyDrawerNavigator);
