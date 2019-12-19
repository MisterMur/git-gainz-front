import React,{Component} from 'react'
import { createStackNavigator,createAppContainer,createDrawerNavigator} from 'react-navigation'

import { DrawerActions } from 'react-navigation';
import { View, Image, TouchableOpacity } from 'react-native';
import MainTabNavigator from './MainTabNavigator'

import {Text} from 'react-native'

// import HomeScreen from '../screens/HomeScreen';

import WorkoutScreen from '../screens/WorkoutScreen'
import SettingsScreen from '../screens/SettingsScreen';
import SignInScreen from '../screens/SignInScreen.js';
import ScheduleListScreen from '../screens/ScheduleListScreen.js'
import LoginScreen from '../screens/LoginScreen.js'

import WorkoutListScreen from '../screens/WorkoutListScreen.js';
// const WorkoutListStack = createStackNavigator({
//   WorkoutList: WorkoutListScreen,
// });



// login stack
const LoginStack = createStackNavigator({
  loginScreen: { screen: LoginScreen },
  // signupScreen: { screen: SignupScreen },
  // forgottenPasswordScreen: { screen: ForgottenPasswordScreen, navigationOptions: { title: 'Forgot Password' } }
}, {
  headerMode: 'float',
  defaultNavigationOptions:  ({ navigation }) => ({

    headerStyle: {backgroundColor: '#E73536'},
    title: 'You are not logged in',
    headerTintColor: 'white',
    headerLeft: <Text onPress={() =>{
        navigation.navigate('DrawerOpen')
      // navigation.dispatch(DrawerActions.openDrawer());
      console.log('open drawer',navigation)
      // navigation.openDrawer()
    }
    }>Menu</Text>
  })

})
// const WorkoutListStack = createStackNavigator({
//   WorkoutList: WorkoutListScreen,
// });


const WorkoutStack = createStackNavigator({
  ScheduleList:ScheduleListScreen,
  WorkoutList:WorkoutListScreen,
  Workout: WorkoutScreen,
},
  
);

const DrawerStack =createDrawerNavigator({

  screen1: { screen: LoginScreen },
  screen2: { screen: WorkoutStack}
})

// screen2: { screen: ScheduleListScreen },
const DrawerNavigation = createStackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    headerStyle: {backgroundColor: 'green'},
    title: 'Logged In to your app!',
    headerLeft: <Text onPress={() => navigation.navigate('DrawerOpen')}>Menu</Text>
  })
})

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  loginStack: { screen: LoginStack },
  drawerStack: { screen: DrawerNavigation },
  WorkoutStack,
}, {
  // Default config for all screens


  headerMode: 'none',
  title:'Main',
  initialRouteName: 'loginStack',

}
)


export default createAppContainer(PrimaryNav);

// export default createAppContainer(
//   {
//       HomeStack,
//
//       ScheduleListStack,
//       WorkoutStack
//
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ focused, horizontal, tintColor }) => {
//         const { routeName } = navigation.state;
//         let IconComponent = Ionicons;
//         let iconName;
//         if (routeName === 'Home') {
//           iconName = `ios-information-circle${focused ? '' : '-outline'}`;
//           // Sometimes we want to add badges to some icons.
//           // You can check the implementation below.
//           IconComponent = HomeIconWithBadge;
//         } else if (routeName === 'Settings') {
//           iconName = `ios-options`;
//         }
//
//         // You can return any component that you like here!
//         return <IconComponent name={iconName} size={25} color={tintColor} />;
//       },
//     }),
//     tabBarOptions: {
//       activeTintColor: 'tomato',
//       inactiveTintColor: 'gray',
//     },
//   }
// );
// export default PrimaryNav
