import React from 'react';
import {connect} from 'react-redux'
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
// import {getUserToken} from ''
class AuthLoadingScreen extends React.Component {

  static navigationOptions = {
    title: 'Authloading...',


  };

  constructor() {
    super();
    this.state = { hasToken: false, isLoaded: false };

  }

  componentDidMount() {
    AsyncStorage.getItem('access_token').then((token) => {
      console.log('token:',token);
      this.setState({ hasToken: token!==null, isLoaded: true })
    });

  }

  navigate(){
    navTo = this.state.hasToken?'drawerStack':'loginStack'
    console.log('this has token',this.state.hasToken)
    console.log('were going to ',navTo)
    this.props.navigation.navigate(navTo)
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <>
        <ActivityIndicator /></>
      )} else{return(<>{this.navigate()}</>)}
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

function mapStateToProps(state) {
  return {
    token: state.user.token,
  }
};


export default connect(mapStateToProps) (AuthLoadingScreen)
