import React from 'react';
import {connect} from 'react-redux'
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
// import {getUserToken} from ''
class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }
  static navigationOptions = {
    title: 'Authloading...',


  };
  componentDidMount() {
      // this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  // _bootstrapAsync = () => {
  //
  //     this.props.getUserToken().then(() => {
  //         this.props.navigation.navigate('ScheduleList');
  //     })
  //         .catch(error => {
  //             this.setState({ error })
  //         })
  //
  // };

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('in auth loading',userToken)

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'ScheduleListStack' : 'loginScreen');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View >
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
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
