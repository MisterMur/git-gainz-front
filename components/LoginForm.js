import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import Button from 'react-native-button';
import _ from 'lodash';
import { connect } from 'react-redux';
import { usernameChanged, passwordChanged, loginUser } from '../actions/authActions.js';

class LoginForm extends Component {
  onButtonSubmit() {
    console.log('Submitted: ', `${this.props.username} ${this.props.password}`);
    const { username, password } = this.props;
    this.props.loginUser({ username, password });
  }
  usernameChanged(value) {
    const username =value.trim();
    this.props.usernameChanged(username);
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
          color: '#cc3333'
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
      <View style={styles.viewStyle}>
        {this.renderError()}
        <Hoshi
          label={'Username'}
          // this is used as active border color
          borderColor={'#b76c94'}
          // this is used to set backgroundColor of label mask.
          // please pass the backgroundColor of your TextInput container.
          // backgroundColor={'gray'}
          onChangeText={this.usernameChanged.bind(this)}
          value={this.props.username}
        />

        <Hoshi
          label={'Password'}
          // this is used as active border color
          borderColor={'#b76c94'}
          // this is used to set backgroundColor of label mask.
          // please pass the backgroundColor of your TextInput container.
          // backgroundColor={'grey'}
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
    username: state.auth.username,
    password: state.auth.password,
    error: state.auth.errorFlag,
    spinner: state.auth.spinner
  };
};

export default connect(mapStateToProps, { usernameChanged, passwordChanged, loginUser })(LoginForm);
