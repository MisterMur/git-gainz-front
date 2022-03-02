//react imports
import React from 'react';
import { AppRegistry,Platform, StatusBar,
   StyleSheet, View,  Image,
   TouchableOpacity,AsyncStorage
 } from 'react-native';

import {PersistGate} from 'redux-persist/integration/react'
import { AppLoading, Font, Icon } from 'expo';
import {Asset} from 'expo-asset'

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import storeObj from './store.js'

//nav  imports
import PrimaryNav from './navigation/AppNavigation';
import { DrawerActions } from 'react-navigation';

//library imports
import FAIcon from 'react-native-vector-icons/FontAwesome'


//styles imports
import colors from './styles/colors'


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
        <Provider store={storeObj.store}>
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
        <Provider store={storeObj.store}>
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

// AppRegistry.registerComponent('App', () => App);
// AppRegistry.runApplication('App', { rootTag: document.getElementById('react-root') });
