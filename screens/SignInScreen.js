import React from 'react';
import {
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import {connect} from 'react-redux'
class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}


// class OtherScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Lots of features here',
//   };
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
//         <StatusBar barStyle="default" />
//       </View>
//     );
//   }
//
//   _signOutAsync = async () => {
//     await AsyncStorage.clear();
//     this.props.navigation.navigate('Auth');
//   };
// }
export default connect()(SignInScreen)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
