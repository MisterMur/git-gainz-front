// import React from 'react';
// import {StackNavigator, createAppContainer, createSwitchNavigator ,createStackNavigator} from 'react-navigation';
//
// import MainTabNavigator from './MainTabNavigator';
// import HomeScreen from '../screens/HomeScreen.js'
// import LoginScreen from '../screens/AuthScreens/LoginScreen.js'
// import SignInScreen from '../screens/SignInScreen.js'
// import AuthLoadingScreen from '../screens/AuthScreens/AuthLoadingScreen.js'
// import ScheduleListScreen from '../screens/ScheduleListScreen.js'
//
// const AppStack = createStackNavigator({ Home: HomeScreen });
// // const AuthStack = createStackNavigator({ SignIn: SignInScreen });
//
//
// // const PrimaryNav = StackNavigator({
// //   Home: { screen: HomeScreen }
// //   }, {
// //     // Default config for all screens
// //     headerMode: 'none',
// //     initialRouteName: 'LoginScreen'
// // })
//
// export default createAppContainer(createSwitchNavigator({
//   // You could add another route here for authentication.
//   // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//     Home: HomeScreen,
//     Main: MainTabNavigator,
//     Login: LoginScreen,
//     SignIn: SignInScreen,
//     ScheduleList: {screen:ScheduleListScreen},
//     // AuthLoading: AuthLoadingScreen,
//     App: AppStack,
//     // Auth: AuthStack,
//   },
//   {
//     initialRouteName: 'Main',
//   }
// ));
