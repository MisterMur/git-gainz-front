import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator,DrawerItems,SafeAreaView } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import WorkoutListScreen from '../screens/WorkoutListScreen';
import WorkoutScreen from '../screens/WorkoutScreen'
import SettingsScreen from '../screens/SettingsScreen';
import SignInScreen from '../screens/SignInScreen.js';
import ScheduleListScreen from '../screens/ScheduleListScreen.js'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};
const ScheduleListStack = createStackNavigator({
  ScheduleList: ScheduleListScreen,
  WorkoutList: WorkoutListScreen
});

ScheduleListStack.navigationOptions = {
  tabBarLabel: 'My Schedules',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const WorkoutListStack = createStackNavigator({
  WorkoutList: WorkoutListScreen,
});

WorkoutListStack.navigationOptions = {
  tabBarLabel: 'Workout List',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const WorkoutStack = createStackNavigator({
  Workout: WorkoutScreen,
});

WorkoutStack.navigationOptions = {
  tabBarLabel: 'Workout',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};


export default createBottomTabNavigator({
  HomeStack,

  ScheduleListStack,
  WorkoutStack
});
// WorkoutListStack,
