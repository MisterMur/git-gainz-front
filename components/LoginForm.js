import React, { Component } from 'react';
import { View, Text, ActivityIndicator,AsyncStorage, Alert } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import Button from 'react-native-button';
import _ from 'lodash';
import { connect } from 'react-redux';

import {API_URL} from '../constants/types.js'

import { emailChanged, passwordChanged, loginUser,setCurrentUser , getUserToken} from '../actions/authActions.js';

class LoginForm extends Component {
  state = {
  error: null,
  response: "",
  loading: true,
  email:null,
  password:null,
}

async saveLoginToken(userTok){
  try{
    await AsyncStorage.setItem('access_token',userTok);
  } catch(error){
    console.error('AsyncStorage error: '+error.message);
  }
}

userLogin = () => {
  // this.setState({ error: false, response: ''})
  const user = {
    email: this.state.email,
    password: this.state.password
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
      'Invalid  From Login form Credentials',
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
      this.setState({loading: false})

      this.saveLoginToken(response.access_token)
      this.props.setCurrentUser();
      Actions.HomePage();
      // this.props.navigation.navigate('drawerStack')
      // this.props.setCurrentUser(this.props.email, response.access_token, this.props.navigation, "log-in")
    }
  })
}

  onButtonSubmit() {
    this.props.userLogin()
  }
  emailChanged(value) {
    const email =value.trim();
    this.setState({email})
    // this.props.emailChanged(email);
  }
  passwordChanged() {
    this.setState({password})
    // this.props.passwordChanged(value.trim());
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


  render() {
    return (
      <View style={

          {
            borderRadius: 4,
          borderStyle: 'solid',
          borderWidth: 2,
          borderColor: '#e3e3e3',
          /*padding: 1,*/
          width:'90%',
          marginBottom: 150,
          marginLeft:'5%'}
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
  const {auth,user}=state;
  return {
    email: auth.email,
    password: auth.password,
    currentUser: auth.currentUser,
    error: auth.errorFlag,
    spinner: auth.spinner,
    token: user.token,

  };
};


export default connect(mapStateToProps, { getUserToken,emailChanged, passwordChanged, loginUser , setCurrentUser})(LoginForm);
