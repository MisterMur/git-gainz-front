import React, { Component } from 'react';
import {
   View,
   ScrollView,
   Text,
    ActivityIndicator,
    AsyncStorage,
    Image,
    TouchableOpacity,
     Alert,
     StyleSheet,
   } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import Button from 'react-native-button';
import _ from 'lodash';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';


import {API_URL} from '../constants/types.js'

import { emailChanged, passwordChanged, loginUser,setCurrentUser , getUserToken} from '../actions/authActions.js';

import colors from '../styles/colors'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import Container from './Container'



class LoginForm extends Component {
  static navigationOptions = {
    title: "Login",
    drawerLabel: 'Login Screen',

  };
  state = {
  error: null,
  response: "",
  loading: true,
  email:'',
  password:'',
}
componentDidMount(){
  if(this.props.currentUser){
    this.props.navigation.navigate('drawerStack')
  }
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
      // Actions.HomePage();
      this.props.navigation.navigate('drawerStack')
      // this.props.setCurrentUser(this.props.email, response.access_token, this.props.navigation, "log-in")
    }
  })
}

  onButtonSubmit() {
    this.userLogin()
  }
  emailChanged(value) {
    const email =value.trim();
    this.setState({email})
    // this.props.emailChanged(email);
  }
  passwordChanged(password) {
    this.setState({password})
    // this.props.passwordChanged(value.trim());
  }
  renderHeader() {

      return (
          <View style={ styles.headerHolder }>
            <Text type='h1White' style={ styles.siteName }>Welcome to Git-Gainz</Text>
              <Image
                size={100}
                style={styles.logo}
                source={require('../assets/images/gitgainzicon.png')}
              />
          </View>
      )
  }
  renderSignup(){
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
      <TouchableOpacity style={styles.signupButton}  onPress={ ()=>{this.props.navigation.navigate('signupScreen')} }>
        <Text style={styles.buttonText}>Sign Up!</Text>
        <FAIcon name='sign-out' size={30} style={styles.buttonIcon}  />


      </TouchableOpacity>
    </View>
    )
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
      <Container style={[ styles.container, this.props.style || {} ]}>

      {this.renderHeader()}
      {this.renderSignup()}
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
          value={this.state.email}
        />

        <Hoshi
          label={'Password'}
          borderColor={'#b76c94'}
          onChangeText={this.passwordChanged.bind(this)}
          value={this.state.password}
          secureTextEntry
        />

        {this.renderButton()}

      </View>
    </Container>
    );
  }
}


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

const styText = { color: colors.txtWhite }

const styles = StyleSheet.create({
    viewStyle: {
      marginTop: 50,
      padding: 10,
    },
    container: {
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowOffset: { height: -5, width:-5},
        shadowRadius: 10,
        backgroundColor: colors.bgMain,
    },
    navBar: {
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 25
    },
    headerHolder: {
        padding: 25,
        flex: 1
    },
    logo: {
        // ...styText,
        marginTop: 10
    },

    signupButton: {
        width: '90%',
        marginLeft:'5%',
        marginVertical: 70,
        height: 50,
        borderColor: colors.bdWhite,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#e3e3e3',
        borderRadius:50,
    },
    button: {
        height:20,
        borderRadius: 50,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#e3e3e3',
        padding: 1,
        width:'90%',
        marginBottom: 20,
        marginLeft:'5%',
    },
    buttonText:{
        fontSize:20,
        color:'white',
        textAlign:'center',
    },
    buttonIcon:{
        color:colors.bdWhite,
        marginLeft:80,
        marginTop:-27
    }

})
