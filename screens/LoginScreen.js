import React from "react";


import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import LoginForm from '../components/LoginForm.js'

import { Input,Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: "LOGIN",
  };


  render() {
    return (
      <View>
        <LoginForm navigation={this.props.navigation} />

      </View>
    )
  }
}
export default LoginScreen
