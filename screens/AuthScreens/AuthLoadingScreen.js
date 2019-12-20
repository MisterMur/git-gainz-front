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
    // this._bootstrapAsync();

  }

  componentDidMount() {
    AsyncStorage.getItem('access_token').then((token) => {
      console.log('token:',token);
      this.setState({ hasToken: token!==null, isLoaded: true })
    });
  }
  // Fetch the token from storage then navigate to our appropriate place
  // _bootstrapAsync = async () => {
  //   const userToken = await AsyncStorage.getItem('userToken');
  //   console.log('in auth loading',userToken)
  //
  //   // This will switch to the App screen or Auth screen and this loading
  //   // screen will be unmounted and thrown away.
  //   this.props.navigation.navigate(userToken ? 'ScheduleListStack' : 'loginScreen');
  // };
  navigate(){

    navTo = this.state.hasToken?'drawerStack':'loginStack'
    console.log('this has token',this.state.hasToken)
    console.log('were going to ',navTo)
    this.props.navigation.navigate(navTo)
  }

  // Render any loading content that you like here
  render() {
    if (!this.state.isLoaded) {
      return (
        <ActivityIndicator />
      )
    } else {
      {this.navigate()}
      return (<>
        </>)
    }
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


// function mapDispatchToProps(dispatch) {
//   return {
//     // getUserToken: () => dispatch(getUserToken()),
//   }
// }

export default connect(mapStateToProps) (AuthLoadingScreen)
