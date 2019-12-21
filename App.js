import React from 'react';
import { AppRegistry,Platform, StatusBar, StyleSheet, View,  Image,TouchableOpacity } from 'react-native';
import { AppLoading, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import PrimaryNav from './navigation/AppNavigation';
import { DrawerActions } from 'react-navigation';
import {Router, Scene} from 'react-native-router-flux';
import {PersistGate} from 'redux-persist/integration/react'

import ReduxNavigation from './navigation/ReduxNavigation';
import {ActivityIndicator, AsyncStorage} from 'react-native';

// import MainDrawerNavigator from './navigation/MainDrawerNavigator'
// import HorizontalMenu from './screens/drawers/HorizontalMenu'
import {Asset} from 'expo-asset'

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';


import store from './store.js'

import Authentication from './screens/LoginScreen'
import ScheduleListScreen from './screens/ScheduleListScreen'
import WorkoutListScreen from './screens/WorkoutListScreen'
import WorkoutScreen from './screens/WorkoutScreen'


import LoginForm from './components/LoginForm'


export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };
  constructor() {
    super();
    this.state = { hasToken: false, isLoaded: false };
  }

  componentDidMount() {
    AsyncStorage.getItem('access_token').then((token) => {
      this.setState({ hasToken: token !== null, isLoaded: true })
    });
  }





  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <Provider store={store}>
          <PersistGate persistor={storeObj.persistor} loading={null}>
            <AppLoading
              startAsync={this._loadResourcesAsync}
              onError={this._handleLoadingError}
              onFinish={this._handleFinishLoading}
              />
          </PersistGate>
        </Provider>
      );
    } else {
      return (
        <Provider store={store}>
          <PersistGate persistor={storeObj.persistor}>
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <PrimaryNav />
            </View>
          </PersistGate>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      // Font.loadAsync({
      //   // This is the font that we are using for our tab bar
      //   ...Icon.Ionicons.font,
      //   // We include SpaceMono because we use it in HomeScreen.js. Feel free
      //   // to remove this if you are not using it in your app
      //   'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      // }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
// AppRegistry.registerComponent('HorizontalMenu', () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
