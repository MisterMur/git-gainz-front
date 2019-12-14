import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import Button from 'react-native-button';
import _ from 'lodash';
import { connect } from 'react-redux';
// import {input,inputMain}from '../styles/base'
import { emailChanged, passwordChanged, loginUser } from '../actions/authActions.js';

class LoginForm extends Component {
  onButtonSubmit() {
    console.log('Submitted: ', `${this.props.email} ${this.props.password}`);
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }
  emailChanged(value) {
    const email =value.trim();
    this.props.emailChanged(email);
  }
  passwordChanged(value) {
    // console.log('Value:', value);
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
    // <View style={styles.viewStyle}>
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
  // console.log('mapstate to props in loginform',state)
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.errorFlag,
    spinner: state.auth.spinner
  };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);
