import React from "react";

import {connect} from 'react-redux'
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

class SignupScreen extends React.Component {
  static navigationOptions = {
    header: null,
    drawerLabel: 'SignUpScreen',
    // drawerIcon: ({ }) => (   ),
  };
  render() {
    return (
      <View>

      </View>
    )
  }
}
function mapStateToProps(state){
  const {auth}=state

  return {
    

  }
}
export default connect(mapStateToProps,)(SignupScreen)
