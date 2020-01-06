import React from "react";

import {connect} from 'react-redux'
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage,
} from 'react-native';
import { WebBrowser } from 'expo';

// 3rd party lib imports
import { Input,Button} from 'react-native-elements'
import * as EmailValidator from 'email-validator';
import FAIcon from 'react-native-vector-icons/FontAwesome'
import { Hoshi } from 'react-native-textinput-effects';


//components imports
import LoginScreen from './LoginScreen.js'
import Container from '../../components/Container.js'

//actions imports
import {postNewUser,setCurrentUser} from '../../actions/authActions'

//constants imports
import {API_URL} from '../../constants/types.js'
//style imports
import colors from '../../styles/colors'
import {styles} from '../../styles/styles'

class SignupScreen extends React.Component {
  static navigationOptions = {
    header: null,
    drawerLabel: 'SignUpScreen',
    // drawerIcon: ({ }) => (   ),
  };
  state = {
    name: "",
    email: "",
    username:'',
    password: '',
    passwordConfirmation: '',
    phone: "",
    token: { },
    loading: true,
    error: null,
    passSel: false,
    passConfSel: false,
    credsChecked: true,

}

signup = () => {
  // e.preventDefault()
  // await this._attemptGeocodeAsync()
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      // phone: this.state.phone,
      // username: this.state.username,
    }
    if ((this.state.password.length > 5)
       && (this.state.password === this.state.passwordConfirmation)
        && EmailValidator.validate(this.state.email)
         // && (this.state.phone.length === 3)
          && (this.state.name !== null)
          // &&(this.state.username !==null)
        )   {
            this.setState({credsChecked: false})
            this.props.postNewUser(user)
            .then(() => this.setUserToken())

            //try to refecator these fetches out and only pull setcurrentuser from
            //action
      }
      else {
          Alert.alert(
          'Invalid Credentials',
          'Please verify your information is correct and unique',
          [
            {
              text: 'OK',
              onPress: () => console.log('Ok Pressed'),
              style: 'cancel',
            },
          ],
          {cancelable: false},
        )
      }
  }
  async saveLoginToken(userTok){
    try{
      await AsyncStorage.setItem('access_token',userTok);
    } catch(error){
      console.error('AsyncStorage error: '+error.message);
    }
  }

setUserToken = () => {
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    fetch(API_URL+`login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        })
    })
    .then(res => res.json())
    .then(response => {
      if (response.errors) {
        console.log("response: ", response);
          this.setState({ error: true, errMsg: response.errors })
          Alert.alert(
          'Invalid Credentials',
          'Please verify your information is correct and unique',
          [
            {
              text: 'OK',
              onPress: () => this.setState({credsChecked: true}),
              style: 'cancel',
            },
          ],
          {cancelable: false},
        )
      } else {
        this.saveLoginToken(response.access_token)
        // AsyncStorage.setItem('access_token', response.access_token)
        this.setState({loading: false})
        this.props.setCurrentUser()
        this.props.navigation.navigate('drawerStack')

      }
    })
  }

  renderHeader() {

      return (
          <View style={ styles.headerHolder }>
            <Text type='h1White' style={ styles.siteName }>Welcome to Git-Gainz</Text>
              <Image
                size={100}
                style={styles.logo}
                source={require('../../assets/images/gitgainzicon.png')}
              />
          </View>
      )
  }

  renderSignupButon(){
    if(this.state.credsChecked){

      return (
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity style={styles.authButton}  onPress={ ()=>{this.signup()} }>
            <Text style={styles.buttonText}>Sign Up!</Text>
            <FAIcon name='sign-out' size={30} style={styles.buttonIcon}  />
          </TouchableOpacity>
        </View>
      )

    }
  }
  renderInputs() {
  if (this.state.credsChecked) {
  return (

      <View style={styles.authInputs}>

        <Hoshi
          label={'Name'}
          borderColor={colors.authBorder}
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
          />

        <Hoshi
          label={'Email'}
          borderColor={colors.authBorder}
          onChangeText={(email)=>this.setState({email})}
          value={this.state.email}
          />


        {this.state.password.length < 6 && this.state.passSel ? <Text style={{color: 'red', marginLeft: 10}}>Password must be at least 6 characters</Text>: null}
        <Hoshi
          label={'Password'}
          borderColor={colors.authBorder}
          onFocus={() => this.setState({passSel: true})}
          onChangeText={(password)=>this.setState({password})}
          value = {this.state.password}
          secureTextEntry
          />

        {this.state.password !== this.state.passwordConfirmation && this.state.passConfSel ? <Text style={{color: 'red', marginLeft: 10}}>Passwords do not match</Text>: null}

        <Hoshi
          label={'Confirm Password'}
          borderColor={colors.authBorder}
          onFocus={() => this.setState({passConfSel: true})}
          onChangeText={(passwordConfirmation) => this.setState({passwordConfirmation})}
          value={this.state.passwordConfirmation}
          secureTextEntry
          />
      </View>
        )}
  }

  render() {
    return (
      <Container style={[ styles.container, this.props.style || {} ]}>
        {this.renderHeader()}
        {this.renderInputs()}
        {this.renderSignupButon()}
      </Container>
    )
  }
}
const mapDispatchToProps=dispatch=>({
  postNewUser:(u)=>dispatch(postNewUser(u)),
  setCurrentUser:(email,res,nav,from)=>dispatch(setCurrentUser(email,res,nav,from)),
})
function mapStateToProps(state){
  const {auth}=state

  return {


  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignupScreen)
