import React, { Component } from 'react';
import { View, Text, ActivityIndicator,AsyncStorage, Alert } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import Button from 'react-native-button';
import _ from 'lodash';
import { connect } from 'react-redux';

import {API_URL} from '../constants/types.js'

import { emailChanged, passwordChanged, loginUser,setCurrentUser } from '../actions/authActions.js';

class LoginForm extends Component {
  state = {
  error: null,
  response: "",
  loading: true
}

logIn = () => {
  this.setState({ error: false, response: ''})
  const user = {
    email: this.props.email,
    password: this.props.password
  }
  fetch(API_URL+"login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      user
    })
  })
  .then(res => res.json())
  .then(response => {
    if (response.errors) {
      this.setState({ response: response, error: true, errMsg: response.errors })
      Alert.alert(
      'Invalid Credentials',
      'Please verify your information is correct',
      [
        {
          text: 'OK',
          onPress: () => console.log("ok pressed"),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    )
    } else {
      console.log('in login ', response.user_id)
      AsyncStorage.setItem('user_id', response.user_id)

      AsyncStorage.setItem('access_token', response.access_token)
      this.setState({loading: false})
      this.props.setCurrentUser(this.props.email, response.access_token, this.props.navigation, "log-in")
    }
  })
}
  componentDidMount() {
   if (this.props.currentUser) {
     this.props.navigation.navigate('ScheduleList')
   }
 }
  onButtonSubmit() {
    // console.log('Submitted: ', `${this.props.email} ${this.props.password}`);
    this.logIn()
  }
  emailChanged(value) {
    const email =value.trim();
    this.props.emailChanged(email);
  }
  passwordChanged(value) {
    this.props.passwordChanged(value.trim());
  }
  renderError() {
    if (this.props.error) {
      return (
        <Text
          style={{
          textAlign: 'center',
          fontSize: 20,
          color: 'red'
        }}
        >Sorry authentication failed!</Text>
      );
    }

    return null;
  }

  renderButton() {
    if (this.props.spinner) {
      return (
        <ActivityIndicator
          style={{ height: 80 }}
          size="large"
        />
      );
    }
      return (
        <Button
          style={{
            fontSize: 20,
            color: 'black',
            padding: 20,
            marginTop: 10
          }}
          styleDisabled={{ color: 'red' }}
          onPress={this.onButtonSubmit.bind(this)}
        >
        Login
      </Button>
      );
  }
  renderAutoButton(){
    return (
      <>
      <Button
        style={{
          fontSize: 20,
          padding: 20,
          marginTop: 10
        }}
        styleDisabled={{ color: 'red' }}
        onPress={this.onButtonSubmit.bind(this)}
      >
      Login
      </Button>
      </>
    )
  }

  render() {
    return (
      <View style={

          {
            borderRadius: 4,
          borderStyle: 'solid',
          borderWidth: 2,
          borderColor: '#e3e3e3',
          /*padding: 1,*/
          marginBottom: 15}
        }

        >
        {this.renderError()}

        <Hoshi

          label={'Email'}
          borderColor={'#b76c94'}
          onChangeText={this.emailChanged.bind(this)}
          value={this.props.email}
        />

        <Hoshi
          label={'Password'}
          borderColor={'#b76c94'}
          onChangeText={this.passwordChanged.bind(this)}
          value={this.props.password}
          secureTextEntry
        />

        {this.renderButton()}

      </View>
    );
  }
}

const styles = {
  viewStyle: {
    marginTop: 50,
    padding: 10,
  }
};

const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    currentUser: state.auth.currentUser,
    error: state.auth.errorFlag,
    spinner: state.auth.spinner
  };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser , setCurrentUser})(LoginForm);
